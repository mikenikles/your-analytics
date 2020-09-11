<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { userMetadataStore, init } from "../../auth/magic";
  import { fetchSiteVisibility, siteVisibility } from "../../api/stats";
  import Card from "../../components/card.svelte";
  import DateRange from "../../components/date-range.svelte";
  import Header from "../../components/header/index.svelte";
  import MainContent from "../../components/main-content.svelte";
  import Devices from "../../components/stats/devices.svelte";
  import TopPages from "../../components/stats/top-pages.svelte";
  import TopReferrers from "../../components/stats/top-referrers.svelte";
  import TotalPageviews from "../../components/stats/total-pageviews.svelte";
  import UniqueVisitors from "../../components/stats/unique-visitors.svelte";
  import Visitors from "../../components/stats/visitors.svelte";
  import WorldMap from "../../components/stats/world-map.svelte";

  const { page } = stores();

  let isReadyToDisplayStats = false;

  $: pageTitle = $page.params.site === "dashboard" ? "Dashboard" : `Dashboard - ${$page.params.site}`;

  onMount(async () => {
    await fetchSiteVisibility();
    if ($siteVisibility === "public") {
      await goto(`/${$page.params.site}`, {
        replaceState: true
      });
      isReadyToDisplayStats = true;
      return;
    }

    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }

    if (!$userMetadataStore.sites || Object.keys($userMetadataStore.sites).length === 0) {
      goto("/onboarding");
      return;
    }

    const sites = Object.keys($userMetadataStore.sites);
    if (sites.length === 1) {
      await goto(`/${sites[0]}`, {
        replaceState: true
      });
      isReadyToDisplayStats = true;
      return;
    }

    if (
      sites.includes($page.params.site)
    ) {
      await goto(`/${$page.params.site}`, {
        replaceState: true
      });
      isReadyToDisplayStats = true;
      return;
    }

    if (sites.length >= 2) {
      goto("/websites");
      return;
    }
  });
</script>

<div>
  <Header title={pageTitle} />
  <MainContent>
    {#if isReadyToDisplayStats}
      <DateRange />
      <Card>
        <div class="flex">
          <UniqueVisitors />
          <TotalPageviews />
        </div>
      </Card>
      <Card>
        <Visitors />
      </Card>
      <div class="md:flex md:justify-between">
        <div class="md:w-1/2">
          <Card>
            <TopPages />
          </Card>
        </div>
        <div class="md:w-1/2 md:ml-5">
          <Card>
            <TopReferrers />
          </Card>
        </div>
      </div>
      <div class="md:flex md:justify-between">
        <div class="md:w-1/2">
          <Card>
            <Devices />
          </Card>
        </div>
        <div class="md:w-1/2 md:ml-5">
          <Card>
            <WorldMap />
          </Card>
        </div>
      </div>
    {:else}
      <p>
        <span class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-bg-gray-800 focus:outline-none transition ease-in-out duration-150 cursor-wait">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-bg-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Crunching the numbers for your analytics...
        </span>
      </p>
    {/if}
  </MainContent>
</div>
