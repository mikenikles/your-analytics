<script>
  import { goto } from '@sapper/app';
  import { userMetadataStore } from "../auth/magic";	

  let selectedWebsite;

  $: websites = $userMetadataStore && $userMetadataStore.sites;
  $: selectedWebsite && goto(`/${selectedWebsite}`);
</script>

{#if websites}
  <div class="mx-2 mt-4">
    <select bind:value={selectedWebsite} class="form-select text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
      {#each Object.entries(websites) as [value]}
        <option {value}>{value}</option>
      {/each}
    </select>
  </div>
{/if}
