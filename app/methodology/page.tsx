import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { azwwpCplReduction, ballBrosEstimatedSales, pct, usd, yardIllustrativeLtv } from "@/lib/figures";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "How These Numbers Are Counted",
  description:
    "What the lead, conversion, and estimate figures on masonball.com mean, and what they do not claim.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Methodology"
        title="What each number is, and what it is not."
        lede="The homepage metrics come from different ad accounts and different date ranges. They are not a single campaign, and they are not added into a revenue total."
      />
      <Shell className="max-w-3xl space-y-10 py-16 text-lg leading-relaxed text-body md:py-24">
        <section>
          <h2 className="font-serif text-3xl text-ink">143 solar screen customer inquiries</h2>
          <p className="mt-3">
            Ball Bros Screens, July 1 through October 19, 2026. This is the primary customer lead-form campaign: 143 results, $3,066.86 spent, $21.45 per lead. The account also shows 173 lead-form results. That larger number includes 18 hiring submissions and 12 leads from another campaign.{" "}
            <Link className="text-gold-deep underline" href="/case-studies/ball-bros-screens">
              Full study
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-ink">212 window cleaning Meta leads</h2>
          <p className="mt-3">
            Arizona Window Washing Pros, June 1 through October 19, 2026. These are Meta leads after the White Mountains pivot, at a $29.40 cost per lead. They are not added to the roughly 150 Google-originated leads in our internal notes. The earlier period, January 1 through May 31, was 88 leads at $57.97. The cost-per-lead change between those two Meta exports is {pct(azwwpCplReduction)}.{" "}
            <Link className="text-gold-deep underline" href="/case-studies/arizona-window-washing-pros">
              Full study
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-ink">32 general contracting leads</h2>
          <p className="mt-3">
            Sublime Design &amp; Build, September 1 through October 19, 2026. Thirty-two Meta lead-form submissions, $1,115.36 spent, about $34.86 per lead. Remodeling sales cycles run longer than this report. An internal pipeline expectation is not booked revenue and is not shown as a homepage result.{" "}
            <Link className="text-gold-deep underline" href="/case-studies/sublime-design-build">
              Full study
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-ink">About 2.36K Google Ads conversions</h2>
          <p className="mt-3">
            The Yard Experts overview from August 1, 2025 through October 19, 2026, as rounded by Google Ads: about 523K impressions, 16.5K clicks, 2.36K conversions, and $94.8K in cost. A conversion is the action the account counts. It is not a verified unique customer or a closed job.{" "}
            <Link className="text-gold-deep underline" href="/case-studies/the-yard-experts">
              Full study
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-ink">Estimates that are not results</h2>
          <p className="mt-3">
            Ball Bros Screens estimated sales use 143 customer inquiries × 30% × $1,200 = {usd(ballBrosEstimatedSales, 0)}. That is a labeled estimate.
          </p>
          <p className="mt-3">
            A hypothetical Yard Experts lifetime-value example — 2,360 × $1,200 = {usd(yardIllustrativeLtv, 0)} — is arithmetic on an assumption. It is not revenue, and it does not appear in the homepage results.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-3xl text-ink">Attribution</h2>
          <p className="mt-3">
            The Meta exports on this site use a 7-day click or 1-day view setting, and the result type shown is a lead form. Google Ads totals are the rounded overview. GA4 &quot;new leads&quot; on the Yard Experts page are a separate report, and the qualified-lead column in those screenshots is zero.
          </p>
        </section>
      </Shell>
    </>
  );
}
