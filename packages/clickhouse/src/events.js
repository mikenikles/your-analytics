const { convertUrlToDbName } = require("./setup");

const recordEvent = (ch) => (event) =>
  new Promise((resolve, reject) => {
    // console.log("Recording event:", JSON.stringify(event));
    const dbName = convertUrlToDbName(event.domain);
    const writableStream = ch.query(
      `INSERT INTO ${dbName}.events`,
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
