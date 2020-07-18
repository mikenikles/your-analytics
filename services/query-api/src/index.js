const { Magic } = require("@magic-sdk/admin");
const cors = require("cors");
const express = require("express");

const { fetchVisitors } = require("./clickhouse");

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const app = express();
app.use(
  cors({
    credentials: true,
    origin:
      "https://3000-fe64c5f9-d995-4313-b604-3351faf8883a.ws-eu01.gitpod.io",
  })
);
const port = process.env.PORT || 8081;

const isAuthenticated = async (req, res, next) => {
  const token = magic.utils.parseAuthorizationHeader(req.headers.authorization);
  try {
    magic.token.validate(token);
    req.user = await magic.users.getMetadataByToken(token);
    next();
  } catch (error) {
    res.status(401).end();
  }
};

app.get("/visitors", isAuthenticated, async (req, res) => {
  try {
    // TODO
    // - Load database query parameters based on who called this endpoint

    const visitors = await fetchVisitors();
    res.json({ visitors });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
