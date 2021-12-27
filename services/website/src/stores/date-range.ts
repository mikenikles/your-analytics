import { writable } from "svelte/store";

export interface IDateRangeStore {
  preset?: string;
  from?: string;
  to?: string;
}

const create = () => {
  const { subscribe, set } = writable<IDateRangeStore>({});

  return {
    init: (queryParameters: IDateRangeStore) => {
      const { preset, from, to } = queryParameters;
      const state: IDateRangeStore = {
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

export const isLocalDateChange = writable(false);

export default create();
