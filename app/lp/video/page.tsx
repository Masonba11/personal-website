import type { Metadata } from "next";
import Link from "next/link";
import { LandingBoot, QualifierLink, StickyApply } from "@/components/landing/LandingBits";
import { WinningAdsShowcase } from "@/components/WinningAds";
import { LandingForm } from "@/components/landing/LandingForm";
import { LandingHero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { VideoSlot } from "@/components/landing/VideoSlot";
import { azwwp, azwwpCplReduction, ballBros, pct, sublime, sublimeCpl, usd } from "@/lib/figures";
import { pageMeta } from "@/lib/site";
import { storyVideo } from "@/lib/videos";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Pay Per Qualified Lead",
    description: "See how MBall Marketing generates qualified customer inquiries for home-service businesses. You fund the ads and pay an agreed price per qualified lead.",
    path: "/lp/video",
  }),
  robots: { index: false, follow: false },
};

const proof = [
  {
    href: "/case-studies/ball-bros-screens",
    company: "Ball Bros Screens",
    stat: `${ballBros.customerLeads} customer inquiries`,
    detail: `${usd(ballBros.customerCpl)} cost per lead. Customer acquisition campaign spending: ${usd(ballBros.customerSpend)}.`,
    period: ballBros.period,
  },
  {
    href: "/case-studies/arizona-window-washing-pros",
    company: "Arizona Window Washing Pros",
    stat: `${azwwp.after.leads} Meta inquiries following a strategic market pivot`,
    detail: `${usd(azwwp.after.cpl)} cost per lead. Approximately ${pct(azwwpCplReduction)} reduction in CPL compared with the earlier campaign period.`,
    period: azwwp.after.period,
  },
  {
    href: "/case-studies/sublime-design-build",
    company: "Sublime Design & Build",
    stat: `${sublime.leads} remodeling and general contracting lead submissions`,
    detail: `Approximately ${usd(sublimeCpl)} cost per lead.`,
    period: sublime.period,
  },
];

export default function VideoLandingPage() {
  return (
    <div className="pb-24 md:pb-0">
      <LandingBoot variant="video" />
      <LandingHero variant="video" secondary={{ href: "#story", label: "Watch My Story" }} />
      <WinningAdsShowcase
        variant="landing"
        landingVariant="video"
        headline="Don't just take our word for it. Watch the actual ads we've run for home service businesses."
        lede="From window cleaning to solar screens and general contracting, these are real advertisements built to attract homeowners and generate new business opportunities."
      />
      <section id="story" className="cv-auto scroll-mt-28 mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <h2 className="font-serif text-3xl md:text-4xl">How I Generated Hundreds of Leads for My Own Businesses</h2>
        <p className="mt-3 max-w-2xl text-body">
          I&apos;ll show you the campaigns, challenges, and strategies behind the businesses I&apos;ve built and the contractors I&apos;ve worked with.
        </p>
        <div className="mt-6">
          <VideoSlot video={storyVideo} variant="video" />
        </div>
      </section>
      <section className="cv-auto mx-auto w-full max-w-6xl px-5 pb-14 md:px-8">
        <h2 className="font-serif text-3xl">Results from the campaigns</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">
          These are lead-form inquiries from the named campaigns, not booked jobs. Full definitions and date ranges are on each case study.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {proof.map((item) => (
            <Link key={item.href} href={item.href} className="border border-ink/10 bg-white p-5 hover:border-gold">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{item.company}</p>
              <p className="mt-3 font-serif text-2xl">{item.stat}</p>
              <p className="mt-3 text-sm leading-relaxed text-body">{item.detail}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.14em] text-mist">{item.period}</p>
            </Link>
          ))}
        </div>
        <QualifierLink variant="video" className="mt-8 inline-flex bg-ink px-5 py-3 text-paper">
          See If Your Business Qualifies
        </QualifierLink>
      </section>
      <Pricing />
      <section className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8">
        <LandingForm variant="video" />
      </section>
      <StickyApply variant="video" />
    </div>
  );
}
