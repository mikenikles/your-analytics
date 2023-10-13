<script lang="ts">
  import { topPages } from "$lib/api/stats";
  import Number from "./elements/number.svelte";
  import Table from "../table/index.svelte";
  import TableCell from "../table/cell.svelte";
  import TableRow from "../table/row.svelte";
  import Loading from "./loading.svelte";

  export let showTitle: boolean = true;
  export let showShowMore: boolean = true;

  $: topEntries = Object.entries($topPages || {});
  $: topTen = topEntries.length > 10 ? topEntries.slice(0, 10) : topEntries;
  $: rest = topEntries.length > 10 ? topEntries.slice(10) : [];

  let showRest = false;
</script>

{#if $topPages}
  {#if showTitle || showShowMore}
    <div class="flex justify-between">
      {#if showTitle}
        <h2 class="p-4 font-bold">Top Pages</h2>
      {/if}
      {#if showShowMore && !showRest && rest.length > 0}
        <button on:click={() => showRest = true} class="m-4 py-1 px-3 text-pink-600 rounded-full">Show more</button>
      {/if}
    </div>
  {/if}

  <Table>
    <tbody slot="tbody">
      {#each topTen as [page, total], rowIndex}
        <TableRow {rowIndex}>
          <TableCell isFirst={true} clazz="break-all">{page}</TableCell>
          <TableCell isLast={true} clazz="text-right font-bold"><Number number={total}/></TableCell>
        </TableRow>
      {/each}
      {#if showRest}
        {#each rest as [page, total], rowIndex}
          <TableRow {rowIndex}>
            <TableCell isFirst={true} clazz="break-all">{page}</TableCell>
            <TableCell isLast={true} clazz="text-right font-bold"><Number number={total}/></TableCell>
          </TableRow>
        {/each}
      {/if}
    </tbody>
  </Table>
{:else}
  <Loading />
{/if}
