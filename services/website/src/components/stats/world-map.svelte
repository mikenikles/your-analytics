<script lang="ts">
  import Chart from "chart.js";
  import { topojson } from "chartjs-chart-geo"
  import { onMount } from "svelte";
  import { worldMap } from "../../api/stats";
  import Loading from "./loading.svelte";

  export let showTitle = true;

  let chartElement;
  let chart;
  let countries;

  $: if ($worldMap && countries && chartElement) {
    if (chart) {
      chart.data.datasets[0].data = countries.map((d) => {
        return ({feature: d, value: $worldMap[d.properties.name] || "0"})
      });
      chart.update();
    } else {
      chart = new Chart(chartElement, {
        data: {
          datasets: [{
            label: 'Countries',
            data: countries.map((d) => {
              return ({feature: d, value: $worldMap[d.properties.name] || "0"})
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
              interpolate: "RdPu",
              missing: "white"
            },
          },
        },
        type: "choropleth"
      });
    }
  }

  onMount(async () => {
    const response = await fetch("https://unpkg.com/world-atlas/countries-50m.json");
    const data = await response.json();
    countries = topojson.feature(data, data.objects.countries).features;
  });
</script>

{#if $worldMap}
  {#if showTitle}
    <h2 class="p-4 font-bold">World map</h2>
  {/if}

  <div
    style="position: relative; height:20vh; width:100%">
    <canvas bind:this={chartElement} />
  </div>
{:else}
  <Loading />
{/if}
