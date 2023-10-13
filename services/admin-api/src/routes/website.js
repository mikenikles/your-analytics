const {
  addNewWebsite,
  convertUrlToDbName,
} = require("@your-analytics/clickhouse");
const { domainDb, rootDb } = require("@your-analytics/faunadb");
const express = require("express");
const { signJwtAndSetCookie } = require("../utils/cookies");

const router = express.Router();

const isValidWebsite = (domain) =>
  !!domain.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/);

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
      try {
        if (!isValidWebsite(req.body.url)) {
          throw new Error(`Invalid website provided: ${req.body.url}`);
        }
        await domainDb.admin.addNewWebsite(req.body.url);
        await addNewWebsite(req.body.url);
      } catch (error) {
        console.error(error);
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
        chDbName: convertUrlToDbName(req.body.url),
        timezone: req.body.timezone,
        visibility: "private",
      });

      await domainDb.admin.createCollection(websiteServerKeySecret)("people");
      await domainDb.people.insertPerson(websiteServerKeySecret)({
        issuer: req.user.issuer,
        role: "owner",
      });
      await domainDb.people.createByIssuerAndRoleIndex(
        websiteServerKeySecret
      )();

      try {
        const newUser = Object.assign({}, req.user);
        newUser.sites[req.body.url] = {};
        await signJwtAndSetCookie(res, newUser);
        return res.status(201).end();
      } catch (error) {
        return res.status(401).end("Something went wrong.");
      }
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

      const user = await rootDb.users.findUserWithAllData(req.user.issuer);
      if (!user.sites[domain]) {
        console.error(
          new Error(
            `User ${req.user.issuer} tried to access domain ${domain} but is not authorized.`
          )
        );
        res.status(401).end();
        return;
      }
      await domainDb.settings.setVisibility(user.sites[domain].serverKeySecret)(
        visibility
      );
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  });

  return router;
};
