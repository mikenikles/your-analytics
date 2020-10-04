<script lang="ts">
  import { topReferrers } from "../../api/stats";
  import Number from "../stats/elements/number.svelte";
  import Table from "../table/index.svelte";
  import TableCell from "../table/cell.svelte";
  import TableRow from "../table/row.svelte";
  import Loading from "./loading.svelte";

  export let showTitle: boolean = true;
  export let showShowMore: boolean = true;

  $: topEntries = Object.entries($topReferrers || {});
  $: topTen = topEntries.length > 10 ? topEntries.slice(0, 10) : topEntries;
  $: rest = topEntries.length > 10 ? topEntries.slice(10) : [];

  let showRest = false;
</script>

{#if $topReferrers}
  {#if showTitle || showShowMore}
    <div class="flex justify-between">
      {#if showTitle}
        <h2 class="p-4 font-bold">Top Referrers</h2>
      {/if}
      {#if showShowMore && !showRest && rest.length > 0}
        <button on:click={() => showRest = true} class="m-4 py-1 px-3 text-pink-600 rounded-full">Show more</button>
      {/if}
    </div>
  {/if}

  <Table>
    <tbody slot="tbody">
      {#each topTen as [domain, total], rowIndex}
        <TableRow {rowIndex}>
          <TableCell isFirst={true}>
            <div class="w-4 h-4">
              <img src="https://www.google.com/s2/favicons?domain={domain}" alt="{domain} favicon" width="16" height="16" />
            </div>
          </TableCell>
          <TableCell clazz="break-all">{domain}</TableCell>
          <TableCell isLast={true} clazz="text-right font-bold"><Number number={total}/></TableCell>
        </TableRow>
      {/each}
      {#if showRest}
        {#each rest as [domain, total], rowIndex}
          <TableRow {rowIndex}>
            <TableCell isFirst={true}><img src="https://www.google.com/s2/favicons?domain={domain}" alt="{domain} favicon" width="16" height="16" /></TableCell>
            <TableCell clazz="break-all">{domain}</TableCell>
            <TableCell isLast={true} clazz="text-right font-bold"><Number number={total}/></TableCell>
          </TableRow>
        {/each}
      {/if}
    </tbody>
  </Table>
{:else}
  <Loading />
{/if}
