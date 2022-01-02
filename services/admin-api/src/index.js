const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const passportCookie = require("passport-cookie");
const jwt = require("jsonwebtoken");
const { magic } = require("./middlewares");
const { settings, user, website } = require("./routes");
const tests = require("./routes/tests");

const app = express();
const port = process.env.PORT || 8082;

process.env.NODE_ENV === "development" &&
  app.use(
    cors({
      credentials: true,
      origin: /\.gitpod.io/,
    })
  );

app.use(helmet());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
passport.use(magic);
passport.use(
  new passportCookie.Strategy(
    {
      cookieName: "jwt",
      signed: true,
    },
    (token, done) => {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      return done(null, payload.user);
    }
  )
);
app.use(passport.initialize());

const authenticateMagic = passport.authenticate("magic", { session: false });
const authenticateJwtCookieCombo = passport.authenticate("cookie", {
  session: false,
});

app.get("/", async (req, res) => {
  res.status(200).end();
});

app.use("/settings", settings(authenticateJwtCookieCombo));
app.use("/user", user(authenticateMagic, authenticateJwtCookieCombo));
app.use("/website", website(authenticateJwtCookieCombo));

if (process.env.NODE_ENV === "development") {
  console.log("[TESTS] Adding a /tests API endpoint.");
  app.use("/tests", tests);
}

app.listen(port, () => {
  console.log(`admin-api started at http://localhost:${port}`);
});
