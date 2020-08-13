<script>
  import { goto, stores } from "@sapper/app";
  import { onMount } from "svelte";
  import { userMetadataStore, init, logout } from "../../auth/magic";
  import Card from "../../components/card.svelte";
  import DateRange from "../../components/date-range.svelte";
  import Devices from "../../components/stats/devices.svelte";
  import TopPages from "../../components/stats/top-pages.svelte";
  import TopReferrers from "../../components/stats/top-referrers.svelte";
  import TotalPageviews from "../../components/stats/total-pageviews.svelte";
  import UniqueVisitors from "../../components/stats/unique-visitors.svelte";
  import Visitors from "../../components/stats/visitors.svelte";
  import WorldMap from "../../components/stats/world-map.svelte";

  const { page } = stores();

  $: userEmail = ($userMetadataStore && $userMetadataStore.email) || "";
  $: userEmailHash = $userMetadataStore && $userMetadataStore.emailHash;

  let isMobileMenuOpen = false;
  let isProfileMenuOpen = false;
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

<div>
  <div class="bg-gray-800 pb-32">
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="border-b border-gray-700">
          <div class="flex items-center justify-between h-16 px-4 sm:px-0">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <img class="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo">
              </div>
              <div class="hidden md:block">
                {#if false}
                <div class="ml-10 flex items-baseline">
                  <a href="/TODO" class="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</a>
                  <a href="/TODO" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>
                </div>
                {/if}
              </div>
            </div>
            <div class="hidden md:block">
              <div class="ml-4 flex items-center md:ml-6">
                {#if false}
                <button class="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700" aria-label="Notifications">
                  <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {/if}

                <!-- Profile dropdown -->
                <div class="ml-3 relative">
                  <div>
                    <button on:click={() => { isProfileMenuOpen = !isProfileMenuOpen }} class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid" id="user-menu" aria-label="User menu" aria-haspopup="true">
                      <img class="h-8 w-8 rounded-full" src="https://www.gravatar.com/avatar/{userEmailHash}.jpg?d=identicon" alt="Profile avatar" />
                    </button>
                  </div>
                  <!--
                    Profile dropdown panel, show/hide based on dropdown state.

                    Entering: "transition ease-out duration-100"
                      From: "transform opacity-0 scale-95"
                      To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                      From: "transform opacity-100 scale-100"
                      To: "transform opacity-0 scale-95"
                  -->
                  {#if isProfileMenuOpen}
                  <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                    <div class="py-1 rounded-md bg-white shadow-xs">
                      {#if false}
                      <a href="/TODO" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                      <a href="/TODO" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      {/if}
                      <button on:click={logout} class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">Sign out</button>
                    </div>
                  </div>
                  {/if}
                </div>
              </div>
            </div>
            <div class="-mr-2 flex md:hidden">
              <!-- Mobile menu button -->
              <button on:click={() => { isMobileMenuOpen = !isMobileMenuOpen}} class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                {#if isMobileMenuOpen}
                  <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                {:else}
                  <svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                {/if}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!--
        Mobile menu, toggle classes based on menu state.

        Open: "block", closed: "hidden"
      -->
      {#if isMobileMenuOpen}
        <div class="block border-b border-gray-700 md:hidden">
          {#if false}
          <div class="px-2 py-3 sm:px-3">
            <a href="/TODO" class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Dashboard</a>
            <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>
          </div>
          {/if}
          <div class="pt-4 pb-3 border-t border-gray-700">
            <div class="flex items-center px-5">
              <div class="flex-shrink-0">
                <img class="h-10 w-10 rounded-full" src="https://www.gravatar.com/avatar/{userEmailHash}.jpg?d=identicon" alt="Profile avatar">
              </div>
              <div class="ml-3">
                <div class="text-base font-medium leading-none text-white">Tom Cook</div>
                <div class="mt-1 text-sm font-medium leading-none text-gray-400">{userEmail}</div>
              </div>
            </div>
            <div class="mt-3 px-2" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
              {#if false}
              <a href="/TODO" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Your Profile</a>
              <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Settings</a>
              {/if}
              <button on:click={logout} class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Sign out</button>
            </div>
          </div>
        </div>
      {/if}
    </nav>
    <header class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl leading-9 font-bold text-white">
          Dashboard - {$page.params.site}
        </h1>
      </div>
    </header>
  </div>

  <main class="-mt-32">
    <div class="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
        {#if isReadyToDisplayStats}
          <DateRange />
          <Card>
            <UniqueVisitors />
            <TotalPageviews />
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
      </div>
    </div>
  </main>
</div>
