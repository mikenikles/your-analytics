import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";

const { COOKIE_SECRET = "cookie-dev-secret", PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

const devProxyOptions = {
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/(admin|query)/, ""),
};

const app = polka();
app
  .use(
    dev &&
      createProxyMiddleware("/api/admin", {
        ...devProxyOptions,
        target: "http://localhost:8082",
      }),
    dev &&
      createProxyMiddleware("/api/query", {
        ...devProxyOptions,
        target: "http://localhost:8081",
      }),
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    cookieParser(COOKIE_SECRET),
    (req, res, next) => {
      const token = req.signedCookies ? req.signedCookies["jwt"] : "";
      const { user } = token ? jwt.decode(token) : false;

      return sapper.middleware({
        session: () => ({
          user,
        }),
      })(req, res, next);
    }
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });

export default app;
