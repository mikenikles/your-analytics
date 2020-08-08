const faunadb = require("faunadb");

const q = faunadb.query;

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
    const error = new Error(`More than one user found for issuer: ${issuer}`);
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

module.exports = {
  findUser,
};
