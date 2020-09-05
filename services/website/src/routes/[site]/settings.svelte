<script>
  import { stores } from "@sapper/app";
  import { getSettings, setVisibility } from "../../api/settings";
  import { userTokenStore } from "../../auth/magic";
  import Authenticated from "../../components/authenticated.svelte";
  import Header from "../../components/header.svelte";
  import MainContent from "../../components/main-content.svelte";

  const { page } = stores();
  const visibilities = [{
    label: "Private",
    value: "private"
  }, {
    label: "Public",
    value: "public"
  }];

  let settings = {};
  let selectedVisibility;

  $: pageTitle = `Settings - ${$page.params.site}`;
  $: if ($userTokenStore && Object.keys(settings).length === 0) {
    getSettings($page.params.site).then(serverSettings => {
      settings = serverSettings;
      selectedVisibility = settings.visibility;
    });
  }

  const handleVisibilitySubmit = async () => {
    await setVisibility($page.params.site, selectedVisibility);
  };
</script>

<style>
  .notFirstFormElement {
    @apply mt-4;
  }
</style>

<Authenticated>
  <Header title={pageTitle} />
  <MainContent>
    <div class="mt-10 sm:mt-0">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Website</h3>
            <p class="mt-1 text-sm leading-5 text-gray-600">
              Configure settings specifically for {$page.params.site}
            </p>
          </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form on:submit|preventDefault={handleVisibilitySubmit}>
            <div class="shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 bg-white sm:p-6">
                <fieldset>
                  <legend class="text-base leading-6 font-medium text-gray-900">Visibility</legend>
                  <p class="text-sm leading-5 text-gray-500">Private: Only authenticated users can see your analytics. Public: Share your analytics publicly.</p>
                  <div class="mt-4">
                    {#each visibilities as visibility, index}
                      <div class:notFirstFormElement={index > 0} class="flex items-center">
                        <input id="visibility_{visibility.value}" bind:group={selectedVisibility} value="{visibility.value}" type="radio" class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out">
                        <label for="visibility_{visibility.value}" class="ml-3">
                          <span class="block text-sm leading-5 font-medium text-gray-700">{visibility.label}</span>
                        </label>
                      </div>
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
      </div>
    </div>
  </MainContent>
</Authenticated>