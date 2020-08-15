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

<select bind:value={datePreset} class="mt-1 form-select block w-full pl-3 pr-10 py-2 text-base leading-6 border-gray-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
  {#each Object.entries(datePresets) as [value, {label}]}
    <option {value}>{label}</option>
  {/each}
</select>

{#if datePreset === "custom"}
  <label for="fromDate">
    From:
    <input bind:value={fromDate} id="fromDate" type="date">
  </label>
  <label for="toDate">
    To:
    <input bind:value={toDate} id="toDate" type="date">
  </label>
  <button on:click={applyCustomDateRange}>Apply</button>
{/if}