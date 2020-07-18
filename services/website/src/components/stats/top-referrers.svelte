<script>
  import { topReferrers } from "../../api/stats";
</script>

<h2>Top Referrers</h2>

{#each Object.entries($topReferrers) as [domain, total]}
  <div>
    <p>{domain}: {total}</p>
  </div>
{/each}
