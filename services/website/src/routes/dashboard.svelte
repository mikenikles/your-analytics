<script context="module" lang="ts">
  export async function preload(page, session) {
    const { user } = session;

    if (!user) {
      this.redirect(302, "auth");
      return;
    }

    if (!user.sites || Object.keys(user.sites).length === 0) {
      this.redirect(302, "onboarding");
      return;
    }

    const sites = Object.keys(user.sites);
    if (sites.length === 1) {
      this.redirect(302, sites[0]);
      return;
    }

    if (sites.length >= 2) {
      this.redirect(302, "websites");
      return;
    }
  };
</script>
