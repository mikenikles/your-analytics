<script>
  import { topPages } from "../../api/stats";
  import ProgressBar from "./elements/progress-bar.svelte";
  import Loading from "./loading.svelte";

  export let showTitle = true;
  export let showShowMore = true;

  $: topEntries = Object.entries($topPages || {});
  $: topTen = topEntries.length > 10 ? topEntries.slice(0, 10) : topEntries;
  $: rest = topEntries.length > 10 ? topEntries.slice(10) : [];
  $: maxTotal = Math.max(...Object.values($topPages || {}));

  let showRest = false;
</script>

{#if $topPages}
  {#if showTitle}
    <h2>Top Pages</h2>
  {/if}

  {#each topTen as [page, total]}
    <ProgressBar label={page} value={total} percentage={(total / maxTotal) * 100} />
  {/each}
  {#if showShowMore}
    {#if showRest}
      {#each rest as [page, total]}
        <ProgressBar label={page} value={total} percentage={(total / maxTotal) * 100} />
      {/each}
    {:else}
      <button on:click={() => showRest = true}>Show more</button>
    {/if}
  {/if}
{:else}
  <Loading />
{/if}
