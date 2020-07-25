const ClickHouse = require("@apla/clickhouse");

const { fetchBrowser } = require("./browser");
const { fetchOs } = require("./os");
const { fetchScreen } = require("./screen");
const { fetchTopPages } = require("./top-pages");
const { fetchTopReferrers } = require("./top-referrers");
const { fetchUniqueVisitors } = require("./unique-visitors");
const { fetchVisitors } = require("./visitors");
const { fetchWorldMap } = require("./world-map");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD,
});

module.exports = {
  fetchBrowser: fetchBrowser(ch),
  fetchOs: fetchOs(ch),
  fetchScreen: fetchScreen(ch),
  fetchTopPages: fetchTopPages(ch),
  fetchTopReferrers: fetchTopReferrers(ch),
  fetchUniqueVisitors: fetchUniqueVisitors(ch),
  fetchVisitors: fetchVisitors(ch),
  fetchWorldMap: fetchWorldMap(ch),
};
