<script lang="ts">
  import Footer from "../components/footer.svelte";
  import TailwindCSS from '../components/tailwindcss.svelte';
  import { session } from "../stores/session";

  export let segment: string;

  $: segment; // Gets rid of the "<Layout> was created with unknown prop 'segment'" browser console warning

  session.init();
</script>

<style>
  :global(body) {
    @apply bg-gray-100;
  }
</style>

<svelte:head>
  <meta name="description" content="An open source web analytis platform with a focus on privacy and simplicity.">
</svelte:head>

<TailwindCSS />
<main>
	<slot></slot>
</main>
<Footer />