import Link from "next/link";
import { ProofScreenshot } from "@/components/ProofScreenshot";
import { Shell } from "@/components/Shell";
import { CtaLink } from "@/components/CtaLink";
import type { CaseStudy } from "@/lib/case-studies";
import { caseStudies } from "@/lib/case-studies";

export function CaseStudyView({ study }: { study: CaseStudy }) {
  const others = caseStudies.filter((item) => item.slug !== study.slug);

  return (
    <article>
      <header className="bg-ink text-paper">
        <Shell className="py-16 md:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
            <Link href="/case-studies" className="hover:text-paper">
              Results
            </Link>
            <span aria-hidden="true"> / </span>
            {study.company}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-[1.08] md:text-6xl">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{study.subtitle}</p>
          <dl className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Business" value={study.company} />
            <Meta label="Industry" value={study.industry} />
            <Meta label="Market" value={study.market} />
            <Meta label="Period" value={study.period} />
          </dl>
        </Shell>
      </header>

      <Shell className="py-14">
        <blockquote className="max-w-3xl font-serif text-3xl italic leading-snug text-ink md:text-4xl">
          {study.takeaway}
        </blockquote>

        <Section title="The business">
          {study.context.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section title="What wasn't working">
          {study.challenges.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section title="The strategy">
          {study.strategy.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section title="The results">
          {study.resultsLead.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="border border-gold/40 bg-ink p-5 text-paper">
                <p className="font-serif text-4xl text-gold">{metric.value}</p>
                <p className="mt-2">{metric.label}</p>
                {metric.detail ? <p className="mt-2 text-sm text-mist">{metric.detail}</p> : null}
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {study.resultNotes.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {study.estimate ? (
            <div className="mt-8 border border-ink/10 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Estimate, not booked revenue</p>
              <p className="mt-3 font-serif text-3xl">{study.estimate.display}</p>
              <p className="mt-3">{study.estimate.formula}</p>
              <p className="mt-3 text-sm text-body">{study.estimate.disclaimer}</p>
            </div>
          ) : null}
          {study.pipeline ? (
            <div className="mt-8 border border-ink/10 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Pipeline expectation, not contracted revenue</p>
              <p className="mt-3 text-lg">{study.pipeline.statement}</p>
              <p className="mt-3 text-sm text-body">{study.pipeline.disclaimer}</p>
            </div>
          ) : null}
          {study.comparison ? <ComparisonTable comparison={study.comparison} /> : null}
          {study.callout ? (
            <div className="mt-8 bg-charcoal p-6 text-paper md:p-8">
              <p className="font-serif text-2xl leading-snug md:text-3xl">{study.callout.title}</p>
              <p className="mt-4 text-mist">{study.callout.body}</p>
            </div>
          ) : null}
        </Section>

        <Section title="Advertising screenshots">
          <p>
            These are unedited exports. Click a preview to enlarge it. Nothing in the image has been altered.
          </p>
          <div className="mt-6 grid gap-6">
            {study.screenshots.map((item) => (
              <ProofScreenshot key={item.src} shot={item} />
            ))}
          </div>
        </Section>

        <Section title="What I take from it">
          {study.analysis.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Section>

        <Section title="Methodology">
          <ul className="list-disc space-y-3 pl-5">
            {study.methodology.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      </Shell>

      <section className="bg-ink text-paper">
        <Shell className="py-16">
          <h2 className="font-serif text-4xl">If your numbers look like the first half of this story, that is a useful place to start.</h2>
          <div className="mt-8">
            <CtaLink href="/contact">Let&apos;s See If We Can Grow Your Business</CtaLink>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {others.map((item) => (
              <Link key={item.slug} href={`/case-studies/${item.slug}`} className="border border-white/15 p-5 hover:border-gold">
                <p className="text-xs uppercase tracking-[0.16em] text-gold">{item.company}</p>
                <p className="mt-3 font-serif text-2xl">{item.cardMetric}</p>
                <p className="mt-2 text-sm text-mist">{item.cardMetricLabel}</p>
              </Link>
            ))}
          </div>
        </Shell>
      </section>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14 max-w-3xl space-y-4 text-lg leading-relaxed text-body [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.16em] text-mist">{label}</dt>
      <dd className="mt-2 text-paper">{value}</dd>
    </div>
  );
}

function ComparisonTable({ comparison }: { comparison: NonNullable<CaseStudy["comparison"]> }) {
  return (
    <div className="mt-8">
      <div className="overflow-x-auto border border-ink/10">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <caption className="border-b border-ink/10 px-4 py-3 text-left text-sm text-body">
            {comparison.caption}
          </caption>
          <thead className="bg-ink text-paper">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">
                Measure
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {comparison.beforeLabel}
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                {comparison.afterLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.rows.map((row) => (
              <tr key={row.label} className="border-t border-ink/10 bg-white">
                <th scope="row" className="px-4 py-3 font-medium text-ink">
                  {row.label}
                </th>
                <td className="px-4 py-3">{row.before}</td>
                <td className="px-4 py-3">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
