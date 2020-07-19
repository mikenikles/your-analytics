<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import {
    fetchTopPages,
    fetchTopReferrers,
    fetchVisitors,
    fetchWorldMap,
    topPages,
    topReferrers,
    visitors,
    worldMap
  } from "../../api/stats";
  import { userMetadataStore, init } from "../../auth/magic";
  import TopPages from "../../components/stats/top-pages.svelte";
  import TopReferrers from "../../components/stats/top-referrers.svelte";
  import Visitors from "../../components/stats/visitors.svelte";
  import WorldMap from "../../components/stats/world-map.svelte";

  onMount(async () => {
    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }
    // await fetchVisitors();
    await Promise.allSettled([
      fetchTopPages(),
      fetchTopReferrers(),
      fetchVisitors(),
      fetchWorldMap()
    ]);
    // TODO: Check if any of the promises failed, show error if so
  });
</script>

<h1>Analytics</h1>

{#if $visitors}
  <Visitors />
{/if}

{#if $topPages}
  <TopPages />
{/if}

{#if $topReferrers}
  <TopReferrers />
{/if}

{#if $worldMap}
  <WorldMap />
{/if}
