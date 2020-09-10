<script>
  import Card from "../card.svelte";

  export let title;
  export let icon;
  export let description;
</script>

<Card clazz="p-6 pb-20 sm:my-0 sm:w-1/3">
  <h3 class="pb-10 font-bold text-2xl text-center sm:text-3xl">{title}</h3>
  <div class="mx-auto bg-pink-300 rounded-full h-40 w-40 flex items-center justify-center">
    <img src={`/svg/${icon}.svg`} alt="{title}" class="h-16 w-16" />
  </div>
  <p class="pt-10 text-xl text-center">{description}</p>
</Card>
