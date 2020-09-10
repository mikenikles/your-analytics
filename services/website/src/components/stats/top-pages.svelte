<script>
  import { topPages } from "../../api/stats";
  import Table from "../table/index.svelte";
  import TableCell from "../table/cell.svelte";
  import TableRow from "../table/row.svelte";
  import Loading from "./loading.svelte";

  export let showTitle = true;
  export let showShowMore = true;

  $: topEntries = Object.entries($topPages || {});
  $: topTen = topEntries.length > 10 ? topEntries.slice(0, 10) : topEntries;
  $: rest = topEntries.length > 10 ? topEntries.slice(10) : [];
  $: maxTotal = Math.max(...Object.values($topPages || {}));

  let showRest = false;
</script>

{#if $topPages}
  {#if showTitle}
    <h2>Top Pages</h2>
  {/if}

  <Table>
    <tbody slot="tbody">
      {#each topTen as [page, total], rowIndex}
        <TableRow {rowIndex}>
          <TableCell isFirst={true}>{page}</TableCell>
          <TableCell isLast={true} clazz="text-right font-bold">{total}</TableCell>
        </TableRow>
      {/each}
      {#if showRest}
        {#each rest as [page, total], rowIndex}
          <TableRow {rowIndex}>
            <TableCell isFirst={true}>{page}</TableCell>
            <TableCell isLast={true} clazz="text-right font-bold">{total}</TableCell>
          </TableRow>
        {/each}
      {/if}
    </tbody>
  </Table>

  {#if showShowMore && !showRest}
    <button on:click={() => showRest = true}>Show more</button>
  {/if}
{:else}
  <Loading />
{/if}
