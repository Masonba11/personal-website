import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { WinningAdsShowcase } from "@/components/WinningAds";
import { JsonLd } from "@/components/JsonLd";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { featureForCaseStudy } from "@/lib/winning-ads";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = study.company;
  const description = `${study.title} ${study.period}. ${study.cardMetric} ${study.cardMetricLabel}.`;
  const path = `/case-studies/${study.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: new URL(path, site.url).toString(),
      type: "article",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.subtitle,
    author: { "@type": "Person", name: site.founder },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: new URL(`/case-studies/${study.slug}`, site.url).toString(),
    about: study.company,
  };

  return (
    <>
      <JsonLd data={schema} />
      <CaseStudyView study={study} />
      <WinningAdsShowcase
        feature={featureForCaseStudy(study.slug)}
        headline="These aren't examples. These are the actual campaigns."
        lede="Watch the Meta ads from the home-service accounts. The ad that matches this business is first. A campaign from one trade is not presented as proof for another."
        note={
          featureForCaseStudy(study.slug)
            ? undefined
            : "This study does not have a published video ad. The ads below are from the other home-service accounts."
        }
      />
    </>
  );
}
