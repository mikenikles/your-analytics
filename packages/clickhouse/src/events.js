const { convertUrlToDbName } = require("./setup");

const insertBuffers = {};
let flushIntervalId;

const recordEvent = (ch) => (event) => {
  if (!insertBuffers[event.domain]) {
    insertBuffers[event.domain] = [];
  }
  insertBuffers[event.domain].push(event);

  if (!flushIntervalId) {
    const flushBuffer = () => {
      Object.entries(insertBuffers).forEach(([domain, events]) => {
        if (events.length > 0) {
          console.log(`Flushing ${events.length} events for domain ${domain}`);
        }
        const dbName = convertUrlToDbName(domain);
        const writableStream = ch.query(
          `INSERT INTO ${dbName}.events`,
          {
            format: "JSONEachRow",
            queryOptions: {
              input_format_import_nested_json: 1,
            },
          },
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );

        while (events.length > 0) {
          writableStream.write(events.shift());
        }
        writableStream.end();
      });
    };
    // TODO: Clean this up. Flush also when there are 10k events.
    // TODO: Consider intervals for individual domains and randomizing the delay
    //       to spread DB writes over a few seconds.
    flushIntervalId = setInterval(flushBuffer, 5000);
  }
};

module.exports = {
  recordEvent,
};
