"use client";

import { useState } from "react";

const pageMetadata = {
  title: "Contact Mason Ball | Web Development & Digital Marketing Services",
  description:
    "Get in touch to discuss web development projects, digital marketing services, or collaboration opportunities.",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "445fec98-4d22-4adc-b9bb-ddf078751f46",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
            {/* Intro Text */}
            <div className="mb-10 text-center">
              <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] mb-4">
                Let's Work Together
              </p>
              <p className="text-white/90 text-base md:text-lg leading-relaxed mb-3">
                I don't just build your website. I generate leads for it too.
              </p>
              <p className="text-white/80 text-base leading-relaxed">
                Whether you need web development, digital marketing services, or
                the complete package, I'd love to hear from you.
              </p>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white/90 font-semibold mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white/90 font-semibold mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-white/90 font-semibold mb-2"
                >
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="(480) 123-4567"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white/90 font-semibold mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Tell me about your project, current lead volume, service areas, or what you're looking for..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 bg-white text-black font-bold text-lg rounded-lg hover:bg-white/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center">
                  ✓ Message sent successfully! I'll get back to you within 24
                  hours.
                </div>
              )}

              {status === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
                  ✗ Something went wrong. Please email me directly at
                  masonjball@gmail.com
                </div>
              )}
            </form>

            <div className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4 pt-8 border-t border-white/20">
                <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  Or Contact Me Directly
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:masonjball@gmail.com"
                    className="block text-white/90 hover:text-white transition-colors duration-300 text-lg"
                  >
                    <span className="font-semibold">Email:</span>{" "}
                    masonjball@gmail.com
                  </a>
                  <a
                    href="tel:4807370850"
                    className="block text-white/90 hover:text-white transition-colors duration-300 text-lg"
                  >
                    <span className="font-semibold">Phone:</span> (480) 737-0850
                  </a>
                  <p className="text-white/90 text-lg">
                    <span className="font-semibold">Location:</span> Queen
                    Creek, Arizona
                  </p>
                </div>
              </div>

              {/* Services Offered */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  Services I Offer
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-white mb-2">
                      Web Development
                    </h3>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• React & Next.js Applications</li>
                      <li>• Custom Web Solutions</li>
                      <li>• E-commerce Development</li>
                      <li>• UI/UX Implementation</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg border border-white/10">
                    <h3 className="font-semibold text-white mb-2">
                      Digital Marketing
                    </h3>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Local SEO Strategy</li>
                      <li>• Google Ads Management</li>
                      <li>• Local Service Ads (LSAs)</li>
                      <li>• Conversion Optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  Availability
                </p>
                <p className="text-white/90 text-base md:text-lg leading-relaxed">
                  I'm currently available for freelance projects, internships,
                  and full-time opportunities. I typically respond within 24
                  hours.
                </p>
              </div>

              {/* GitHub Link */}
              <div className="pt-6 border-t border-white/20">
                <a
                  href="https://github.com/Masonba11/personal-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white/70 hover:text-white transition-colors duration-300 text-sm"
                >
                  View Website Source Code →
                </a>
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
