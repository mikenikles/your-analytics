const isDevelopment =
  typeof window !== "undefined"
    ? window.location.hostname.endsWith(".gitpod.io") ||
      window.location.hostname === "localhost"
    : process.env.NODE_ENV === "development";

export const ADMIN_API_BASE_URL = "api/admin";
export const QUERY_API_BASE_URL = "api/query";
export const MAGIC_PUBLIC_KEY = isDevelopment
  ? "pk_test_517AC93805DD89CB"
  : "pk_live_BA455263710CC21F";
