<script>
  import { goto, stores } from '@sapper/app';
  import dateRange, { datePresets } from "../stores/date-range";
  import statsFiltersQueryString from "../stores/stats-filters-query-string";

  const { page } = stores();

  let datePreset = $page.query.preset || null;
  let fromDate = $page.query.from || null;
  let toDate = $page.query.to || null;

  const applyCustomDateRange = () => {
    dateRange.setCustomRange(fromDate, toDate);
    if (fromDate !== $page.query.from || toDate !== $page.query.to) {
      goto(`${$page.path}?${$statsFiltersQueryString}`);
    }
  };

  $: if (datePreset && datePreset !== "custom") {
    dateRange.setPreset(datePreset);
    if (datePreset !== $page.query.preset) {
      goto(`${$page.path}?${$statsFiltersQueryString}`);
    }
  }
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
        <input bind:value={fromDate} id="fromDate" type="date" class="form-input block w-full sm:text-sm sm:leading-5">
      </div>
    </div>
    <div class="mt-4 sm:py-0 sm:pl-4">
      <label for="toDate" class="block text-sm font-medium leading-5 text-gray-700">To</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input bind:value={toDate} id="toDate" type="date" class="form-input block w-full sm:text-sm sm:leading-5">
      </div>
    </div>
    <div class="mt-4 sm:py-0 sm:pl-4">
      <button on:click={applyCustomDateRange} class="py-2 px-3 w-full bg-pink-300 rounded-full font-bold">Apply</button>
    </div>
  {/if}
</div>
