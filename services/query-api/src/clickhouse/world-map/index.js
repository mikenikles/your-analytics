const devData = require("./dev-data.json");
const countryCodeToNameMap = require("./code-name-map.json");

const IS_DEV = process.env.NODE_ENV === "development";

const getCountryNameByCode = (code) =>
  countryCodeToNameMap[code] ? countryCodeToNameMap[code] : code;

const fetchWorldMapDev = () => () =>
  Object.entries(devData).reduce((result, [code, total]) => {
    result[getCountryNameByCode(code)] = total;
    return result;
  }, {});

const fetchWorldMap = (ch) => async (dateRange, domain, timezone) => {
  const sql = `SELECT geo_country, COUNT(*) AS total FROM youranalytics.events WHERE toUnixTimestamp(timestamp, '${timezone}') >= ${dateRange.from} AND toUnixTimestamp(timestamp, '${timezone}') <= ${dateRange.to} AND domain = '${domain}' GROUP BY geo_country ORDER BY total DESC`;
  const stream = ch.query(sql);

  return new Promise((resolve, reject) => {
    const result = {};
    stream.on("error", (error) => reject(error));

    stream.on("data", (row) => {
      // row: [geo_country, total]
      const countryName = countryCodeToNameMap[row[0]]
        ? countryCodeToNameMap[row[0]]
        : row[0];
      result[countryName] = parseInt(row[1], 10);
    });

    stream.on("end", () => {
      resolve(result);
    });
  });
};

module.exports = {
  fetchWorldMap: IS_DEV ? fetchWorldMapDev : fetchWorldMap,
};
