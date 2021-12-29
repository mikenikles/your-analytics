const { addNewWebsite } = require("@your-analytics/clickhouse");
const express = require("express");

const router = express.Router();

const isValidWebsite = (domain) =>
  !!domain.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/);

router.post("/", async (req, res) => {
  console.log("[admin-api]: TESTS - Adding new website: ", req.body.url);
  try {
    try {
      if (!isValidWebsite(req.body.url)) {
        throw new Error(`Invalid website provided: ${req.body.url}`);
      }
      await addNewWebsite(req.body.url);
    } catch (error) {
      console.error(error);
      return res.status(400).end();
    }

    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

module.exports = router;
