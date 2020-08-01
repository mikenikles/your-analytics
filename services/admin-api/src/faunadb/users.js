const faunadb = require("faunadb");

const q = faunadb.query;

// prettier-ignore
const createUser = (serverClient) => (user) => serverClient.query(
  q.Create(
    q.Collection("users"),
    {
      data: user
    }
  )
);

// prettier-ignore
const findUser = (serverClient) => (issuer) => serverClient.query(
  q.Paginate(
    q.Match(
      q.Index("user_by_issuer"),
      issuer
    )
  )
);

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

module.exports = {
  createUser,
  findUser,
  setLastLoginAt,
};
