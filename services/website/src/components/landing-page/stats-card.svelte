<script>
  export let title;
  export let description;
</script>

<div class="my-4 mx-2 p-6 pb-20 flex flex-col w-full bg-white border rounded-lg shadow-md sm:flex-row">
  <div class="flex flex-col justify-center">
    <h3 class="font-bold text-2xl text-center sm:text-3xl">{title}</h3>
    <p class="pt-10 text-xl text-center">{description}</p>
  </div>
  <div class="pt-10">
    <slot />
  </div>
</div>
