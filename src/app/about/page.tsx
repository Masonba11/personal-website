"use client";

import WebsiteCredit from "@/components/WebsiteCredit";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <WebsiteCredit />

        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
          ABOUT ME
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm a passionate student and entrepreneur based in Mesa,
                Arizona. Currently pursuing my degree in Data Analytics &
                Computer Programming, I combine technical expertise with
                business acumen to drive innovation and growth.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                As a co-founder of Decption, I've gained hands-on experience in
                digital marketing, e-commerce, and data-driven decision making.
                My technical skills include Python, Node.js, and web
                development, while my business experience spans marketing
                strategy, analytics, and team leadership.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm particularly interested in the intersection of technology
                and business, where I can leverage data to create meaningful
                solutions and drive growth. Whether it's developing custom
                features for our e-commerce platform or analyzing marketing
                metrics to optimize campaigns, I thrive on turning data into
                actionable insights.
              </p>
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
