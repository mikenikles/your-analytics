<script>
  import { goto, stores } from '@sapper/app';
  import dateRange, { datePresets } from "../stores/date-range";
  import statsFiltersQueryString from "../stores/stats-filters-query-string";

  const { page } = stores();

  let datePreset = null;
  let fromDate = null;
  let toDate = null;
  let isLocalCustomDateChange = false;

  $: if (!isLocalCustomDateChange && $page.query.preset &&
    $page.query.preset !== datePreset &&
    $page.query.from !== fromDate &&
    $page.query.to !== toDate) {
      datePreset = $page.query.preset;
      fromDate = $page.query.from;
      toDate = $page.query.to;
  };

  const applyCustomDateRange = async () => {
    dateRange.setCustomRange(fromDate, toDate);
    if (fromDate !== $page.query.from || toDate !== $page.query.to) {
      await goto(`${$page.path}?${$statsFiltersQueryString}`);
      isLocalCustomDateChange = false;
    }
  };

  $: if (datePreset && datePreset !== "custom") {
    dateRange.setPreset(datePreset);
    if (datePreset !== $page.query.preset) {
      fromDate = null;
      toDate = null;
      goto(`${$page.path}?${$statsFiltersQueryString}`);
    }
  };
</script>

<div class="mx-2 flex flex-col sm:flex-row sm:items-end">
  <div class="mt-4 sm:py-0">
    <select bind:value={datePreset} class="form-select">
      {#each Object.entries(datePresets) as [value, {label}]}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>

  {#if datePreset === "custom"}
    <div class="mt-4 sm:py-0 sm:pl-4">
      <label for="fromDate" class="block text-sm font-medium leading-5 text-gray-700">From</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input bind:value={fromDate} on:click={() => {isLocalCustomDateChange = true}} id="fromDate" type="date" class="form-input block w-full sm:text-sm sm:leading-5">
      </div>
    </div>
    <div class="mt-4 sm:py-0 sm:pl-4">
      <label for="toDate" class="block text-sm font-medium leading-5 text-gray-700">To</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input bind:value={toDate} on:click={() => {isLocalCustomDateChange = true}} id="toDate" type="date" class="form-input block w-full sm:text-sm sm:leading-5">
      </div>
    </div>
    <div class="mt-4 sm:py-0 sm:pl-4">
      <button on:click={applyCustomDateRange} class="py-2 px-3 w-full bg-pink-300 rounded-full font-bold">Apply</button>
    </div>
  {/if}
</div>
