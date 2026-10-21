"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { bootAnalytics, hasMeasurementConsent, setMeasurementConsent } from "./track";
export function MeasurementConsent() {
  const [open, setOpen] = useState(false);
  const decision = useSyncExternalStore((cb) => {
    window.addEventListener("mball:consent", cb); window.addEventListener("storage", cb);
    return () => { window.removeEventListener("mball:consent", cb); window.removeEventListener("storage", cb); };
  }, () => { try { return localStorage.getItem("mball_measurement_consent") || ""; } catch { return "denied"; } }, () => "denied");
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/lp")) {
      const timer = window.setTimeout(() => bootAnalytics(), 1200);
      return () => window.clearTimeout(timer);
    }
    bootAnalytics();
  }, [pathname]);
  function choose(granted: boolean) { setMeasurementConsent(granted); setOpen(false); }
  return <aside aria-label="Advertising measurement preferences" className="border-t border-ink/15 bg-paper p-5 text-sm">
    <button className="underline" onClick={() => setOpen(!open)}>Advertising measurement preferences</button>
    {open ? <div className="mx-auto mt-3 max-w-3xl space-y-3">
      <p>May we use Meta and configured analytics tools to measure page visits and accepted applications? You can apply without accepting. <a href="/privacy" className="underline">Privacy notice</a>.</p>
      <div className="flex flex-wrap gap-3"><button className="border border-ink px-4 py-2" onClick={() => choose(false)}>Decline</button><button className="border border-ink px-4 py-2" onClick={() => choose(true)}>Allow measurement</button></div>
      <p>Current choice: {decision === "denied" || !hasMeasurementConsent() ? "Off" : "Allowed"}. Your browser’s Global Privacy Control overrides this choice.</p>
    </div> : null}
  </aside>;
}
