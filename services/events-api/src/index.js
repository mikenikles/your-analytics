const express = require("express");
const userAgentParser = require('ua-parser-js');
const urlParse = require("url-parse");

const { recordEvent } = require("./clickhouse");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json({
  type: "text/plain"
}));

app.post("/", async (req, res) => {
  const {
    domain,
    name,
    referrer,
    screen_size,
    url,
  } = req.body;

  const userAgent = userAgentParser(req.get("user-agent"));
  const urlParsed = urlParse(url, true);

  try {
    const event = {
      browser: [
        userAgent.browser.name,
        userAgent.browser.version,
        userAgent.browser.major
      ],
      country_code: "",
      device: [
        userAgent.device.vendor,
        userAgent.device.model,
        userAgent.device.type
      ],
      domain,
      hostname: urlParsed.hostname,
      name,
      os: [
        userAgent.os.name,
        userAgent.os.version
      ],
      path: urlParsed.pathname,
      referrer,
      screen_size,
      session_id: 0,
      user_id: 0,
    };

    await recordEvent(event);
  } catch (error) {
    console.error(error)
  } finally {
    res.status(201).end();
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});