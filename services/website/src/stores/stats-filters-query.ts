import { derived } from "svelte/store";
import dateRange, { IDateRangeStore } from "./date-range";

export interface IStatsFilterQueryStore extends IDateRangeStore {}

export const initFilters = (queryParameters) => {
  dateRange.init(queryParameters);
};

export default derived([dateRange], ([$dateRange]) => ({
  ...$dateRange,
}));
