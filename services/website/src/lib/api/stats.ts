import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "$lib/config";
import statsFilterQueryString from "$lib/stores/stats-filters-query-string";

const fetchStats = (fetch, host, site) => async (path, storeName) => {
  const url = `https://${host}/${QUERY_API_BASE_URL}/${site}/${path}?${get(
    statsFilterQueryString
  )}`;
  const response = await fetch(url, {
    credentials: "include",
  });

  if (response.status === 200) {
    const data = (await response.json()).data;
    statsStores[storeName].set(data); // Needed on the client to reload the dashboard when the site changes.
    return {
      storeName,
      data,
    };
  }
  statsStores[storeName].set({}); // Needed on the client to reload the dashboard when the site changes.
  return {
    storeName,
    data: {},
  };
};

interface IStringNumber {
  [key: string]: number;
}

export const browser = writable<IStringNumber | null>(null);
export const os = writable<IStringNumber | null>(null);
export const screen = writable(null);
export const topPages = writable<IStringNumber | null>(null);
export const topReferrers = writable<IStringNumber | null>(null);
export const totalPageviews = writable<number | null>(null);
export const uniqueVisitors = writable<number | null>(null);
export const visitors = writable<IStringNumber | null>(null);
export const worldMap = writable<IStringNumber | null>(null);

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

export const fetchUniqueVisitorsOnOnboardingPage = (fetch, host, site) => {
  uniqueVisitors.set(null);
  const fetcher = fetchStats(fetch, host, site);
  return fetcher("unique-visitors", "uniqueVisitors");
};
