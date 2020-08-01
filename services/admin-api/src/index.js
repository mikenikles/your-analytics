const cors = require("cors");
const express = require("express");
const { users } = require("./faunadb");

const app = express();
app.use(
  cors({
    origin: [
      /mikenikles\.vercel\.app$/,
      /your-analytics\.vercel\.app$/,
      /your-analytics\.org$/,
      process.env.FRONTEND_HOST,
    ],
  })
);
const port = process.env.PORT || 8082;

const { Magic } = require("@magic-sdk/admin");
const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const passport = require("passport");
const MagicStrategy = require("passport-magic").Strategy;

const strategy = new MagicStrategy(async function (user, done) {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);
  const existingUser = (await users.find(user.issuer)).data.length === 1;
  return existingUser ? login(user, done) : signup(user, userMetadata, done);
});

app.use(passport.initialize());
passport.use(strategy);

const signup = async (user, userMetadata, done) => {
  let newUser = {
    issuer: user.issuer,
    email: userMetadata.email,
    lastLoginAt: user.claim.iat,
  };
  await users.create(newUser);
  return done(null, newUser);
};

const login = async (user, done) => {
  // Replay attack protection (https://go.magic.link/replay-attack)
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}}.`,
    });
  }
  await users.setLastLoginAt(user.issuer, user.claim.iat);
  return done(null, user);
};

const authenticate = passport.authenticate("magic", { session: false });

app.post("/user/login", authenticate, (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    return res.status(401).end("Could not log user in.");
  }
});

app.post("/user/logout", authenticate, async (req, res) => {
  await magic.users.logoutByIssuer(req.user.issuer);
  req.logout();
  return res.status(200).end();
});

app.get("/user", authenticate, async (req, res) => {
  res.status(200).json(req.user).end();
});

app.get("/", async (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
