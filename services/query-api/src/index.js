const { Magic } = require("@magic-sdk/admin");
const cors = require("cors");
const express = require("express");
const { rootDb, domainDb } = require("@your-analytics/faunadb");

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

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const app = express();
process.env.NODE_ENV === "development" &&
  app.use(
    cors({
      origin: /\.gitpod.io/,
    })
  );

const port = process.env.PORT || 8081;

const getMagicUser = async (req) => {
  const token = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  try {
    magic.token.validate(token);
    return await magic.users.getMetadataByToken(token);
  } catch (error) {
    return null;
  }
};

const createStatsEndpoint = (path, fetcher) => {
  app.get(`/:domain/${path}`, async (req, res) => {
    try {
      const domain = req.params.domain;
      const { data: visibilityData } = await domainDb.settings.getVisibility(
        domain
      );

      let websiteSettings = {};
      if (visibilityData.visibility === "private") {
        const magicUser = await getMagicUser(req);
        if (!magicUser) {
          res.status(401).end();
          return;
        }

        const user = await rootDb.users.find(magicUser.issuer);
        if (!user.data.sites[domain]) {
          console.error(
            new Error(
              `User ${magicUser.issuer} tried to access domain ${domain} but is not authorized.`
            )
          );
          res.status(401).end();
          return;
        }

        const { data } = await domainDb.settings.getSettings(
          user.data.sites[domain].serverKeySecret
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
