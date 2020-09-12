<script>
  import { goto } from "@sapper/app";
  import { userMetadataStore, init, logout } from "../auth/magic";
  import { onMount } from "svelte";

  onMount(async () => {
    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }
  });
</script>

{#if $userMetadataStore}
  <slot />
{:else}
  <div class="max-w-7xl mx-auto flex">
    <span class="inline-flex items-center pl-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-bg-gray-800 focus:outline-none transition ease-in-out duration-150">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-bg-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </span>
    <p class="p-4 pl-0 text-2xl">Loading...</p>
  </div>
{/if}