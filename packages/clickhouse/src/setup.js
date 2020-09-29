const IS_DEV = process.env.NODE_ENV === "development";

const createDb = (ch, dbName) =>
  ch.querying(`CREATE DATABASE IF NOT EXISTS ${dbName}`);

const createEventsTable = (ch, dbName) =>
  ch.querying(`CREATE TABLE IF NOT EXISTS ${dbName}.events (
  browser_major LowCardinality(String),
  browser_name LowCardinality(String),
  browser_version LowCardinality(String),
  device_model LowCardinality(String),
  device_type LowCardinality(String),
  device_vendor LowCardinality(String),
  domain String,
  geo_city String,
  geo_country LowCardinality(FixedString(2)),
  geo_lat Float64,
  geo_long Float64,
  hostname String,
  name String,
  os_name LowCardinality(String),
  os_version LowCardinality(String),
  path String,
  referrer String,
  screen_size UInt16,
  session_id UInt64,
  timestamp DateTime,
  user_id UInt64
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (name, user_id, timestamp)
SETTINGS index_granularity = 8192;`);

const convertUrlToDbName = (url) => url.replace(/\./g, "__").replace(/-/g, "_");

const addNewWebsiteDev = () => (url) =>
  new Promise((resolve, reject) => {
    console.log(
      "Create new DB with events table. URL: %s; DB name: %s",
      url,
      convertUrlToDbName(url)
    );
    resolve();
  });

const addNewWebsite = (ch) => async (url) => {
  const dbName = convertUrlToDbName(url);
  await createDb(ch, dbName);
  await createEventsTable(ch);
};

module.exports = {
  addNewWebsite: IS_DEV ? addNewWebsiteDev : addNewWebsite,
  convertUrlToDbName,
};
