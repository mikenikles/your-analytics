import { endOfDay, parseISO, startOfDay, startOfYear, sub } from "date-fns";
import { writable } from "svelte/store";

export const datePresets = {
  today: {
    label: "Today",
    calculateFromDate: () => new Date(),
    calculateToDate: () => new Date(),
  },
  "7days": {
    label: "Last 7 days",
    calculateFromDate: () =>
      sub(new Date(), {
        days: 7,
      }),
    calculateToDate: () => new Date(),
  },
  "30days": {
    label: "Last 30 days",
    calculateFromDate: () =>
      sub(new Date(), {
        days: 30,
      }),
    calculateToDate: () => new Date(),
  },
  thisyear: {
    label: "This year",
    calculateFromDate: () => startOfYear(new Date()),
    calculateToDate: () => new Date(),
  },
  custom: {
    label: "Custom",
    calculateFromDate: (fromDate) => parseISO(fromDate),
    calculateToDate: (toDate) => parseISO(toDate),
  },
};

const create = () => {
  const { subscribe, set } = writable({});

  return {
    init: (queryParameters) => {
      const { preset, from, to } = queryParameters;
      const state = {
        preset: preset || "today",
      };
      if (preset === "custom") {
        state.from = from;
        state.to = to;
      }
      set(state);
    },
    subscribe,
    setPreset: (preset) =>
      set({
        preset,
      }),
    setCustomRange: (from, to) =>
      set({
        preset: "custom",
        from,
        to,
      }),
    reset: () => set({}),
  };
};

export const convertPresetToFromAndToRange = (preset, from, to) =>
  preset === "custom"
    ? {
        from: startOfDay(datePresets.custom.calculateFromDate(from)).getTime(),
        to: endOfDay(datePresets.custom.calculateFromDate(to)).getTime(),
      }
    : {
        from: startOfDay(datePresets[preset].calculateFromDate()).getTime(),
        to: endOfDay(datePresets[preset].calculateToDate()).getTime(),
      };

export const isLocalDateChange = writable(false);

export default create();
