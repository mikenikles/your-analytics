<script>
  import { goto } from '@sapper/app';
  import { onMount } from "svelte";
  import { userMetadataStore, init, login } from "../auth/magic";

  $: if ($userMetadataStore) {
    goto("/dashboard");
  }

  onMount(() => {
    init();
  });
</script>

{#if !$userMetadataStore}
  <form on:submit|preventDefault={login}>
    <input
      type="email"
      name="email"
      required="required"
      placeholder="Enter your email" />
    <button type="submit">Send</button>
  </form>
{/if}
