<script lang="ts">
  import Card from "../card.svelte";
  import Section from "./section.svelte";

  const pricingOptions = [{
    pageViews: "10k",
    price: "$0"
  }, {
    pageViews: "100k",
    price: "??"
  }, {
    pageViews: "1M",
    price: "??"
  }, {
    pageViews: "10M",
    price: "??"
  }];
  let selectedPricingIndex = 0;
</script>

<Section title="Pay as you grow" description="Self-host Your Analytics free of charge or use our hosted service.">
  <div class="pt-10 flex flex-col sm:flex-row">
    <Card clazz="py-4 p-6 bg-pink-600 text-white sm:my-0 sm:w-1/3">
      <p class="p-2 bg-pink-500 rounded-t-md text-center text-2xl font-semibold">Self-hosted</p>
      <p class="mt-12"><strong>Your Analytics</strong> is open source and available for you to host on your own servers.<strong>For Free!</strong></p>
      <p class="py-20 text-center text-6xl font-semibold">$0</p>
      {#if false}
      <!-- TODO: Enable once the docs are ready for self-hosting -->
      <button class="p-2 w-full bg-white rounded-md text-black text-lg font-bold">Find out more</button>
      {/if}
    </Card>
    <Card clazz="py-4 p-6 sm:my-0 sm:w-2/3">
      <p class="p-2 bg-gray-200 rounded-t-md text-center text-2xl font-semibold">Hosted</p>
      <p class="mt-12">Hassle-free, hosted by the team who develops <strong>Your Analytics</strong>. Pay based on how many pages your visitors look at on your website.</p>
      <div class="flex flex flex-col sm:flex-row">
        <div class="mx-2 sm:w-1/2">
          <p class="pt-20 text-center text-6xl font-semibold">{pricingOptions[selectedPricingIndex].price}/<span class="text-4xl">m</span></p>
          <p class="text-center">
            <span class="py-2 px-4 bg-gray-300 rounded-full text-sm">{pricingOptions[selectedPricingIndex].pageViews} page views</span>
          </p>
        </div>
        <div class="mx-2 sm:w-1/2">
          <div class="pt-10">
            <p>Page views per month:</p>
            {#each pricingOptions as {pageViews, price}, index}
              <div class="my-4 flex items-center">
                <input bind:group={selectedPricingIndex} value={index} id="pricing_{pageViews}" name="pricing_{pageViews}" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                <label for="pricing_{pageViews}" class="ml-3">
                  <span class="block text-lg leading-5 font-medium text-gray-700">{pageViews}: {price}</span>
                </label>
              </div>
            {/each}
          </div>
          {#if false}
          <p>For 10M+ page views, please get in touch with us. <a href="/contact" class="text-pink-600 hover:underline">Contact us.</a></p>
          {/if}
        </div>
      </div>
      {#if false}
      <button class="mt-32 p-2 w-full bg-blue-600 rounded-md text-white text-lg font-bold">Start your free trial</button>
      {/if}
    </Card>
  </div>
</Section>
