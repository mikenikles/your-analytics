const cors = require("cors");
const crypto = require("crypto");
const express = require("express");
const { users, websites } = require("./faunadb");

const app = express();
process.env.NODE_ENV === "development" &&
  app.use(
    cors({
      origin: /\.gitpod.io/,
    })
  );
const port = process.env.PORT || 8082;

const { Magic } = require("@magic-sdk/admin");
const magic = new Magic(process.env.MAGIC_SECRET_KEY);
const passport = require("passport");
const MagicStrategy = require("passport-magic").Strategy;

const strategy = new MagicStrategy(async function (user, done) {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer);

  const dbUser = await users.find(user.issuer);
  return dbUser ? login(user, done) : signup(user, userMetadata, done);
});

app.use(express.json());
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
  const dbUser = await users.find(req.user.issuer);
  if (dbUser) {
    const { firstName, email, sites } = dbUser.data;
    return res
      .status(200)
      .json({
        sites,
        firstName,
        email,
        emailHash: crypto
          .createHash("md5")
          .update(dbUser.data.email)
          .digest("hex"),
      })
      .end();
  }
  return res.status(404).end();
});

app.post("/websites", authenticate, async (req, res) => {
  try {
    if (req.body.firstName) {
      await users.setFirstName(req.body.firstName);
    }
    await websites.addNewWebsite(req.body.url);
    const {
      secret: websiteServerKeySecret,
    } = await websites.createWebsiteServerKey(req.body.url);
    await users.addNewWebsiteServerKey(req.user.issuer, {
      sites: {
        [req.body.url]: {
          serverKeySecret: websiteServerKeySecret,
        },
      },
    });
    await websites.createCollection(websiteServerKeySecret)("settings");
    await websites.insertSettings(websiteServerKeySecret)({
      timezone: req.body.timezone,
      visibility: "private",
    });

    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

app.get("/site-visibility", async (req, res) => {
  try {
    const { data } = await websites.getVisibility(req.query.site);
    return res.status(200).json({ visibility: data.visibility });
  } catch (error) {
    console.error(error);
    // To prevent bad actors from scanning the database for URLs to see whether
    // they are configured in our database or not. Returning a 500 error would indicate
    // the req.query.url value does not exist in our database; returning visibility: private
    // gives the impression the URL is configured, even if it may not be.
    return res.status(200).json({ visibility: "private" });
  }
});

app.post("/beta-email", async (req, res) => {
  try {
    // This triggers Google Cloud's Error Reporting. Email addresses
    // can be filtered in the logs, exported and used to notify when
    // the project is ready.
    console.error(new Error(`New beta email: ${req.query.email}`));
    return res.status(201).end();
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
});

app.get("/", async (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`admin-api started at http://localhost:${port}`);
});
