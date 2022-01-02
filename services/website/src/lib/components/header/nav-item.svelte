<script lang="ts">
  export let href: string;
  export let isActive: boolean = false;
  export let label: string;
</script>

<style>
  .active {
    @apply text-pink-600;
  }
</style>

<li class:active={isActive} class="mx-2 px-4 py-2 hover:bg-gray-200 rounded-full">
  <a sveltekit:prefetch href="{href}">{label}</a>
</li>
