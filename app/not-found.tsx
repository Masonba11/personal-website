import { CtaLink } from "@/components/CtaLink";
import { Shell } from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell className="py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">404</p>
      <h1 className="mt-3 font-serif text-5xl">That page isn&apos;t here.</h1>
      <p className="mt-4 max-w-xl text-lg text-body">
        The case studies and the contact form are. If you followed an older masonball.com link, the education page now lives on About, and the old marketing page lives under Services.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink href="/" variant="light">
          Back home
        </CtaLink>
        <CtaLink href="/case-studies" variant="light">
          See the results
        </CtaLink>
      </div>
    </Shell>
  );
}
