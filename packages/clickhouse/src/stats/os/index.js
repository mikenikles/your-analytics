const fetchOs = (ch) => async (dateRange, domain, websiteSettings) => {
  const { chDbName, timezone } = websiteSettings;
  const sql = `SELECT os_name, COUNT(*) AS total FROM ${chDbName}.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY os_name ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [os_name, total]
      result[row[0]] = row[1] * 1;
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchOs,
};
