<script>
  import { goto, stores } from '@sapper/app';
  import { fetchAllStats } from "../api/stats";
  import { userMetadataStore } from "../auth/magic";	

  const { page } = stores();
  const navigateAndFetchStats = async () => {
    await goto(`/${selectedWebsite}`);
    await fetchAllStats();
  };

  let selectedWebsite = $page.params.site;
  $: websites = $userMetadataStore && $userMetadataStore.sites;
  $: if (selectedWebsite !== $page.params.site) {
    navigateAndFetchStats();
  }
</script>

{#if websites}
  <div class="mx-2 mt-4">
    <select bind:value={selectedWebsite} class="form-select">
      {#each Object.entries(websites) as [value]}
        <option>{value}</option>
      {/each}
    </select>
  </div>
{/if}
