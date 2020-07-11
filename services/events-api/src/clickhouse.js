const ClickHouse = require("@apla/clickhouse");

const ch = new ClickHouse({
  host: process.env.CH_HOST,
  port: process.env.CH_PORT,
  user: process.env.CH_USER,
  password: process.env.CH_PASSWORD,
});

const recordEvent = (event) =>
  new Promise((resolve, reject) => {
    // console.log("Recording event:", JSON.stringify(event));
    const writableStream = ch.query(
      `INSERT INTO youranalytics.events`,
      {
        format: "JSONEachRow",
        queryOptions: {
          input_format_import_nested_json: 1,
        },
      },
      (err) => {
        err ? reject(err) : resolve();
      }
    );
    writableStream.write({ ...event, timestamp: new Date() });
    writableStream.end();
  });

module.exports = {
  recordEvent,
};
