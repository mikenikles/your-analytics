<script lang="ts">
  export let clazz: string = "";
  export let isFirst: boolean = false;
  export let isLast: boolean = false;
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