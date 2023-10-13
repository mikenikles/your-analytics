<script context="module" lang="ts">
  import { ADMIN_API_BASE_URL } from "$lib/config";

  export async function load({fetch, page, session}) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "auth"
      }
    }

    const response = await fetch(`https://${page.host}/${ADMIN_API_BASE_URL}/website`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      credentials: "include",
    });
    if (response.status === 200) {
      const sites = await response.json();
      return {
        props: {sites},
      };
    }

    return {
      props: {sites: []},
    };
  }
</script>

<script lang="ts">
  import Card from "$lib/components/card.svelte";
  import Header from "$lib/components/header/index.svelte";
  import MainContent from "$lib/components/main-content.svelte";

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
        <a
          href="/{url}"
          sveltekit:prefetch
          class="text-pink-600 hover:underline"
        >{url}</a>
        <a href="/{url}/settings" sveltekit:prefetch>
          <img src="/svg/cog.svg" alt="Cog icon" class="h-12 w-12" />
        </a>
      </div>
    </Card>
  {/each}
</MainContent>
