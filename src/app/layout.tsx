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
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Mason Ball - Developer & Digital Marketer",
    description:
      "Software engineer building web apps and helping service businesses grow through digital marketing.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MB - Mason Ball",
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
