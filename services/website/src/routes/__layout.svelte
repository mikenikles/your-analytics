<script lang="ts">
  import Footer from "$lib/components/footer.svelte";

  export let segment: string;

  $: segment; // Gets rid of the "<Layout> was created with unknown prop 'segment'" browser console warning
</script>

<style>
  :global(body) {
    @apply bg-gray-100;
  }
</style>

<svelte:head>
  <meta name="description" content="An open source web analytis platform with a focus on privacy and simplicity.">
</svelte:head>

<main>
	<slot></slot>
</main>
<Footer />