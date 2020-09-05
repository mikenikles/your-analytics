import { stores } from "@sapper/app";
import { get } from "svelte/store";
import { ADMIN_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

export const setVisibility = async (website, visibility) => {
  if (!get(userTokenStore)) {
    return;
  }

  const url = new URL(
    `${ADMIN_API_BASE_URL}/websites/${website}/settings/visibility`
  );
  const response = await fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      visibility,
    }),
    method: "PUT",
  });

  return response.status === 200;
};

export const getSettings = async (website) => {
  if (!get(userTokenStore)) {
    return {};
  }

  const url = new URL(`${ADMIN_API_BASE_URL}/websites/${website}/settings`);
  const response = await fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
      "Content-Type": "application/json",
    }),
    method: "GET",
  });

  if (response.status === 200) {
    return await response.json();
  }
  return {};
};
