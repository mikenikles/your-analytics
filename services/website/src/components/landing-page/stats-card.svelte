<script>
  import Card from "../card.svelte";

  export let title;
  export let description;
</script>

<Card clazz="p-6 pb-20 flex flex-col sm:flex-row">
  <div class="flex flex-col justify-center sm:ml-8 sm:w-1/2">
    <h3 class="font-bold text-2xl text-center sm:text-3xl">{title}</h3>
    <p class="pt-10 text-xl text-center">{description}</p>
  </div>
  <div class="pt-10 sm:ml-6 sm:w-1/2">
    <slot />
  </div>
</Card>
