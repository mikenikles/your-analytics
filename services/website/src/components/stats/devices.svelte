<script>
  import { os } from "../../api/stats";
</script>

<h2>Devices</h2>

<h3>Operating System</h3>
{#each Object.entries($os) as [os_name, total]}
  <div>
    <p>{os_name}: {total}</p>
  </div>
{/each}
