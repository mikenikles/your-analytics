const { formatISO } = require("date-fns");

const getDateRange = (dateRange, timezone) =>
  `toDateTime(timestamp, '${timezone}') >= toStartOfDay(toDate('${formatISO(
    dateRange.from,
    { representation: "date" }
  )}', '${timezone}'), '${timezone}') AND toDateTime(timestamp, '${timezone}') < toStartOfDay(addDays(toDate('${formatISO(
    dateRange.to,
    { representation: "date" }
  )}', '${timezone}'), 1), '${timezone}')`;

module.exports = {
  getDateRange,
};
