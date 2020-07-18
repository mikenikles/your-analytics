<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { fetchVisitors, visitors } from "../../api/stats";
  import { userMetadataStore, init } from "../../auth/magic";
  import Visitors from "../../components/stats/visitors.svelte";

  onMount(async () => {
    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }
    await fetchVisitors();
  });
</script>

<h1>Analytics</h1>

{#if $visitors}
  <Visitors />
{/if}
