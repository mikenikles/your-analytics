const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchScreenDev = () => () => devData;

const fetchScreen = (ch) => async (dateRange, domain, timezone) => {
  const sql = `SELECT screen_size, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY screen_size ORDER BY total DESC`;
  const stream = ch.query(sql);
  return new Promise((resolve, reject) => {
    const result = {
      mobile: 0,
      tablet: 0,
      laptop: 0,
      desktop: 0,
    };
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [screen_size, total]

      // TODO: Can this be done in SQL?
      if (row[0] <= 640) {
        result.mobile += row[1];
      } else if (row[0] <= 768) {
        result.tablet += row[1];
      } else if (row[0] <= 1024) {
        result.laptop += row[1];
      } else {
        result.desktop += row[1];
      }
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchScreen: IS_DEV ? fetchScreenDev : fetchScreen,
};
