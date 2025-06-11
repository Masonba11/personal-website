"use client";

import ImageSlideshow from "@/components/ImageSlideshow";

export default function BusinessPage() {
  const images = [
    {
      src: "/images/business/product1.jpg",
      alt: "Decption product showcase 1",
    },
    {
      src: "/images/business/product2.jpg",
      alt: "Decption product showcase 2",
    },
    {
      src: "/images/business/product3.jpg",
      alt: "Decption product showcase 3",
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
          BUSINESS
        </h1>

        <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 md:p-8 mb-8">
          <p className="text-white/80 leading-relaxed mb-6">
            As a co-founder of Decption, I lead our brand's growth strategy and
            execution. I collaborate with a marketing agency to manage our paid
            advertising campaigns, analyzing key metrics like CTR, CPC, and
            Pixel data to optimize performance. For example, by monitoring
            add-to-cart activity, I identified opportunities to improve our
            offer, leading to better conversion rates.
          </p>
          <p className="text-white/80 leading-relaxed mb-6">
            I oversee our SMS and email marketing initiatives, ensuring
            consistent communication with our customer base. My understanding of
            basic SEO principles helps drive organic traffic to our store.
            Additionally, I've successfully leveraged influencer marketing to
            expand our reach and drive revenue.
          </p>
          <p className="text-white/80 leading-relaxed">
            Through these efforts, we've generated over $5,000 in revenue across
            our first two product drops. On the technical side, I've developed
            custom features for our storefront, including a custom signup page
            with an engaging glow effect built with Tailwind CSS. This
            combination of backend functionality and frontend design
            improvements led to a 150% increase in signups.
          </p>
        </div>

        <ImageSlideshow images={images} />
      </div>
    </main>
  );
}
