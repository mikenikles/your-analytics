<script>
  import { stores } from "@sapper/app";
  import Authenticated from "../../components/authenticated.svelte";
  import Header from "../../components/header.svelte";
  import MainContent from "../../components/main-content.svelte";

  const { page } = stores();

  $: pageTitle = `Settings - ${$page.params.site}`;
</script>

<Authenticated>
  <Header title={pageTitle} />
  <MainContent>
    Settings go here
  </MainContent>
</Authenticated>