<script>
  import { topPages } from "../../api/stats";
</script>

{#if $topPages}
  <h2>Top Pages</h2>

  {#each Object.entries($topPages) as [page, total]}
    <div>
      <p>{page}: {total}</p>
    </div>
  {/each}
{/if}
