"use client";

import Link from "next/link";

const pageMetadata = {
  title: "About Mason Ball | Software Developer & Digital Marketing Specialist",
  description:
    "Software engineer and digital marketer based in Queen Creek, AZ. Student at Mesa Community College studying Data Analytics & Computer Programming.",
  openGraph: {
    title: "About Mason Ball - Developer & Digital Marketer",
    description:
      "Full-stack developer and performance-driven digital marketer helping businesses grow.",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
            ABOUT
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                Hi, I'm Mason Ball
              </p>

              {/* Software Engineering Background */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm a software engineer and entrepreneur based in Queen Creek,
                Arizona. I specialize in building modern web applications using
                React, Next.js, and TypeScript. I'm passionate about creating
                beautiful, performant, and user-friendly experiences.
              </p>

              {/* Education */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm currently pursuing my Bachelor's degree in Data Analytics &
                Computer Programming at Mesa Community College on a full
                academic scholarship, maintaining a 3.8 GPA. I believe in
                continuous learning and pushing the boundaries of what's
                possible on the web.
              </p>

              {/* Digital Marketing */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Beyond software development, I'm also a performance-driven
                digital marketer working with{" "}
                <a
                  href="https://silverbackmarketing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 underline transition-colors font-semibold"
                >
                  Silverback Marketing
                </a>
                , specializing in helping service-based businesses scale their
                lead generation. I work with platforms like Google Ads, Local
                Service Ads (LSAs), Google Analytics 4, Search Console, and
                SEMrush to build campaigns that drive qualified leads and
                revenue.
              </p>

              <div className="bg-black/30 p-6 rounded-xl border border-white/10 my-6">
                <p className="text-white/80 text-base leading-relaxed italic">
                  The Silverback Marketing team has been building, optimizing,
                  and marketing web sites since 1997. Our experience ranges from
                  small Internet start-ups to Fortune 500 companies and just
                  about everything in between. We are a data-driven firm
                  composed of skilled and seasoned online marketing
                  professionals that are highly motivated to understand our
                  customers and assist in solving their unique online marketing
                  challenges.
                </p>
              </div>

              {/* The Yard Experts Story */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                My work with The Yard Experts is a perfect example of this
                approach: I helped them grow from under 10 leads per month to
                70+ qualified leads in just 60 days. Through precise keyword
                targeting, campaign optimization, and strategic service-area
                expansion, their search visibility increased more than tenfold
                while keeping ad costs efficient at only $55 per day. I rebuilt
                their Google Ads campaigns from scratch, created
                location-specific landing pages, and implemented comprehensive
                tracking through GA4 and Search Console.
              </p>

              {/* Unique Combination */}
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                <strong className="text-white">
                  Here's what makes me different:
                </strong>{" "}
                Most developers build websites. Most marketers run ads. I do
                both. This combination of technical expertise and marketing
                knowledge allows me to solve problems that typical marketers or
                developers can't. I don't just build your website. I generate
                leads for it too.
              </p>

              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Whether it's building custom tracking solutions, optimizing
                landing pages for conversions, setting up GA4 and conversion
                tracking, or developing full web applications from scratch, I
                bring a unique skill set to every project. You get a website
                that looks amazing AND drives revenue.
              </p>

              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                When I'm not coding or managing campaigns, you can find me
                exploring new technologies, analyzing data, and looking for ways
                to help businesses grow.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/education"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 text-center"
              >
                View Education
              </Link>
              <Link
                href="/business/digital-marketing"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 text-center"
              >
                View Digital Marketing Work
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-white text-black font-bold rounded-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:scale-105 transition-all duration-300 text-center"
              >
                Get in Touch
              </Link>
            </div>
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
