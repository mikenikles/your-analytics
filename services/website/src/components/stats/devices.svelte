<script>
  import { browser, os, screen } from "../../api/stats";
  import Loading from "./loading.svelte";
</script>

{#if $browser && $os && $screen}
  <h2>Devices</h2>

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
          {#each Object.entries($screen) as [width, total]}
            <div>
              <p>{width}: {total}</p>
            </div>
          {/each}
        </td>
      </tr>
    </tbody>
  </table>
{:else}
  <Loading />
{/if}
