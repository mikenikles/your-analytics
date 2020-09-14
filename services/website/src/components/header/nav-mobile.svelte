<script>
  import { logout } from "../../auth/magic";
  import isOpen from "../../stores/mobile-menu";
  import { session } from "../../stores/session";

  $: user = $session.user || {};
  $: hasMultipleSites = Object.keys(user.sites || {}).length > 1;
  $: userFirstName = user.firstName || "";
  $: userEmail = user.email || "";
  $: userEmailHash = user.emailHash;

  const handleLogout = async () => {
    await logout();
    await goto("/auth");
  };
</script>

<div class="flex md:hidden">
  {#if $isOpen}
    <div class="block border-b border-gray-700 md:hidden">
      {#if hasMultipleSites}
      <div class="px-2 py-3 sm:px-3">
        <a href="/websites" class="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Your websites</a>
        {#if false}
        <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Team</a>
        {/if}
      </div>
      {/if}
      <div class="pt-4 pb-3 border-t border-gray-700">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src="https://www.gravatar.com/avatar/{userEmailHash}.jpg?d=identicon" alt="Profile avatar">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium leading-none">{userFirstName}</div>
            <div class="mt-1 text-sm font-medium leading-none">{userEmail}</div>
          </div>
        </div>
        <div class="mt-3 px-2" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
          {#if false}
          <a href="/TODO" class="block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Your Profile</a>
          <a href="/TODO" class="mt-1 block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Settings</a>
          {/if}
          <button on:click={handleLogout} class="mt-1 block px-3 py-2 rounded-md text-base font-medium hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700" role="menuitem">Sign out</button>
        </div>
      </div>
    </div>
  {/if}
</div>