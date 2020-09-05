const faunadb = require("faunadb");

const q = faunadb.query;

const addNewWebsite = (adminClient) => (url) =>
  adminClient.query(
    q.CreateDatabase({
      name: url,
    })
  );

const createCollection = (websiteClient) => (name) =>
  websiteClient.query(
    q.CreateCollection({
      name,
    })
  );

const createWebsiteServerKey = (adminClient) => (url) =>
  adminClient.query(
    q.CreateKey({
      database: q.Database(url),
      role: "server",
    })
  );

module.exports = {
  addNewWebsite,
  createCollection,
  createWebsiteServerKey,
};
