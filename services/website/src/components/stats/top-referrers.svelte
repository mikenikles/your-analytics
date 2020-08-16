<script>
  import { topReferrers } from "../../api/stats";
  import ProgressBar from "./elements/progress-bar.svelte";
  import Loading from "./loading.svelte";

  export let showTitle = true;
  export let showShowMore = true;

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
  {#if showTitle}
    <h2>Top Referrers</h2>
  {/if}

  {#each topTen as [domain, total]}
    <ProgressBar label={domain} value={total} percentage={(total / maxTotal) * 100}>
      <img slot="icon" src="https://www.google.com/s2/favicons?domain={domain}" alt="{domain} favicon" />
    </ProgressBar>
  {/each}
  {#if showShowMore}
    {#if showRest}
      {#each rest as [domain, total]}
        <ProgressBar label={domain} value={total} percentage={(total / maxTotal) * 100}>
          <img slot="icon" src="https://www.google.com/s2/favicons?domain={domain}" alt="{domain} favicon" />
        </ProgressBar>
      {/each}
    {:else}
      <button on:click={() => showRest = true}>Show more</button>
    {/if}
  {/if}
{:else}
  <Loading />
{/if}
