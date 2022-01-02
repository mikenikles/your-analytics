const faunadb = require("faunadb");

const {
  addNewWebsite,
  createCollection,
  createWebsiteServerKey,
  deleteWebsite,
} = require("./admin");

const {
  createByIssuerAndRoleIndex,
  hasRole,
  insertPerson,
} = require("./people");

const {
  getSettings,
  getSettingsPublic,
  getVisibility,
  insertSettings,
  setVisibility,
} = require("./settings");

module.exports = (adminClient) => ({
  admin: {
    addNewWebsite: addNewWebsite(adminClient),
    createCollection: (websiteServerKeySecret) =>
      createCollection(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
    createWebsiteServerKey: createWebsiteServerKey(adminClient),
    deleteWebsite: deleteWebsite(adminClient),
  },
  people: {
    createByIssuerAndRoleIndex: (websiteServerKeySecret) =>
      createByIssuerAndRoleIndex(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
    hasRole: (websiteServerKeySecret) =>
      hasRole(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
    insertPerson: (websiteServerKeySecret) =>
      insertPerson(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
  },
  settings: {
    getSettings: (websiteServerKeySecret) =>
      getSettings(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
    getSettingsPublic: getSettingsPublic(adminClient),
    getVisibility: getVisibility(adminClient),
    insertSettings: (websiteServerKeySecret) =>
      insertSettings(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
    setVisibility: (websiteServerKeySecret) =>
      setVisibility(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
  },
});
