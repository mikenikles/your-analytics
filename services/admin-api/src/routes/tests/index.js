const { rootDb } = require("@your-analytics/faunadb");
const express = require("express");
const dbReset = require("./db-reset");
const user = require("./user");

const router = express.Router();

router.use("/user", user);
router.use("/db-reset", dbReset);

module.exports = router;
