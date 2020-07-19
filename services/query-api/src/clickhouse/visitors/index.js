const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchVisitorsDev = () => () => devData;

const fetchVisitors = (ch) => async (dateRange) => {
  const timezone = "Europe/London";
  const sql = `SELECT toDate(timestamp, '${timezone}') AS day, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} GROUP BY day`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [day, total]
      result[row[0]] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchVisitors: IS_DEV ? fetchVisitorsDev : fetchVisitors,
};
