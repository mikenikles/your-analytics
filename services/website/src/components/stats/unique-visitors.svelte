<script>
  import { uniqueVisitors } from "../../api/stats";
</script>

{#if $uniqueVisitors}
  <p>Unique visitors: {$uniqueVisitors}</p>
{/if}
