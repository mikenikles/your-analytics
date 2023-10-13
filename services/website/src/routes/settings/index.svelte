<script context="module" lang="ts">
  import { getSettings } from "$lib/api/settings";

  export async function load({fetch, session}) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "auth"
      }
    }

    const settings = await getSettings(fetch);

    return {
      props: {settings}
    };
  };
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { contextKeySettings } from "$lib/config";
  import Header from "$lib/components/header/index.svelte";
  import MainContent from "$lib/components/main-content.svelte";
  import Billing from "$lib/components/settings/billing/index.svelte";

  export let settings: {
    visibility: string;
  };

  setContext(contextKeySettings, settings);
</script>

<svelte:head>
  <title>Settings | Your Analytics</title>
</svelte:head>

<Header />
<MainContent>
  <Billing />
</MainContent>