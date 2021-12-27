<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import dateRange, { isLocalDateChange } from "../stores/date-range";
  import statsFiltersQueryString from "../stores/stats-filters-query-string";

  const datePresets = {
    // Also update `services/query-api/src/index.js`
    today: {
      label: "Today",
    },
    "7days": {
      label: "Last 7 days",
    },
    "30days": {
      label: "Last 30 days",
    },
    thisyear: {
      label: "This year",
    },
    custom: {
      label: "Custom",
    },
  };

  $: datePreset = $page.query.get("preset") || $dateRange.preset || "today";
  $: fromDate = $page.query.get("from") || $dateRange.from;
  $: toDate = $page.query.get("to") || $dateRange.to;

  const applyCustomDateRange = async () => {
    dateRange.setCustomRange(fromDate, toDate);
    if (fromDate !== $page.query.get("from") || toDate !== $page.query.get("to")) {
      await goto(`${$page.path}?${$statsFiltersQueryString}`);
      $isLocalDateChange = false;
    }
  };

  const applyPreset = async () => {
    if (datePreset !== "custom") {
      dateRange.setPreset(datePreset);
      await goto(`${$page.path}?${$statsFiltersQueryString}`);
      $isLocalDateChange = false;
    }
  };
</script>

<div class="mx-2 flex flex-col sm:flex-row sm:items-end">
  <div class="mt-4 sm:py-0">
    <select bind:value={datePreset} on:click={() => {$isLocalDateChange = true; applyPreset()}} aria-label="Choose a date range" class="form-select">
      {#each Object.entries(datePresets) as [value, {label}]}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>

  {#if datePreset === "custom"}
    <div class="mt-4 sm:py-0 sm:pl-4">
      <label for="fromDate" class="block text-sm font-medium leading-5 text-gray-700">From</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input bind:value={fromDate} on:click={() => {$isLocalDateChange = true}} id="fromDate" type="date" class="form-input block w-full sm:text-sm sm:leading-5">
      </div>
    </div>
    <div class="mt-4 sm:py-0 sm:pl-4">
      <label for="toDate" class="block text-sm font-medium leading-5 text-gray-700">To</label>
      <div class="mt-1 relative rounded-md shadow-sm">
        <input bind:value={toDate} on:click={() => {$isLocalDateChange = true}} id="toDate" type="date" class="form-input block w-full sm:text-sm sm:leading-5">
      </div>
    </div>
    <div class="mt-4 sm:py-0 sm:pl-4">
      <button on:click={applyCustomDateRange} class="py-2 px-3 w-full bg-pink-300 rounded-full font-bold">Apply</button>
    </div>
  {/if}
</div>
