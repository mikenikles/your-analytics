import { get, writable } from "svelte/store";
import { userTokenStore } from "../auth/magic";

const API_BASE_URL =
  "https://8081-fe64c5f9-d995-4313-b604-3351faf8883a.ws-eu01.gitpod.io";

const fetchStats = async (type, store) => {
  const response = await fetch(`${API_BASE_URL}/${type}`, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
    }),
  });

  if (response.status === 200) {
    store.set((await response.json()).data);
  }
};

export const visitors = writable(null);
export const fetchVisitors = () => fetchStats("visitors", visitors);
