<script context="module" lang="ts">
  export async function load({session}) {
    const { user } = session;
    if (!user) {
      return {
        status: 302,
        redirect: "auth"
      }
    }
    return {
      props: {user}
    }
  };
</script>

<script lang="ts">
  import onboarding from "../stores/onboarding";
  import Header from "../components/header/index.svelte";
  import MainContent from "../components/main-content.svelte";
  import StepHeader from "../components/onboarding/step-header.svelte";
  import Step1 from "../components/onboarding/step-1.svelte";
  import Step2 from "../components/onboarding/step-2.svelte";
  import Step3 from "../components/onboarding/step-3.svelte";

  export let user: {
    firstName?: string;
    sites?: {};
  };

  $onboarding.user = user;
  const stepsCount = user.firstName ? 2 : 3;
</script>

<svelte:head>
  <title>Onboarding | Your Analytics</title>
</svelte:head>

<Header />
<MainContent>
  <div>
    <ul class="space-y-4 md:flex md:space-y-0 md:space-x-8">
      {#if stepsCount === 3}
        <StepHeader stepNumber={stepsCount - 2} label="About you" />
      {/if}
      <StepHeader isUpcoming={!$onboarding.user.firstName} stepNumber={stepsCount - 1} label="Your website" />
      <StepHeader isUpcoming={!$onboarding.isSiteAdded} stepNumber={stepsCount} label="Ready to go" />
    </ul>
  </div>

  <div class="flex flex-col justify-center sm:px-6 lg:px-8">
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div>
        {#if !$onboarding.user.firstName}
          <Step1 />
        {/if}

        {#if $onboarding.user.firstName}
          {#if !$onboarding.isSiteAdded}
            <Step2 />
          {:else}
            <Step3 />
          {/if}
        {/if}
      </div>
    </div>
  </div>
</MainContent>
