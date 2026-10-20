import type { Metadata } from "next";
import { Instrument_Serif, Outfit, Yellowtail } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { MeasurementConsent } from "@/components/landing/MeasurementConsent";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const script = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MBall Marketing | Home-Service Lead Generation",
    template: "%s | MBall Marketing",
  },
  description: site.description,
  authors: [{ name: site.founder }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/favicon-v2.ico" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: site.founder,
      url: site.url,
      email: site.email,
      telephone: site.phoneTel,
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: site.name, url: site.url },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Queen Creek",
        addressRegion: "AZ",
        addressCountry: "US",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Mesa Community College",
      },
    },
    {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      email: site.email,
      telephone: site.phoneTel,
      description: site.description,
      founder: { "@type": "Person", name: site.founder },
      areaServed: { "@type": "State", name: "Arizona" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Queen Creek",
        addressRegion: "AZ",
        addressCountry: "US",
      },
      knowsAbout: [
        "Meta Ads for home-service businesses",
        "Google Ads for contractors",
        "Local SEO",
        "Lead generation",
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${script.variable}`}>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <JsonLd data={schema} />
        <Header />
        <div id="main">{children}</div>
        <Footer />
        <MeasurementConsent />
      </body>
    </html>
  );
}
