const { convertUrlToDbName } = require("./setup");

const deleteDb = (ch, dbName) =>
  ch.querying(`DROP DATABASE IF EXISTS ${dbName}`);

const deleteWebsite = (ch) => async (url) => {
  const dbName = convertUrlToDbName(url);
  await deleteDb(ch, dbName);
};

module.exports = {
  deleteWebsite,
};
