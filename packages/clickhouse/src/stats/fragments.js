const getDateRange = (dateRange, timezone) =>
  `toDateTime(timestamp, '${timezone}') >= toStartOfDay(toDate('${dateRange.from}', '${timezone}'), '${timezone}') AND toDateTime(timestamp, '${timezone}') < toStartOfDay(addDays(toDate('${dateRange.to}', '${timezone}'), 1), '${timezone}')`;

module.exports = {
  getDateRange,
};
