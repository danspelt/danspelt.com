// Lightweight analytics helper with an enforced event contract.
// Sends named events to whatever analytics provider is present on the page
// (gtag, dataLayer, or Plausible).
//
// Privacy rule: never send names, email addresses, phone numbers, message
// content, disability information, IP addresses, or raw error details.
// Only allowlisted event names and allowlisted non-personal properties
// are ever forwarded — anything else is dropped.

const EVENT_CONTRACT = {
  // Custom software lead funnel
  custom_software_view: ["path", "referrer_category"],
  custom_software_cta_click: ["cta_id", "placement"],
  inquiry_started: ["form_id"],
  inquiry_submit_success: ["form_id", "lead_source"],
  inquiry_submit_error: ["form_id", "error_category"],
};

export function trackEvent(eventName, metadata = {}) {
  if (typeof window === "undefined") return;

  const allowedProps = EVENT_CONTRACT[eventName];
  if (!allowedProps) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[analytics] Unknown event dropped: ${eventName}`);
    }
    return;
  }

  const props = {};
  for (const key of allowedProps) {
    if (metadata[key] !== undefined) props[key] = metadata[key];
  }

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, props);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...props });
    } else if (typeof window.plausible === "function") {
      window.plausible(eventName, { props });
    }
  } catch {
    // Analytics must never break the page.
  }
}
