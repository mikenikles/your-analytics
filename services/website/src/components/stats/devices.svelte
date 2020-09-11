<script>
  import { browser, os, screen } from "../../api/stats";
  import Table from "../table/index.svelte";
  import TableCell from "../table/cell.svelte";
  import TableRow from "../table/row.svelte";
  import Loading from "./loading.svelte";

  export let showTitle = true;

  $: tabData = [
    Object.entries($os || {}),
    Object.entries($browser || {}),
    $screen || {}
  ];

  let selectedTabIndex = 0;
</script>

<style>
  .active {
    @apply bg-pink-300;
  }
</style>

{#if $browser && $os && $screen}
  {#if showTitle}
    <h2 class="p-4 font-bold">Devices</h2>
  {/if}

  <div class="py-4">
    <button on:click={() => selectedTabIndex = 0} class:active={selectedTabIndex === 0} class="ml-2 py-1 px-3 rounded-full font-bold">Operating System</button>
    <button on:click={() => selectedTabIndex = 1} class:active={selectedTabIndex === 1} class="py-1 px-3 rounded-full font-bold">Browser</button>
    <button on:click={() => selectedTabIndex = 2} class:active={selectedTabIndex === 2} class="py-1 px-3 rounded-full font-bold">Screen</button>
  </div>

  <Table>
    <tbody slot="tbody">
      {#each tabData[selectedTabIndex] as [label, total], rowIndex}
        <TableRow {rowIndex}>
          <TableCell isFirst={true}>{label}</TableCell>
          <TableCell isLast={true} clazz="text-right font-bold">{total}</TableCell>
        </TableRow>
      {/each}
    </tbody>
  </Table>
{:else}
  <Loading />
{/if}
