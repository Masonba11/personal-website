export function Pricing() {
  const steps = [
    ["01", "Fund Your Advertising", "You provide the advertising budget used to reach potential customers in your service area."],
    ["02", "We Generate Leads", "We build, manage, and optimize advertising campaigns designed to generate qualified customer inquiries."],
    ["03", "Pay Per Qualified Lead", "You pay an agreed fee for each lead meeting the qualification criteria established before the campaign launches."],
  ];

  return (
    <section className="bg-ink py-16 text-paper md:py-20" aria-labelledby="pricing-title">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <h2 id="pricing-title" className="font-serif text-4xl md:text-5xl">Simple Pricing. Clear Expectations.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(([number, title, body]) => (
            <li key={number} className="border border-gold/40 p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Step {number}</p>
              <h3 className="mt-3 font-serif text-2xl">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 border border-gold/50 bg-charcoal px-5 py-4 text-sm leading-relaxed">
          Advertising spend is separate from per-lead fees. Lead pricing and qualification standards are agreed upon before launching.
        </p>
        <div className="mt-8 border border-white/10 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Illustrative example only</p>
          <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div><dt className="text-mist">Monthly advertising spend</dt><dd className="mt-1 font-serif text-2xl">$1,500</dd></div>
            <div><dt className="text-mist">Qualified leads delivered</dt><dd className="mt-1 font-serif text-2xl">20</dd></div>
            <div><dt className="text-mist">Example fee per qualified lead</dt><dd className="mt-1 font-serif text-2xl">$50</dd></div>
            <div><dt className="text-mist">Lead fees</dt><dd className="mt-1 font-serif text-2xl">$1,000</dd></div>
          </dl>
          <p className="mt-4 font-serif text-2xl">Total illustrative investment: $2,500</p>
          <p className="mt-3 text-sm leading-relaxed text-mist">
            Illustrative example only. Actual advertising spend, lead volume, and qualified lead pricing vary by industry and market.
          </p>
        </div>
      </div>
    </section>
  );
}
