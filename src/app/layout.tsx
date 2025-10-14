import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";

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
      { url: "/favicon-v2.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    title: "Mason Ball | Digital Marketing in Queen Creek",
    description:
      "Local SEO & Google Ads expert helping service businesses hit 70+ leads/mo.",
    url: "https://masonball.com/",
    type: "website",
    images: [
      {
        url: "https://masonball.com/mb-og-v4.png",
        width: 1200,
        height: 630,
        alt: "Mason Ball - Digital Marketing in Queen Creek",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mason Ball | Digital Marketing in Queen Creek",
    description: "Results-driven digital marketing in Queen Creek.",
    images: ["https://masonball.com/mb-og-v4.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-v2.ico" type="image/x-icon" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={inter.className}>
        <LoadingScreen />
        <Header />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
