const IS_DEV = process.env.NODE_ENV === "development";

const fetchUniqueVisitorsDev = () => () => 14;

const fetchUniqueVisitors = (ch) => async (dateRange, domain) => {
  const timezone = "Europe/London";
  const sql = `SELECT COUNT(DISTINCT user_id) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}'`;

  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    let result = 0;
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [total]
      result = row[0];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchUniqueVisitors: IS_DEV ? fetchUniqueVisitorsDev : fetchUniqueVisitors,
};