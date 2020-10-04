const fetchTopReferrers = (ch) => async (
  dateRange,
  domain,
  websiteSettings
) => {
  const { chDbName, timezone } = websiteSettings;
  const sql = `SELECT extract(referrer, '^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)') AS referrer_domain, COUNT(*) AS total FROM ${chDbName}.events WHERE referrer != '' AND toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY referrer_domain ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [referrer_domain, total]
      result[row[0]] = row[1] * 1;
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchTopReferrers,
};
