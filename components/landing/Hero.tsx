import { QualifierLink } from "@/components/landing/LandingBits";

export function LandingHero({
  variant,
  secondary,
}: {
  variant: "video" | "results";
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">For home service business owners</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
          Stop Paying Agency Retainers. Start Paying for Qualified Leads.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
          MBall Marketing helps home-service businesses generate customer inquiries through targeted advertising. You fund the ads, and we charge an agreed price for each qualified lead delivered.
        </p>
        <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
          {["No traditional monthly agency retainer", "Pay per qualified lead", "Separate advertising budget required"].map((item) => (
            <li key={item} className="border border-gold/40 px-4 py-3">{item}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <QualifierLink variant={variant} className="bg-gold px-5 py-3 text-center text-ink">
            See If Your Business Qualifies
          </QualifierLink>
          {secondary ? (
            <a href={secondary.href} className="border border-gold px-5 py-3 text-center text-gold">
              {secondary.label}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
