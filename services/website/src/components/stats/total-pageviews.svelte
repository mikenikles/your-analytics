<script>
  import { totalPageviews } from "../../api/stats";
</script>

{#if $totalPageviews}
  <p>Total pageviews: {$totalPageviews}</p>
{/if}
