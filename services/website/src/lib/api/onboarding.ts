import { ADMIN_API_BASE_URL } from "$lib/config";

export const setFirstName = async (firstName) => {
  const url = `${ADMIN_API_BASE_URL}/user`;
  const response = await fetch(url, {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ firstName }),
    method: "PUT",
  });
  return response.status;
};

export const addNewWebsite = async (info) => {
  const url = `${ADMIN_API_BASE_URL}/website`;
  const response = await fetch(url, {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(info),
    method: "POST",
  });
  return response.status;
};
