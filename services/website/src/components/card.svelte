<script lang="ts">
  export let clazz: string = "";
</script>

<div class="my-4 mx-2 bg-white border rounded-lg shadow-md {clazz}">
  <slot />
</div>
