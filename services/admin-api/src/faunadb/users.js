const faunadb = require("faunadb");

const q = faunadb.query;

// prettier-ignore
const createUser = (serverClient) => (user) => serverClient.query(
  q.Create(
    q.Collection("users"),
    {
      data: {...user, sites: {}}
    }
  )
);

const findUser = (serverClient) => async (issuer) => {
  // prettier-ignore
  const response = await serverClient.query(
    q.Paginate(
      q.Match(
        q.Index("user_by_issuer"),
        issuer
      )
    )
  );

  if (response.data.length > 1) {
    const error = new Error(`More than one user found for issuer: ${issur}`);
    console.error(error);
    throw error;
  }

  if (response.data.length === 0) {
    return null;
  }

  // prettier-ignore
  return serverClient.query(
    q.Get(response.data[0])
  );
};

// prettier-ignore
const setLastLoginAt = (serverClient) => (issuer, lastLoginAt) => serverClient.query(
  q.Update(
    q.Select(["data", 0],
      q.Paginate(q.Match(
        q.Index("user_by_issuer"), issuer
      ))
    ),
    {
      data: {
        lastLoginAt
      }
    }
  )
);

// prettier-ignore
const addNewWebsite = (serverClient) => (issuer, url, timezone) => serverClient.query(
  q.Update(
    q.Select(["data", 0],
      q.Paginate(q.Match(
        q.Index("user_by_issuer"), issuer
      ))
    ),
    {
      data: {
        sites: {
          [url]: {
            timezone
          }
        }
      }
    }
  )
);

module.exports = {
  createUser,
  findUser,
  setLastLoginAt,
  addNewWebsite,
};
