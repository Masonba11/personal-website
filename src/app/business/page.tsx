"use client";

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
      src: "/images/IMG_8252.JPG",
      alt: "Decption product showcase 4",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Glowing header */}
        <div className="flex flex-col items-center gap-6 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
            BUSINESS
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Glowing card */}
          <div className="bg-black/50 p-8 md:p-12 rounded-2xl border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] transform hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]">
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                Decption - Streetwear Brand
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                As a co-founder of Decption, I lead our brand's growth strategy
                and work closely with our marketing agency to manage
                sophisticated paid advertising campaigns. Our data-driven
                approach focuses on key metrics like CTR (click-through rate),
                CPC (cost per click), and Pixel data to make strategic
                decisions. For example, after analyzing high add-to-cart
                activity through the Pixel, we identified an opportunity to
                improve our offer. This insight led to a significant enhancement
                in our retargeting campaign's effectiveness.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                Beyond paid advertising, I manage our SMS and email marketing
                initiatives, implement basic SEO strategies, and coordinate
                influencer partnerships to drive revenue. This comprehensive
                approach has helped us generate over $5,000 in revenue across
                our first two product drops.
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed">
                On the technical side, I develop custom features for our
                storefront based on user behavior data. When Shopify's standard
                account system didn't meet our needs, I built a custom signup
                page from scratch, demonstrating my backend development
                expertise. I also implemented an engaging glow effect using
                Tailwind CSS, showcasing my frontend skills. This combination of
                backend functionality and frontend design improvements led to a
                150% increase in signups. Every feature and campaign we build is
                backed by data, ensuring we scale intelligently while
                maintaining performance.
              </p>
            </div>
          </div>

          {/* Image Slideshow */}
          <div className="mt-12">
            <ImageSlideshow images={images} />
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
      </div>
    </main>
  );
}
