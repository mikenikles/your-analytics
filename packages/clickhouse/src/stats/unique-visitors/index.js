const IS_DEV = process.env.NODE_ENV === "development";

const fetchUniqueVisitorsDev = () => () => 14233;

const fetchUniqueVisitors = (ch) => async (
  dateRange,
  domain,
  websiteSettings
) => {
  const { timezone } = websiteSettings;
  const sql = `SELECT COUNT(DISTINCT user_id) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}'`;

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
  fetchUniqueVisitors: IS_DEV ? fetchUniqueVisitorsDev : fetchUniqueVisitors,
};
