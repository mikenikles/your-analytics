import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

const fetchStats = async (path, store) => {
  const response = await fetch(`${QUERY_API_BASE_URL}/${path}`, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
    }),
  });

  if (response.status === 200) {
    store.set((await response.json()).data);
  }
};

export const topPages = writable(null);
export const fetchTopPages = () => fetchStats("top-pages", topPages);

export const topReferrers = writable(null);
export const fetchTopReferrers = () =>
  fetchStats("top-referrers", topReferrers);

export const visitors = writable(null);
export const fetchVisitors = () => fetchStats("visitors", visitors);
