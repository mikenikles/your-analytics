import { writable } from "svelte/store";
import { stores } from "@sapper/app";

export const session = (() => {
  const { subscribe, set } = writable(false);

  let sapperSession;
  return {
    init() {
      sapperSession = stores().session;
      sapperSession.subscribe((val) => {
        set(val);
      });
    },
    set(val) {
      sapperSession.set(val);
    },
    subscribe,
    unsubscribe() {
      sapperSession();
    },
  };
})();
