<script>
  import Chart from "chart.js";
  import { topojson } from "chartjs-chart-geo"
  import { onMount } from "svelte";
  import { worldMap } from "../../api/stats";

  let chartElement;

  onMount(async () => {
    const response = await fetch("https://unpkg.com/world-atlas/countries-50m.json");
    const data = await response.json();

    const countries = topojson.feature(data, data.objects.countries).features;

    const chart = new Chart(chartElement, {
      data: {
        labels: countries.map((d) => d.properties.name),
        datasets: [{
          label: 'Countries',
          data: countries.map((d) => {
            return ({feature: d, value: $worldMap[d.properties.name] || 0})
          }),
        }]
      },
      options: {
        showOutline: true,
        legend: {
          display: false
        },
        scale: {
          projection: 'equirectangular'
        },
        geo: {
          colorScale: {
            display: true,
          },
        },
      },
      type: "choropleth"
    });
  });
</script>

<h2>World map</h2>
<div
  style="position: relative; height:20vh; width:100%">
  <canvas bind:this={chartElement} />
</div>
