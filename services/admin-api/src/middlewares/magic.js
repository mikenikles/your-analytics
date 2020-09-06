const { Magic } = require("@magic-sdk/admin");
const { rootDb } = require("@your-analytics/faunadb");
const MagicStrategy = require("passport-magic").Strategy;
const passport = require("passport");

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const signup = async (user, userMetadata, done) => {
  let newUser = {
    issuer: user.issuer,
    email: userMetadata.email,
    lastLoginAt: user.claim.iat,
  };
  await rootDb.users.create(newUser);
  return done(null, newUser);
};

const login = async (user, done) => {
  // Replay attack protection (https://go.magic.link/replay-attack)
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}}.`,
    });
  }
  await rootDb.users.setLastLoginAt(user.issuer, user.claim.iat);
  return done(null, user);
};

const strategy = new MagicStrategy(async function (user, done) {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);

  const dbUser = await rootDb.users.find(user.issuer);
  return dbUser ? login(user, done) : signup(user, userMetadata, done);
});

module.exports = strategy;
