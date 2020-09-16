<script>
  import { goto, stores } from '@sapper/app';
  import Chart from "chart.js";
  import { visitors } from "../../api/stats";
  import dateRange from "../../stores/date-range";
  import statsFiltersQueryString from "../../stores/stats-filters-query-string";
  import Loading from "./loading.svelte";

  const { page } = stores();

  let chartElement;
  let chart;

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
          legend: {
            display: false
          },
          onClick: (event, item) => {
            if (item && item.length > 0) {
              const dateClicked = item[0]._chart.config.data.labels[item[0]._index];
              if (dateClicked.match(/\d{4}-\d{2}-\d{2}/)) {
                dateRange.setCustomRange(dateClicked, dateClicked);
                goto(`${$page.path}?${$statsFiltersQueryString}`);
              }
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                return `${tooltipItem.value} Visitors`;
              }
            },
            titleFontSize: 16,
            titleMarginBottom: 8,
            xPadding: 10,
            yPadding: 10
          }
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
