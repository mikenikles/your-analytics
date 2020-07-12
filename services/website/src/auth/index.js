import createAuth0Client from "@auth0/auth0-spa-js";
import { onMount } from "svelte";
import { authErrorStore, authTokenStore, authUserInfoStore } from "./store";

const auth0Config = {
  domain: "your-analytics.us.auth0.com",
  client_id: "YPG55JTRdfbvrFheR5qerssl3fx8Yyux",
  audience: "https://events-api.your-analytics.org/",
};

let auth0;

export const login = async () => {
  await auth0.loginWithRedirect({
    prompt: "login",
    redirect_uri: "https://" + window.location.hostname + "/login",
  });
};

export const logout = () => {
  auth0.logout({
    returnTo: "https://" + window.location.hostname,
  });
};

export const initAuth = () => {
  onMount(async () => {
    auth0 = await createAuth0Client(auth0Config);

    const params = new URLSearchParams(window.location.search);
    if (params.has("error")) {
      $authErrorStore = $page.query.error_description;
      return;
    }

    if (params.has("code")) {
      await auth0.handleRedirectCallback();
    }

    if (await auth0.isAuthenticated()) {
      authUserInfoStore.set(await auth0.getUser());
      authTokenStore.set(await auth0.getTokenSilently());

      // TODO: Deal with refreshing the token
    }
  });
};
