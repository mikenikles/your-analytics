<script context="module" lang="ts">
  import type sapperCommon from "@sapper/common";
  import type { ISession } from "../stores/session";

  export async function preload(_page: sapperCommon.Page, session: ISession) {
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
