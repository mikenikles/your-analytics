const isDevelopment = process.browser
  ? window.location.hostname.endsWith(".gitpod.io")
  : process.env.NODE_ENV === "development";

const getAdminApiUrlDev = () =>
  process.browser
    ? `https://${window.location.hostname.replace("3000-", "8082-")}`
    : "";
const getQueryApiUrlDev = () =>
  process.browser
    ? `https://${window.location.hostname.replace("3000-", "8081-")}`
    : "";

export const ADMIN_API_BASE_URL = isDevelopment
  ? getAdminApiUrlDev()
  : `https://${window.location.hostname}/api/admin`;
export const QUERY_API_BASE_URL = isDevelopment
  ? getQueryApiUrlDev()
  : `https://${window.location.hostname}/api/query`;
export const MAGIC_PUBLIC_KEY = isDevelopment
  ? "pk_test_517AC93805DD89CB"
  : "pk_live_BA455263710CC21F";
