"use client";

import { useEffect, useRef, useState } from "react";
import { CtaLink } from "@/components/CtaLink";
import { QualifierLink } from "@/components/landing/LandingBits";
import { usd } from "@/lib/figures";
import {
  publishedWinningAds,
  revenueHeadline,
  revenueHeadlineApproved,
  winningAdsIndustries,
  type WinningAd,
} from "@/lib/winning-ads";

type ShowcaseProps = {
  variant?: "full" | "compact" | "landing";
  headline: string;
  lede: string;
  feature?: string;
  note?: string;
  id?: string;
  landingVariant?: string;
};

export function WinningAdsShowcase({
  variant = "full",
  headline,
  lede,
  feature,
  note,
  id = "winning-ads",
  landingVariant = "results",
}: ShowcaseProps) {
  const ads = publishedWinningAds(feature);
  const compact = variant === "compact";
  const landing = variant === "landing";
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const displayHeadline = revenueHeadlineApproved && !landing && !compact ? revenueHeadline : headline;

  function syncIndex() {
    const el = scroller.current;
    if (!el) return;
    const cards = [...el.children] as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    cards.forEach((card, cardIndex) => {
      const center = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - mid);
      if (distance < bestDistance) {
        best = cardIndex;
        bestDistance = distance;
      }
    });
    setIndex(best);
  }

  function goTo(next: number) {
    const el = scroller.current;
    const card = el?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", inline: "center", block: "nearest" });
  }

  return (
    <section id={id} className={`scroll-mt-24 ${landing || !compact ? "bg-ink text-paper" : "bg-charcoal text-paper"}`} aria-labelledby={`${id}-title`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Proof is in the performance</p>
        <h2 id={`${id}-title`} className={`mt-3 max-w-4xl font-serif leading-tight ${compact ? "text-3xl md:text-4xl" : "text-4xl md:text-6xl"}`}>
          {displayHeadline}
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-mist md:text-lg">{lede}</p>
        {note ? <p className="mt-4 max-w-3xl text-sm leading-relaxed text-paper/80">{note}</p> : null}

        <p className="revenue-glow mx-auto mt-8 max-w-4xl px-3 py-5 text-center font-sans text-2xl leading-tight font-semibold tracking-wide uppercase md:py-6 md:text-4xl lg:text-5xl">
          {revenueHeadline}
        </p>

        <div className="relative mt-2 min-w-0">
          <div className="mb-3 flex justify-end gap-2 md:hidden">
            <button type="button" className="border border-white/20 px-3 py-2 text-sm" onClick={() => goTo(Math.max(0, index - 1))} aria-label="Previous advertisement">
              Previous
            </button>
            <button type="button" className="border border-white/20 px-3 py-2 text-sm" onClick={() => goTo(Math.min(ads.length - 1, index + 1))} aria-label="Next advertisement">
              Next
            </button>
          </div>
          <div
            ref={scroller}
            onScroll={syncIndex}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 motion-reduce:scroll-auto md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3"
          >
            {ads.map((ad) => (
              <WinningAdCard key={ad.id} ad={ad} compact={compact} />
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Advertisement slides">
            {ads.map((ad, adIndex) => (
              <button
                key={ad.id}
                type="button"
                role="tab"
                aria-selected={adIndex === index}
                aria-label={`Show ${ad.company} advertisement`}
                className={`h-2.5 w-2.5 rounded-full ${adIndex === index ? "bg-gold" : "bg-white/30"}`}
                onClick={() => goTo(adIndex)}
              />
            ))}
          </div>
        </div>

        {!compact ? (
          <p className="mt-8 text-sm uppercase tracking-[0.16em] text-gold">Industries in these ads · {winningAdsIndustries}</p>
        ) : null}

        {landing ? (
          <div className="mt-12 border-t border-white/10 pt-10">
            <h3 className="max-w-3xl font-serif text-3xl leading-tight md:text-4xl">Ready to see what we can do for your business?</h3>
            <p className="mt-4 max-w-2xl text-mist">Your competitors are advertising. The question is whether you&apos;re getting your share of the customers.</p>
            <div className="mt-6">
              <QualifierLink variant={landingVariant} className="inline-flex items-center justify-center bg-gold px-5 py-3 text-sm font-medium tracking-wide text-ink hover:bg-[#e4c27a]">
                Get My Free Lead Generation Plan
              </QualifierLink>
            </div>
          </div>
        ) : null}

        {!landing && !compact ? (
          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
            <CtaLink href="/contact">Get more qualified leads</CtaLink>
            <CtaLink href="/contact" variant="secondary">
              See what we can do for your business
            </CtaLink>
          </div>
        ) : null}

        {compact ? (
          <div className="mt-8">
            <CtaLink href="/results" variant="secondary">
              Watch the actual ads
            </CtaLink>
          </div>
        ) : null}

        {!compact ? (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mist">
            See the work. See the results. Then decide if MBall Marketing is right for your business.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function WinningAdCard({ ad, compact }: { ad: WinningAd; compact: boolean }) {
  const metrics = compact
    ? []
    : [
        ad.totalSpend != null ? { label: "Advertising spend", value: usd(ad.totalSpend) } : null,
        ad.totalLeads != null ? { label: "Lead-form inquiries", value: String(ad.totalLeads) } : null,
        ad.costPerLead != null ? { label: "Cost per lead", value: usd(ad.costPerLead) } : null,
        ad.qualifiedLeads != null ? { label: "Qualified leads", value: String(ad.qualifiedLeads) } : null,
        ad.bookedJobs != null ? { label: "Jobs closed", value: String(ad.bookedJobs) } : null,
        ad.revenue != null ? { label: ad.revenueAttribution ?? "Revenue", value: usd(ad.revenue) } : null,
        ad.reportingPeriod ? { label: "Reporting period", value: ad.reportingPeriod } : null,
      ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <article className="w-[min(78vw,20rem)] shrink-0 snap-center rounded-2xl bg-charcoal md:w-auto">
      <WinningAdVideo ad={ad} />
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">{ad.label}</p>
        <h3 className="mt-2 font-serif text-2xl">{ad.company}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist">{ad.description}</p>
        {metrics.length > 0 ? (
          <dl className="mt-5 space-y-2 border-t border-white/10 pt-4">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs uppercase tracking-[0.14em] text-mist">{metric.label}</dt>
                <dd className="font-serif text-xl">{metric.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {ad.metricNote && !compact ? <p className="mt-4 text-xs leading-relaxed text-mist">{ad.metricNote}</p> : null}
      </div>
    </article>
  );
}

function WinningAdVideo({ ad }: { ad: WinningAd }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setReady(true);
        else node.pause();
      },
      { rootMargin: "160px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!ad.videoSrc || !ad.approvedForPublishing) {
    return (
      <div className="flex aspect-[9/16] items-center justify-center bg-black p-6 text-center text-sm text-paper" role="img" aria-label={`Missing video for ${ad.company}`}>
        Video file missing: {ad.sourceFile}
      </div>
    );
  }

  return (
    <video
      ref={ref}
      data-winning-ad=""
      className="w-full bg-black object-contain"
      style={{ aspectRatio: `${ad.width} / ${ad.height}` }}
      poster={ad.posterSrc}
      controls
      playsInline
      preload={ready ? "metadata" : "none"}
      src={ready ? ad.videoSrc : undefined}
      aria-label={`${ad.company} ${ad.platform} advertisement`}
      title={`${ad.company} — ${ad.label}`}
      onPlay={(event) => {
        document.querySelectorAll<HTMLVideoElement>("video[data-winning-ad]").forEach((video) => {
          if (video !== event.currentTarget) video.pause();
        });
      }}
    />
  );
}
