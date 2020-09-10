<script>
  export let rowIndex;
</script>

<style>
  .even {
    @apply bg-gray-100;
  }

  .odd {
    @apply bg-white;
  }

  tr :global(td:first-child) {
    @apply rounded-l-full;
  }

  tr :global(td:last-child) {
    @apply rounded-r-full;
  }
</style>

<tr class:even={rowIndex % 2 === 0} class:odd={rowIndex % 2 !== 0}>
  <slot />
</tr>