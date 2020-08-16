const faunadb = require("faunadb");
const { findUser } = require("./users");
const { getSettings } = require("./websites");

const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const users = {
  find: findUser(serverClient),
};

const websites = {
  getSettings: (websiteServerKeySecret) =>
    getSettings(
      new faunadb.Client({
        secret: websiteServerKeySecret,
      })
    ),
};

module.exports = {
  users,
  websites,
};
