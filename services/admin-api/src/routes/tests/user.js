const { rootDb } = require("@your-analytics/faunadb");
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const cookieTestConfig = {
  path: "/",
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: false,
};

/**
 * This endpoint allows the Cypress `loginWithApi` custom command to
 * obtain a signed cookie with the user's JWT token.
 *
 * It create a test account if none exists or returns the existing
 * user information in case an account already existed.
 */
router.post("/login-with-api", async (req, res) => {
  let testUser = await rootDb.users.find(req.body.email);
  if (testUser) {
    await rootDb.users.setLastLoginAt(
      testUser.issuer,
      Math.floor(Date.now() / 1000)
    );
  } else {
    await rootDb.users.create({
      issuer: req.body.email,
      email: req.body.email,
      lastLoginAt: Math.floor(Date.now() / 1000),
    });
    testUser = await rootDb.users.find(req.body.email);
  }

  jwt.sign({ user: testUser }, process.env.JWT_SECRET, (error, token) => {
    if (error) {
      return res.status(401).end("Could not log user in.");
    }

    res.cookie("jwt", token, cookieTestConfig);
    return res.status(200).json(testUser).end();
  });
});

module.exports = router;
