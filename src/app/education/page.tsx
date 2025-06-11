"use client";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Glowing header */}
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
            EDUCATION
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Glowing card */}
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                Mesa Community College
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Currently pursuing a 4-year Bachelor's degree in Data Analytics
                & Computer Programming at Mesa Community College. By taking on a
                heavier course load than the average student, I'm on track to
                complete my degree in 2 years and 5-10 months, significantly
                faster than the traditional 4-year timeline.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                My studies focus on both theoretical concepts and practical
                applications, with a strong emphasis on Python programming, web
                development, and software design principles. I'm building
                expertise in data analysis and visualization, preparing for a
                career in technology and business.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Current GPA: 3.8
              </p>
              <a
                href="/transcript.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                View Transcript
              </a>
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
