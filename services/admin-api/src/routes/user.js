const { rootDb } = require("@your-analytics/faunadb");
const { Magic } = require("@magic-sdk/admin");
const express = require("express");
const { cookieConfig, signJwtAndSetCookie } = require("../utils/cookies");

const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const router = express.Router();

module.exports = (authenticateMagic, authenticateJwtCookieCombo) => {
  router.get("/", authenticateJwtCookieCombo, async (req, res) => {
    const dbUser = await rootDb.users.find(req.user.issuer);
    if (dbUser) {
      return res.status(200).json(dbUser).end();
    }
    return res.status(404).end();
  });

  router.put("/", authenticateJwtCookieCombo, async (req, res) => {
    try {
      await rootDb.users.update(req.user.issuer, req.body);
      const dbUser = await rootDb.users.find(req.user.issuer);

      try {
        await signJwtAndSetCookie(res, dbUser);
        return res.status(200).json(req.user).end();
      } catch (error) {
        return res.status(401).end("Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  });

  router.post("/login", authenticateMagic, async (req, res) => {
    if (req.user) {
      const dbUser = await rootDb.users.find(req.user.issuer);
      try {
        await signJwtAndSetCookie(res, dbUser);
        return res.status(200).json(req.user).end();
      } catch (error) {
        return res.status(401).end("Could not log user in.");
      }
    } else {
      return res.status(401).end("Could not log user in.");
    }
  });

  router.post("/logout", authenticateJwtCookieCombo, async (req, res) => {
    await magic.users.logoutByIssuer(req.user.issuer);
    req.logout();
    res.clearCookie("jwt", cookieConfig);
    return res.status(200).end();
  });

  return router;
};
