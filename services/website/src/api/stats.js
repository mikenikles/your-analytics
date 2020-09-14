import { endOfDay, startOfDay } from "date-fns";
import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "../config";

const fetchStats = (fetch, host, site) => async (path, storeName) => {
  if (get(dateRange).from === -1 && get(dateRange).to === -1) {
    return;
  }

  const url = `https://${host}/${QUERY_API_BASE_URL}/${site}/${path}?from=${
    get(dateRange).from
  }&to=${get(dateRange).to}`;

  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status === 200) {
    const data = (await response.json()).data;
    statsStores[storeName].set(data); // Neede on the client to reload the dashboard when the site changes.
    return {
      storeName,
      data,
    };
  }
  statsStores[storeName].set({}); // Neede on the client to reload the dashboard when the site changes.
  return {
    storeName,
    data: {},
  };
};

export const browser = writable(null);
export const os = writable(null);
export const screen = writable(null);
export const topPages = writable(null);
export const topReferrers = writable(null);
export const totalPageviews = writable(null);
export const uniqueVisitors = writable(null);
export const visitors = writable(null);
export const worldMap = writable(null);

export const statsStores = {
  browser,
  os,
  screen,
  topPages,
  topReferrers,
  totalPageviews,
  uniqueVisitors,
  visitors,
  worldMap,
};

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

export const fetchAllStats = (fetch, host, site) => {
  resetAllStats();
  const fetcher = fetchStats(fetch, host, site);

  return Promise.allSettled([
    fetcher("browser", "browser"),
    fetcher("os", "os"),
    fetcher("screen", "screen"),
    fetcher("top-pages", "topPages"),
    fetcher("top-referrers", "topReferrers"),
    fetcher("total-pageviews", "totalPageviews"),
    fetcher("unique-visitors", "uniqueVisitors"),
    fetcher("visitors", "visitors"),
    fetcher("world-map", "worldMap"),
  ]);
};

// TODO: Use query parameters and load the date range based on that
export const dateRange = writable({
  from: startOfDay(new Date()).getTime(),
  to: endOfDay(new Date()).getTime(),
});
dateRange.subscribe(() => {
  // fetchAllStats(); // TODO: Figure this out. It's likely time to use query params to trigger a fetch
});
