import { Magic } from "magic-sdk";
import { get, writable } from "svelte/store";
import { ADMIN_API_BASE_URL, MAGIC_PUBLIC_KEY } from "../config";

export const userMetadataStore = writable(null);
export const userTokenStore = writable(null);

let magic;

export const init = async () => {
  magic = new Magic(MAGIC_PUBLIC_KEY);

  if (await magic.user.isLoggedIn()) {
    const didToken = await magic.user.getIdToken();
    const response = await fetch(`${ADMIN_API_BASE_URL}/user`, {
      headers: new Headers({
        Authorization: "Bearer " + didToken,
      }),
    });

    if (response.status === 200) {
      const user = await response.json();
      userMetadataStore.set(user);
      userTokenStore.set(didToken);
    }
  }
};

export const login = async (event) => {
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
      const user = await response.json();
      userMetadataStore.set(user);
      userTokenStore.set(didToken);
    }
  }
};

export const logout = async () => {
  await magic.user.logout();
  await fetch(`${ADMIN_API_BASE_URL}/user/logout`, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
    }),
    method: "POST",
  });
  userMetadataStore.set(null);
  userTokenStore.set(null);
};
