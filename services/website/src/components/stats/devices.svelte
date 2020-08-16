<script>
  import { browser, os, screen } from "../../api/stats";
  import Loading from "./loading.svelte";

  export let showTitle = true;
</script>

{#if $browser && $os && $screen}
  {#if showTitle}
    <h2>Devices</h2>
  {/if}

  <table>
    <thead>
      <tr>
        <th>Operating System</th>
        <th>Browser</th>
        <th>Screen</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          {#each Object.entries($os) as [name, total]}
            <div>
              <p>{name}: {total}</p>
            </div>
          {/each}
        </td>
        <td>
          {#each Object.entries($browser) as [name, total]}
            <div>
              <p>{name}: {total}</p>
            </div>
          {/each}
        </td>
        <td>
          {#each $screen as [category, total]}
            <div>
              <p>{category}: {total}</p>
            </div>
          {/each}
        </td>
      </tr>
    </tbody>
  </table>
{:else}
  <Loading />
{/if}
