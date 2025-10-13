"use client";

import Image from "next/image";
import Link from "next/link";
import StructuredData from "@/components/StructuredData";

const pageMetadata = {
  title: "Mason Ball - Software Developer & Digital Marketing Specialist",
  description:
    "Software engineer and digital marketer based in Queen Creek, AZ. Specializing in React, Next.js, and performance-driven digital marketing for service businesses.",
  openGraph: {
    title: "Mason Ball - Developer & Digital Marketer",
    description:
      "Full-stack developer and digital marketing specialist with proven results.",
    type: "website",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mason Ball",
  jobTitle: "Software Developer & Digital Marketing Specialist",
  description:
    "Software engineer and digital marketer specializing in web development and lead generation for service businesses.",
  url: "https://masonball.com",
  email: "masonjball@gmail.com",
  telephone: "+14807370850",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Queen Creek",
    addressRegion: "AZ",
  },
  areaServed: "United States",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Local SEO",
    "Google Ads",
    "Digital Marketing",
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <StructuredData data={organizationSchema} />
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center mb-20 mt-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] mb-6 leading-tight">
            Hi, I'm Mason Ball
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-6 leading-relaxed max-w-4xl mx-auto">
            Software engineer and digital marketer based in Queen Creek,
            Arizona.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-10 leading-tight max-w-4xl mx-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            I don't just build your website. I generate leads for it too.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/about"
              className="px-8 py-4 bg-white text-black font-bold text-lg rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:scale-105 transition-all duration-300"
            >
              About Me
            </Link>
            <Link
              href="/business/digital-marketing"
              className="px-8 py-4 bg-black border-2 border-white/40 text-white font-bold text-lg rounded-lg hover:bg-white/10 hover:border-white transition-all duration-300"
            >
              View Digital Marketing Work
            </Link>
          </div>
        </div>

        {/* What I Do Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mb-12">
            What I Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Software Development */}
            <div className="bg-black/50 p-8 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Software Development
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
                I specialize in building modern web applications using React,
                Next.js, and TypeScript. Currently pursuing my Bachelor's in
                Data Analytics & Computer Programming at Mesa Community College
                with a 3.8 GPA on full academic scholarship.
              </p>
              <Link
                href="/education"
                className="text-white hover:text-white/80 underline transition-colors"
              >
                View Education →
              </Link>
            </div>

            {/* Digital Marketing */}
            <div className="bg-black/50 p-8 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] transform hover:scale-[1.02] transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Digital Marketing
              </h3>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-4">
                Working with{" "}
                <a
                  href="https://silverbackmarketing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 underline transition-colors font-semibold"
                >
                  Silverback Marketing
                </a>
                , I help service businesses scale their lead generation through
                Local SEO, Google Ads, and LSAs. I helped The Yard Experts grow
                from under 10 to 70+ qualified leads per month in just 60 days.
              </p>
              <Link
                href="/business/digital-marketing"
                className="text-white hover:text-white/80 underline transition-colors"
              >
                View Case Study →
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Work - The Yard Experts */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mb-12">
            Featured Project
          </h2>
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <div className="flex items-center justify-center mb-8 gap-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                The Yard Experts
              </h3>
              <div className="relative w-16 h-16 md:w-20 md:h-20">
                <Image
                  src="/images/marketing/theyardexperts.png"
                  alt="The Yard Experts"
                  fill
                  className="object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                />
              </div>
            </div>

            <p className="text-center text-white/90 text-lg md:text-xl mb-10 max-w-3xl mx-auto">
              Digital marketing campaign that grew a local landscaping business
              from under 10 to 70+ qualified leads per month in 60 days.
            </p>

            {/* Image Grid - Larger Images */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Before Image */}
              <div className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="relative w-full h-80 md:h-96 mb-4">
                  <Image
                    src="/images/marketing/leadsprior.png"
                    alt="Leads Before - Under 10 per month"
                    fill
                    className="object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-white/90 text-base font-semibold">
                  Before: Under 10 Leads/Month
                </p>
              </div>

              {/* After Image */}
              <div className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="relative w-full h-80 md:h-96 mb-4">
                  <Image
                    src="/images/marketing/leadsnow.png"
                    alt="Leads After - 70+ per month"
                    fill
                    className="object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-white/90 text-base font-semibold">
                  After: 70+ Leads/Month
                </p>
              </div>

              {/* Visibility Growth Image */}
              <div className="bg-black/30 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300">
                <div className="relative w-full h-80 md:h-96 mb-4">
                  <Image
                    src="/images/marketing/googlevisability.png"
                    alt="Google Visibility Growth"
                    fill
                    className="object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-white/90 text-base font-semibold">
                  10x Increase in Search Visibility
                </p>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/business/digital-marketing"
                className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:scale-105 transition-all duration-300"
              >
                Read Full Case Study
              </Link>
            </div>
          </div>
        </div>

        {/* Unique Value Proposition */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-gradient-to-r from-white/10 to-white/5 p-8 md:p-12 rounded-2xl border-2 border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              The Full Package
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-center mb-8">
              Most developers build websites. Most marketers run ads. I do both.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-3">
                  🛠️ Build It
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Custom web applications with React & Next.js, optimized for
                  speed, conversions, and user experience.
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-xl border border-white/20">
                <h3 className="text-xl font-bold text-white mb-3">
                  📈 Market It
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Strategic digital marketing campaigns with Google Ads, Local
                  SEO, and LSAs to drive qualified leads.
                </p>
              </div>
            </div>
            <p className="text-lg text-white/80 text-center mt-8">
              You get a website that looks amazing{" "}
              <strong className="text-white">AND</strong> generates revenue.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            <p className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
              Ready to Build & Grow Your Business?
            </p>
            <p className="text-lg text-white/80 mb-8">
              Let's create a website that doesn't just exist. It performs.
            </p>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-black font-bold text-lg rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transform hover:scale-105 transition-all duration-300"
            >
              Get in Touch
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
