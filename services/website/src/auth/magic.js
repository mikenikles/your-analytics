import { Magic } from "magic-sdk";
import { writable } from "svelte/store";

export const userMetadataStore = writable(null);
export const userTokenStore = writable(null);

let magic;

export const init = async () => {
  magic = new Magic("pk_test_517AC93805DD89CB");

  if (await magic.user.isLoggedIn()) {
    const didToken = await magic.user.getIdToken();
    const response = await fetch(
      "https://8082-fe64c5f9-d995-4313-b604-3351faf8883a.ws-eu01.gitpod.io/user",
      {
        headers: new Headers({
          Authorization: "Bearer " + didToken,
        }),
      }
    );
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
    const response = await fetch(
      "https://8082-fe64c5f9-d995-4313-b604-3351faf8883a.ws-eu01.gitpod.io/user/login",
      {
        headers: new Headers({
          Authorization: "Bearer " + didToken,
        }),
        method: "POST",
      }
    );

    if (response.status === 200) {
      const user = await response.json();
      userMetadataStore.set(user);
      userTokenStore.set(didToken);
    }
  }
};
