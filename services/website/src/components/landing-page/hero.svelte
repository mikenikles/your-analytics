<script lang="ts">
  import { recordEmail } from "../../api/beta";

  let isEmailAdded: boolean;
  let betaSignUpForm: HTMLFormElement;

  const handleSubmit = async () => {
    const formData = new FormData(betaSignUpForm);
    const email = formData.get("email");
    isEmailAdded = await recordEmail(email);
  };
</script>

<style>
  .bg {
    background-image: url('/logo-3d.png');
  }
</style>

<div class="bg bg-fixed bg-center bg-cover text-white">
  <div class="max-w-4xl mx-auto">
    <div class="py-10 px-4 sm:py-32 sm:px-12">
      <h1 class="text-3xl text-center font-extrabold tracking-wide sm:text-5xl sm:text-left">Your web analytics<br />with privacy and simplicity in mind</h1>
      <p class="mt-8 text-xl sm:text-2xl">Your Analytics - an <strong>open source, privacy-focused</strong> web analytics platform. Focus on the basics and respect visitor privacy.</p>
      <div class="mt-8 flex justify-center">
        <a href="/your-analytics.org" class="items-center inline-flex justify-center py-4 px-10 bg-blue-600 rounded-lg font-semibold">
          <span class="mr-2 relative flex h-3 w-3">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
          Live Demo
        </a>
      </div>
    </div>
    <div class="pb-32 px-4 sm:px-20">
      <div class="shadow-2xl">
        <div class="p-4 bg-pink-500 text-xl font-bold sm:text-2xl">Follow us for updates and early access</div>
        <form bind:this={betaSignUpForm} on:submit|preventDefault={handleSubmit} class="bg-white">
          <div class="p-4 flex flex-col sm:flex-row">
            <div class="mt-1 flex flex-1 rounded-md shadow-sm">
              <span class="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                @
              </span>
              <input placeholder="Enter your email" aria-label="Email" name="email" class="form-input flex-1 px-4 py-2 rounded-none rounded-r-md text-black sm:text-sm sm:leading-5">
            </div>
            <button type="submit" class="mt-4 py-4 px-10 bg-blue-600 rounded-lg font-semibold sm:ml-4 sm:mt-0">Notify me!</button>
          </div>
          {#if isEmailAdded}
            <p class="p-4 text-center text-normal font-bold text-black">
              Fantastic, we will be in touch.
            </p>
          {/if}
        </form>
      </div>
    </div>
  </div>
</div>