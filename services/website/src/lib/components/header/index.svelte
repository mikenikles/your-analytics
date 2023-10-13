<script lang="ts">
  import { page, session } from "$app/stores";
  import { logout } from "$lib/auth/magic";
  import NavMobile from "./nav-mobile.svelte";
  import NavMobileMenuButton from "./nav-mobile-menu-button.svelte";
  import Nav from "./nav.svelte";
  import NavItem from "./nav-item.svelte";

  $: user = $session.user || {};
  $: userWebsites = Object.keys(user.sites || {});
  $: hasMultipleSites = userWebsites.length > 1;

  const handleLogout = async () => {
    await logout();
    $session.user = null;
  };
</script>

<div class="max-w-7xl mx-auto flex justify-between items-center p-4">
  <a href="/">
    <img src="/logo-color.svg" alt="Your Analytics logo" width="200" height="32" class="h-8">
  </a>
  {#if $session.user}
    <div class="flex">
      <Nav>
        {#if hasMultipleSites}
          <NavItem href="/websites" label="Your websites" isActive={$page.path === "/websites"} />
        {:else}
          <NavItem href="/{userWebsites[0]}" label="{userWebsites[0]}" isActive={$page.path === `/${userWebsites[0]}`} />
        {/if}
        <NavItem href="/settings" label="Settings" isActive={$page.path === "/settings"} />
      </Nav>
      <button on:click={handleLogout} class="hidden md:block font-semibold tracking-wide">Sign out</button>
      <NavMobileMenuButton />
    </div>
  {/if}
</div>
<NavMobile {handleLogout} />