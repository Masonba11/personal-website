"use client";

type Params = Record<string, string | number | boolean | undefined>;
type Pixel = ((...args: unknown[]) => void) & { queue?: unknown[][]; callMethod?: (...args: unknown[]) => void; loaded?: boolean; version?: string; push?: Pixel };
declare global {
  interface Window { fbq?: Pixel; _fbq?: Pixel; gtag?: (...args: unknown[]) => void; dataLayer?: unknown[]; }
}
const onceKeys = new Set<string>();
const received = new Set<string>();
let lastPath = "";

export function hasMeasurementConsent() {
  try {
    if ((navigator as Navigator & {globalPrivacyControl?: boolean}).globalPrivacyControl) return false;
    return localStorage.getItem("mball_measurement_consent") === "granted";
  } catch { return false; }
}
export function setMeasurementConsent(granted: boolean) {
  try { localStorage.setItem("mball_measurement_consent", granted ? "granted" : "denied"); } catch { /* optional storage */ }
  window.dispatchEvent(new Event("mball:consent"));
  if (granted) bootAnalytics();
  else { window.fbq?.("consent", "revoke"); }
}

export function track(name: string, params: Params = {}, options?: { once?: boolean; eventId?: string }) {
  const eventId = options?.eventId ?? crypto.randomUUID();
  // Form answers are preliminary screening, not verified CRM outcomes.
  if (name === "qualified_application") return eventId;
  if (!hasMeasurementConsent()) return eventId;
  const onceKey = `${name}:${params.variant ?? ""}`;
  if (options?.once && onceKeys.has(onceKey)) return eventId;
  if (name === "application_received" && received.has(eventId)) return eventId;
  if (options?.once) onceKeys.add(onceKey);
  if (name === "application_received") received.add(eventId);
  try {
    bootAnalytics();
    const detail = { event: name, event_id: eventId, ...params };
    window.dispatchEvent(new CustomEvent("mball:track", { detail }));
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    if (typeof window.fbq === "function") {
      if (name === "application_received") window.fbq("track", "Lead", { content_name: params.variant }, { eventID: eventId });
      else window.fbq("trackCustom", name === "application_started" ? "ApplicationStarted" : name, params, { eventID: eventId });
    }
    window.gtag?.("event", name, { ...params, event_id: eventId });
  } catch { /* Optional measurement must never turn successful delivery into an error. */ }
  return eventId;
}
function script(src: string, id: string) {
  if (document.getElementById(id)) return;
  const tag = document.createElement("script"); tag.id = id; tag.async = true; tag.src = src; document.head.appendChild(tag);
}
export function bootAnalytics() {
  if (!hasMeasurementConsent()) return;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (pixel && !window.fbq) {
    const fbq: Pixel = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args); else fbq.queue?.push(args);
    };
    fbq.queue = []; fbq.loaded = true; fbq.version = "2.0"; fbq.push = fbq;
    window.fbq = fbq; window._fbq = fbq;
    fbq("consent", "grant"); fbq("init", pixel);
    script("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel");
  }
  window.fbq?.("consent", "grant");
  const path = window.location.pathname;
  if (window.fbq && lastPath !== path) { window.fbq("track", "PageView"); lastPath = path; }
  const measurement = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (measurement && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer?.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", measurement);
    script(`https://www.googletagmanager.com/gtag/js?id=${measurement}`, "ga4");
  }
}
