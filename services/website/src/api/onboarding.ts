import { ADMIN_API_BASE_URL } from "../config";

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
