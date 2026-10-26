"use client";

import { useEffect, useState } from "react";
import { bootAnalytics, track } from "@/components/landing/track";

export function LandingBoot({ variant }: { variant: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    let ran = false;
    const start = () => {
      if (ran) return;
      ran = true;
      bootAnalytics();
      track("landing_page_view", { variant }, { once: true });
    };
    const idle = window.requestIdleCallback?.(start, { timeout: 1800 });
    const timer = window.setTimeout(start, 1200);
    return () => {
      root.style.scrollBehavior = previous;
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      window.clearTimeout(timer);
    };
  }, [variant]);
  return null;
}

export function QualifierLink({ children, className, variant }: { children: React.ReactNode; className?: string; variant: string }) {
  const label = typeof children === "string" ? children : "See If Your Business Qualifies";
  return (
    <a
      href="#apply"
      className={className}
      onClick={() => track("cta_click", { variant, cta: label })}
    >
      {children}
    </a>
  );
}

export function StickyApply({ variant }: { variant: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const form = document.getElementById("apply");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting);
    }, { rootMargin: "0px 0px -72px 0px", threshold: 0 });
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="sticky-apply" hidden={!show} className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 p-3 md:hidden">
      <QualifierLink variant={variant} className="block bg-gold py-3 text-center text-sm font-medium text-ink">
        See If Your Business Qualifies
      </QualifierLink>
    </div>
  );
}
