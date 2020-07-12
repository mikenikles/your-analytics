const cors = require("cors");
const express = require("express");
const jwks = require("jwks-rsa");
const jwt = require("express-jwt");

const { fetchVisitors } = require("./clickhouse");

const app = express();
const port = process.env.PORT || 8081;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 60,
    jwksUri: "https://your-analytics.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://events-api.your-analytics.org/",
  issuer: "https://your-analytics.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(cors());

app.use(jwtCheck);
app.use((error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    next();
  }
});

app.get("/visitors", async (req, res) => {
  try {
    // TODO
    // - Load database query parameters based on who called this endpoint
    console.log("Auth user", req.user);

    const visitors = await fetchVisitors();
    res.json(visitors);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
