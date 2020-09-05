const faunadb = require("faunadb");

const {
  addNewWebsite,
  createCollection,
  createWebsiteServerKey,
} = require("./admin");

const {
  getSettings,
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
  },
  settings: {
    getSettings: (websiteServerKeySecret) =>
      getSettings(
        new faunadb.Client({
          secret: websiteServerKeySecret,
        })
      ),
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
