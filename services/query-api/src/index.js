const { rootDb, domainDb } = require("@your-analytics/faunadb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const { RateLimiterMemory } = require("rate-limiter-flexible");

const {
  fetchBrowser,
  fetchOs,
  fetchScreen,
  fetchTopPages,
  fetchTopReferrers,
  fetchTotalPageviews,
  fetchUniqueVisitors,
  fetchVisitors,
  fetchWorldMap,
} = require("./clickhouse");

const rateLimiter = new RateLimiterMemory({
  points: 20, // # of requests
  duration: 1, // per x seconds by IP
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
};

const app = express();
const port = process.env.PORT || 8081;

process.env.NODE_ENV === "development" &&
  app.use(
    cors({
      origin: /\.gitpod.io/,
    })
  );

app.use(helmet());
app.use(rateLimiterMiddleware);
app.use(cookieParser(process.env.COOKIE_SECRET));

const createStatsEndpoint = (path, fetcher) => {
  app.get(`/:domain/${path}`, async (req, res) => {
    try {
      const domain = req.params.domain;
      const { data: visibilityData } = await domainDb.settings.getVisibility(
        domain
      );

      let websiteSettings = {};
      if (visibilityData.visibility === "private") {
        const jwtCookie = req.signedCookies["jwt"];

        let reqUser;
        try {
          const { user } = jwt.verify(jwtCookie, process.env.JWT_SECRET);
          reqUser = user;
        } catch (jwtError) {
          res.status(401).end();
          return;
        }

        const user = await rootDb.users.find(reqUser.issuer);
        if (!user.sites[domain]) {
          console.error(
            new Error(
              `User ${user.issuer} tried to access domain ${domain} but is not authorized.`
            )
          );
          res.status(401).end();
          return;
        }

        const domainServerKeySecret = await rootDb.users.getDomainServerKeySecret(
          user.issuer,
          domain
        );
        const { data } = await domainDb.settings.getSettings(
          domainServerKeySecret
        )();
        websiteSettings = data;
      } else {
        const { data } = await domainDb.settings.getSettingsPublic(domain);
        websiteSettings = data;
      }

      const dateRange = {
        from: req.query.from ? Math.floor(req.query.from / 1000) : null,
        to: req.query.to ? Math.floor(req.query.to / 1000) : null,
      };
      const data = await fetcher(dateRange, domain, websiteSettings.timezone);
      res.json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });
};

createStatsEndpoint("browser", fetchBrowser);
createStatsEndpoint("os", fetchOs);
createStatsEndpoint("screen", fetchScreen);
createStatsEndpoint("top-pages", fetchTopPages);
createStatsEndpoint("top-referrers", fetchTopReferrers);
createStatsEndpoint("total-pageviews", fetchTotalPageviews);
createStatsEndpoint("unique-visitors", fetchUniqueVisitors);
createStatsEndpoint("visitors", fetchVisitors);
createStatsEndpoint("world-map", fetchWorldMap);

app.listen(port, () => {
  console.log(`query-api started at http://localhost:${port}`);
});
