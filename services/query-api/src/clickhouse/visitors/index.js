const devData = require("./dev-data.json");

const IS_DEV = process.env.NODE_ENV === "development";

const fetchVisitorsDev = () => () => devData;

const fetchVisitors = (ch) => async () => {
  console.log(process.env.NODE_ENV);
  const sql = `SELECT toDate(timestamp) AS day, COUNT(*) AS total FROM youranalytics.events GROUP BY day`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [day, total]
      result[row[0]] = row[1];
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchVisitors: IS_DEV ? fetchVisitorsDev : fetchVisitors,
};
