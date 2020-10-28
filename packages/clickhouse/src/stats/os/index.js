const { getDateRange } = require("../fragments");

const fetchOs = (ch) => async (dateRange, domain, websiteSettings) => {
  const { chDbName, timezone } = websiteSettings;
  const sql = `SELECT COALESCE(NULLIF(os_name, ''), 'Unknown') AS os, COUNT(*) AS total FROM ${chDbName}.events WHERE ${getDateRange(
    dateRange,
    timezone
  )} AND domain = '${domain}' GROUP BY os ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [os, total]
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
