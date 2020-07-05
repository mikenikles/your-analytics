(() => {
  const sendEvent = () => {
    fetch("https://events-api-sizrfb2hwq-uc.a.run.app", {
      method: 'POST',
      body: JSON.stringify({
        name: "pageview",
        domain: "TODO",
        user_id: 1,
        session_id: 9,
        hostname: location.hostname,
        path: location.pathname,
        referrer: document.referrer,
        // country_code: "",
        screen_size: `${window.innerWidth}x${window.innerHeight}`,
        // operating_system: "",
        // browser: ""
      }),
      credentials: 'omit',
      cache: 'no-store',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  };

  try {
    const h = window.history
    if (h.pushState) {
      const originalPushState = h['pushState']
      h.pushState = function () {
        originalPushState.apply(this, arguments);
        sendEvent();
      }
      window.addEventListener('popstate', sendEvent);
    }
    sendEvent();
  } catch (error) {
    // TODO: Capture and send to events-api for troubleshooting
  }
})();