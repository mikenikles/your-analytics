const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";
const ONE_DAY = 60 * 60 * 24;
const ONE_MONTH = ONE_DAY * 31;
const ONE_YEAR = ONE_MONTH * 12;

const fetchVisitorsDev = () => () => devData;

/**
 * Each `dateRange.to` value represents 23:59:59 on a given day.
 * The `+ 1` in the calculations below are there to represent a full day.
 */
const dateRangeGranularities = [
  {
    test: ({ from, to }) => to - from + 1 === ONE_DAY,
    granularity: "Hour",
  },
  {
    test: ({ from, to }) =>
      to - from + 1 > ONE_DAY && to - from + 1 <= ONE_MONTH,
    granularity: "Date",
  },
  {
    test: ({ from, to }) =>
      to - from + 1 > ONE_MONTH && to - from + 1 <= ONE_YEAR,
    granularity: "Month",
  },
  {
    test: ({ from, to }) => to - from + 1 > ONE_YEAR,
    granularity: "Year",
  },
  {
    test: () => true,
    granularity: "Date",
  },
];

const isDateRangeOneDay = (dateRange) =>
  dateRange.to - dateRange.from + 1 === 86400;

const fetchVisitors = (ch) => async (dateRange, domain, timezone) => {
  const { granularity } = dateRangeGranularities.find((dateRangeGranularity) =>
    dateRangeGranularity.test(dateRange)
  );
  const sql = `SELECT to${granularity}(timestamp, '${timezone}') AS day, COUNT(DISTINCT user_id) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY day`;

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
