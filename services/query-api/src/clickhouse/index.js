const ClickHouse = require('@apla/clickhouse');

const { fetchVisitors } = require("./visitors");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD
});

module.exports = {
  fetchVisitors: fetchVisitors(ch)
}