<script lang="ts">
  import onboarding from "../../stores/onboarding";
  import StepWrapper from "./step-wrapper.svelte";
</script>

<StepWrapper>
  <div>
    <label for="firstName" class="text-sm font-medium leading-5 text-gray-700">
      What's your first name?
    </label>
    <div class="mt-1 rounded-md shadow-sm">
      <input id="firstName" bind:value={$onboarding.user.firstName} type="text" required class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
    </div>
  </div>
</StepWrapper>
