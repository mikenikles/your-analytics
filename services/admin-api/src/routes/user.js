const { rootDb } = require("@your-analytics/faunadb");
const { Magic } = require("@magic-sdk/admin");
const express = require("express");
const jwt = require("jsonwebtoken");

const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const router = express.Router();

const cookieConfig = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: true,
};

module.exports = (authenticateMagic, authenticateJwtCookieCombo) => {
  router.get("/", authenticateJwtCookieCombo, async (req, res) => {
    const dbUser = await rootDb.users.find(req.user.issuer);
    if (dbUser) {
      return res.status(200).json(dbUser).end();
    }
    return res.status(404).end();
  });

  router.post("/login", authenticateMagic, async (req, res) => {
    if (req.user) {
      const dbUser = await rootDb.users.find(req.user.issuer);
      jwt.sign({ user: dbUser }, process.env.JWT_SECRET, (error, token) => {
        if (error) {
          return res.status(401).end("Could not log user in.");
        }

        res.cookie("jwt", token, cookieConfig);
        return res.status(200).json(req.user).end();
      });
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
