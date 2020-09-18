const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";
const ONE_DAY = 60 * 60 * 24;
const ONE_MONTH = ONE_DAY * 31;
const ONE_YEAR = ONE_MONTH * 12;
const MONTHS = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

const fetchVisitorsDev = () => () => devData;

/**
 * Each `dateRange.to` value represents 23:59:59 on a given day.
 * The `+ 1` in the calculations below are there to represent a full day.
 */
const dateRangeGranularities = [
  {
    test: ({ from, to }) => to - from + 1 === ONE_DAY,
    granularity: "Hour",
    getLabel: (value) =>
      value < 12 ? `${value === 0 ? 12 : value}am` : `${value - 11}pm`,
  },
  {
    test: ({ from, to }) =>
      to - from + 1 > ONE_DAY && to - from + 1 <= ONE_MONTH,
    granularity: "Date",
    getLabel: (value) => value,
  },
  {
    test: ({ from, to }) =>
      to - from + 1 > ONE_MONTH && to - from + 1 <= ONE_YEAR,
    granularity: "Month",
    getLabel: (value) => MONTHS[value],
  },
  {
    test: ({ from, to }) => to - from + 1 > ONE_YEAR,
    granularity: "Year",
    getLabel: (value) => value,
  },
  {
    test: () => true,
    granularity: "Date",
    getLabel: (value) => value,
  },
];

const isDateRangeOneDay = (dateRange) =>
  dateRange.to - dateRange.from + 1 === 86400;

const fetchVisitors = (ch) => async (dateRange, domain, timezone) => {
  const {
    granularity,
    getLabel,
  } = dateRangeGranularities.find((dateRangeGranularity) =>
    dateRangeGranularity.test(dateRange)
  );
  const sql = `SELECT to${granularity}(timestamp, '${timezone}') AS day, COUNT(DISTINCT user_id) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY day`;

  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [label, total]
      result[getLabel(row[0])] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchVisitors: IS_DEV ? fetchVisitorsDev : fetchVisitors,
};
