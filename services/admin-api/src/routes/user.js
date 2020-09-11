const { rootDb } = require("@your-analytics/faunadb");
const crypto = require("crypto");
const express = require("express");

const router = express.Router();

module.exports = (authenticate) => {
  router.get("/", authenticate, async (req, res) => {
    const dbUser = await rootDb.users.find(req.user.issuer);
    if (dbUser) {
      const { firstName, email, sites } = dbUser.data;
      return res
        .status(200)
        .json({
          sites: Object.keys(sites).reduce((result, site) => {
            result[site] = {};
            return result;
          }, {}),
          firstName,
          email,
          emailHash: crypto
            .createHash("md5")
            .update(dbUser.data.email)
            .digest("hex"),
        })
        .end();
    }
    return res.status(404).end();
  });

  router.post("/login", authenticate, (req, res) => {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      return res.status(401).end("Could not log user in.");
    }
  });

  router.post("/logout", authenticate, async (req, res) => {
    await magic.users.logoutByIssuer(req.user.issuer);
    req.logout();
    return res.status(200).end();
  });

  return router;
};
