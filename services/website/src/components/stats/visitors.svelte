<script>
  import Chart from "chart.js";
  import { visitors } from "../../api/stats";

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
            data: Object.values($visitors)
          }],
          labels: Object.keys($visitors)
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          }
        },
        type: "line"
      });
    }
  }
</script>

{#if $visitors}
  <h2>Visitors</h2>
  <div
    style="position: relative; height:20vh; width:100%">
    <canvas bind:this={chartElement} />
  </div>
{/if}
