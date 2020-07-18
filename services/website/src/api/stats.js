import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

const fetchStats = async (type, store) => {
  const response = await fetch(`${QUERY_API_BASE_URL}/${type}`, {
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
