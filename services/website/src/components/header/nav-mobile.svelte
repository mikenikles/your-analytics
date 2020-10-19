<script lang="ts">
  import { goto } from "@sapper/app";
  import { logout } from "../../auth/magic";
  import isOpen from "../../stores/mobile-menu";
  import { session } from "../../stores/session";

  export let handleLogout;

  $: user = $session.user || {};
  $: userWebsites = Object.keys(user.sites || {});
  $: hasMultipleSites = userWebsites.length > 1;
  $: userFirstName = user.firstName || "";
  $: userEmail = user.email || "";
  $: userEmailHash = user.emailHash;
</script>

<div class="md:hidden">
  {#if $isOpen}
    {#if false}
    <div class="pt-2 pb-3">
      <a href="/EXAMPLE" class="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Your websites</a>
      <a href="/EXAMPLE" class="mt-1 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out">Team</a>
    </div>
    {/if}
    <div class="pt-4 pb-3 border-t border-gray-200">
      <div class="flex items-center px-4">
        <div class="flex-shrink-0">
          <img class="h-10 w-10 rounded-full" src="https://www.gravatar.com/avatar/{userEmailHash}.jpg?d=identicon" alt="Profile avatar">
        </div>
        <div class="ml-3">
          <div class="text-base font-medium leading-6 text-gray-800">{userFirstName}</div>
          <div class="text-sm font-medium leading-5 text-gray-500">{userEmail}</div>
        </div>
      </div>
      <div class="mt-3">
        {#if hasMultipleSites}
          <a href="/websites" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Your websites</a>
        {:else}
          <a href="/{userWebsites[0]}" class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">{userWebsites[0]}</a>
        {/if}
        <button on:click={() => {$isOpen = false; handleLogout();}} class="mt-1 block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 focus:outline-none focus:text-gray-800 focus:bg-gray-100 transition duration-150 ease-in-out">Sign out</button>
      </div>
    </div>
  {/if}
</div>
