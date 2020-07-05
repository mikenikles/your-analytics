const ClickHouse = require('@apla/clickhouse');

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD
});

const recordEvent = (event) => new Promise((resolve, reject) => {
  const writableStream = ch.query(`INSERT INTO youranalytics.events`, { format: 'JSONEachRow' }, (err) => {
    if (err) {
      reject(err);
    } else {
      console.log('Event recorded!');
      resolve();
    }
  });
  writableStream.write({ ...event, timestamp: new Date() });
  writableStream.end();
});

module.exports = {
  recordEvent
};
