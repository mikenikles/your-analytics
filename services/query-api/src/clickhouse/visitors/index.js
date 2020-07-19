const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchVisitorsDev = () => () => devData;

/**
 * When a single day is requested, the API expects the "from" date range to be 00:00:00
 * and the "to" date range to be 23:59:59.
 */
const isDateRangeOneDay = (dateRange) =>
  (dateRange.to - dateRange.from + 1 = 86400);

const fetchVisitors = (ch) => async (dateRange) => {
  const timezone = "Europe/London";
  const granularity = isDateRangeOneDay(dateRange) ? "Hour" : "Day";
  const sql = `SELECT to${granularity}(timestamp, '${timezone}') AS day, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} GROUP BY day`;

  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [day, total] OR [hour, total]
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
