<script>
  import Chart from "chart.js";
  import { topojson } from "chartjs-chart-geo"
  import { onMount } from "svelte";
  import { worldMap } from "../../api/stats";

  let chartElement;
  let chart;
  let countries;

  $: if (chart && $worldMap) {
    chart.data.datasets[0].data = countries.map((d) => {
      return ({feature: d, value: $worldMap[d.properties.name] || 0})
    });
  }

  onMount(async () => {
    const response = await fetch("https://unpkg.com/world-atlas/countries-50m.json");
    const data = await response.json();

    countries = topojson.feature(data, data.objects.countries).features;

    chart = new Chart(chartElement, {
      data: {
        datasets: [{
          label: 'Countries',
          data: countries.map((d) => {
            return ({feature: d, value: $worldMap[d.properties.name] || 0})
          }),
        }],
        labels: countries.map((d) => d.properties.name)
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
