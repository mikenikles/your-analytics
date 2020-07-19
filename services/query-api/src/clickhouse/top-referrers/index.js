const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchTopReferrersDev = () => () => devData;

const fetchTopReferrers = (ch) => async (dateRange) => {
  const timezone = "Europe/London";
  const sql = `SELECT extract(referrer, '^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)') AS referrer_domain, COUNT(*) AS total FROM youranalytics.events WHERE referrer != '' AND toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} GROUP BY referrer_domain ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [referrer_domain, total]
      result[row[0]] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchTopReferrers: IS_DEV ? fetchTopReferrersDev : fetchTopReferrers,
};
