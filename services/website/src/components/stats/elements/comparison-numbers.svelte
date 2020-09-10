<script>
  import Loading from "../loading.svelte";

  export let title;
  export let currentValue;
</script>

<div>
  <div class="px-4 py-5 sm:p-6">
    <dl>
      <dt class="font-bold">
        {title}
      </dt>
      <dd>
        <div class="font-extrabold text-6xl text-pink-600">
          {#if currentValue}
            {currentValue}
          {:else}
            <Loading />
          {/if}
        </div>
      </dd>
    </dl>
  </div>
</div>
