<script>
  import { topReferrers } from "../../api/stats";
  import ProgressBar from "./elements/progress-bar.svelte";
  import Loading from "./loading.svelte";

  $: topEntries = Object.entries($topReferrers || {});
  $: topTen = topEntries.length > 10 ? topEntries.slice(0, 10) : topEntries;
  $: rest = topEntries.length > 10 ? topEntries.slice(10) : [];
  $: maxTotal = Math.max(...Object.values($topReferrers || {}));

  let showRest = false;
</script>

<style>
  img {
    height: 16px;
    width: 16px;
  }
</style>

{#if $topReferrers}
  <h2>Top Referrers</h2>

  {#each topTen as [domain, total]}
    <ProgressBar label={domain} value={total} percentage={(total / maxTotal) * 100}>
      <img slot="icon" src="https://external-content.duckduckgo.com/ip3/{domain}.ico" alt="{domain} favicon" />
    </ProgressBar>
  {/each}
  {#if showRest}
    {#each rest as [domain, total]}
      <ProgressBar label={domain} value={total} percentage={(total / maxTotal) * 100}>
        <img slot="icon" src="https://external-content.duckduckgo.com/ip3/{domain}.ico" alt="{domain} favicon" />
      </ProgressBar>
    {/each}
  {:else}
    <button on:click={() => showRest = true}>Show more</button>
  {/if}
{:else}
  <Loading />
{/if}
