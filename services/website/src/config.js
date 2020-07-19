const config = {
  development: {
    adminApiBaseUrl:
      "https://8082-fa85e924-90d4-429b-a4b4-fa3bb51b0a3e.ws-eu01.gitpod.io",
    queryApiBaseUrl:
      "https://8081-fa85e924-90d4-429b-a4b4-fa3bb51b0a3e.ws-eu01.gitpod.io",
    magicPublicKey: "pk_test_517AC93805DD89CB",
  },
  production: {
    adminApiBaseUrl: "https://admin-api.your-analytics.org",
    queryApiBaseUrl: "https://query-api.your-analytics.org",
    magicPublicKey: "pk_live_BA455263710CC21F",
  },
};

const isDevelopment = process.browser
  ? window.location.hostname.endsWith(".gitpod.io") ||
    window.location.hostname.endsWith(".vercel.app")
  : process.env.NODE_ENV === "development";
const isProduction = process.browser
  ? window.location.hostname.endsWith(".your-analytics.org")
  : process.env.NODE_ENV === "production";

const getEnvironment = () =>
  isDevelopment ? "development" : isProduction ? "production" : "";
const getConfigValue = (key) => config[getEnvironment()][key];

export const ADMIN_API_BASE_URL = getConfigValue("adminApiBaseUrl");

export const QUERY_API_BASE_URL = getConfigValue("queryApiBaseUrl");

export const MAGIC_PUBLIC_KEY = getConfigValue("magicPublicKey");
