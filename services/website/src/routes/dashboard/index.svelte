<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { fetchVisitors } from "../../api/stats";
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

{#if $userMetadataStore}
  <p>Welcome to the secure area</p>
  <pre>
    {JSON.stringify($userMetadataStore)}
  </pre>

  <Visitors />
{/if}
