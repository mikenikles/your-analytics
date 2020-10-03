<script lang="ts">
  export let clazz = "";
  export let isFirst = false;
  export let isLast = false;
</script>

<style>
  .first {
    @apply pl-4;
  }

  .last {
    @apply pr-4;
  }
</style>

<td class:first={isFirst} class:last={isLast} class="py-2 px-2 {clazz}"><slot /></td>