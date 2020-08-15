import { stores } from "@sapper/app";
import { get } from "svelte/store";
import { ADMIN_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

export const recordEmail = async (email) => {
  const baseUrl = ADMIN_API_BASE_URL.startsWith("/")
    ? `https://${window.location.hostname}${ADMIN_API_BASE_URL}`
    : ADMIN_API_BASE_URL;
  const url = new URL(`${baseUrl}/beta-email`);
  url.searchParams.append("email", email);

  const response = await fetch(url, {
    method: "POST",
  });

  return response.status === 201;
};
