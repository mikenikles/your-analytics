<script lang="ts">
  import { getContext } from "svelte";
  import { contextKeySettings } from "$lib/config";

  type Usage = {
    usage: {
      [site: string]: number
    }
  };

  const { usage }: Usage = getContext(contextKeySettings);

  const formatNumber = (node: HTMLElement) => {
    node.innerText = Number(node.innerText).toLocaleString(navigator?.language || "en-US")
  };
</script>

<div class="mt-5 md:mt-0 md:col-span-2">
  <div class="shadow overflow-hidden sm:rounded-md">
    <div class="px-4 py-5 bg-white sm:p-6">
      <p class="text-base leading-6 font-medium text-gray-900">Usage</p>
      <div class="mt-4 space-y-4">
        <table class="table-auto w-full divide-y divide-pink-600">
          <thead>
            <tr class="uppercase tracking-wider">
              <th class="text-left">Website</th>
              <th class="text-right">Page views</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(usage) as [site, count]}
              <tr>
                <td>{site}</td>
                <td use:formatNumber class="text-right">{count}</td>
              </tr>
            {/each}
            <tr>
              <td><strong>Total</strong></td>
              <td use:formatNumber class="text-right"
                >{Object.values(usage).reduce(
                  (total, current) => total + current,
                  0
                )}</td
              >
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
