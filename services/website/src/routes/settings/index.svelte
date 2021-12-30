<script context="module" lang="ts">
  import { getSettings } from "../../api/settings";

  export async function load({session}) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "auth"
      }
    }

    const settings = await getSettings();

    return {
      props: {settings}
    };
  };
</script>

<script lang="ts">
  import { setContext } from "svelte";
  import { contextKeySettings } from "../../config";
  import Header from "../../components/header/index.svelte";
  import MainContent from "../../components/main-content.svelte";
  import Billing from "../../components/settings/billing/index.svelte";

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