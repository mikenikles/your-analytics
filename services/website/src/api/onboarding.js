import { stores } from "@sapper/app";
import { get } from "svelte/store";
import { ADMIN_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

export const addNewWebsite = async (info) => {
  if (!get(userTokenStore)) {
    return;
  }

  const baseUrl = ADMIN_API_BASE_URL.startsWith("/")
    ? `https://${window.location.hostname}${ADMIN_API_BASE_URL}`
    : ADMIN_API_BASE_URL;
  const url = new URL(`${baseUrl}/websites`);

  const response = await fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(info),
    method: "POST",
  });

  return response.status === 201;
};
