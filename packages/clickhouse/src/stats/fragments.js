const { formatISO } = require("date-fns");

const formatISODate = (date) => formatISO(date, { representation: "date" });

const getDateRange = (dateRange, timezone) =>
  `toDateTime(timestamp, '${timezone}') >= toStartOfDay(toDate('${formatISODate(
    dateRange.from
  )}', '${timezone}'), '${timezone}') AND toDateTime(timestamp, '${timezone}') < toStartOfDay(addDays(toDate('${formatISODate(
    dateRange.to
  )}', '${timezone}'), 1), '${timezone}')`;

module.exports = {
  getDateRange,
};
