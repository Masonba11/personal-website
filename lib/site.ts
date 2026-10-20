import type { Metadata } from "next";

export const site = {
  name: "MBall Marketing",
  founder: "Mason Ball",
  url: "https://masonball.com",
  email: "masonjball@gmail.com",
  phoneDisplay: "(480) 737-0850",
  phoneTel: "+14807370850",
  location: "Queen Creek, Arizona",
  description:
    "MBall Marketing helps home-service businesses generate qualified leads with Meta Ads, Google Ads, local SEO, and websites. Mason Ball has operated the businesses, not only the campaigns.",
};

export const nav = [
  { href: "/case-studies", label: "Results" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function pageMeta({
  title,
  description,
  path,
}: {
  title: Metadata["title"];
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  const socialTitle =
    typeof title === "string"
      ? title
      : title && typeof title === "object" && "absolute" in title && title.absolute
        ? title.absolute
        : site.name;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}
