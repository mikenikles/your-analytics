const express = require("express");
const userAgentParser = require("ua-parser-js");
const urlParse = require("url-parse");
const Geo2IpReader = require("@maxmind/geoip2-node").Reader;
const { recordEvent } = require("@your-analytics/clickhouse");

/**
 * @see https://github.com/darkskyapp/string-hash/blob/master/index.js
 */
const hash = (str) => {
  let result = 5381;
  let i = str.length;

  while (i) {
    result = (result * 33) ^ str.charCodeAt(--i);
  }

  return result >>> 0;
};

const logDetailsIfUserAgentCannotBeParsed = (
  userAgentHeader,
  { browser, device, os }
) => {
  if (!(browser.major && browser.name && browser.version)) {
    console.log(`Cannot determine browser given UA: ${userAgentHeader}`);
  }

  if (!(device.model && device.type && device.vendor)) {
    console.log(`Cannot determine device given UA: ${userAgentHeader}`);
  }

  if (!(os.name && os.version)) {
    console.log(`Cannot determine os given UA: ${userAgentHeader}`);
  }
};

const app = express();
const port = process.env.PORT || 8080;
let readGeoFromIp;

app.use(
  express.json({
    type: "text/plain",
  })
);

app.post("/", async (req, res) => {
  let event; // Mutable to make it available for exception handling
  try {
    const { domain, name, referrer, screen_size, url } = req.body;

    const userAgentHeader = req.get("user-agent");
    const xForwardedFor = req.get("x-forwarded-for");
    const userAgent = userAgentParser(userAgentHeader);
    const urlParsed = urlParse(url, true);
    const userId = hash(userAgentHeader + xForwardedFor);

    logDetailsIfUserAgentCannotBeParsed(userAgentHeader, userAgent);

    event = {
      browser_major: userAgent.browser.major,
      browser_name: userAgent.browser.name,
      browser_version: userAgent.browser.version,
      device_model: userAgent.device.model,
      device_type: userAgent.device.type,
      device_vendor: userAgent.device.vendor,
      domain,
      hostname: urlParsed.hostname,
      name,
      os_name: userAgent.os.name,
      os_version: userAgent.os.version,
      path: urlParsed.pathname,
      referrer,
      screen_size,
      session_id: 0,
      user_id: userId,
    };

    if (xForwardedFor) {
      try {
        if (!readGeoFromIp) {
          readGeoFromIp = await Geo2IpReader.open(
            "./geo-db/GeoLite2-City.mmdb"
          );
        }
        const geoFromIpResponse = await readGeoFromIp.city(xForwardedFor);

        event.geo_city = geoFromIpResponse.city.names.en;
        event.geo_country = geoFromIpResponse.country.isoCode;
        event.geo_lat = geoFromIpResponse.location.latitude;
        event.geo_long = geoFromIpResponse.location.longitude;
      } catch (geoFromIpError) {
        console.log(
          `Could not determine GEO from IP: %s. Error: %s`,
          xForwardedFor,
          geoFromIpError
        );
      }
    }

    await recordEvent(event);
  } catch (error) {
    console.error(
      new Error(
        `Cannot record event: ${JSON.stringify(event)}; error: ${JSON.stringify(
          error
        )}`
      )
    );
  } finally {
    res.status(201).end();
  }
});

app.get("/error", (req, res) => {
  try {
    console.error(new Error(req.query.m));
  } catch (error) {
    console.error(error);
  } finally {
    res.status(200).end();
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
