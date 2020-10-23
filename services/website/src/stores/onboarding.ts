import { writable } from "svelte/store";

interface IOnboardingStore {
  isSiteAdded: boolean;
  isSiteAlreadyConfiguredGlobally: boolean;
  timezone: string;
  url?: string;
  user?: {
    firstName?: string;
    sites?: {};
  };
}

export default writable<IOnboardingStore>({
  isSiteAdded: false,
  isSiteAlreadyConfiguredGlobally: false,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
});
