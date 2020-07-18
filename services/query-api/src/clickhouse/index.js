const ClickHouse = require("@apla/clickhouse");

const { fetchTopPages } = require("./top-pages");
const { fetchVisitors } = require("./visitors");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD,
});

module.exports = {
  fetchTopPages: fetchTopPages(ch),
  fetchVisitors: fetchVisitors(ch),
};
