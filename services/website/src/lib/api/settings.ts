import { ADMIN_API_BASE_URL } from "$lib/config";

export const getSettings = async (fetch) => {
  const response = await fetch(`/${ADMIN_API_BASE_URL}/settings`, {
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
