<script lang="ts">
  import Card from "../card.svelte";
  import Section from "./section.svelte";

  const htmlScript = `<script async defer src="https://your-analytics.org/ya.js" data-domain="YOUR_DOMAIN"><\/script>`;
  const stacks = {
    svelte: {
      label: "Svelte",
      instructions: `
1. Open \`src/template.html\`
1. Add the code snippet below to the <head> tag
1. Replace YOUR_DOMAIN with e.g. example.com`,
      snippet: htmlScript
    },
    wordpress: {
      label: "Wordpress",
      instructions: `TODO: Wordpress instructions.`,
    },
    react: {
      label: "React",
      instructions: `TODO: React instructions.`,
    },
    ghost: {
      label: "Ghost",
      instructions: `TODO: Ghost instructions.`,
    },
  };

  let selectedStack = "";
</script>

<style>
  img {
    filter: grayscale(1);
  }

  img:hover,
  img.active {
    filter: grayscale(0);
  }

  .instructions :global(ol) {
    @apply list-decimal list-inside;
  }
</style>

<Section title="Frontend Integrations" description="Select your frontend stack of choice to see how to integrate Your Analytics.">
  <div class="pt-10">
    <Card clazz="py-4">
      <p class="py-4 bg-gray-200 rounded-t-lg font-bold text-2xl text-center">
        Supports your frontend stack of choice
      </p>
      <div class="p-4 flex justify-center">
        {#each Object.entries(stacks) as [key, stack]}
          <div class="mx-2 p-2 border rounded-lg shadow-md">
            <img
              src="/svg/frontend-stacks/{key}.svg"
              alt={stack.label}
              title={stack.label}
              class:active={selectedStack === key}
              class="h-32 w-32" />
          </div>
        {/each}
      </div>
      {#if false}
      <!-- TODO: Move that on the onboarding page -->
        {#if stacks[selectedStack]}
          <div class="border rounded">
            <div class="flex justify-end bg-gray-50 rounded">
              <div class="m-2 py-1 px-2 flex bg-white rounded cursor-pointer">
                <img
                  src="/svg/clipboard-copy.svg"
                  alt="Copy to clipboard"
                  class="h-6 w-6" />
                <span class="ml-1 font-bold">Copy to clipboard</span>
              </div>
            </div>
            <div class="instructions">
              {@html stacks[selectedStack].instructions}
              <textarea id="snippet" value={stacks[selectedStack].snippet} readonly class="w-full p-2 bg-gray-100 resize-none"></textarea>
            </div>
          </div>
        {/if}
      {/if}
    </Card>
</Section>
