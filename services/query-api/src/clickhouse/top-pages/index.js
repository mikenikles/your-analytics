const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchTopPagesDev = () => () => devData;

const fetchTopPages = (ch) => async (dateRange, domain, timezone) => {
  const sql = `SELECT path, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY path ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [path, total]
      result[row[0]] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchTopPages: IS_DEV ? fetchTopPagesDev : fetchTopPages,
};
