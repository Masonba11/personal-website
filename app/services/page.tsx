import Link from "next/link";
import { CtaLink } from "@/components/CtaLink";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { services } from "@/lib/services";
import { pageMeta } from "@/lib/site";

export const metadata = pageMeta({
  title: "Services",
  description:
    "Meta Ads, Google Ads, local SEO, websites, and marketing analytics for contractors and other home-service businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Marketing should make business sense."
        lede="I help home-service companies with the channel that matches how customers actually find them. Facebook ads for contractors, Google Ads, local SEO, and websites are all available. You don't get a bundle of services you didn't ask for."
      />
      <Shell className="space-y-16 py-16 md:py-24">
        <p className="max-w-3xl text-lg leading-relaxed text-body">
          I&apos;m based in Queen Creek, Arizona, and I work with home-service businesses across the state — window cleaning, solar screens, landscaping, remodeling, and other local trades. The offer is lead generation that can survive contact with a real close rate and a real ticket size.
        </p>
        {services.map((service) => (
          <section key={service.slug} id={service.slug} className="scroll-mt-24 border-t border-ink/10 pt-10">
            <h2 className="font-serif text-4xl">{service.title}</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-body">{service.summary}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.points.map((point) => (
                <li key={point} className="border border-ink/10 bg-white px-4 py-3 text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </section>
        ))}
        <section className="bg-ink p-8 text-paper">
          <h2 className="font-serif text-3xl">Not sure which of these you need?</h2>
          <p className="mt-3 max-w-2xl text-mist">
            Start with the constraint. If the phone is quiet, we look at demand. If the phone is busy and the jobs aren&apos;t profitable, we look at the market, the lead quality, and the follow-up. The{" "}
            <Link href="/case-studies" className="text-gold underline">
              case studies
            </Link>{" "}
            show both situations.
          </p>
          <div className="mt-6">
            <CtaLink href="/contact">Let&apos;s See If We Can Grow Your Business</CtaLink>
          </div>
        </section>
      </Shell>
    </>
  );
}
