import { Magic } from "magic-sdk";
import { ADMIN_API_BASE_URL, MAGIC_PUBLIC_KEY } from "$lib/config";

let magic;

const init = () => {
  magic = new Magic(MAGIC_PUBLIC_KEY);
};

export const login = async (event) => {
  if (!magic) {
    init();
  }
  const email = new FormData(event.target).get("email");
  if (email) {
    const didToken = await magic.auth.loginWithMagicLink({ email });
    const response = await fetch(`${ADMIN_API_BASE_URL}/user/login`, {
      headers: new Headers({
        Authorization: "Bearer " + didToken,
      }),
      method: "POST",
    });

    if (response.status === 200) {
      window.location.href = "dashboard";
    }
  }
};

export const logout = async () => {
  await fetch(`${ADMIN_API_BASE_URL}/user/logout`, {
    method: "POST",
  });
};
