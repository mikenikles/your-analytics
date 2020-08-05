const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchScreenDev = () => () => devData;

const fetchScreen = (ch) => async (dateRange, domain) => {
  const timezone = "Europe/London";
  const sql = `SELECT substring(screen_size, 1, position(screen_size, 'x') - 1) AS screen_width, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY screen_width ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [screen_width, total]
      result[row[0]] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchScreen: IS_DEV ? fetchScreenDev : fetchScreen,
};
