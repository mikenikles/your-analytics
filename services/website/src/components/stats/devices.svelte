<script>
  import { browser, os } from "../../api/stats";
</script>

<h2>Devices</h2>


<table>
  <thead>
    <tr>
      <th>Operating System</th>
      <th>Browser</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        {#each Object.entries($os || {}) as [name, total]}
          <div>
            <p>{name}: {total}</p>
          </div>
        {/each}
      </td>
      <td>
        {#each Object.entries($browser || {}) as [name, total]}
          <div>
            <p>{name}: {total}</p>
          </div>
        {/each}
      </td>
    </tr>
  </tbody>
</table>
