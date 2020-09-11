import { stores } from "@sapper/app";
import { get, writable } from "svelte/store";
import { ADMIN_API_BASE_URL, QUERY_API_BASE_URL } from "../config";
import { userTokenStore } from "../auth/magic";

export const siteVisibility = writable("private");
export const fetchSiteVisibility = async () => {
  const { page } = stores();
  const site = get(page).params.site;
  if (site === "dashboard") {
    return;
  }

  const url = new URL(
    `${ADMIN_API_BASE_URL}/website/${site}/settings/visibility`
  );
  const response = await fetch(url);
  if (response.status === 200) {
    siteVisibility.set((await response.json()).visibility);
  }
};

const fetchStats = async (path, store) => {
  if (get(siteVisibility) === "private" && !get(userTokenStore)) {
    return;
  }
  if (get(dateRange).from === -1 && get(dateRange).to === -1) {
    return;
  }

  const { page } = stores();
  const site =
    get(page).path === "/" ? "your-analytics.org" : get(page).params.site;

  const url = new URL(`${QUERY_API_BASE_URL}/${site}/${path}`);
  url.searchParams.append("from", get(dateRange).from);
  url.searchParams.append("to", get(dateRange).to);

  const response = await fetch(url, {
    headers: new Headers({
      Authorization: "Bearer " + get(userTokenStore),
    }),
  });

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

export const fetchAllStats = () =>
  Promise.allSettled([
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

export const dateRange = writable({
  from: -1,
  to: -1,
});
dateRange.subscribe(async () => {
  await fetchAllStats();
});
