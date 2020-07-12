<script>
  import { goto } from '@sapper/app';
  import { onMount } from "svelte";
  import { login, initAuth } from "../auth";
  import { authTokenStore, authUserInfoStore } from "../auth/store";

  initAuth();

  $: $authTokenStore && goto("/dashboard");
</script>

{#if !$authTokenStore}
  <h1>Create an account</h1>

  <button on:click={login}>Sign up</button>
{/if}
