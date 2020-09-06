const cors = require("cors");
const express = require("express");
const passport = require("passport");
const { magic } = require("./middlewares");
const { user, website } = require("./routes");

const app = express();
const port = process.env.PORT || 8082;

process.env.NODE_ENV === "development" &&
  app.use(
    cors({
      origin: /\.gitpod.io/,
    })
  );

app.use(express.json());
app.use(passport.initialize());
passport.use(magic);

const authenticate = passport.authenticate("magic", { session: false });

app.get("/", async (req, res) => {
  res.status(200).end();
});

app.use("/user", user(authenticate));
app.use("/website", website(authenticate));

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
