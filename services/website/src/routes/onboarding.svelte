<script context="module">
  export async function preload(page, session) {
    const { user } = session;
    if (!user) {
      this.redirect(302, "auth");
      return;
    }
    return {
      user
    }
  };
</script>

<script>
  import { addNewWebsite } from "../api/onboarding";
  import Card from "../components/card.svelte";
  import Header from "../components/header/index.svelte";
  import MainContent from "../components/main-content.svelte";
  import TimezoneSelect from "../components/timezone-select.svelte";

  export let user;

  let url = "";
  let isSiteAdded = false;
  let isSiteAlreadyConfiguredGlobally = false;

  $: script = `<script async defer src="https://your-analytics.org/ya.js" data-domain="${url}"><\/script>`;
  $: existingUserSites = Object.keys(user.sites || {}) || [];
  $: hasUserAlreadyConfiguredSite = existingUserSites.includes(url);
  $: isUrlInvalid = hasUserAlreadyConfiguredSite || isSiteAlreadyConfiguredGlobally;

  const handleSubmit = async (event) => {
    const firstName = new FormData(event.target).get("firstname");
    const url = new FormData(event.target).get("url");
    const timezone = new FormData(event.target).get("timezone");

    const responseCode = await addNewWebsite({firstName, url, timezone});
    switch (responseCode) {
      case 201:
        isSiteAdded = true;
        break;
      case 400:
        isSiteAlreadyConfiguredGlobally = true;
        break;
    }
  };
</script>

<style>
  button:disabled {
    @apply bg-indigo-500 cursor-not-allowed;
  }
</style>

<Header />
<MainContent>
  <div class="flex flex-col justify-center sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Website information
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div>
        <Card>
          <form on:submit|preventDefault={handleSubmit}>
            <fieldset disabled={isSiteAdded} class="p-4">
              {#if !user.firstName}
                <div>
                  <label for="firstName" class="text-sm font-medium leading-5 text-gray-700">
                    What's your first name?
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <input id="firstName" type="text" name="firstname" required class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
                  </div>
                </div>
              {/if}

              <div class="mt-6">
                <label for="url" class="text-sm font-medium leading-5 text-gray-700">
                  What's your website URL?
                </label>
                <div class="mt-1 relative flex rounded-md shadow-sm">
                  <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    http(s)://www.
                  </span>
                  <input id="url" bind:value={url} type="text" name="url" required class="px-3 py-2 w-full border border-gray-300 rounded-none rounded-r-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5">
                  {#if isUrlInvalid}
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  {/if}
                </div>
                  <p class="mt-2 text-sm text-red-600">
                  {#if hasUserAlreadyConfiguredSite}
                    You've already configured this website.
                  {:else if isSiteAlreadyConfiguredGlobally}
                    This site has already been configured. If it belongs to you, please contact us.
                  {/if}
                  </p>
              </div>

              <div class="mt-6">
                <label for="url" class="text-sm font-medium leading-5 text-gray-700">
                  What's your preferred reporting timezone
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <TimezoneSelect name="timezone" />
                </div>
              </div>

              <div class="mt-6">
                <span class="w-full rounded-md shadow-sm">
                  <button type="submit" disabled={isUrlInvalid} class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                    Let's go
                  </button>
                </span>
              </div>
            </fieldset>
          </form>
        </Card>

          {#if isSiteAdded}
            <h2 class="mt-12 text-center text-2xl leading-9 font-extrabold text-gray-900">
              Add script to your website
            </h2>

            <Card clazz="p-4">
              <p>Add the following script to all pages you want to track on your website.</p>
              <div class="relative mt-6">
                <textarea id="script" value={script} rows="2" readonly class="w-full p-2 bg-gray-100 resize-none"></textarea>
                <a onclick="var textarea = document.getElementById('script'); textarea.focus(); textarea.select(); document.execCommand('copy');" href="javascript:void(0)" class="no-underline">
                  <svg class="absolute" style="top: 24px; right: 12px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                </a>
              </div>
              <p class="mt-6">Once added, please visit <a href="https://{url}" target="_blank" rel="noopener" class="text-pink-600 hover:underline">{url}</a> to see the first visit logged below.</p>
              <div class="relative mt-6">
                <span class="flex absolute h-3 w-3 top-0 -mt-1 ml-1">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </div>
            </Card>
          {/if}
        </div>
      </div>
    </div>
</MainContent>
