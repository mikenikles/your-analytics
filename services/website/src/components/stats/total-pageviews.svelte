<script>
  import { totalPageviews } from "../../api/stats";
  import Loading from "./loading.svelte";
</script>

{#if $totalPageviews}
  <p>Total pageviews: {$totalPageviews}</p>
{:else}
  <Loading />
{/if}
