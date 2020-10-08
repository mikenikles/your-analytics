const crypto = require("crypto");
const faunadb = require("faunadb");

const q = faunadb.query;

const prepareUserForPublic = async (user) => {
  const { firstName, email, issuer, sites } = user;
  return {
    sites: Object.keys(sites).reduce((result, site) => {
      result[site] = {};
      // Extend the empty object with site values that are meant to be public
      return result;
    }, {}),
    issuer,
    firstName,
    email,
    emailHash: crypto.createHash("md5").update(email).digest("hex"),
  };
};

const createUser = (serverClient) => (user) =>
  serverClient.query(
    q.Create(q.Collection("users"), {
      data: { ...user, sites: {} },
    })
  );

const deleteUser = (serverClient) => (issuer) =>
  serverClient.query(
    q.Delete(q.Select("ref", q.Get(q.Match(q.Index("user_by_issuer"), issuer))))
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

  const user = await serverClient.query(q.Get(response.data[0]));
  if (!user) {
    return null;
  }

  return prepareUserForPublic(user.data);
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

const getDomainServerKeySecret = (serverClient) => async (issuer, domain) => {
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

  const user = await serverClient.query(q.Get(response.data[0]));
  if (!user) {
    return null;
  }

  if (!user.data.sites) {
    return null;
  }

  if (!user.data.sites[domain]) {
    return null;
  }

  return user.data.sites[domain].serverKeySecret;
};

module.exports = {
  createUser,
  deleteUser,
  findUser,
  setFirstName,
  setLastLoginAt,
  addNewWebsiteServerKey,
  getDomainServerKeySecret,
};
