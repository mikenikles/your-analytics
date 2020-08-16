const faunadb = require("faunadb");
const { findUser } = require("./users");
const { getSettings, getSettingsPublic, getVisibility } = require("./websites");

const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

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
  getSettingsPublic: getSettingsPublic(adminClient),
  getVisibility: getVisibility(adminClient),
};

module.exports = {
  users,
  websites,
};
