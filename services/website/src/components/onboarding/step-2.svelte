<script lang="ts">
  import { onDestroy } from "svelte";
  import { addNewWebsite } from "../../api/onboarding";
  import { fetchUniqueVisitorsOnOnboardingPage } from "../../api/stats";
  import dateRange from "../../stores/date-range";
  import onboarding from "../../stores/onboarding";
  import { session } from "../../stores/session";
  import StepWrapper from "./step-wrapper.svelte";
  import TimezoneSelect from "../timezone-select.svelte";

  export let hasUserAlreadyConfiguredSite: boolean;
  export let isUrlInvalid: boolean;

  let fetchUniqueVisitorsInterval: number;
  let responseBody = "";

  $: existingUserSites = Object.keys($onboarding.user.sites || {}) || [];
  $: hasUserAlreadyConfiguredSite = existingUserSites.includes($onboarding.url);
  $: isUrlInvalid = hasUserAlreadyConfiguredSite || $onboarding.isSiteAlreadyConfiguredGlobally;

  const handleSubmit = async () => {
    const url = $onboarding.url;
    const timezone = $onboarding.timezone;

    responseBody = await addNewWebsite({url, timezone});
    // const responseCode = await addNewWebsite({url, timezone});
    // switch (responseCode) {
    //   case 201:
    //     $onboarding.isSiteAdded = true;
    //     $session.user.sites[url] = {};
    //     dateRange.setPreset("today");
    //     fetchUniqueVisitorsInterval = setInterval(() => {
    //       fetchUniqueVisitorsOnOnboardingPage(window.fetch, window.location.hostname, url);
    //     }, 10000);
    //     break;
    //   case 400:
    //     $onboarding.isSiteAlreadyConfiguredGlobally = true;
    //     break;
    // }
  };

  onDestroy(() => {
    if (fetchUniqueVisitorsInterval) {
      window.clearInterval(fetchUniqueVisitorsInterval);
    }
  });
</script>

<style>
  button:disabled {
    @apply bg-indigo-500;
    @apply cursor-not-allowed;
  }
</style>

<StepWrapper>
  MMM{responseBody}MMM
  <div>
    <label for="url" class="text-sm font-medium leading-5 text-gray-700">
      What's your website URL?
    </label>
    <div class="mt-1 relative flex rounded-md shadow-sm">
      <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
        http(s)://www.
      </span>
      <input id="url" bind:value={$onboarding.url} on:focus={() => $onboarding.isSiteAlreadyConfiguredGlobally = false} type="text" name="url" required class="px-3 py-2 w-full border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
      {#if isUrlInvalid && !$onboarding.isSiteAdded}
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
      {/if}
    </div>
    <p class="mt-2 text-sm text-red-600">
    {#if !$onboarding.isSiteAdded && hasUserAlreadyConfiguredSite}
      You've already configured this website.
    {:else if !$onboarding.isSiteAdded && $onboarding.isSiteAlreadyConfiguredGlobally}
      This site has already been configured. If it belongs to you, please contact us.
    {/if}
    </p>
  </div>

  <div class="mt-6">
    <label for="timezone" class="text-sm font-medium leading-5 text-gray-700">
      What's your preferred reporting timezone?
    </label>
    <div class="mt-1 rounded-md shadow-sm">
      <TimezoneSelect />
    </div>
  </div>

  <div class="mt-6">
    <span class="w-full rounded-md shadow-sm">
      <button type="button" on:click={handleSubmit} disabled={isUrlInvalid} class="w-full flex justify-center mt-4 py-4 px-10 bg-blue-600 rounded-lg font-semibold text-white sm:mt-0">
        Let's go
      </button>
    </span>
  </div>
</StepWrapper>
