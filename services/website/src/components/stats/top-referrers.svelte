<script>
  import { topReferrers } from "../../api/stats";
  import Table from "../table/index.svelte";
  import TableCell from "../table/cell.svelte";
  import TableRow from "../table/row.svelte";
  import Loading from "./loading.svelte";

  export let showTitle = true;
  export let showShowMore = true;

  $: topEntries = Object.entries($topReferrers || {});
  $: topTen = topEntries.length > 10 ? topEntries.slice(0, 10) : topEntries;
  $: rest = topEntries.length > 10 ? topEntries.slice(10) : [];
  $: maxTotal = Math.max(...Object.values($topReferrers || {}));

  let showRest = false;
</script>

{#if $topReferrers}
  {#if showTitle}
    <h2>Top Referrers</h2>
  {/if}

  <Table>
    <tbody slot="tbody">
      {#each topTen as [domain, total], rowIndex}
        <TableRow {rowIndex}>
          <TableCell isFirst={true}>
            <div class="w-5 h-5">
              <img src="https://www.google.com/s2/favicons?domain={domain}" alt="{domain} favicon" />
            </div>
          </TableCell>
          <TableCell>{domain}</TableCell>
          <TableCell isLast={true} clazz="text-right font-bold">{total}</TableCell>
        </TableRow>
      {/each}
      {#if showRest}
        {#each rest as [domain, total], rowIndex}
          <TableRow {rowIndex}>
            <TableCell isFirst={true}><img src="https://www.google.com/s2/favicons?domain={domain}" alt="{domain} favicon" /></TableCell>
            <TableCell>{domain}</TableCell>
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
