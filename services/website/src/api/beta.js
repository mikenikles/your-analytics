import { ADMIN_API_BASE_URL } from "../config";

export const recordEmail = async (email) => {
  const url = `${ADMIN_API_BASE_URL}/beta-email?email=${email}`;
  const response = await fetch(url, {
    method: "POST",
  });
  return response.status === 201;
};
