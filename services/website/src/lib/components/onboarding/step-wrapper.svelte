<script lang="ts">
	import { fly } from 'svelte/transition';
  import Card from "../card.svelte";
</script>

<div in:fly={{x:1000, delay:500, duration:500}} out:fly={{x:-500, duration:500}}>
  <Card clazz="p-4">
    <slot />
  </Card>
</div>
