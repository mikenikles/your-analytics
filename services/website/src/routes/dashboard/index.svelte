<script>
  import { goto } from '@sapper/app';
  import { onMount } from "svelte";
  import { logout, initAuth } from "../../auth";
  import { authTokenStore, authUserInfoStore } from "../../auth/store";

  initAuth();

  $: isAuthenticated = $authTokenStore;

  $: if (isAuthenticated) {
    fetchVisitors();
  }

  let result;

  const fetchVisitors = async () => {
    const response = await fetch("https://8081-fe64c5f9-d995-4313-b604-3351faf8883a.ws-eu01.gitpod.io/visitors", {
      headers: {
        Authorization: `Bearer ${$authTokenStore}`
      }
    });

    result = await response.json();
  }
</script>

{#if isAuthenticated}
  <h1>Dashboard</h1>

  <button on:click={logout}>Logout</button>
  <pre>{JSON.stringify($authUserInfoStore)}</pre>

  <pre>{JSON.stringify($authTokenStore)}</pre>

  {#if result}
    <pre>{result}</pre>
  {/if}
{/if}