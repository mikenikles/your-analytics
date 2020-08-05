<script>
  import { addNewWebsite } from "../api/onboarding";
  import { userMetadataStore } from "../auth/magic";
  import Authenticated from "../components/authenticated.svelte";
  import TimezoneSelect from "../components/timezone-select.svelte";

  let url = "";
  let isSiteAdded = false;
  $: snippet = `<script async src="https://your-analytics.org/ya.js" data-domain="${url}"><\/script>`;

  const handleSubmit = async (event) => {
    const url = new FormData(event.target).get("url");
    const timezone = new FormData(event.target).get("timezone");

    console.log(url, timezone);
    isSiteAdded = await addNewWebsite(url, timezone)
  };
</script>

<Authenticated>
  <div class="prose">
    <h1>Onboarding</h1>

    <p>To collect web analytics, please follow these 3 steps:</p>

    <form on:submit|preventDefault={handleSubmit}>

      <h2>What's your website URL?</h2>
      <input bind:value={url} required name="url" type="text" />

      <h2>What's your preferred reporting timezone</h2>
      <TimezoneSelect name="timezone" />

      <button type="submit">Go</button>
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
</Authenticated>
