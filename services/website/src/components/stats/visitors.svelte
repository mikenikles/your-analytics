<script>
  import { visitors } from "../../api/stats";
</script>

{#if $visitors}
  {#each Object.entries($visitors) as [month, total]}
    <p>{month}: {total}</p>
  {/each}
{/if}
