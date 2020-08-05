<script>
  import { userMetadataStore, init, logout } from "../auth/magic";
  import { onMount } from "svelte";

  onMount(async () => {
    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }
  });
</script>

{#if $userMetadataStore}
  <slot />
{:else}
  <p>Loading...</p>
{/if}