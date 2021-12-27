<script context="module" lang="ts">
  export async function load({session}) {
    const { user } = session;

    if (!user) {
      return {
        status: 302,
        redirect: "auth"
      }
    }

    if (!user.sites || Object.keys(user.sites).length === 0) {
      return {
        status: 302,
        redirect: "onboarding"
      }
    }

    const sites = Object.keys(user.sites);
    if (sites.length === 1) {
      return {
        status: 302,
        redirect: sites[0]
      }
    }

    if (sites.length >= 2) {
      return {
        status: 302,
        redirect: "websites"
      }
    }
  };
</script>
