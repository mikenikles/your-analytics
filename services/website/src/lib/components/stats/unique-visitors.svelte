<script lang="ts">
  import { uniqueVisitors } from "$lib/api/stats";
  import ComparisonNumbers from "./elements/comparison-numbers.svelte";
</script>

<ComparisonNumbers title="Unique Visitors" currentValue={$uniqueVisitors} />
