const express = require("express");
const { recordEvent } = require("./clickhouse");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.post("/", async (req, res) => {
  const {
    name,
    domain,
    user_id,
    session_id,
    hostname,
    path,
    referrer,
    country_code,
    screen_size,
    operating_system,
    browser
  } = req.body;

  try {
    await recordEvent({
      name,
      domain,
      user_id,
      session_id,
      hostname,
      path,
      referrer,
      country_code,
      screen_size,
      operating_system,
      browser
    });
  } catch (error) {
    console.error(error)
  }
  res.status(201).end();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});