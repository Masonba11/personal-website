import type { Metadata } from "next";
import { cookies } from "next/headers";
import { LandingBoot } from "@/components/landing/LandingBits";
import { VideoSlot } from "@/components/landing/VideoSlot";
import { pageMeta, site } from "@/lib/site";
import { thankYouVideo } from "@/lib/videos";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Thanks for Your Interest",
    description: "What happens after you ask MBall Marketing about pay-per-qualified-lead campaigns.",
    path: "/lp/thank-you",
  }),
  robots: { index: false, follow: false },
};

export default async function ThankYouPage() {
  const jar = await cookies();
  const confirmed = Boolean(jar.get("lp_receipt")?.value);

  return (
    <div className="bg-paper">
      <LandingBoot variant="thank-you" />
      <section className="bg-ink text-paper">
        <div className="mx-auto w-full max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <h1 className="font-serif text-4xl leading-tight md:text-6xl">Thanks for Your Interest in MBall Marketing.</h1>
          <p className="mt-5 text-lg leading-relaxed text-mist">
            Your next step is learning how our approach works and whether it makes sense for your business.
          </p>
          {confirmed ? (
            <p className="mt-6 border border-gold/50 px-4 py-3 text-sm" role="status">
              We received your application from this website. It is in the review queue.
            </p>
          ) : (
            <p className="mt-6 text-sm leading-relaxed text-mist">
              If you completed a form on Facebook or Instagram, Meta has that submission. This website does not independently receive those answers unless a separate Meta integration is connected.
            </p>
          )}
        </div>
      </section>
      <section className="mx-auto w-full max-w-3xl px-5 py-14 md:px-8">
        <h2 className="font-serif text-3xl">See How I Built and Grew My Own Service Businesses.</h2>
        <div className="mt-6">
          <VideoSlot video={thankYouVideo} variant="thank-you" />
        </div>
        <ol className="mt-10 space-y-5">
          {[
            "We review your business and advertising goals.",
            "We discuss your market and lead requirements.",
            "If there's a good fit, we agree on pricing and campaign expectations before launching.",
          ].map((step, index) => (
            <li key={step} className="border border-ink/10 bg-white p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-gold-deep">Next step {index + 1}</p>
              <p className="mt-2 text-lg">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-sm leading-relaxed text-body">
          A review does not mean the campaign is approved. Questions can go to{" "}
          <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> or{" "}
          <a className="underline" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>.
        </p>
      </section>
    </div>
  );
}
