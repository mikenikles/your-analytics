<script>
  import TailwindCSS from '../components/tailwindcss.svelte';

  export let segment;

  $: segment; // Gets rid of the "<Laout> was created with unknown prop 'segment'" browser console warning
</script>

<TailwindCSS />
<main>
	<slot></slot>
</main>