import Link from "next/link";
import { CtaLink } from "@/components/CtaLink";
import { FounderPortrait } from "@/components/FounderPortrait";
import { Shell } from "@/components/Shell";
import { homepageMetrics } from "@/lib/case-studies";
import { caseStudies } from "@/lib/case-studies";
import { advantages, services } from "@/lib/services";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: { absolute: "MBall Marketing | Ads and SEO for Home-Service Businesses" },
  description:
    "Mason Ball helps home-service companies generate leads with Meta Ads, Google Ads, and SEO. He has run the businesses, not only the campaigns.",
  path: "/",
});

export default function HomePage() {
  const featured = caseStudies[0];

  return (
    <>
      <section className="bg-ink text-paper">
        <Shell className="pb-16 pt-14 md:pb-24 md:pt-20">
          <p className="font-script text-6xl leading-none text-paper md:text-7xl">MBall</p>
          <p className="mt-2 text-xs uppercase tracking-[0.28em] text-gold">Marketing</p>
          <h1 className="mt-8 max-w-5xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            I&apos;ve Built the Businesses. I&apos;ve Run the Ads. I Know What It Takes to Grow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
            I&apos;m Mason Ball. I help home-service businesses generate qualified leads, acquire customers, and grow revenue through Meta Ads, Google Ads, SEO, and data-driven marketing strategies. The difference? I&apos;ve been on both sides of the business.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/#results">See My Results</CtaLink>
            <CtaLink href="/contact" variant="secondary">
              Let&apos;s Talk Growth
            </CtaLink>
          </div>

          <div className="mt-14 border border-white/10 bg-charcoal p-5 md:p-6">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <h2 className="font-serif text-2xl">Selected campaign metrics</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mist">
                  Different ad accounts and date ranges. A lead or a conversion is not a booked job, and these figures are not a combined total.
                </p>
              </div>
              <Link href="/methodology" className="text-sm text-gold underline-offset-4 hover:underline">
                How these numbers are counted
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {homepageMetrics.map((metric) => (
                <Link
                  key={metric.href}
                  href={metric.href}
                  className="border border-gold/30 p-4 hover:border-gold"
                >
                  <p className="font-serif text-4xl text-gold">{metric.value}</p>
                  <p className="mt-2 text-paper">{metric.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-mist">{metric.detail}</p>
                </Link>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      <section className="bg-paper">
        <Shell className="grid items-stretch gap-10 py-16 md:grid-cols-[1.2fr_0.8fr] md:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Built from experience</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
              I Learned Marketing by Building Businesses That Needed Customers.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-body">
              <p>
                I know what it&apos;s like to spend money on advertising and wonder whether it&apos;s actually going to turn into revenue. I&apos;ve been there. I&apos;ve run campaigns that didn&apos;t work, changed strategies when the numbers weren&apos;t adding up, and built systems that helped my own businesses grow. That&apos;s the experience I bring to every company I work with.
              </p>
              <p>
                I own Arizona Window Washing Pros and Ball Bros Screens. I have also managed marketing for Sublime Design &amp; Build and The Yard Experts. The ad account is only half of it. I have had to pay for the clicks, cover the operating costs, and turn an inquiry into a job.
              </p>
            </div>
            <div className="mt-8">
              <CtaLink href="/about" variant="light">
                Read the full story
              </CtaLink>
            </div>
          </div>
          <FounderPortrait />
        </Shell>
      </section>

      <section className="border-y border-ink/10 bg-white">
        <Shell className="py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Featured story</p>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl leading-tight md:text-5xl">{featured.title}</h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
            Arizona Window Washing Pros spent January through May at a $57.97 Meta cost per lead. We closed about 30% of those leads on roughly a $200 ticket. By June the math did not work. After we moved the advertising into the White Mountains, Meta cost per lead was $29.40 — about 49.3% lower — on 212 leads.
          </p>
          <p className="mt-6 max-w-3xl font-serif text-2xl italic leading-snug md:text-3xl">
            Sometimes the Problem Isn&apos;t Your Service. It&apos;s the Market You&apos;re Trying to Sell It In.
          </p>
          <div className="mt-8">
            <CtaLink href="/case-studies/arizona-window-washing-pros" variant="light">
              Read the turnaround
            </CtaLink>
          </div>
        </Shell>
      </section>

      <section id="results" className="bg-ink text-paper">
        <Shell className="py-16 md:py-24">
          <h2 className="font-serif text-4xl md:text-5xl">Results You Can Actually Look At.</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
            Real campaigns. Real businesses. Real advertising accounts. Every case study includes the context behind the numbers.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {homepageMetrics.map((metric) => (
              <Link key={metric.label} href={metric.href} className="border border-gold/30 bg-charcoal p-6 hover:border-gold">
                <p className="font-serif text-5xl text-gold">{metric.value}</p>
                <p className="mt-3 text-xl">{metric.label}</p>
                <p className="mt-2 text-sm text-mist">{metric.detail}</p>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-mist">
            These figures cover different accounts and reporting periods. They are not added together, and none of them is a revenue total.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="border border-white/10 p-6 hover:border-gold">
                <p className="text-xs uppercase tracking-[0.16em] text-gold">{study.cardEyebrow}</p>
                <h3 className="mt-3 font-serif text-2xl">{study.company}</h3>
                <p className="mt-2 text-sm text-mist">
                  {study.industry} · {study.period}
                </p>
                <p className="mt-4 font-serif text-4xl text-paper">{study.cardMetric}</p>
                <p className="text-sm text-mist">{study.cardMetricLabel}</p>
                <p className="mt-4 text-sm leading-relaxed text-paper/80">{study.cardSummary}</p>
                <p className="mt-4 text-sm text-gold">Read the case study</p>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <section className="bg-paper">
        <Shell className="py-16 md:py-24">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Why Work With Someone Who&apos;s Actually Run the Business?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-body">
            I&apos;ve made the mistakes so I know what to look for. Marketing should make business sense.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {advantages.map((item) => (
              <article key={item.title} className="border border-ink/10 bg-white p-6">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-body">{item.body}</p>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-t border-ink/10 bg-white">
        <Shell className="py-16 md:py-24">
          <h2 className="font-serif text-4xl">What I do for home-service companies</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-body">
            Contractor lead generation, Facebook and Instagram ads, Google Ads, and local SEO — used where they fit the way you actually get customers. Not every engagement includes every service.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <Link key={service.slug} href={`/services#${service.slug}`} className="border border-ink/10 p-5 hover:border-gold-deep">
                <h3 className="font-serif text-2xl">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{service.summary}</p>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <section className="bg-charcoal text-paper">
        <Shell className="py-16 md:py-20">
          <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-5xl">
            Let&apos;s See If We Can Grow Your Business.
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Tell me what you sell, where you sell it, and what you&apos;re spending now. If the numbers don&apos;t support a campaign, I&apos;ll say so.
          </p>
          <div className="mt-8">
            <CtaLink href="/contact">Let&apos;s Talk Growth</CtaLink>
          </div>
        </Shell>
      </section>
    </>
  );
}
