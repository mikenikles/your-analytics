<script>
  import { page } from "$app/stores"
  import Billing from "./billing.svelte";
  import Visibility from "./visibility.svelte";
</script>

<div class="mt-10"> 
  <div class="md:grid md:grid-rows-3 md:grid-flow-col gap-4">
    <div class="row-span-3">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Website</h3>
        <p class="mt-1 text-sm leading-5 text-gray-600">
          Configure settings specifically for {$page.params.site}
        </p>
      </div>
    </div>
    <div class="col-span-2">
      <Visibility />
    </div>
    <div class="row-span-2 col-span-2">
      <Billing />
    </div>
  </div>
</div>