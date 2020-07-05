const ClickHouse = require('@apla/clickhouse');

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD
});

const recordEvent = (event) => {
  const writableStream = ch.query(`INSERT INTO your-analytics.events FORMAT TSV`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Event recorded!');
  });

  // data will be formatted for you
  writableStream.write([
    new Date(), // timestamp DateTime
    event.name, // name String,
    event.domain, // domain String,
    event.user_id, // user_id UInt64,
    event.session_id, // session_id UInt64,
    event.hostname, // hostname String,
    event.path, // path String,
    event.referrer, // referrer String,
    event.country_code, // country_code LowCardinality(FixedString(2)),
    event.screen_size, // screen_size LowCardinality(String),
    event.operating_system, // operating_system LowCardinality(String),
    event.browser, // browser LowCardinality(String)
  ]);

  writableStream.end();
};

module.exports = {
  recordEvent
};
