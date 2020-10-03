<script lang="ts">
  export let href;
  export let isActive = false;
  export let label;
</script>

<style>
  .active {
    @apply text-pink-600;
  }
</style>

<li class:active={isActive} class="mx-2 px-4 py-2 hover:bg-gray-200 rounded-full">
  <a href="{href}">{label}</a>
</li>
