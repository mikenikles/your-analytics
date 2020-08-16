<script>
  import { sub } from "date-fns";
  import { onMount } from "svelte";
  import { recordEmail } from "../api/beta";
  import { dateRange, siteVisibility } from "../api/stats";
  import Card from "../components/card.svelte";

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
  {@html '<script async src="https://your-analytics.org/ya.js" data-domain="your-analytics.org"></script>'}
</svelte:head>

<div class="bg-gray-50">
  <div class="relative overflow-hidden">
    <div class="relative pt-6 pb-12 lg:pb-20">
      {#if false}
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
        <nav class="relative flex items-center justify-between sm:h-10 md:justify-center">
          <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
            <div class="flex items-center justify-between w-full md:w-auto">
              <a href="/" aria-label="Home">
                <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Logo">
              </a>
              <div class="-mr-2 flex items-center md:hidden">
                <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" id="main-menu" aria-label="Main menu" aria-haspopup="true">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {#if false}
          <div class="hidden md:flex md:space-x-10">
            <a href="/TODO" class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Product</a>
            <a href="/TODO" class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Features</a>
            <a href="/TODO" class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Marketplace</a>
            <a href="/TODO" class="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out">Company</a>
          </div>
          {/if}
          <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
            <span class="inline-flex rounded-md shadow">
              <a href="/auth" class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-gray-50 active:text-indigo-700 transition duration-150 ease-in-out">
                Log in
              </a>
            </span>
          </div>
        </nav>
      </div>

      <!--
        Mobile menu, show/hide based on menu open state.

        Entering: "duration-150 ease-out"
          From: "opacity-0 scale-95"
          To: "opacity-100 scale-100"
        Leaving: "duration-100 ease-in"
          From: "opacity-100 scale-100"
          To: "opacity-0 scale-95"
      -->
      <div class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
        <div class="rounded-lg shadow-md">
          <div class="rounded-lg bg-white shadow-xs overflow-hidden" role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
            <div class="px-5 pt-4 flex items-center justify-between">
              <div>
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="">
              </div>
              <div class="-mr-2">
                <button on:click={() => { isMobileMenuOpen = !isMobileMenuOpen}} type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out" aria-label="Close menu">
                  {#if isMobileMenuOpen}
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  {:else}
                    <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                  {/if}
                </button>
              </div>
            </div>
            {#if isMobileMenuOpen}
              {#if false}
              <div class="px-2 pt-2 pb-3">
                <a href="/TODO" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Product</a>
                <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Features</a>
                <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Marketplace</a>
                <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out" role="menuitem">Company</a>
              </div>
              {/if}
              <div>
                <a href="/auth" class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out" role="menuitem">
                  Log in
                </a>
              </div>
            {/if}
          </div>
        </div>
      </div>
      {/if}

      <div class="mt-10 mx-auto max-w-screen-xl px-4 sm:px-6 md:mt-16 lg:mt-20">
        <div class="text-center">
          <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
            Web analytics with
            <br>
            <span class="text-indigo-600">privacy and simplicity in mind</span>
          </h2>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            <strong>Your Analytics</strong> - an open source, privacy-focused web analytics platform. Focus on the basics and respect visitor privacy.
          </p>

          <div class="mt-12 mx-auto sm:max-w-lg sm:text-center lg:text-left">
            <p class="text-base font-medium text-gray-900">
              Sign up to get notified when it’s ready.
            </p>
            <form on:submit|preventDefault={handleSubmit} class="mt-3 sm:flex">
              <input aria-label="Email" name="email" class="appearance-none block w-full px-3 py-3 border border-gray-300 text-base leading-6 rounded-md placeholder-gray-500 shadow-sm focus:outline-none focus:placeholder-gray-400 focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:flex-1" placeholder="Enter your email">
              <button type="submit" class="mt-3 w-full px-6 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-700 focus:outline-none focus:border-gray-900 focus:shadow-outline-gray active:bg-gray-900 transition duration-150 ease-in-out sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto">
                Notify me
              </button>
            </form>
            {#if isEmailAdded}
              <p class="mt-3 text-sm leading-5 text-gray-500">
                Fantastic, we will be in touch.
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
    {#if false}
    <div class="relative">
      <div class="absolute inset-0 flex flex-col">
        <div class="flex-1"></div>
        <div class="flex-1 w-full bg-gray-50"></div>
      </div>
      <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
        <img class="relative rounded-lg shadow-lg" src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.png" alt="App screenshot">
      </div>
    </div>
    {/if}
  </div>
  
  <div class="py-16 bg-gray-50 overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
      <div class="relative">
        <h3 class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
          Visibility into what matters
        </h3>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl leading-7 text-gray-500">
          We keep it simple and focus on web analytics metrics that matter.
        </p>
      </div>

      <div class="relative mt-12 sm:mt-16 lg:mt-24">
        <div class="flex flex-wrap">
          <StatsSection>
            <div slot="left">
              <Content title="Unique visitors &amp; page views" description="How many unique visitors did your website have and how many pages did these visitors view?" />
            </div>
            <div slot="right">
              <StatsExample>
                <Card>
                  <UniqueVisitors />
                  <TotalPageviews />
                </Card>
                <Card>
                  <Visitors />
                </Card>
              </StatsExample>
            </div>
          </StatsSection>
        </div>

        <div class="flex flex-col-reverse lg:flex-row flex-wrap">
          <StatsSection>
            <div slot="right">
              <Content title="Top Pages" description="Learn which pages on your website are most and least popular." />
            </div>
            <div slot="left">
              <StatsExample>
                <Card>
                  <TopPages showTitle={false} showShowMore={false} />
                </Card>
              </StatsExample>
            </div>
          </StatsSection>
        </div>

        <div class="flex flex-wrap">
          <StatsSection>
            <div slot="left">
              <Content title="Top Referrers" description="Learn which other websites refer visitors to you." />
            </div>
            <div slot="right">
              <StatsExample>
                <Card>
                  <TopReferrers showTitle={false} showShowMore={false} />
                </Card>
              </StatsExample>
            </div>
          </StatsSection>
        </div>

        <div class="flex flex-col-reverse lg:flex-row flex-wrap">
          <StatsSection>
            <div slot="right">
              <Content title="Devices" description="Learn what devices your visitors use (i.e. operating system, browser and device type)." />
            </div>
            <div slot="left">
              <StatsExample>
                <Card>
                  <Devices showTitle={false} />
                </Card>
              </StatsExample>
            </div>
          </StatsSection>
        </div>

        <div class="flex flex-wrap">
          <StatsSection>
            <div slot="left">
              <Content title="World Map" description="Learn which countries your visitors are from." />
            </div>
            <div slot="right">
              <StatsExample>
                <Card>
                  <WorldMap showTitle={false} />
                </Card>
              </StatsExample>
            </div>
          </StatsSection>
        </div>
      </div>
    </div>
  </div>
</div>
