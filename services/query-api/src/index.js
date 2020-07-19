const { Magic } = require("@magic-sdk/admin");
const cors = require("cors");
const express = require("express");

const {
  fetchTopPages,
  fetchTopReferrers,
  fetchVisitors,
  fetchWorldMap,
} = require("./clickhouse");

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const app = express();
app.use(
  cors({
    origin: [
      /mikenikles1\.vercel\.app$/,
      /your-analytics\.vercel\.app$/,
      /your-analytics\.org$/,
      process.env.FRONTEND_HOST,
    ],
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

const createStatsEndpoint = (path, fetcher) => {
  app.get(path, isAuthenticated, async (req, res) => {
    try {
      // TODO
      // - Load database query parameters based on who called this endpoint

      const dateRange = {
        from: req.query.from ? Math.floor(req.query.from / 1000) : null,
        to: req.query.to ? Math.floor(req.query.to / 1000) : null,
      };

      const data = await fetcher(dateRange);
      res.json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  });
};

createStatsEndpoint("/top-pages", fetchTopPages);
createStatsEndpoint("/top-referrers", fetchTopReferrers);
createStatsEndpoint("/visitors", fetchVisitors);
createStatsEndpoint("/world-map", fetchWorldMap);

// app.get("/top-pages", isAuthenticated, async (req, res) => {
//   try {
//     // TODO
//     // - Load database query parameters based on who called this endpoint

//     const data = await fetchTopPages();
//     res.json({ data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).end();
//   }
// });

// app.get("/top-referrers", isAuthenticated, async (req, res) => {
//   try {
//     // TODO
//     // - Load database query parameters based on who called this endpoint

//     const data = await fetchTopReferrers();
//     res.json({ data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).end();
//   }
// });

// app.get("/visitors", isAuthenticated, async (req, res) => {
//   try {
//     // TODO
//     // - Load database query parameters based on who called this endpoint

//     const data = await fetchVisitors();
//     res.json({ data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).end();
//   }
// });

// app.get("/world-map", isAuthenticated, async (req, res) => {
//   try {
//     // TODO
//     // - Load database query parameters based on who called this endpoint

//     const data = await fetchWorldMap();
//     res.json({ data });
//   } catch (error) {
//     console.error(error);
//     res.status(500).end();
//   }
// });

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
