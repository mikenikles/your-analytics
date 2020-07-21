const ClickHouse = require("@apla/clickhouse");

const { fetchOs } = require("./os");
const { fetchTopPages } = require("./top-pages");
const { fetchTopReferrers } = require("./top-referrers");
const { fetchVisitors } = require("./visitors");
const { fetchWorldMap } = require("./world-map");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD,
});

module.exports = {
  fetchOs: fetchOs(ch),
  fetchTopPages: fetchTopPages(ch),
  fetchTopReferrers: fetchTopReferrers(ch),
  fetchVisitors: fetchVisitors(ch),
  fetchWorldMap: fetchWorldMap(ch),
};
