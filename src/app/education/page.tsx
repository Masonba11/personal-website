"use client";

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
          EDUCATION
        </h1>

        <div className="max-w-4xl mx-auto">
          {/* Glowing card */}
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                I'm currently pursuing my Bachelor's degree in Data Analytics &
                Computer Programming at Mesa Community College on a full
                academic scholarship. With a current GPA of 3.8, I'm taking on a
                heavier course load than the average student, which allows me to
                complete my degree in 2 years and 5-10 months, significantly
                faster than the traditional 4-year timeline.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                My coursework focuses on programming languages, data analysis,
                and software development principles. I'm particularly interested
                in applying these skills to real-world business challenges, from
                building web applications to optimizing digital marketing
                campaigns with data-driven insights.
              </p>
              <a
                href="/transcript.pdf"
                download="Mason_Ball_Transcript.pdf"
                className="inline-block mt-4 px-6 py-3 bg-white text-black font-semibold hover:bg-white/90 rounded-lg transition-colors"
              >
                Download Transcript
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
