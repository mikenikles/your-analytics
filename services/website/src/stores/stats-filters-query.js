import { derived } from "svelte/store";
import dateRange from "./date-range";

export const initFilters = (queryParameters) => {
  dateRange.init(queryParameters);
};

export default derived([dateRange], ([$dateRange]) => ({
  ...$dateRange,
}));
