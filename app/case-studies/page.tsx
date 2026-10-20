import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { caseStudies } from "@/lib/case-studies";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Case Studies",
  description:
    "Four home-service campaigns with the ad-account screenshots behind them: window cleaning, solar screens, remodeling, and landscaping.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Results"
        title="Results you can open and inspect."
        lede="Each study names the business, the dates, and what the number is — a lead form, a reported conversion, or an estimate. Hiring inquiries are not customer leads. Pipeline is not revenue."
      />
      <Shell className="grid gap-6 py-16 md:grid-cols-2 md:py-24">
        {caseStudies.map((study) => (
          <article key={study.slug} className="flex flex-col border border-ink/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">{study.cardEyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl">{study.company}</h2>
            <p className="mt-2 text-sm text-body">
              {study.industry} · {study.market}
            </p>
            <p className="mt-1 text-sm text-body">{study.period}</p>
            <p className="mt-6 font-serif text-5xl text-ink">{study.cardMetric}</p>
            <p className="text-sm text-body">{study.cardMetricLabel}</p>
            <p className="mt-4 flex-1 leading-relaxed text-body">{study.cardSummary}</p>
            <Link href={`/case-studies/${study.slug}`} className="mt-6 text-sm font-medium text-gold-deep">
              Read the full case study
            </Link>
          </article>
        ))}
      </Shell>
    </>
  );
}
