const faunadb = require("faunadb");

const q = faunadb.query;

const createUser = (serverClient) => (user) =>
  serverClient.query(
    q.Create(q.Collection("users"), {
      data: { ...user, sites: {} },
    })
  );

const findUser = (serverClient) => async (issuer) => {
  const response = await serverClient.query(
    q.Paginate(q.Match(q.Index("user_by_issuer"), issuer))
  );

  if (response.data.length > 1) {
    const error = new Error(`More than one user found for issuer: ${issuer}`);
    console.error(error);
    throw error;
  }

  if (response.data.length === 0) {
    return null;
  }

  return serverClient.query(q.Get(response.data[0]));
};

const setFirstName = (serverClient) => (issuer, firstName) =>
  serverClient.query(
    q.Update(
      q.Select(
        ["data", 0],
        q.Paginate(q.Match(q.Index("user_by_issuer"), issuer))
      ),
      {
        data: {
          firstName,
        },
      }
    )
  );

const setLastLoginAt = (serverClient) => (issuer, lastLoginAt) =>
  serverClient.query(
    q.Update(
      q.Select(
        ["data", 0],
        q.Paginate(q.Match(q.Index("user_by_issuer"), issuer))
      ),
      {
        data: {
          lastLoginAt,
        },
      }
    )
  );

const addNewWebsiteServerKey = (serverClient) => (issuer, data) =>
  serverClient.query(
    q.Update(
      q.Select(
        ["data", 0],
        q.Paginate(q.Match(q.Index("user_by_issuer"), issuer))
      ),
      {
        data,
      }
    )
  );

module.exports = {
  createUser,
  findUser,
  setFirstName,
  setLastLoginAt,
  addNewWebsiteServerKey,
};
