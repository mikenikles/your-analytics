import { sequence } from "@sveltejs/kit/hooks";
import cookie from "cookie";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { dev } from "$app/env";

const { COOKIE_SECRET = "cookie-dev-secret" } = process.env;

const baseDevApiUrls = {
  admin: "http://localhost:8082/",
  query: "http://localhost:8081/",
};

const handleDevApiRedirects: import("@sveltejs/kit").Handle = async ({
  request,
  resolve,
}) => {
  if (dev && request.path.match(/^\/api\/(query|admin)\//)) {
    const [_, apiType, path] = request.path.match(
      /^\/api\/(query|admin)\/(.*)/
    );

    const apiBaseUrl = baseDevApiUrls[apiType];
    const res = await fetch(`${apiBaseUrl}${path}?${request.query}`, {
      body: request.body && JSON.stringify(request.body),
      headers: request.headers,
      method: request.method,
    });

    const responseHeaders = {};
    res.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      headers: responseHeaders,
      status: res.status,
      body: await res.text(),
    };
  }
  return await resolve(request);
};

const handleCookies: import("@sveltejs/kit").Handle = async ({
  request,
  resolve,
}) => {
  const cookies = cookie.parse(request.headers.cookie || "");
  let signedCookies = cookieParser.signedCookies(cookies, [COOKIE_SECRET]);
  signedCookies = cookieParser.JSONCookies(signedCookies);
  const jwtToken = signedCookies["jwt"];
  const { user } = jwtToken ? jwt.decode(jwtToken) : false;
  request.locals.user = user;
  return await resolve(request);
};

export const handle = sequence(handleDevApiRedirects, handleCookies);

export const getSession: import("@sveltejs/kit").GetSession = (request) => {
  return request.locals.user
    ? {
        user: {
          // only include properties needed client-side —
          // exclude anything else attached to the user
          // like access tokens etc
          email: request.locals.user.email,
          emailHash: request.locals.user.emailHash,
          firstName: request.locals.user.firstName,
          issuer: request.locals.user.issuer,
          sites: request.locals.user.sites,
        },
      }
    : {};
};
