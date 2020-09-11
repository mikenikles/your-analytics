<script>
  import { endOfDay, startOfDay, startOfYear, sub } from "date-fns";
  import { dateRange } from "../api/stats";

  let fromDate;
  let toDate;

  const datePresets = {
    today: {
      label: "Today",
      calculateFromDate: () => new Date(),
      calculateToDate: () => new Date()
    },
    "7days": {
      label: "Last 7 days",
      calculateFromDate: () =>
        sub(new Date(), {
          days: 7
        }),
      calculateToDate: () => new Date()
    },
    "30days": {
      label: "Last 30 days",
      calculateFromDate: () =>
        sub(new Date(), {
          days: 30
        }),
      calculateToDate: () => new Date()
    },
    thisyear: {
      label: "This year",
      calculateFromDate: () => startOfYear(new Date()),
      calculateToDate: () => new Date()
    },
    custom: {
      label: "Custom",
      calculateFromDate: () => new Date(fromDate),
      calculateToDate: () => new Date(toDate)
    }
  };

  let datePreset;

  const applyCustomDateRange = () => {
    dateRange.set({
      from: startOfDay(datePresets.custom.calculateFromDate()).getTime(),
      to: endOfDay(datePresets.custom.calculateToDate()).getTime()
    });
  };

  $: if (datePreset && datePreset !== "custom") {
    dateRange.set({
      from: startOfDay(datePresets[datePreset].calculateFromDate()).getTime(),
      to: endOfDay(datePresets[datePreset].calculateToDate()).getTime()
    });
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
