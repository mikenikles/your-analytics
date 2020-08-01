<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import {
    fetchBrowser,
    fetchOs,
    fetchScreen,
    fetchTopPages,
    fetchTopReferrers,
    fetchTotalPageviews,
    fetchUniqueVisitors,
    fetchVisitors,
    fetchWorldMap,
    topPages,
    topReferrers,
    totalPageviews,
    uniqueVisitors,
    visitors,
    worldMap
  } from "../../api/stats";
  import { userMetadataStore, init, logout } from "../../auth/magic";
  import DateRange from "../../components/date-range.svelte";
  import Devices from "../../components/stats/devices.svelte";
  import TopPages from "../../components/stats/top-pages.svelte";
  import TopReferrers from "../../components/stats/top-referrers.svelte";
  import Visitors from "../../components/stats/visitors.svelte";
  import WorldMap from "../../components/stats/world-map.svelte";

  const { page } = stores();

  onMount(async () => {
    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }
    console.log("Sites: ", $userMetadataStore.sites);

    if (!$userMetadataStore.sites || $userMetadataStore.sites.length === 0) {
      goto("/onboarding");
      return;
    }

    if (
      $userMetadataStore.sites.length === 1 ||
      $userMetadataStore.sites.includes($page.params.site)
    ) {
      await goto(`/${$userMetadataStore.sites[0]}`, {
        replaceState: true
      });
      await Promise.allSettled([
        fetchBrowser(),
        fetchOs(),
        fetchScreen(),
        fetchTopPages(),
        fetchTopReferrers(),
        fetchTotalPageviews(),
        fetchUniqueVisitors(),
        fetchVisitors(),
        fetchWorldMap()
      ]);
      // TODO: Check if any of the promises failed, show error if so
    } else {
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

<DateRange />

{#if $uniqueVisitors}
  <p>Unique visitors: {$uniqueVisitors}</p>
{/if}

{#if $totalPageviews}
  <p>Total pageviews: {$totalPageviews}</p>
{/if}

{#if $visitors}
  <Visitors />
{/if}

{#if $topPages}
  <TopPages />
{/if}

{#if $topReferrers}
  <TopReferrers />
{/if}

<Devices />

{#if $worldMap}
  <WorldMap />
{/if}
