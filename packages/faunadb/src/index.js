const faunadb = require("faunadb");

const domainDb = require("./domain-db");
const root = require("./root");

const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

module.exports = {
  rootDb: root(serverClient),
  domainDb: domainDb(adminClient),
};
