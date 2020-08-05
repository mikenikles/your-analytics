<script>
  import Authenticated from "../components/authenticated.svelte";
  import { userMetadataStore } from "../auth/magic";
</script>

<Authenticated>
  <h1>Websites</h1>

  {#each Object.entries($userMetadataStore.sites) as [url, settings]}
    <p>
      <a href="/{url}">{url}</a>
    </p>
  {/each}
</Authenticated>
