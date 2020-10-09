const getDateRange = (dateRange, timezone) =>
  `toUnixTimestamp(timestamp, '${timezone}') >= toStartOfDay(toDate('${dateRange.from}', '${timezone}'), '${timezone}') AND toUnixTimestamp(timestamp, '${timezone}') < toStartOfDay(addDays(toDate('${dateRange.to}', '${timezone}'), 1), '${timezone}')`;

module.exports = {
  getDateRange,
};
