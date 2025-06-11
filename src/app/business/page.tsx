"use client";

import WebsiteCredit from "@/components/WebsiteCredit";
import ImageSlideshow from "@/components/ImageSlideshow";

export default function BusinessPage() {
  const images = [
    {
      src: "/images/IMG_0001.JPG",
      alt: "Decption product showcase 1",
    },
    {
      src: "/images/IMG_0002.JPG",
      alt: "Decption product showcase 2",
    },
    {
      src: "/images/IMG_0202.JPG",
      alt: "Decption product showcase 3",
    },
    {
      src: "/images/IMG_8252 2.jpg",
      alt: "Decption product showcase 4",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <WebsiteCredit />

        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
          BUSINESS
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                As a co-founder of Decption, I've been instrumental in building
                a streetwear brand that combines creative design with
                data-driven marketing strategies. Through strategic Facebook Ads
                campaigns and influencer marketing, we've generated thousands in
                revenue while maintaining strong profit margins.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                My role encompasses managing growth strategies, overseeing
                advertising campaigns, and driving technical developments. I've
                built custom analytics dashboards to track key metrics and
                optimize performance, ensuring we scale profitably.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Visit{" "}
                <a
                  href="https://decption.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 underline transition-colors"
                >
                  decption.com
                </a>{" "}
                to explore our collection.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <ImageSlideshow images={images} />
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
