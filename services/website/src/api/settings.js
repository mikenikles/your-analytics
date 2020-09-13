import { ADMIN_API_BASE_URL } from "../config";

export const setVisibility = async (website, visibility) => {
  const url = `${ADMIN_API_BASE_URL}/website/${website}/settings/visibility`;
  const response = await fetch(url, {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      visibility,
    }),
    method: "PUT",
  });

  return response.status === 200;
};

export const getSettings = async (fetch, host, website) => {
  const url = new URL(
    `https://${host}/${ADMIN_API_BASE_URL}/website/${website}/settings`
  );
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
    credentials: "include",
  });

  if (response.status === 200) {
    return await response.json();
  }
  return null;
};
