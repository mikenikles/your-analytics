<script lang="ts">
  import { uniqueVisitors } from "../../api/stats";
  import ComparisonNumbers from "./elements/comparison-numbers.svelte";
</script>

<ComparisonNumbers title="Unique Visitors" currentValue={$uniqueVisitors} />
