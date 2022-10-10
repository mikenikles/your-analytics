const ClickHouse = require("@apla/clickhouse");
const { recordEvent } = require("./events");
const { addNewWebsite, convertUrlToDbName } = require("./setup");
const stats = require("./stats");
const { deleteWebsite } = require("./tests");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD,
  protocol: process.env.NODE_ENV === "production" ? "https:" : "http:",
});

module.exports = {
  addNewWebsite: addNewWebsite(ch),
  convertUrlToDbName,
  recordEvent: recordEvent(ch),
  stats: stats(ch),
  deleteWebsite: deleteWebsite(ch),
};
