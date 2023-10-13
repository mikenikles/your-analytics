<script lang="ts">
  import { totalPageviews } from "$lib/api/stats";
  import ComparisonNumbers from "./elements/comparison-numbers.svelte";
</script>

<ComparisonNumbers title="Total Pageviews" currentValue={$totalPageviews} />
