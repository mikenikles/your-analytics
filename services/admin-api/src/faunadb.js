const faunadb = require("faunadb");
const q = faunadb.query;
const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

// prettier-ignore
const createUser = (user) => serverClient.query(
  q.Create(
    q.Collection("users"),
    {
      data: user
    }
  )
);

// prettier-ignore
const findUser = (issuer) => serverClient.query(
  q.Paginate(
    q.Match(
      q.Index("user_by_issuer"),
      issuer
    )
  )
);

// prettier-ignore
const setLastLoginAt = (issuer, lastLoginAt) => serverClient.query(
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
