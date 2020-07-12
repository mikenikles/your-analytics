import { writable } from "svelte/store";

export const authErrorStore = writable(null);

export const authTokenStore = writable(null);

export const authUserInfoStore = writable(null);
