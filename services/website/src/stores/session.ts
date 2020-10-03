import { writable } from "svelte/store";
import { stores } from "@sapper/app";

export interface ISession {
  user?: {
    firstName?: string;
    email?: string;
    emailHash?: string;
    sites?: any;
  };
}

export const session = (() => {
  const { subscribe, set } = writable<ISession>({});

  let sapperSession;
  return {
    init() {
      sapperSession = stores().session;
      sapperSession.subscribe((val: ISession) => {
        set(val);
      });
    },
    set(val: ISession) {
      sapperSession.set(val);
    },
    subscribe,
    unsubscribe() {
      sapperSession();
    },
  };
})();
