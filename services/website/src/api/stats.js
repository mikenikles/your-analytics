import { stores } from "@sapper/app";
import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "../config";

const fetchStats = async (path, store) => {
  if (get(dateRange).from === -1 && get(dateRange).to === -1) {
    return;
  }

  const { page } = stores();
  const site =
    get(page).path === "/" ? "your-analytics.org" : get(page).params.site;

  const url = `${QUERY_API_BASE_URL}/${site}/${path}?from=${
    get(dateRange).from
  }&to=${get(dateRange).to}`;
  const response = await fetch(url);
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

const resetAllStats = () => {
  browser.set(null);
  os.set(null);
  screen.set(null);
  topPages.set(null);
  topReferrers.set(null);
  totalPageviews.set(null);
  uniqueVisitors.set(null);
  visitors.set({}); // `null` destroys the chart
  worldMap.set({}); // `null` destroys the chart
};

export const fetchAllStats = () => {
  resetAllStats();
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
};

export const dateRange = writable({
  from: -1,
  to: -1,
});
dateRange.subscribe(() => {
  fetchAllStats();
});
