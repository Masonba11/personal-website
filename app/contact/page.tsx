import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Shell } from "@/components/Shell";
import { pageMeta, site } from "@/lib/site";

const pricing = [
  {
    title: "Pay Per Qualified Lead",
    body: "Pay an agreed price for each lead meeting our qualification criteria.",
  },
  {
    title: "Your Advertising Budget",
    body: "You fund the Meta or Google advertising campaigns used to generate those leads.",
  },
  {
    title: "No Standard Monthly Retainer",
    body: "Our primary lead-generation model does not require a traditional monthly management retainer.",
  },
  {
    title: "Customized Pricing",
    body: "The price per qualified lead depends on your industry, service area, project value, and campaign requirements.",
  },
];

const faqs = [
  {
    question: "What Counts as a Qualified Lead?",
    answer:
      "A qualified lead is a customer inquiry that meets the agreed criteria for your campaign, such as the requested service, service area, and usable contact information. The exact qualification standards are established before launching your campaign.",
  },
  {
    question: "Do I Pay for Advertising Separately?",
    answer:
      "Yes. Your advertising budget covers the cost of running campaigns on platforms such as Facebook, Instagram, or Google. Qualified lead fees are billed separately according to our agreement.",
  },
  {
    question: "Am I Charged Only When I Close a Job?",
    answer: "No. Our pay-per-lead model charges for qualified customer inquiries, not just customers who book a project.",
  },
  {
    question: "How Much Does Each Lead Cost?",
    answer:
      "Lead pricing depends on your industry, location, competition, and qualification requirements. We review these details before agreeing on a rate.",
  },
  {
    question: "Do You Guarantee Leads?",
    answer:
      "We do not guarantee a specific number of leads or sales. Our objective is to build and optimize campaigns that consistently attract relevant customer inquiries.",
  },
];

export const metadata = pageMeta({
  title: "Request a Lead Generation Plan",
  description:
    "Pay per qualified lead for home-service businesses. You fund the ads, and MBall Marketing charges an agreed price for each qualified inquiry.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Lead generation"
        title="Let's Get More Customers Coming Your Way."
        lede="MBall Marketing helps home-service businesses generate qualified customer inquiries through targeted advertising. Our primary model is pay per qualified lead, meaning you pay for leads delivered under an agreed qualification standard, rather than a traditional monthly agency retainer."
      />
      <Shell className="space-y-12 py-16 md:py-24">
        <section className="border border-gold/40 bg-ink p-6 text-paper md:p-8" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="font-serif text-3xl">
            How Our Pricing Works
          </h2>
          <p className="mt-3 max-w-3xl text-mist">
            You are responsible for both the advertising spend and the agreed price per qualified lead. Advertising is not included in the lead fee, and lead fees are not charged only after a job is closed.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {pricing.map((item) => (
              <article key={item.title} className="border border-white/10 p-5">
                <h3 className="font-serif text-2xl text-gold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-mist">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <ContactForm />

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="font-serif text-3xl">
            Before you request a plan
          </h2>
          <div className="mt-6 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer font-medium">{item.question}</summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-body">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <p className="text-sm text-body">
          Prefer email or a call?{" "}
          <a className="text-gold-deep underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          {" · "}
          <a className="text-gold-deep underline" href={`tel:${site.phoneTel}`}>
            {site.phoneDisplay}
          </a>
          . Based in {site.location}.
        </p>
      </Shell>
    </>
  );
}
