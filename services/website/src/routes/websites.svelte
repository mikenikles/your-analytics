<script>
  import { userMetadataStore } from "../auth/magic";
  import Authenticated from "../components/authenticated.svelte";
  import Card from "../components/card.svelte";
  import Header from "../components/header/index.svelte";
  import MainContent from "../components/main-content.svelte";
</script>

<Header />
<Authenticated>
  <MainContent>
    <h1 class="mx-2 text-4xl">Websites</h1>
    {#each Object.entries($userMetadataStore.sites) as [url]}
      <Card>
        <div class="p-4 flex justify-between items-center">
          <a href="/{url}" class="text-pink-600 hover:underline">{url}</a>
          <a href="/{url}/settings">
            <img src="/svg/cog.svg" alt="Cog icon" class="h-12 w-12" />
          </a>
        </div>
      </Card>
    {/each}
  </MainContent>
</Authenticated>
