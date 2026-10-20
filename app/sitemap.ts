import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/services",
    "/case-studies",
    "/results",
    "/contact",
    "/methodology",
    ...caseStudies.map((study) => `/case-studies/${study.slug}`),
  ];

  return paths.map((path) => ({
    url: new URL(path, site.url).toString(),
    lastModified: new Date("2026-10-19"),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
