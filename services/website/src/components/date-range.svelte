<script>
  import { endOfDay, startOfDay, startOfYear, sub } from "date-fns";
  import { dateRange } from "../api/stats";

  const datePresets = {
    today: {
      label: "Today",
      calculateFromDate: () => new Date()
    },
    "7days": {
      label: "Last 7 days",
      calculateFromDate: () =>
        sub(new Date(), {
          days: 7
        })
    },
    "30days": {
      label: "Last 30 days",
      calculateFromDate: () =>
        sub(new Date(), {
          days: 30
        })
    },
    thisyear: {
      label: "This year",
      calculateFromDate: () => startOfYear(new Date())
    }
  };

  let datePreset;

  $: if (datePreset) {
    const from = startOfDay(datePresets[datePreset].calculateFromDate());
    const to = endOfDay(new Date());

    dateRange.set({
      from: from.getTime(),
      to: to.getTime()
    });
  }
</script>

<select bind:value={datePreset}>
  {#each Object.entries(datePresets) as [value, {label}]}
    <option {value}>{label}</option>
  {/each}
</select>
