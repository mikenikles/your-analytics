const { rootDb, domainDb } = require("@your-analytics/faunadb");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { formatISO, startOfYear, sub } = require("date-fns");
const express = require("express");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const { stats } = require("@your-analytics/clickhouse");

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

const datePresets = {
  // Also update `services/website/src/components/date-range.svelte`
  today: {
    calculateFromDate: () => new Date(),
    calculateToDate: () => new Date(),
  },
  "7days": {
    calculateFromDate: () =>
      sub(new Date(), {
        days: 7,
      }),
    calculateToDate: () => new Date(),
  },
  "30days": {
    calculateFromDate: () =>
      sub(new Date(), {
        days: 30,
      }),
    calculateToDate: () => new Date(),
  },
  thisyear: {
    calculateFromDate: () => startOfYear(new Date()),
    calculateToDate: () => new Date(),
  },
};
const determineDateRange = (preset) => ({
  from: formatISO(datePresets[preset].calculateFromDate(), {
    representation: "date",
  }),
  to: formatISO(datePresets[preset].calculateToDate(), {
    representation: "date",
  }),
});

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

      const dateRange =
        req.query.preset === "custom"
          ? {
              from: req.query.from,
              to: req.query.to,
            }
          : determineDateRange(req.query.preset);
      const data = await fetcher(dateRange, domain, websiteSettings);
      res.json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });
};

createStatsEndpoint("browser", stats.fetchBrowser);
createStatsEndpoint("os", stats.fetchOs);
createStatsEndpoint("screen", stats.fetchScreen);
createStatsEndpoint("top-pages", stats.fetchTopPages);
createStatsEndpoint("top-referrers", stats.fetchTopReferrers);
createStatsEndpoint("total-pageviews", stats.fetchTotalPageviews);
createStatsEndpoint("unique-visitors", stats.fetchUniqueVisitors);
createStatsEndpoint("visitors", stats.fetchVisitors);
createStatsEndpoint("world-map", stats.fetchWorldMap);

app.listen(port, () => {
  console.log(`query-api started at http://localhost:${port}`);
});
