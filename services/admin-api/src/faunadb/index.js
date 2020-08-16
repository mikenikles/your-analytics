const faunadb = require("faunadb");
const {
  createUser,
  findUser,
  setFirstName,
  setLastLoginAt,
  addNewWebsiteServerKey,
} = require("./users");
const {
  addNewWebsite,
  createCollection,
  createWebsiteServerKey,
  insertSettings,
  getVisibility,
} = require("./websites");

const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
});

const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const users = {
  create: createUser(serverClient),
  find: findUser(serverClient),
  setFirstName: setFirstName(serverClient),
  setLastLoginAt: setLastLoginAt(serverClient),
  addNewWebsiteServerKey: addNewWebsiteServerKey(serverClient),
};

const websites = {
  addNewWebsite: addNewWebsite(adminClient),
  createCollection: (websiteServerKeySecret) =>
    createCollection(
      new faunadb.Client({
        secret: websiteServerKeySecret,
      })
    ),
  createWebsiteServerKey: createWebsiteServerKey(adminClient),
  insertSettings: (websiteServerKeySecret) =>
    insertSettings(
      new faunadb.Client({
        secret: websiteServerKeySecret,
      })
    ),
  getVisibility: getVisibility(adminClient),
};

module.exports = {
  users,
  websites,
};
