<script lang="ts">
  import onboarding from "../../stores/onboarding";
  import StepWrapper from "./step-wrapper.svelte";
  import UniqueVisitors from "../stats/unique-visitors.svelte";

  $: script = `<script async defer src="https://your-analytics.org/ya.js" data-domain="${$onboarding.url}"><\/script>`;

  const copyScriptToClipboard = () => {
    const textarea = document.getElementById('script') as HTMLTextAreaElement;
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
  };
</script>

<StepWrapper>
  <p>Add the following script to all pages you want to track on your website.</p>
  <div class="relative mt-6">
    <textarea id="script" value={script} rows="3" readonly class="w-full p-2 bg-gray-100 resize-none"></textarea>
    <button on:click={copyScriptToClipboard}>
      <svg class="absolute" style="top: 24px; right: 12px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
    </button>
  </div>
  <p class="mt-6">Once added, please visit <a href="https://{$onboarding.url}" target="_blank" rel="noopener" class="text-pink-600 hover:underline">{$onboarding.url}</a> to see the first few visits logged below.</p>
  <div class="relative mt-6 pb-6 flex justify-center">
    <UniqueVisitors />
  </div>
  <p class="mt-6">Don't want to wait? <a href="/{$onboarding.url}" class="text-pink-600 hover:underline">Go to your dashboard.</a></p>
</StepWrapper>
