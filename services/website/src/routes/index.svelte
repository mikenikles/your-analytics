<script context="module">
  import { fetchAllStats } from "../api/stats";
  import { initFilters } from "../stores/stats-filters-query";

  export async function preload(page) {
    initFilters({
      preset: "30days"
    });
    const statsResults = await fetchAllStats(this.fetch, page.host, "your-analytics.org");
    const stats = {};

    statsResults.forEach(({status, value}) => {
      if (status === "fulfilled") {
        stats[value.storeName] = value.data;
      } else {
        stats[value.storeName] = {};
      }
    });

    return {
      stats
    };
  };
</script>


<script>
  import { statsStores } from "../api/stats";
  import Features from "../components/landing-page/features.svelte";
  import Header from "../components/header/index.svelte";
  import Hero from "../components/landing-page/hero.svelte";
  import Stats from "../components/landing-page/stats.svelte";
  import FrontendIntegrations from "../components/landing-page/frontend-integrations.svelte";
  import Pricing from "../components/landing-page/pricing.svelte";

  export let stats;

  Object.entries(stats).forEach(([storeName, data]) => {
    statsStores[storeName].set(data);
  });
</script>

<svelte:head>
	<title>Web analytics platform. Open source, privacy-focused and simple. | Your Analytics</title>
  {@html '<script async src="https://your-analytics.org/ya.js" data-domain="your-analytics.org"></script>'}
</svelte:head>

<Header />
<Hero />
<Features />
<Stats />
<FrontendIntegrations />
<Pricing />