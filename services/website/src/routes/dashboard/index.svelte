<script>
  import { goto } from '@sapper/app';
  import { onMount } from "svelte";
  import { logout, initAuth } from "../../auth";
  import { authTokenStore, authUserInfoStore } from "../../auth/store";

  initAuth();

  $: isAuthenticated = $authTokenStore;
</script>

{#if isAuthenticated}
  <h1>Dashboard</h1>

  <button on:click={logout}>Logout</button>
  <pre>{JSON.stringify($authUserInfoStore)}</pre>

  <pre>{JSON.stringify($authTokenStore)}</pre>
{/if}