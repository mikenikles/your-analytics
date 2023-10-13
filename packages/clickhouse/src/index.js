const ClickHouse = require("@apla/clickhouse");
const { countEvents, recordEvent } = require("./events");
const { addNewWebsite, convertUrlToDbName } = require("./setup");
const stats = require("./stats");
const { deleteWebsite } = require("./tests");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD,
  // Uncomment the protocol if we give ClickHouse Cloud a try again in the future.
  // See https://github.com/mikenikles/your-analytics/issues/299
  // protocol: process.env.NODE_ENV === "production" ? "https:" : "http:",
});

module.exports = {
  addNewWebsite: addNewWebsite(ch),
  convertUrlToDbName,
  countEvents: countEvents(ch),
  recordEvent: recordEvent(ch),
  stats: stats(ch),
  deleteWebsite: deleteWebsite(ch),
};
