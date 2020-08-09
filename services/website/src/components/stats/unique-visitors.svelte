<script>
  import { uniqueVisitors } from "../../api/stats";
  import Loading from "./loading.svelte";
</script>

{#if $uniqueVisitors}
  <p>Unique visitors: {$uniqueVisitors}</p>
{:else}
  <Loading />
{/if}
