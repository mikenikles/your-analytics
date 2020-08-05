import { stores } from "@sapper/app";
import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

const fetchStats = async (path, store) => {
  console.log("FETCH STATS");
  if (!get(userTokenStore)) {
    return;
  }
  console.log("GOT A TOKEN");
  const { page } = stores();
  const site = get(page).params.site;
  console.log("FOUND SITE", site);

  console.log("QUERY BASE URL", QUERY_API_BASE_URL);
  console.log("PATH", path);
  const url = new URL(`${QUERY_API_BASE_URL}/${site}/${path}`);
  console.log("A");
  url.searchParams.append("from", get(dateRange).from);
  console.log("B");
  url.searchParams.append("to", get(dateRange).to);
  console.log("URL", JSON.stringify(url));

  const response = await fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
    }),
  });

  console.log("RES STATUS", response.status);
  if (response.status === 200) {
    store.set((await response.json()).data);
  }
};

export const browser = writable(null);
export const fetchBrowser = () => fetchStats("browser", browser);

export const os = writable(null);
export const fetchOs = () => fetchStats("os", os);

export const screen = writable(null);
export const fetchScreen = () => fetchStats("screen", screen);

export const topPages = writable(null);
export const fetchTopPages = () => fetchStats("top-pages", topPages);

export const topReferrers = writable(null);
export const fetchTopReferrers = () =>
  fetchStats("top-referrers", topReferrers);

export const totalPageviews = writable(null);
export const fetchTotalPageviews = () =>
  fetchStats("total-pageviews", totalPageviews);

export const uniqueVisitors = writable(null);
export const fetchUniqueVisitors = () =>
  fetchStats("unique-visitors", uniqueVisitors);

export const visitors = writable(null);
export const fetchVisitors = () => fetchStats("visitors", visitors);

export const worldMap = writable(null);
export const fetchWorldMap = () => fetchStats("world-map", worldMap);

export const dateRange = writable({
  from: -1,
  to: -1,
});
dateRange.subscribe(async () => {
  await Promise.allSettled([
    fetchBrowser(),
    fetchOs(),
    fetchScreen(),
    fetchTopPages(),
    fetchTopReferrers(),
    fetchTotalPageviews(),
    fetchUniqueVisitors(),
    fetchVisitors(),
    fetchWorldMap(),
  ]);
});
