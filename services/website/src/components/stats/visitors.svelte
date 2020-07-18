<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";
  import { visitors } from "../../api/stats";

  let chartElement;

  onMount(() => {
    const chart = new Chart(chartElement, {
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
  });
</script>

<h2>Visitors</h2>
<div
  style="position: relative; height:20vh; width:100%">
  <canvas bind:this={chartElement} />
</div>
