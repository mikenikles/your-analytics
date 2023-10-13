import type { IDateRangeStore } from "./date-range";
import { derived } from "svelte/store";
import dateRange from "./date-range";

export const initFilters = (queryParameters: IDateRangeStore) => {
  dateRange.init(queryParameters);
};

export default derived([dateRange], ([$dateRange]) => ({
  ...$dateRange,
}));
