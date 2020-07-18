<script>
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";
  import { userMetadataStore, userTokenStore, init } from "../../auth/magic";

  let visitors;
  onMount(async () => {
    await init();
    if (!$userMetadataStore) {
      goto("/auth");
      return;
    }

    const response = await fetch("https://8081-fe64c5f9-d995-4313-b604-3351faf8883a.ws-eu01.gitpod.io/visitors", {
      headers: new Headers({
        Authorization: "Bearer " + $userTokenStore
      })
    });
    
    if (response.status === 200) {
      visitors = (await response.json()).visitors;
    }
  });
</script>

{#if $userMetadataStore}
  <p>Welcome to the secure area</p>
  <pre>
    {JSON.stringify($userMetadataStore)}
  </pre>

  {#if visitors}
    {#each Object.entries(visitors) as [month, total]}
      <p>{month}: {total}</p>
    {/each}
  {/if}
{/if}
