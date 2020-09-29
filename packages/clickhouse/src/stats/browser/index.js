const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchBrowserDev = () => () => devData;

const fetchBrowser = (ch) => async (dateRange, domain, websiteSettings) => {
  const { timezone } = websiteSettings;
  const sql = `SELECT browser_name, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY browser_name ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [browser_name, total]
      result[row[0]] = row[1] * 1;
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchBrowser: IS_DEV ? fetchBrowserDev : fetchBrowser,
};
