<script>
  export let title;
  export let description;
</script>

<div class="py-10 max-w-6xl mx-auto sm:py-32">
    <div class="px-4 sm:px-12">
    <h2 class="text-3xl text-center font-extrabold tracking-wide sm:text-5xl">{title}</h2>
    <p class="mt-8 text-xl sm:text-2xl">{description}</p>
  </div>
  <slot />
</div>
