<script>
  import { sub } from "date-fns";
  import { onMount } from "svelte";
  import { recordEmail } from "../api/beta";
  import { dateRange, siteVisibility } from "../api/stats";
  import Card from "../components/card.svelte";
  import Features from "../components/landing-page/features.svelte";
  import Header from "../components/header/index.svelte";
  import Hero from "../components/landing-page/hero.svelte";

  import StatsSection from "../components/landing-page/stats-section/index.svelte";
  import Content from "../components/landing-page/stats-section/content.svelte";
  import StatsExample from "../components/landing-page/stats-section/stats-example.svelte";

  import Devices from "../components/stats/devices.svelte";
  import TopPages from "../components/stats/top-pages.svelte";
  import TopReferrers from "../components/stats/top-referrers.svelte";
  import TotalPageviews from "../components/stats/total-pageviews.svelte";
  import UniqueVisitors from "../components/stats/unique-visitors.svelte";
  import Visitors from "../components/stats/visitors.svelte";
  import WorldMap from "../components/stats/world-map.svelte";

  let isMobileMenuOpen = false;
  let isEmailAdded;

  const handleSubmit = async (event) => {
    const email = new FormData(event.target).get("email");
    isEmailAdded = await recordEmail(email);
  };

  onMount(() => {
    siteVisibility.set("public");
    dateRange.set({
      from: sub(new Date(), {
        days: 30
      }).getTime(),
      to: new Date().getTime()
    })
  });
</script>

<svelte:head>
	<title>Web analytics platform. Open source, privacy-focused and simple. | Your Analytics</title>
  <meta name="description" content="An open source web analytis platform with a focus on privacy and simplicity.">
  <!-- {@html '<script async src="https://your-analytics.org/ya.js" data-domain="your-analytics.org"></script>'} -->
</svelte:head>

<Header />
<Hero />
<Features />
