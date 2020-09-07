<script>
  import Footer from "../components/footer.svelte";
  import TailwindCSS from '../components/tailwindcss.svelte';

  export let segment;

  $: segment; // Gets rid of the "<Laout> was created with unknown prop 'segment'" browser console warning
</script>

<style>
  :global(body) {
    @apply bg-gray-100;
  }
</style>

<TailwindCSS />
<main class="max-w-7xl mx-auto sm:px-6 lg:px-8">
	<slot></slot>
</main>
<Footer />