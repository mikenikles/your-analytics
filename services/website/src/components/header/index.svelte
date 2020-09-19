<script>
  import { stores } from "@sapper/app";
  import { logout } from "../../auth/magic";
  import NavMobile from "./nav-mobile.svelte";
  import NavMobileMenuButton from "./nav-mobile-menu-button.svelte";
  import Nav from "./nav.svelte";
  import NavItem from "./nav-item.svelte";

  const { page } = stores();
</script>

<div class="max-w-7xl mx-auto flex justify-between items-center p-4">
  <a href="/">
    <img src="/logo-color.svg" alt="Your Analytics logo" width="200" height="32" class="h-8">
  </a>
  {#if false}
  <button on:click={logout}>Logout</button>
  <Nav>
    <NavItem href="/" label="Home" isActive={$page.path === "/"} />
    <NavItem href="/privacy" label="Privacy" isActive={$page.path === "/privacy"} />
    <NavItem href="/docs" label="Docs" isActive={$page.path === "/docs"} />
  </Nav>
  <NavMobileMenuButton />
  {/if}
</div>
<NavMobile />