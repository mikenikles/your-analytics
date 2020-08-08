const faunadb = require("faunadb");
const { findUser } = require("./users");

const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const users = {
  find: findUser(serverClient),
};

module.exports = {
  users,
};
