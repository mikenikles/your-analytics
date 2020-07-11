const express = require("express");

const { fetchVisitors } = require("./clickhouse");

const app = express();
const port = process.env.PORT || 8081;

app.get("/visitors", async (req, res) => {
  try {
    // TODO
    // - Validate JWT
    // - Load database query parameters based on who called this endpoint
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