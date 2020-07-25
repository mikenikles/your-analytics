const IS_DEV = process.env.NODE_ENV === "development";

const fetchTotalPageviewsDev = () => () => 21;

const fetchTotalPageviews = (ch) => async (dateRange) => {
  const timezone = "Europe/London";
  const sql = `SELECT COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to}`;

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
  fetchTotalPageviews: IS_DEV ? fetchTotalPageviewsDev : fetchTotalPageviews,
};
