const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchOsDev = () => () => devData;

const fetchOs = (ch) => async (dateRange, domain, timezone) => {
  const sql = `SELECT os_name, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY os_name ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [os_name, total]
      result[row[0]] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchOs: IS_DEV ? fetchOsDev : fetchOs,
};
