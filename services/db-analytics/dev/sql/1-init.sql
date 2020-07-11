CREATE DATABASE IF NOT EXISTS youranalytics;

-- DROP TABLE IF EXISTS youranalytics.events;

CREATE TABLE IF NOT EXISTS youranalytics.events (
  browser_major LowCardinality(String),
  browser_name LowCardinality(String),
  browser_version LowCardinality(String),
  country_code LowCardinality(FixedString(2)),
  device_model LowCardinality(String),
  device_type LowCardinality(String),
  device_vendor LowCardinality(String),
  domain String,
  hostname String,
  name String,
  os_name LowCardinality(String),
  os_version LowCardinality(String),
  path String,
  referrer String,
  screen_size LowCardinality(String),
  session_id UInt64,
  timestamp DateTime,
  user_id UInt64
) ENGINE = MergeTree()
PARTITION BY toYYYYMM(timestamp)
ORDER BY (name, domain, user_id, timestamp)
SETTINGS index_granularity = 8192;