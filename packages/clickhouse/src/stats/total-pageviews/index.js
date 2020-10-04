const fetchTotalPageviews = (ch) => async (
  dateRange,
  domain,
  websiteSettings
) => {
  const { chDbName, timezone } = websiteSettings;
  const sql = `SELECT COUNT(*) AS total FROM ${chDbName}.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}'`;

  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    let result = 0;
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [total]
      result = row[0] * 1;
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchTotalPageviews,
};
