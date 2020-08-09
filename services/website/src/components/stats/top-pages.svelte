<script>
  import { topPages } from "../../api/stats";
  import Loading from "./loading.svelte";
</script>

{#if $topPages}
  <h2>Top Pages</h2>

  {#each Object.entries($topPages) as [page, total]}
    <div>
      <p>{page}: {total}</p>
    </div>
  {/each}
{:else}
  <Loading />
{/if}
