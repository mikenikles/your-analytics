const faunadb = require("faunadb");
const { createUser, findUser, setLastLoginAt } = require("./users");

const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const users = {
  create: createUser(serverClient),
  find: findUser(serverClient),
  setLastLoginAt: setLastLoginAt(serverClient),
};

module.exports = {
  users,
};
