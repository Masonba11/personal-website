"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Glowing header */}
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
            CONTACT
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Glowing card */}
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  Get in Touch
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:masonjball@gmail.com"
                    className="block text-white/90 hover:text-white transition-colors duration-300"
                  >
                    Email: masonjball@gmail.com
                  </a>
                  <a
                    href="tel:4807370850"
                    className="block text-white/90 hover:text-white transition-colors duration-300"
                  >
                    Phone: (480) 737-0850
                  </a>
                  <p className="text-white/90">
                    Location: Queen Creek, Arizona
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  Availability
                </p>
                <p className="text-white/90 text-base md:text-lg leading-relaxed">
                  I'm currently available for freelance projects, internships,
                  and full-time opportunities. Feel free to reach out through
                  any of the channels above.
                </p>
              </div>
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
