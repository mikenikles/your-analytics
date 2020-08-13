import { stores } from "@sapper/app";
import { get } from "svelte/store";
import { ADMIN_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

export const addNewWebsite = async (info) => {
  if (!get(userTokenStore)) {
    return;
  }

  const url = new URL(`${ADMIN_API_BASE_URL}/websites`);
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
