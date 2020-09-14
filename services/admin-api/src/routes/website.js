const { domainDb, rootDb } = require("@your-analytics/faunadb");
const express = require("express");

const router = express.Router();

module.exports = (authenticate) => {
  router.get("/", authenticate, async (req, res) => {
    try {
      const user = await rootDb.users.find(req.user.issuer);
      return res.status(200).json(user.sites);
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  });

  router.post("/", authenticate, async (req, res) => {
    try {
      if (req.body.firstName) {
        await rootDb.users.setFirstName(req.user.issuer, req.body.firstName);
      }
      try {
        await domainDb.admin.addNewWebsite(req.body.url);
      } catch (error) {
        return res.status(400).end();
      }
      const {
        secret: websiteServerKeySecret,
      } = await domainDb.admin.createWebsiteServerKey(req.body.url);
      await rootDb.users.addNewWebsiteServerKey(req.user.issuer, {
        sites: {
          [req.body.url]: {
            serverKeySecret: websiteServerKeySecret,
          },
        },
      });
      await domainDb.admin.createCollection(websiteServerKeySecret)("settings");
      await domainDb.settings.insertSettings(websiteServerKeySecret)({
        timezone: req.body.timezone,
        visibility: "private",
      });

      return res.status(201).end();
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  });

  router.get("/:domain/settings", authenticate, async (req, res) => {
    try {
      const domain = req.params.domain;
      const user = await rootDb.users.find(req.user.issuer);
      if (!user.sites[domain]) {
        console.error(
          new Error(
            `User ${req.user.issuer} tried to access domain ${domain} but is not authorized.`
          )
        );
        res.status(401).end();
        return;
      }

      const domainServerKeySecret = await rootDb.users.getDomainServerKeySecret(
        user.issuer,
        domain
      );
      const settings = await domainDb.settings.getSettings(
        domainServerKeySecret
      )();
      res.status(200).send(JSON.stringify(settings.data));
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  });

  router.get("/:domain/settings/visibility", async (req, res) => {
    try {
      const { data } = await domainDb.settings.getVisibility(req.params.domain);
      return res.status(200).json({ visibility: data.visibility });
    } catch (error) {
      console.error(error);
      // To prevent bad actors from scanning the database for URLs to see whether
      // they are configured in our database or not. Returning a 500 error would indicate
      // the req.query.url value does not exist in our database; returning visibility: private
      // gives the impression the URL is configured, even if it may not be.
      return res.status(200).json({ visibility: "private" });
    }
  });

  router.put("/:domain/settings/visibility", authenticate, async (req, res) => {
    try {
      const domain = req.params.domain;
      const visibility = req.body.visibility;

      const user = await rootDb.users.find(req.user.issuer);
      if (!user.data.sites[domain]) {
        console.error(
          new Error(
            `User ${req.user.issuer} tried to access domain ${domain} but is not authorized.`
          )
        );
        res.status(401).end();
        return;
      }
      await domainDb.settings.setVisibility(
        user.data.sites[domain].serverKeySecret
      )(visibility);
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  });

  return router;
};
