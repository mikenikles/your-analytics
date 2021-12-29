const express = require("express");
const dbReset = require("./db-reset");
const domainDb = require("./domain-db");
const user = require("./user");

const router = express.Router();

router.use("/user", user);
router.use("/domain-db", domainDb);
router.use("/db-reset", dbReset);

module.exports = router;
