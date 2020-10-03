<script context="module" lang="ts">
  export function preload(page, session) {
    const { user } = session;
    if (user) {
      this.redirect(302, "dashboard");
    }
  };
</script>

<script lang="ts">
  import { stores } from '@sapper/app';
  import { onMount } from "svelte";
  import { login } from "../auth/magic";
  import Card from "../components/card.svelte";
  import Header from "../components/header/index.svelte";
  import MainContent from "../components/main-content.svelte";

  const { session } = stores();
</script>

<svelte:head>
  <title>Register / login | Your Analytics</title>
</svelte:head>

{#if !$session.user}
  <Header />
  <MainContent>
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Get started and see your analytics within minutes
      </h2>
      <p class="mt-2 p-2 text-center">Whether you already have an account or not, simply provide your email address and we'll figure out the rest.</p>
    </div>

    <Card clazz="max-w-xl mx-auto p-4">
      <form on:submit|preventDefault={login}>
        <div>
          <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
            Email address
          </label>
          <div class="mt-1 rounded-md shadow-sm">
            <input id="email" name="email" type="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
          </div>
        </div>

        <div class="mt-6">
          <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
            Password
          </label>
          <div class="mt-1">
            <p class="text-sm">No password required. When you sign in, we send you an email with a link. Simply click it to log in.</p>
          </div>
        </div>

        <div class="mt-6">
          <span class="block w-full rounded-md shadow-sm">
            <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
              Sign in
            </button>
          </span>
        </div>
      </form>
    </Card>
  </MainContent>
{/if}
