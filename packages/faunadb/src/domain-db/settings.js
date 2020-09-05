const faunadb = require("faunadb");

const q = faunadb.query;

const insertSettings = (websiteClient) => (data) =>
  websiteClient.query(
    q.Insert(q.Ref(q.Collection("settings"), "1"), 1, "create", {
      data,
    })
  );

const getSettings = (websiteClient) => () =>
  websiteClient.query(q.Get(q.Ref(q.Collection("settings"), "1")));

const getVisibility = (adminClient) => (url) =>
  adminClient.query(
    q.Get(q.Ref(q.Collection("settings", q.Database(url)), "1"))
  );

const setVisibility = (websiteClient) => (visibility) =>
  websiteClient.query(
    q.Update(q.Ref(q.Collection("settings"), "1"), {
      data: {
        visibility,
      },
    })
  );

module.exports = {
  insertSettings,
  getSettings,
  getVisibility,
  setVisibility,
};
