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
    fetchWorldMap
  } from "../../api/stats";
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

  const fetchStats = async () => {
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
  };

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
      await fetchStats();
      return;
    }

    if (
      sites.includes($page.params.site)
    ) {
      await goto(`/${$page.params.site}`, {
        replaceState: true
      });
      await fetchStats();
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

<DateRange />
<UniqueVisitors />
<TotalPageviews />
<Visitors />
<TopPages />
<TopReferrers />
<Devices />
<WorldMap />
