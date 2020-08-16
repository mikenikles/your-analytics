const faunadb = require("faunadb");

const q = faunadb.query;

// prettier-ignore
const addNewWebsite = (adminClient) => (url) => adminClient.query(
  q.CreateDatabase({
    name: url
  })
);

// prettier-ignore
const createCollection = (websiteClient) => (name) => websiteClient.query(
  q.CreateCollection({
    name
  })
);

// prettier-ignore
const createWebsiteServerKey = (adminClient) => (url) => adminClient.query(
  q.CreateKey({
    database: q.Database(url),
    role: "server"
  })
);

const insertSettings = (websiteClient) => (data) =>
  websiteClient.query(
    q.Insert(q.Ref(q.Collection("settings"), "1"), 1, "create", {
      data,
    })
  );

const getVisibility = (adminClient) => (url) =>
  adminClient.query(
    q.Get(q.Ref(q.Collection("settings", q.Database(url)), "1"))
  );

module.exports = {
  addNewWebsite,
  createCollection,
  createWebsiteServerKey,
  insertSettings,
  getVisibility,
};
