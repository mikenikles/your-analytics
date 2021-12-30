<script>
  import { page } from "$app/stores";
  import { getContext } from "svelte";
  import { setVisibility } from "../../../../api/site/settings";
  import { contextKeySiteSettings } from "../../../../config";

  const visibilities = [{
    label: "Private",
    value: "private",
    description: "Only authenticated users can see your website analytics."
  }, {
    label: "Public",
    value: "public",
    description: "Share your website analytics publicly - anyone can see it."
  }];

  let selectedVisibility = getContext(contextKeySiteSettings).visibility;

  const handleVisibilitySubmit = async () => {
    await setVisibility($page.params.site, selectedVisibility);
  };
</script>

<div class="mt-5 md:mt-0 md:col-span-2">
  <form on:submit|preventDefault={handleVisibilitySubmit}>
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white sm:p-6">
        <fieldset>
          <legend class="text-base leading-6 font-medium text-gray-900">Visibility</legend>
          <div class="mt-4 space-y-4">
            {#each visibilities as visibility, index}
              <div class="flex items-center">
                <input id="visibility_{visibility.value}" bind:group={selectedVisibility} value="{visibility.value}" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                <label for="visibility_{visibility.value}" class="ml-3">
                  <span class="block text-sm leading-5 font-medium text-gray-700">{visibility.label}</span>
                </label>
              </div>
              <p class="mt-1 ml-7 text-sm font-thin">{visibility.description}</p>
            {/each}
          </div>
        </fieldset>
      </div>
      <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button type="submit" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-500 focus:outline-none focus:shadow-outline-blue focus:bg-indigo-500 active:bg-indigo-600 transition duration-150 ease-in-out">
          Save
        </button>
      </div>
    </div>
  </form>
</div>
