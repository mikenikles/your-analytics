const { countEvents } = require("@your-analytics/clickhouse");
const { domainDb, rootDb } = require("@your-analytics/faunadb");
const { sub } = require("date-fns");
const express = require("express");

const router = express.Router();

const fetchSitesUsage = async (dbUser) => {
  const siteUsageFetchers = Object.entries(dbUser.sites).map(
    ([url, { serverKeySecret }]) => {
      return new Promise(async (resolve, reject) => {
        const isOwner = await domainDb.people.hasRole(serverKeySecret)(
          dbUser.issuer,
          "owner"
        );
        if (!isOwner) {
          console.error(
            `User issuer ${dbUser.issuer} tries to fetch site usage for site ${url} but is not an owner.`
          );
          reject();
        }

        const usage = await countEvents(url, {
          from: sub(new Date(), { days: 30 }),
          to: new Date(),
        });

        resolve([url, usage.count]);
      });
    }
  );

  return (await Promise.allSettled(siteUsageFetchers)).reduce(
    (result, promise) => {
      const [url, count] = promise.value;
      result[url] = count;
      return result;
    },
    {}
  );
};

module.exports = (authenticateJwtCookieCombo) => {
  router.get("/", authenticateJwtCookieCombo, async (req, res) => {
    const dbUser = await rootDb.users.findUserWithAllData(req.user.issuer);
    if (dbUser) {
      const responseData = {};
      responseData.usage = await fetchSitesUsage(dbUser);
      return res.status(200).json(responseData).end();
    }
    return res.status(404).end();
  });

  return router;
};
