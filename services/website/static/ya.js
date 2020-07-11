(() => {
  try {
    const t = () => {
        fetch("https://events-api.your-analytics.org", {
          method: "POST",
          body: JSON.stringify({
            name: "pageview",
            domain: document
              .querySelector('[src*="your-analytics.org"]')
              .getAttribute("data-domain"),
            url:
              location.protocol +
              "//" +
              location.hostname +
              location.pathname +
              location.search,
            referrer: document.referrer,
            screen_size: `${window.innerWidth}x${window.innerHeight}`,
          }),
          credentials: "omit",
          cache: "no-store",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
        });
      },
      e = window.history;
    if (e.pushState) {
      const o = e.pushState;
      (e.pushState = function () {
        o.apply(this, arguments), t();
      }),
        window.addEventListener("popstate", () => {
          t();
        });
    }
    t();
  } catch (t) {}
})();
