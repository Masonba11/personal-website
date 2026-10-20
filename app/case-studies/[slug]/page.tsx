import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { JsonLd } from "@/components/JsonLd";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
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
    </>
  );
}
