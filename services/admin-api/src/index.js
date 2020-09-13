const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const passport = require("passport");
const passportCookie = require("passport-cookie");
const jwt = require("jsonwebtoken");
const { magic } = require("./middlewares");
const { user, website } = require("./routes");

const app = express();
const port = process.env.PORT || 8082;

process.env.NODE_ENV === "development" &&
  app.use(
    cors({
      credentials: true,
      origin: /\.gitpod.io/,
    })
  );

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

app.use("/user", user(authenticateMagic, authenticateJwtCookieCombo));
app.use("/website", website(authenticateJwtCookieCombo));

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

app.listen(port, () => {
  console.log(`admin-api started at http://localhost:${port}`);
});
