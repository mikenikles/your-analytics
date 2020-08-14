<script>
  import { stores } from "@sapper/app";
  import { userMetadataStore, logout } from "../auth/magic";

  export let title;

  const { page } = stores();

  $: hasMultipleSites = $userMetadataStore && Object.keys($userMetadataStore.sites || {}).length > 1;
  $: userFirstName = ($userMetadataStore && $userMetadataStore.firstName) || "";
  $: userEmail = ($userMetadataStore && $userMetadataStore.email) || "";
  $: userEmailHash = $userMetadataStore && $userMetadataStore.emailHash;

  let isMobileMenuOpen = false;
  let isProfileMenuOpen = false;

  const handleLogout = async () => {
    await logout();
    await goto("/auth");
  };
</script>

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
              {#if hasMultipleSites}
              <div class="ml-10 flex items-baseline">
                <a href="/websites" class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your websites</a>
                {#if false}
                <a href="/TODO" class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>
                {/if}
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
                    <button on:click={handleLogout} class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">Sign out</button>
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
        {#if hasMultipleSites}
        <div class="px-2 py-3 sm:px-3">
          <a href="/websites" class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your websites</a>
          {#if false}
          <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>
          {/if}
        </div>
        {/if}
        <div class="pt-4 pb-3 border-t border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://www.gravatar.com/avatar/{userEmailHash}.jpg?d=identicon" alt="Profile avatar">
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">{userFirstName}</div>
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
        {title}
      </h1>
    </div>
  </header>
</div>