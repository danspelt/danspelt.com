// Lightweight analytics helper.
// Sends named events to whatever analytics provider is present on the page
// (gtag, dataLayer, or Plausible). Never send names, email addresses, or
// message content — event names and non-personal metadata only.
export function trackEvent(eventName, metadata = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, metadata);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...metadata });
    } else if (typeof window.plausible === "function") {
      window.plausible(eventName, { props: metadata });
    }
  } catch {
    // Analytics must never break the page.
  }
}
