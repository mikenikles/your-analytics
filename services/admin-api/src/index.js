const express = require("express");

const app = express();
const port = process.env.PORT || 8082;

app.get("/", async (req, res) => {
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
