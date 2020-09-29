const { fetchBrowser } = require("./browser");
const { fetchOs } = require("./os");
const { fetchScreen } = require("./screen");
const { fetchTopPages } = require("./top-pages");
const { fetchTopReferrers } = require("./top-referrers");
const { fetchTotalPageviews } = require("./total-pageviews");
const { fetchUniqueVisitors } = require("./unique-visitors");
const { fetchVisitors } = require("./visitors");
const { fetchWorldMap } = require("./world-map");

module.exports = (ch) => ({
  fetchBrowser: fetchBrowser(ch),
  fetchOs: fetchOs(ch),
  fetchScreen: fetchScreen(ch),
  fetchTopPages: fetchTopPages(ch),
  fetchTopReferrers: fetchTopReferrers(ch),
  fetchTotalPageviews: fetchTotalPageviews(ch),
  fetchUniqueVisitors: fetchUniqueVisitors(ch),
  fetchVisitors: fetchVisitors(ch),
  fetchWorldMap: fetchWorldMap(ch),
});
