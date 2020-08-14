<script>
  import { addNewWebsite } from "../api/onboarding";
  import { userMetadataStore } from "../auth/magic";
  import Authenticated from "../components/authenticated.svelte";
  import Header from "../components/header.svelte";
  import MainContent from "../components/main-content.svelte";
  import TimezoneSelect from "../components/timezone-select.svelte";

  let url = "";
  let isSiteAdded = false;
  $: snippet = `<script async src="https://your-analytics.org/ya.js" data-domain="${url}"><\/script>`;

  const handleSubmit = async (event) => {
    const firstName = new FormData(event.target).get("firstname");
    const url = new FormData(event.target).get("url");
    const timezone = new FormData(event.target).get("timezone");
    isSiteAdded = await addNewWebsite({firstName, url, timezone});
  };
</script>

<Authenticated>
  <Header title="Onboarding" />
  <MainContent>
    <div class="flex flex-col justify-center sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Website information
        </h2>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="py-8 px-4 sm:px-10">
          <form on:submit|preventDefault={handleSubmit}>
            {#if $userMetadataStore && !$userMetadataStore.firstName}
              <div>
                <label for="firstName" class="block text-sm font-medium leading-5 text-gray-700">
                  What's your first name?
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <input id="firstName" type="text" name="firstname" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                </div>
              </div>
            {/if}

            <div class="mt-6">
              <label for="url" class="block text-sm font-medium leading-5 text-gray-700">
                What's your website URL?
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  http(s)://www.
                </span>
                <input id="url" bind:value={url} type="text" name="url" required class="appearance-none flex-1 block w-full px-3 py-2 border border-gray-300 rounded-none rounded-r-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
              </div>
            </div>

            <div class="mt-6">
              <label for="url" class="block text-sm font-medium leading-5 text-gray-700">
                What's your preferred reporting timezone
              </label>
              <div class="mt-1 rounded-md shadow-sm">
                <TimezoneSelect name="timezone" />
              </div>
            </div>

            <div class="mt-6">
              <span class="block w-full rounded-md shadow-sm">
                <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                  Let's go
                </button>
              </span>
            </div>
          </form>

          {#if isSiteAdded}
            <h2>Add snippet to your website</h2>
            <div class="relative">
              <textarea id="snippet" value={snippet} rows="2" readonly></textarea>
              <a onclick="var textarea = document.getElementById('snippet'); textarea.focus(); textarea.select(); document.execCommand('copy');" href="javascript:void(0)" class="no-underline">
                <svg class="absolute" style="top: 24px; right: 12px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </a>
            </div>
            <p>Once added, please refresh your website to see the first visit logged below: TBD</p>
          {/if}

        </div>
      </div>
    </div>
  </MainContent>
</Authenticated>
