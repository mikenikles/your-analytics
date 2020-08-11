<script>
  export let label;
  export let value;
  export let percentage;
</script>

<div class="flex items-center justify-between">
  <div class="w-full h-10 mr-4">
    <div class="h-8 bg-indigo-100" style="width: {percentage}%"></div>
    <span class="flex -my-6 text-indigo-600">
      <slot name="icon" />
      {label}
    </span>
  </div>
  <span>
    {value}
  </span>
</div>