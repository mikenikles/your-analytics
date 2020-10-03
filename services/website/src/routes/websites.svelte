<script context="module" lang="ts">
  import type sapperCommon from "@sapper/common";

  interface ISession {
    user?: {}
  };

  export async function preload(_page: sapperCommon.Page, session: ISession) {
    const { user } = session;

    if (!user) {
      this.redirect(302, "auth");
      return;
    }

    const response = await this.fetch("api/admin/website");
    if (response.status === 200) {
      const sites = await response.json();
      return {
        sites
      };
    }

    return {
      sites: []
    };
  };
</script>

<script lang="ts">
  import Card from "../components/card.svelte";
  import Header from "../components/header/index.svelte";
  import MainContent from "../components/main-content.svelte";

  export let sites: {};
</script>

<svelte:head>
  <title>Your websites | Your Analytics</title>
</svelte:head>

<Header />
<MainContent>
  <h1 class="mx-2 text-4xl">Websites</h1>
  {#each Object.entries(sites) as [url]}
    <Card>
      <div class="p-4 flex justify-between items-center">
        <a href="/{url}" rel="prefetch" class="text-pink-600 hover:underline">{url}</a>
        <a href="/{url}/settings" rel="prefetch">
          <img src="/svg/cog.svg" alt="Cog icon" class="h-12 w-12" />
        </a>
      </div>
    </Card>
  {/each}
</MainContent>
