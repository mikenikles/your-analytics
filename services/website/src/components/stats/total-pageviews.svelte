<script>
  import { totalPageviews } from "../../api/stats";
  import ComparisonNumbers from "./elements/comparison-numbers.svelte";
</script>

<ComparisonNumbers currentValue={$totalPageviews} />
