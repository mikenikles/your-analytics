const { getDateRange } = require("../fragments");

const fetchScreen = (ch) => async (dateRange, domain, websiteSettings) => {
  const { chDbName, timezone } = websiteSettings;
  const sql = `SELECT screen_size, COUNT(*) AS total FROM ${chDbName}.events WHERE ${getDateRange(
    dateRange,
    timezone
  )} AND domain = '${domain}' GROUP BY screen_size ORDER BY total DESC`;
  const stream = ch.query(sql);
  return new Promise((resolve, reject) => {
    const result = {
      mobile: 0,
      tablet: 0,
      laptop: 0,
      desktop: 0,
    };
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [screen_size, total]

      // TODO: Can this be done in SQL?
      if (row[0] <= 640) {
        result.mobile += row[1] * 1;
      } else if (row[0] <= 768) {
        result.tablet += row[1] * 1;
      } else if (row[0] <= 1024) {
        result.laptop += row[1] * 1;
      } else {
        result.desktop += row[1] * 1;
      }
    });

    stream.on("end", () => {
      const sorted = [];
      for (let screenCategory in result) {
        sorted.push([screenCategory, result[screenCategory]]);
      }
      sorted.sort((a, b) => b[1] - a[1]);
      resolve(sorted);
    });
  });
};

module.exports = {
  fetchScreen,
};
