"use client";

import Image from "next/image";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

const pageMetadata = {
  title: "Queen Creek Digital Marketing Services | Local SEO Expert",
  description:
    "Results-driven digital marketing in Queen Creek. See how I helped The Yard Experts reach 70+ leads/month with Local SEO, Google Ads, and LSAs.",
  keywords: [
    "digital marketing queen creek",
    "local seo",
    "google ads",
    "lsa management",
    "service business marketing",
    "lead generation",
  ],
  openGraph: {
    title: "Queen Creek Digital Marketing Services | Local SEO Expert",
    description:
      "Case Study: The Yard Experts went from 5-9 to 70+ leads/month in 60 days with digital marketing in Queen Creek.",
    type: "website",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Mason Ball Digital Marketing Services - Queen Creek",
  description:
    "Professional digital marketing services in Queen Creek specializing in Local SEO, Google Ads, and lead generation for service businesses.",
  provider: {
    "@type": "Person",
    name: "Mason Ball",
    email: "masonjball@gmail.com",
    telephone: "+14807370850",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Queen Creek",
    addressRegion: "AZ",
  },
  areaServed: {
    "@type": "City",
    name: "Queen Creek",
    "@id": "https://en.wikipedia.org/wiki/Queen_Creek,_Arizona",
  },
  serviceType: [
    "Digital Marketing",
    "Local SEO",
    "Google Ads Management",
    "Local Service Ads",
    "Conversion Optimization",
  ],
  priceRange: "$$",
  url: "https://masonball.com/business/digital-marketing",
};

export default function DigitalMarketingPage() {
  const services = [
    {
      title: "Local SEO",
      description:
        "Service pages, on-page optimization, review integration, and technical SEO to dominate local search results in Queen Creek and surrounding areas.",
    },
    {
      title: "Google Ads & LSAs",
      description:
        "Strategic campaign setup, precise targeting, budget optimization, and ongoing management for maximum ROI and consistent lead flow.",
    },
    {
      title: "Conversion Optimization",
      description:
        "Landing page design, conversion tracking, GA4 setup, and data analysis to turn clicks into customers and maximize your marketing investment.",
    },
  ];

  const results = [
    "70+ qualified leads per month (up from 5 to 9)",
    "10x increase in search visibility tracked through SEMrush",
    "Lower cost per lead with $55/day ad spend",
    "Stable, predictable inbound pipeline",
  ];

  const faqs = [
    {
      question: "How fast can I see results?",
      answer:
        "Most clients see an uptick in leads within the first 2 to 4 weeks. Significant growth typically happens within 60 days as we optimize and scale campaigns based on performance data.",
    },
    {
      question: "Do you manage LSAs (Local Service Ads)?",
      answer:
        "Yes. I handle Local Service Ads setup, profile optimization, review management, and dispute resolution to keep your LSA presence strong and converting.",
    },
    {
      question: "What do you need from me to start?",
      answer:
        "Access to Google Ads, Google Business Profile, your website, and a clear understanding of your service areas and target customers. We'll start with an audit and build from there.",
    },
    {
      question: "Do you work with businesses outside Queen Creek?",
      answer:
        "Absolutely. While I'm based in Queen Creek and specialize in local service businesses here, I work with companies across Arizona and the United States. The same strategies that worked for The Yard Experts can be applied anywhere.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <StructuredData data={professionalServiceSchema} />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-20 mt-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-6">
            Digital Marketing in Queen Creek That Drives Real Results
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed">
            Working with{" "}
            <a
              href="https://silverbackmarketing.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 underline transition-colors font-semibold"
            >
              Silverback Marketing
            </a>
            , I help service businesses in Queen Creek grow with Local SEO,
            Google Ads, and LSAs. From landscaping to home services, I build
            marketing systems that generate consistent, qualified leads.
          </p>
          <p className="text-base text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto italic">
            The Silverback Marketing team has been building, optimizing, and
            marketing web sites since 1997. Our experience ranges from small
            Internet start-ups to Fortune 500 companies and just about
            everything in between.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:scale-105 transition-all duration-300"
          >
            Book a Strategy Call
          </Link>
        </div>

        {/* Service Overview Cards */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mb-4">
            Local SEO, Google Ads, and LSAs: Tuned for Queen Creek
          </h2>
          <p className="text-center text-white/80 text-lg mb-12 max-w-3xl mx-auto">
            Whether you're in Gilbert, Chandler, Mesa, or Queen Creek, my
            digital marketing services are built to help local businesses
            dominate their market.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-black/50 p-8 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transform hover:scale-[1.02] transition-all duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Case Study - The Yard Experts */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mb-8">
              Case Study: The Yard Experts (70+ Leads/Month in 60 Days)
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src="/images/marketing/theyardexperts.png"
                  alt="The Yard Experts landscaping in Queen Creek"
                  fill
                  className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-xl md:text-2xl text-white/80 font-semibold mb-2">
                  From under 10 to 70+ leads per month in 60 days
                </p>
                <a
                  href="https://theyardexperts.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 underline transition-colors text-lg"
                >
                  theyardexperts.com →
                </a>
              </div>
            </div>

            {/* Results Images Grid - Larger Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="relative w-full h-80 md:h-96 mb-4">
                  <Image
                    src="/images/marketing/leadsprior.png"
                    alt="Digital marketing in Queen Creek baseline leads before campaign"
                    fill
                    className="object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-white/90 text-base font-semibold">
                  Before: 5-9 Leads/Month
                </p>
              </div>

              <div className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="relative w-full h-80 md:h-96 mb-4">
                  <Image
                    src="/images/marketing/leadsnow.png"
                    alt="Digital marketing in Queen Creek leads after 60 days (70+ per month)"
                    fill
                    className="object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-white/90 text-base font-semibold">
                  After: 70+ Leads/Month
                </p>
              </div>

              <div className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="relative w-full h-80 md:h-96 mb-4">
                  <Image
                    src="/images/marketing/googlevisability.png"
                    alt="Digital marketing in Queen Creek SEMrush visibility trend after optimization"
                    fill
                    className="object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-white/90 text-base font-semibold">
                  10x Search Visibility Increase
                </p>
              </div>
            </div>

            {/* Case Study Content */}
            <div className="space-y-6 text-white/90 text-base md:text-lg leading-relaxed">
              <p>
                When I began working with The Yard Experts, a landscaping
                company in Queen Creek, AZ, they were averaging roughly 5 to 9
                leads per month from Google. Despite offering strong local
                services, their website wasn't ranking for the terms that
                mattered most, and their ad spend wasn't producing consistent
                results. My goal was to completely restructure their online
                presence, optimizing both paid and organic channels, to create a
                predictable, scalable system that generated real inbound leads,
                not just clicks.
              </p>
              <p>
                The first step was analyzing their data through Google Ads, GA4,
                and Search Console. I noticed that much of their budget was
                being spent on irrelevant or low-intent searches due to overly
                broad targeting. I rebuilt their Google Ads campaign from
                scratch, focusing on exact and phrase match keywords tied
                directly to their revenue-driving services like tree trimming,
                yard cleanup, and lawn maintenance. I also developed a robust
                negative keyword list to filter out non-commercial queries such
                as "jobs," "DIY," or "consulting." This shift immediately
                improved ad efficiency, driving higher-quality traffic without
                increasing budget.
              </p>
              <p>
                Once the paid structure was refined, I turned to local SEO. The
                Yard Experts already had service-area pages, but they weren't
                fully optimized for geographic relevance. Using SEMrush, I
                conducted keyword research across all surrounding markets,
                including Queen Creek, Gilbert, Chandler, Mesa, and San Tan
                Valley, to identify what people were actually searching for in
                each city. From there, I created service-city pages that
                strategically combined their services with those
                location-specific keywords (for example, "Tree Trimming Gilbert
                AZ" or "Landscape Maintenance Chandler AZ"). These new pages
                were internally linked to the existing service-area structure,
                ensuring Google could crawl and index them as a unified network
                of local authority pages.
              </p>
              <p>
                I also refined their on-page SEO by writing optimized H1s, meta
                descriptions, and FAQ sections for each city page. Each page
                featured unique CTAs, high-quality visuals, and schema markup to
                boost click-through rates. I then integrated reviews and trust
                signals directly on the pages to help convert visitors once they
                landed. These updates made The Yard Experts stand out not just
                in rankings, but in conversion performance, turning page views
                into booked jobs.
              </p>
              <p>
                On the paid side, I implemented Google Ads and Local Services
                Ads (LSAs) simultaneously. I structured ad groups by location
                and service, wrote ad copy emphasizing reliability and
                family-owned values, and tested multiple responsive ad
                variations. The campaign ran at an efficient $55/day spend,
                maintaining an average CPC of about $5 to $6 while steadily
                improving conversion rates. I tracked all performance metrics
                through GA4 and SEMrush, allowing me to attribute leads to exact
                keywords, ad groups, and landing pages with precision.
              </p>
            </div>

            {/* Results Section */}
            <div className="mt-10 bg-black/30 p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
                Results from Digital Marketing in Queen Creek
              </h3>
              <ul className="space-y-3">
                {results.map((result, index) => (
                  <li
                    key={index}
                    className="flex items-start text-white/90 text-lg"
                  >
                    <span className="text-white mr-3 text-2xl">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/80 text-base mt-6 text-center italic">
                This project became proof that with the right structure, data,
                and creative strategy, a local business can dominate its market
                and scale far beyond its original reach.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-black/50 p-6 md:p-8 rounded-xl border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Learn More Section */}
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <p className="text-white/80 text-lg">
            Want to{" "}
            <Link
              href="/about"
              className="text-white hover:text-white/80 underline transition-colors font-semibold"
            >
              learn more about my digital marketing process
            </Link>
            ? I combine technical expertise with data-driven strategy to deliver
            measurable results.
          </p>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
              Let's Grow Your Business in Queen Creek
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Book a strategy call and I'll show you exactly how to scale your
              lead volume with proven digital marketing tactics.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:scale-105 transition-all duration-300"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes glow {
          0% {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8));
          }
          100% {
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
          }
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
