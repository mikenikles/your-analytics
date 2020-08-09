<script>
  import { topReferrers } from "../../api/stats";
  import Loading from "./loading.svelte";
</script>

<style>
  img {
    height: 16px;
    width: 16px;
  }
</style>

{#if $topReferrers}
  <h2>Top Referrers</h2>

  {#each Object.entries($topReferrers) as [domain, total]}
    <div>
      <p class="flex">
        <img src="https://external-content.duckduckgo.com/ip3/{domain}.ico" alt="{domain} favicon" />
        {domain}: {total}
      </p>
    </div>
  {/each}
{:else}
  <Loading />
{/if}
