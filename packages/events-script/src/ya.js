(() => {
  try {
    const sendEvent = () => {
      if (navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack) {
        return;
      }
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
          // session_id: 9,
          referrer: document.referrer,
          screen_size: window.innerWidth,
        }),
        credentials: "omit",
        cache: "no-store",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
      });
    };

    const originalHistory = window.history;
    if (originalHistory.pushState) {
      const originalPushState = originalHistory["pushState"];
      originalHistory.pushState = function () {
        originalPushState.apply(this, arguments);
        sendEvent();
      };
      window.addEventListener("popstate", () => {
        sendEvent();
      });
    }
    sendEvent();
  } catch (error) {
    new Image().src = `https://events-api.your-analytics.org/error?m=${encodeURIComponent(
      error.message
    )}`;
  }
})();
