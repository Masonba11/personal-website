import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { pageMeta, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Tell Mason Ball about your home-service business, your market, and what you want marketing to do.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's See If We Can Grow Your Business."
        lede="I take on home-service companies when the market, the offer, and the budget can support real customer acquisition. The form is how I see whether that's true. There is no booking calendar on this site."
      />
      <Shell className="grid gap-12 py-16 md:grid-cols-[0.8fr_1.2fr] md:py-24">
        <aside className="space-y-4 text-body">
          <p className="text-lg leading-relaxed">
            Write like an owner. What you sell, where, what a typical job is worth, and what you&apos;ve already tried.
          </p>
          <p>
            <a className="text-gold-deep underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            <a className="text-gold-deep underline" href={`tel:${site.phoneTel}`}>
              {site.phoneDisplay}
            </a>
          </p>
          <p>{site.location}</p>
          <noscript>
            <p>
              If the form does not load, email {site.email} with your business name, location, and what you need.
            </p>
          </noscript>
        </aside>
        <ContactForm />
      </Shell>
    </>
  );
}
