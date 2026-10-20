"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/lp")) {
    return (
      <footer className="bg-ink text-paper">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm md:px-8">
          <Logo />
          <nav className="flex flex-wrap gap-4" aria-label="Landing footer">
            <Link href="/privacy" className="text-paper/80 hover:text-paper">Privacy</Link>
            <Link href="/methodology" className="text-paper/80 hover:text-paper">How the numbers are counted</Link>
            <a href={`mailto:${site.email}`} className="text-paper/80 hover:text-paper">{site.email}</a>
            <Link href="/" className="text-paper/80 hover:text-paper">Main site</Link>
          </nav>
          <p className="max-w-3xl text-xs leading-relaxed text-mist">
            Advertising spend and qualified-lead fees are separate. Lead counts on these pages are campaign inquiries, not booked jobs. MBall Marketing does not guarantee a specific number of leads or sales.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mist">
            Home-service marketing from someone who has had to pay for the ads, answer the leads, and live with the result.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Pages</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/80 hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/methodology" className="text-paper/80 hover:text-paper">
                How the numbers are counted
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </li>
            <li>{site.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 text-xs leading-relaxed text-mist md:px-8">
          <p>
            Leads, form fills, and ad-platform conversions are not booked jobs or collected revenue. Estimates on this site are labeled with the assumptions behind them.
          </p>
          <p>© {new Date().getFullYear()} {site.name}. Mason Ball.</p>
        </div>
      </div>
    </footer>
  );
}
