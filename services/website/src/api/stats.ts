import { get, writable } from "svelte/store";
import { QUERY_API_BASE_URL } from "../config";
import { convertPresetToFromAndToRange } from "../stores/date-range";
import statsFiltersQuery, {
  IStatsFilterQueryStore,
} from "../stores/stats-filters-query";

const fetchStats = (fetch, host, site) => async (path, storeName) => {
  const statsFiltersQueryStore = get(
    statsFiltersQuery
  ) as IStatsFilterQueryStore;
  let dateRangeParams = convertPresetToFromAndToRange(
    statsFiltersQueryStore.preset,
    statsFiltersQueryStore.from,
    statsFiltersQueryStore.to
  );

  const apiQueryParams = Object.assign(
    {},
    statsFiltersQueryStore,
    dateRangeParams
  );
  delete apiQueryParams.preset; // Not needed by the API. This is mainly for user experience in the browser URL

  const filterQueryString = Object.entries(apiQueryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  const url = `https://${host}/${QUERY_API_BASE_URL}/${site}/${path}?${filterQueryString}`;

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

export const fetchUniqueVisitorsOnOnboardingPage = (fetch, host, site) => {
  uniqueVisitors.set(null);
  const fetcher = fetchStats(fetch, host, site);
  return fetcher("unique-visitors", "uniqueVisitors");
};
