<script lang="ts">
  import { Chart, Tooltip } from "chart.js";
  import { ColorScale, ChoroplethController, ProjectionScale, topojson, GeoFeature } from 'chartjs-chart-geo';
  import { onMount } from "svelte";
  import { worldMap } from "$lib/api/stats";
  import Loading from "./loading.svelte";

  Chart.register(Tooltip, ColorScale, ChoroplethController, GeoFeature, ProjectionScale);

  export let showTitle: boolean = true;

  let chartElement: HTMLCanvasElement;
  let chart: Chart;
  let countries: any;

  $: if ($worldMap && countries && chartElement) {
    if (chart) {
      chart.data.datasets[0].data = countries.map((d: any) => {
        return ({feature: d, value: $worldMap[d.properties.name] || "0"})
      });
      chart.update();
    } else {
      chart = new Chart(chartElement, {
        data: {
          datasets: [{
            label: 'Countries',
            data: countries.map((d: any) => {
              return ({feature: d, value: $worldMap[d.properties.name] || "0"})
            }),
          }],
          labels: countries.map((d: any) => d.properties.name)
        },
        options: {
          showOutline: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            color: {
              interpolate: "rdPu",
              missing: "white"
            },
            xy: {
              projection: "equirectangular"
            }
          },
        },
        type: "choropleth"
      });
    }
  }

  onMount(async () => {
    // Download from https://unpkg.com/world-atlas/countries-110m.json
    const response = await fetch("/countries-110m.json");
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
