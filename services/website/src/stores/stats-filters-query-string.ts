import { derived } from "svelte/store";
import statsFilters from "./stats-filters-query";

export default derived([statsFilters], ([$statsFilters]) =>
  Object.entries($statsFilters)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
);
