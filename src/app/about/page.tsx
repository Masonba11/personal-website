"use client";

import WebsiteCredit from "@/components/WebsiteCredit";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <WebsiteCredit />

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
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm a software engineer and entrepreneur based in Queen Creek,
                Arizona. I specialize in building modern web applications using
                React, Next.js, and TypeScript. I'm passionate about creating
                beautiful, performant, and user-friendly experiences.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                When I'm not coding, you can find me working on my streetwear
                brand, Decption, or exploring new technologies and design
                trends. I believe in continuous learning and pushing the
                boundaries of what's possible on the web.
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
