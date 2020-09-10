<script>
  import Features from "../components/landing-page/features.svelte";
  import Header from "../components/header/index.svelte";
  import Hero from "../components/landing-page/hero.svelte";
  import Stats from "../components/landing-page/stats.svelte";
  import FrontendIntegrations from "../components/landing-page/frontend-integrations.svelte";
  import Pricing from "../components/landing-page/pricing.svelte";
</script>

<svelte:head>
	<title>Web analytics platform. Open source, privacy-focused and simple. | Your Analytics</title>
  <meta name="description" content="An open source web analytis platform with a focus on privacy and simplicity.">
  {@html '<script async src="https://your-analytics.org/ya.js" data-domain="your-analytics.org"></script>'}
</svelte:head>

<Header />
<Hero />
<Features />
<Stats />
<FrontendIntegrations />
<Pricing />