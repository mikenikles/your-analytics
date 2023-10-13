<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { endOfMonth, formatISO, parseISO } from "date-fns";
  import { Chart, CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip } from "chart.js";
  import { visitors } from "$lib/api/stats";
  import dateRange from "$lib/stores/date-range";
  import statsFiltersQueryString from "$lib/stores/stats-filters-query-string";
  import Loading from "./loading.svelte";

  Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, Tooltip);

  const REGEX_DAY = /\d{4}-\d{2}-\d{2}/;
  const REGEX_MONTH = /\s\d{4}$/;
  const REGEX_YEAR = /\d{4}/;
  const MONTHS = {
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12",
  };

  let chartElement: HTMLCanvasElement;
  let chart: Chart;

  $: if ($visitors && chartElement) {
    if (chart) {
      chart.data.datasets[0].data = Object.values($visitors);
      chart.data.labels = Object.keys($visitors);
      chart.update();
    } else {
      chart = new Chart(chartElement, {
        data: {
          datasets: [{
            data: Object.values($visitors),
            backgroundColor: "#f6f6f6",
            borderColor: "#f8b4d9",
            pointBackgroundColor: "#d61f69",
            pointHoverRadius: 6,
            pointRadius: 8
          }],
          labels: Object.keys($visitors)
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  return `${tooltipItem.raw} Visitors`;
                }
              },
              titleFont: {
                size: 16,
              },
              titleMarginBottom: 8,
              padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
              },
            }

          },
          onClick: async (event, item, chart) => {
            // @ts-ignore
            const activePoints = chart.getElementsAtEventForMode(event, "nearest", {
              intersect: true
            }, false)

            console.log(activePoints)
            if (activePoints.length > 0) {
              const [{ index }] = activePoints;
              const labelClicked = chart.data.labels[index] as String;
              if (labelClicked.match(REGEX_DAY)) {
                dateRange.setCustomRange(labelClicked, labelClicked);
              } else if (labelClicked.match(REGEX_MONTH)) {
                const monthNumber = MONTHS[labelClicked.substring(0, labelClicked.length - 5)];
                const year = labelClicked.substring(labelClicked.length - 4);
                const firstOfMonth = parseISO(`${year}-${monthNumber}-01`);
                const lastOfMonth = endOfMonth(firstOfMonth);
                dateRange.setCustomRange(formatISO(firstOfMonth, { representation: 'date' }), formatISO(lastOfMonth, { representation: 'date' }));
              } else if (labelClicked.match(REGEX_YEAR)) {
                dateRange.setCustomRange(`${labelClicked}-01-01`, `${labelClicked}-12-31`);
              }
              await goto(`${$page.path}?${$statsFiltersQueryString}`);
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              }
            }
          },
        },
        type: "line"
      });
    }
  }
</script>

<div class="px-4 py-5 sm:p-6">
  {#if $visitors}
    <div
      style="position: relative; width:100%">
      <canvas bind:this={chartElement} />
    </div>
  {:else}
    <Loading />
  {/if}
</div>
