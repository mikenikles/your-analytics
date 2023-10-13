<div class="hidden md:block">
  <nav>
    <ul class="flex font-semibold tracking-wide">
      <slot />
    </ul>
    {#if false}
      <!-- Only show when the user is logged in -->
      <span class="h-full border-l" />
      <!-- TODO: Add user dropdown -->
    {/if}
  </nav>
</div>
