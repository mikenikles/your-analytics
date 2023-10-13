const faunadb = require("faunadb");

const q = faunadb.query;

const createByIssuerAndRoleIndex = (websiteClient) => () =>
  websiteClient.query(
    q.CreateIndex({
      name: "people_by_issuer_and_role",
      unique: false,
      serialized: true,
      source: q.Collection("people"),
      terms: [
        {
          field: ["data", "issuer"],
        },
        {
          field: ["data", "role"],
        },
      ],
    })
  );

const hasRole = (websiteClient) => async (issuer, role) => {
  try {
    const response = await websiteClient.query(
      q.Paginate(q.Match(q.Index("people_by_issuer_and_role"), issuer, role))
    );
    return response.data.length === 1;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const insertPerson = (websiteClient) => (data) =>
  websiteClient.query(
    q.Insert(q.Ref(q.Collection("people"), "1"), 1, "create", {
      data,
    })
  );

module.exports = {
  createByIssuerAndRoleIndex,
  hasRole,
  insertPerson,
};
