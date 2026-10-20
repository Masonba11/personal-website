import type { Metadata } from "next";
import { LandingBoot, QualifierLink, StickyApply } from "@/components/landing/LandingBits";
import { LandingForm } from "@/components/landing/LandingForm";
import { LandingHero } from "@/components/landing/Hero";
import { Pricing } from "@/components/landing/Pricing";
import { FounderPortrait } from "@/components/FounderPortrait";
import { ProofScreenshot } from "@/components/ProofScreenshot";
import { caseStudies } from "@/lib/case-studies";
import { azwwp, azwwpCplReduction, ballBros, pct, sublime, sublimeCpl, usd } from "@/lib/figures";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Campaign Results",
    description: "Review MBall Marketing campaign results for home-service businesses. You fund the ads and pay an agreed price per qualified lead.",
    path: "/lp/results",
  }),
  robots: { index: false, follow: false },
};

const cards = [
  {
    company: "Ball Bros Screens",
    lines: ["143 customer inquiries", `${usd(ballBros.customerCpl)} CPL`, "Campaign period: July–October 2026"],
  },
  {
    company: "Arizona Window Washing Pros",
    lines: ["212 Meta leads", `${usd(azwwp.after.cpl)} CPL`, "Campaign period: June–October 2026"],
  },
  {
    company: "Sublime Design & Build",
    lines: ["32 leads", `${usd(sublimeCpl)} CPL`, "Early-stage contractor campaign."],
  },
];

function studyShot(slug: string, file: string) {
  const study = caseStudies.find((item) => item.slug === slug);
  return study?.screenshots.find((shot) => shot.src.includes(encodeURI(file)));
}

export default function ResultsLandingPage() {
  const ball = studyShot("ball-bros-screens", "Ballbrosscreensresults.png");
  const before = studyShot("arizona-window-washing-pros", "azwwpfails.png");
  const after = studyShot("arizona-window-washing-pros", "azwwpcomeback.png");
  const yard = studyShot("the-yard-experts", "yardexpertsresultspaidmedia.png");
  const mountains = studyShot("arizona-window-washing-pros", "proofofbeingthebiggestcompany white mountains .png");

  return (
    <div className="pb-24 md:pb-0">
      <LandingBoot variant="results" />
      <LandingHero variant="results" />
      <section className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <h2 className="font-serif text-3xl md:text-4xl">Campaign results</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-body">
          Counts below are lead-form inquiries from the named ad accounts for the stated periods. They are not booked jobs or collected revenue.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.company} className="border border-ink/10 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{card.company}</p>
              <ul className="mt-4 space-y-2">
                {card.lines.map((line) => (
                  <li key={line} className="font-serif text-2xl leading-snug">{line}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-mist">
          Ball Bros Screens exact export: {ballBros.period}, {ballBros.customerLeads} customer lead-form inquiries, {usd(ballBros.customerSpend)} spent. Arizona Window Washing Pros after the pivot: {azwwp.after.period}. Sublime Design &amp; Build: {sublime.period}, {usd(sublime.spend)} spent.
        </p>
      </section>
      <section className="bg-white py-14">
        <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
          <h2 className="font-serif text-3xl">Before and after the market change</h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body">
            We nearly shut down our window cleaning company. Instead of throwing more money into the same advertising strategy, we changed markets. The results changed with it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="border border-ink/10 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-mist">Before</p>
              <p className="mt-2 font-serif text-4xl">{usd(azwwp.before.cpl)} CPL</p>
              <p className="mt-2 text-sm text-body">{azwwp.before.period}</p>
            </div>
            <div className="border border-gold bg-ink p-5 text-paper">
              <p className="text-xs uppercase tracking-[0.16em] text-gold">After</p>
              <p className="mt-2 font-serif text-4xl">{usd(azwwp.after.cpl)} CPL</p>
              <p className="mt-2 text-sm text-mist">{azwwp.after.period}</p>
            </div>
            <div className="border border-ink/10 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-mist">Reduction</p>
              <p className="mt-2 font-serif text-4xl">Approximately {pct(azwwpCplReduction, 1)}</p>
              <p className="mt-2 text-sm text-body">Meta cost per lead, compared with January–May 2026.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8">
        <QualifierLink variant="results" className="inline-flex bg-ink px-5 py-3 text-paper">
          See If Your Business Qualifies
        </QualifierLink>
      </section>
      <Pricing />
      <section className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8">
        <LandingForm variant="results" />
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-14 md:px-8">
        <h2 className="font-serif text-3xl">The ad account screenshots</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-body">
          Tap a screenshot to view the full report.
        </p>
        {before ? <ProofScreenshot shot={before} /> : null}
        {after ? <ProofScreenshot shot={after} /> : null}
        {ball ? <ProofScreenshot shot={ball} /> : null}
        {yard ? <ProofScreenshot shot={yard} /> : null}
        {mountains ? <ProofScreenshot shot={mountains} /> : null}
      </section>
      <section className="bg-charcoal text-paper">
        <div className="mx-auto grid w-full max-w-6xl items-stretch gap-8 px-5 py-14 md:grid-cols-[0.8fr_1.2fr] md:px-8">
          <FounderPortrait />
          <div>
            <h2 className="font-serif text-4xl">I&apos;ve Been on Both Sides of the Business.</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">
              I&apos;m Mason Ball. I&apos;ve built and operated home-service companies, paid for my own advertising, and experienced firsthand what happens when campaigns don&apos;t produce profitable customers. I use that experience to help other contractors generate qualified customer inquiries.
            </p>
            <QualifierLink variant="results" className="mt-8 inline-flex bg-gold px-5 py-3 text-ink">
              See If Your Business Qualifies
            </QualifierLink>
          </div>
        </div>
      </section>
      <StickyApply variant="results" />
    </div>
  );
}
