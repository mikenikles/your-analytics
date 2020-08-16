const faunadb = require("faunadb");

const q = faunadb.query;

// prettier-ignore
const getSettings = (websiteClient) => () => websiteClient.query(
  q.Get(q.Ref(q.Collection("settings"), "1"))
);

module.exports = {
  getSettings,
};
