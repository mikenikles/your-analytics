<script lang="ts">
  export let label: string;
  export let stepNumber: number;
  export let isUpcoming: boolean = false;
</script>

<style>
  .isUpcoming div {
    @apply border-gray-200;
  }

  .isUpcoming h3 {
    @apply text-gray-500;
  }
</style>

<li class:isUpcoming class="md:flex-1">
  <div class="pl-4 py-2 block border-l-4 border-indigo-600 md:pl-0 md:pt-4 md:pb-0 md:border-l-0 md:border-t-4">
    <h3 class="text-xs leading-4 text-indigo-600 font-semibold uppercase">Step {stepNumber}</h3>
    <p class="text-sm leading-5 font-medium">{label}</p>
  </div>
</li>
