<script context="module" lang="ts">
  import { getVisibility } from "$lib/api/site/settings";
  import { fetchAllStats } from "$lib/api/stats";
  import { initFilters } from "$lib/stores/stats-filters-query";

  export const load: import('@sveltejs/kit').Load = async ({fetch, page, session}) => {
    const { user } = session;
    const { visibility } = await getVisibility(fetch, page.host, page.path.substring(1));

    if (!user && visibility === "private") {
      return {
        status: 302,
        redirect: "auth"
      }
    }

    initFilters({
      preset: page.query.get("preset"),
      from: page.query.get("from"),
      to: page.query.get("to"),
    });
    const statsResults = await fetchAllStats(fetch, page.host, page.params.site);
    const stats = {};
    statsResults.forEach((statsResultPromise) => {
      if (statsResultPromise.status === "fulfilled") {
        stats[statsResultPromise.value.storeName] = statsResultPromise.value.data;
      }
    });

    return {
      props: {stats}
    };
  };
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { statsStores } from "$lib/api/stats";
  import Card from "$lib/components/card.svelte";
  import DateRange from "$lib/components/date-range.svelte";
  import WebsiteSelect from "$lib/components/website-select.svelte";
  import Header from "$lib/components/header/index.svelte";
  import MainContent from "$lib/components/main-content.svelte";
  import Devices from "$lib/components/stats/devices.svelte";
  import TopPages from "$lib/components/stats/top-pages.svelte";
  import TopReferrers from "$lib/components/stats/top-referrers.svelte";
  import TotalPageviews from "$lib/components/stats/total-pageviews.svelte";
  import UniqueVisitors from "$lib/components/stats/unique-visitors.svelte";
  import Visitors from "$lib/components/stats/visitors.svelte";
  import WorldMap from "$lib/components/stats/world-map.svelte";

  export let stats: {
    storeName: string;
    data: any;
  };;

  initFilters({
    preset: $page.query.get("preset"),
    from: $page.query.get("from"),
    to: $page.query.get("to"),
  });

  Object.entries(stats).forEach(([storeName, data]) => {
    statsStores[storeName].set(data);
  });
</script>

<svelte:head>
  <title>Web analytics for {$page.params.site} | Your Analytics</title>
</svelte:head>

<div>
  <Header />
  <MainContent>
    <WebsiteSelect />
    <DateRange />
    <Card>
      <div class="sm:flex">
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
  </MainContent>
</div>
