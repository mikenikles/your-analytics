<script>
  import Loading from "../loading.svelte";

  export let title;
  export let currentValue;
</script>

<div>
  <div class="px-4 py-5 sm:p-6">
    <dl>
      <dt class="text-base leading-6 font-normal text-gray-900">
        {title}
      </dt>
      <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
        <div class="flex items-baseline text-2xl leading-8 font-semibold text-indigo-600">
          {#if currentValue}
            {currentValue}
          {:else}
            <Loading />
          {/if}
          {#if false}
          <span class="ml-2 text-sm leading-5 font-medium text-gray-500">
            from 70,946
          </span>
          {/if}
        </div>
        {#if false}
        <div class="inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium leading-5 bg-green-100 text-green-800 md:mt-2 lg:mt-0">
          <svg class="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="sr-only">
            Increased by
          </span>
          12%
        </div>
        {/if}
      </dd>
    </dl>
  </div>
</div>
