<script context="module" lang="ts">
  import { getSettings } from "$lib/api/site/settings";

  export async function load({fetch, page, session}) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "auth"
      }
    }

    const settings = await getSettings(fetch, page.host, page.params.site);

    return {
      props: {settings}
    };
  };
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { setContext } from "svelte";
  import { contextKeySiteSettings } from "$lib/config";
  import Header from "$lib/components/header/index.svelte";
  import MainContent from "$lib/components/main-content.svelte";
  import Website from "$lib/components/site/settings/website/index.svelte";

  export let settings: {
    visibility: string;
  };

  setContext(contextKeySiteSettings, settings);
</script>

<svelte:head>
  <title>Settings for {$page.params.site} | Your Analytics</title>
</svelte:head>

<Header />
<MainContent>
  <Website />
</MainContent>