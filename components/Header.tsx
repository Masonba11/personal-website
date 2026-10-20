"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname.startsWith("/lp")) {
    return (
      <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-paper backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Logo />
          <nav className="flex items-center gap-4 text-sm" aria-label="Landing">
            <a href="/privacy" className="text-paper/80 hover:text-paper">Privacy</a>
            {pathname !== "/lp/thank-you" ? (
              <a href="#apply" className="border border-gold px-3 py-2 text-gold">See If Your Business Qualifies</a>
            ) : null}
          </nav>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/95 text-paper backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-gold" : "text-paper/80 hover:text-paper"}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="border border-gold px-4 py-2 text-sm text-gold hover:bg-gold hover:text-ink">
            Let&apos;s Talk Growth
          </Link>
        </nav>
        <button
          type="button"
          className="border border-white/20 px-3 py-2 text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-white/10 bg-ink px-5 py-6 md:hidden" aria-label="Mobile">
          <ul className="space-y-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block font-serif text-3xl">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="mt-4 inline-flex border border-gold px-4 py-3 text-gold">
                Let&apos;s Talk Growth
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
