import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mason Ball - Software Developer & Digital Marketing Specialist",
  description:
    "Software engineer and digital marketer based in Queen Creek, AZ. Building modern web applications with React & Next.js, and helping service businesses scale with Local SEO and Google Ads.",
  keywords: [
    "software developer",
    "web developer",
    "react",
    "nextjs",
    "typescript",
    "digital marketing",
    "local seo",
    "google ads",
    "lead generation",
  ],
  authors: [{ name: "Mason Ball" }],
  icons: {
    icon: [
      { url: "/favicon.ico?v=4", type: "image/x-icon" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "Mason Ball | Digital Marketing in Queen Creek",
    description:
      "Digital Marketing in Queen Creek. See how I helped The Yard Experts scale from under 10 to 70+ leads per month.",
    url: "https://masonball.com",
    type: "website",
    images: [
      {
        url: "/mb-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mason Ball - Digital Marketing in Queen Creek",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
