(() => {
  try {
    const sendEvent = () => {
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
          // user_id: 1,
          // session_id: 9,
          referrer: document.referrer,
          screen_size: `${window.innerWidth}x${window.innerHeight}`,
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
    // TODO: Capture and send to events-api for troubleshooting
  }
})();
