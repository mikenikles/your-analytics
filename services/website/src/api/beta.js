import { stores } from "@sapper/app";
import { get } from "svelte/store";
import { ADMIN_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

export const recordEmail = async (email) => {
  const url = new URL(`${ADMIN_API_BASE_URL}/beta-email?email=${email}`);
  const response = await fetch(url, {
    method: "POST",
  });

  return response.status === 201;
};
