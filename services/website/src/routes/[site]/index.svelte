<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { userMetadataStore, init, logout } from "../../auth/magic";
  import DateRange from "../../components/date-range.svelte";
  import Devices from "../../components/stats/devices.svelte";
  import TopPages from "../../components/stats/top-pages.svelte";
  import TopReferrers from "../../components/stats/top-referrers.svelte";
  import TotalPageviews from "../../components/stats/total-pageviews.svelte";
  import UniqueVisitors from "../../components/stats/unique-visitors.svelte";
  import Visitors from "../../components/stats/visitors.svelte";
  import WorldMap from "../../components/stats/world-map.svelte";

  const { page } = stores();

  let isReadyToDisplayStats = false;

  onMount(async () => {
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

  const handleLogout = async () => {
    await logout();
    await goto("/auth");
  };
</script>

<h1>Analytics</h1>

<button on:click={logout}>Logout</button>

{#if isReadyToDisplayStats}
  <DateRange />
  <UniqueVisitors />
  <TotalPageviews />
  <Visitors />
  <TopPages />
  <TopReferrers />
  <Devices />
  <WorldMap />
{/if}
