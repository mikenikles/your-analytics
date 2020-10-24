<script lang="ts">
  import { setFirstName } from "../../api/onboarding";
  import onboarding from "../../stores/onboarding";
  import StepWrapper from "./step-wrapper.svelte";

  let firstName = "";

  const handleSubmit = async () => {
    await setFirstName(firstName);
    $onboarding.user.firstName = firstName;
  };

  const handleKeyup = (event) => {
    if (event.code === "Enter") {
      handleSubmit();
    }
  };
</script>

<StepWrapper>
  <div>
    <label for="firstName" class="text-sm font-medium leading-5 text-gray-700">
      What's your first name?
    </label>
    <div class="mt-1 rounded-md shadow-sm">
      <input id="firstName" bind:value={firstName} on:keyup|preventDefault={handleKeyup} type="text" required class="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
    </div>
  </div>

  <div class="mt-6">
    <span class="w-full rounded-md shadow-sm">
      <button type="button" on:click={handleSubmit} class="w-full flex justify-center mt-4 py-4 px-10 bg-blue-600 rounded-lg font-semibold text-white sm:mt-0">
        Next: Configure your website
      </button>
    </span>
  </div>
</StepWrapper>
