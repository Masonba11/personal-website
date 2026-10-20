"use client";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    _fbq?: unknown;
  }
}

const onceKeys = new Set<string>();

export function track(name: string, params: Params = {}, options?: { once?: boolean; eventId?: string }) {
  const eventId = options?.eventId ?? crypto.randomUUID();
  const onceKey = `${name}:${params.variant ?? ""}`;
  if (options?.once && onceKeys.has(onceKey)) return eventId;
  if (options?.once) onceKeys.add(onceKey);

  const detail = { event: name, event_id: eventId, ...params };
  window.dispatchEvent(new CustomEvent("mball:track", { detail }));
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(detail);

  if (typeof window.fbq === "function") {
    if (name === "application_received") {
      window.fbq("track", "Lead", { content_name: params.variant }, { eventID: eventId });
    } else {
      window.fbq("trackCustom", name, params, { eventID: eventId });
    }
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, { ...params, event_id: eventId });
  }

  return eventId;
}

function script(src: string, id: string) {
  if (document.getElementById(id)) return;
  const tag = document.createElement("script");
  tag.id = id;
  tag.async = true;
  tag.src = src;
  document.head.appendChild(tag);
}

export function bootAnalytics() {
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (pixel && typeof window.fbq !== "function") {
    const fbq = function (...args: unknown[]) {
      const queue = (fbq as unknown as { queue: unknown[] }).queue;
      queue.push(args);
    } as ((...args: unknown[]) => void) & { queue: unknown[]; loaded: boolean; version: string };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    script("https://connect.facebook.net/en_US/fbevents.js", "meta-pixel");
    window.fbq("init", pixel);
    window.fbq("track", "PageView");
  }

  const measurement = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (measurement && typeof window.gtag !== "function") {
    script(`https://www.googletagmanager.com/gtag/js?id=${measurement}`, "ga4");
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args as unknown as Record<string, unknown>);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurement, { send_page_view: true });
  }
}
