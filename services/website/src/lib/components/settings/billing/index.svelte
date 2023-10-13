<script>
  import Payment from "./payment.svelte";
  import Usage from "./usage.svelte";
</script>

<div class="mt-10">
  <div class="md:grid md:grid-rows-2 md:grid-flow-col gap-4">
    <div class="row-span-2">
      <div class="px-4 sm:px-0">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Billing</h3>
        <p class="mt-1 text-sm leading-5 text-gray-600">
          Usage, billig cycles, upgrades/downgrades, etc.
        </p>
      </div>
    </div>
    <div class="col-span-2">
      <Usage />
    </div>
    <div class="col-span-2">
      <Payment />
    </div>
  </div>
</div>