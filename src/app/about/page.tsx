"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Glowing header */}
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
            MASON BALL
          </h1>
          <p className="text-xl md:text-2xl text-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Aspiring Software Developer & Entrepreneur
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main About Card */}
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                About Me
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm Mason Ball, a student and entrepreneur from Queen Creek,
                Arizona. Currently pursuing a degree in Data Analytics &
                Computer Programming at Mesa Community College, I combine my
                passion for technology with digital marketing to create
                innovative solutions.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm building expertise in Python programming, web development,
                and software design principles. My focus extends to digital
                marketing, where I leverage data-driven strategies to create
                impactful campaigns and business solutions.
              </p>
            </div>
          </div>

          {/* Family & Interests Card */}
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                Family & Interests
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I come from a family deeply rooted in technology and business.
                My father owns a digital marketing agency, my mother is an
                esthetician, and my older brother is a software engineer at Booz
                Allen Hamilton. Their diverse careers have inspired my own path
                in technology and entrepreneurship.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Outside of my career pursuits, I'm a passionate football fan,
                with the Philadelphia Eagles being my favorite team. I love
                following their games and being part of the Eagles' community.
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
