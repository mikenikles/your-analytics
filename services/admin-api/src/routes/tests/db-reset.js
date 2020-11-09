const { deleteWebsite } = require("@your-analytics/clickhouse");
const { domainDb, rootDb } = require("@your-analytics/faunadb");
const express = require("express");

const router = express.Router();

const ignoreError = (promise) => promise.catch((e) => undefined);

router.post("/", async (req, res) => {
  console.log("[admin-api]: TESTS - Resetting database...");

  const testUserIssuer = "hello+ya-automated-tests@mikenikles.com";
  const testUser = await rootDb.users.find(testUserIssuer);

  if (testUser) {
    const sites = Object.keys(testUser.sites || {});
    const steps = [];
    for (const site of sites) {
      steps.push(domainDb.admin.deleteWebsite(site));
      steps.push(deleteWebsite(site));
    }
    steps.push(rootDb.users.delete(testUserIssuer));

    await Promise.all(steps.map(ignoreError));
  }

  return res.status(200).end();
});

module.exports = router;
