const faunadb = require("faunadb");

const q = faunadb.query;

// prettier-ignore
const getSettings = (websiteClient) => () => websiteClient.query(
  q.Get(q.Ref(q.Collection("settings"), "1"))
);

// prettier-ignore
const getSettingsPublic = (adminClient) => (url) => adminClient.query(
  q.Get(q.Ref(q.Collection("settings", q.Database(url)), "1"))
);

// prettier-ignore
const getVisibility = (adminClient) => (url) => adminClient.query(
  q.Get(q.Ref(q.Collection("settings", q.Database(url)), "1"))
);

module.exports = {
  getSettings,
  getSettingsPublic,
  getVisibility,
};
