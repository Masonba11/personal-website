import { azwwp, ballBros, sublime, sublimeCpl } from "@/lib/figures";

/**
 * Section titles stay on the secondary lines until this is true.
 * The glowing line under the ads always uses revenueHeadline.
 */
export const revenueHeadlineApproved = false;

export const revenueHeadline =
  "These ads have generated hundreds of thousands in revenue this year.";

export type WinningAdPlatform = "Meta" | "Google";

export type WinningAd = {
  id: string;
  company: string;
  industry: string;
  platform: WinningAdPlatform;
  label: string;
  description: string;
  width: number;
  height: number;
  videoSrc?: string;
  posterSrc?: string;
  sourceFile: string;
  totalSpend?: number;
  totalLeads?: number;
  costPerLead?: number;
  qualifiedLeads?: number;
  bookedJobs?: number;
  revenue?: number;
  reportingPeriod?: string;
  /** What the lead and spend figures count. Never a revenue total. */
  metricNote?: string;
  revenueAttribution?: string;
  approvedForPublishing: boolean;
};

export const winningAds: WinningAd[] = [
  {
    id: "azwwp",
    company: "Arizona Window Washing Pros",
    industry: "Residential and commercial window cleaning",
    platform: "Meta",
    label: "Window cleaning | Meta Ads",
    description: "An actual advertisement created to generate local window cleaning customers.",
    width: 720,
    height: 1280,
    videoSrc: "/videos/ads/azwwp.mp4",
    posterSrc: "/videos/ads/azwwp.jpg",
    sourceFile: "azwwpadexample.MOV",
    totalSpend: azwwp.after.spend,
    totalLeads: azwwp.after.leads,
    costPerLead: azwwp.after.cpl,
    reportingPeriod: azwwp.after.period,
    metricNote: "Meta lead-form inquiries for this period. Not booked jobs or collected revenue.",
    approvedForPublishing: true,
  },
  {
    id: "ball-bros",
    company: "Ball Bros Screens",
    industry: "Solar screens and bug screens",
    platform: "Meta",
    label: "Solar screens | Meta Ads",
    description: "An actual advertisement promoting residential solar screen installation.",
    width: 720,
    height: 1280,
    videoSrc: "/videos/ads/ball-bros.mp4",
    posterSrc: "/videos/ads/ball-bros.jpg",
    sourceFile: "BallBrosscreensadexample.MOV",
    totalSpend: ballBros.customerSpend,
    totalLeads: ballBros.customerLeads,
    costPerLead: ballBros.customerCpl,
    reportingPeriod: ballBros.period,
    metricNote: "Customer lead-form inquiries only. Hiring inquiries are excluded. Not booked jobs or collected revenue.",
    approvedForPublishing: true,
  },
  {
    id: "sublime",
    company: "Sublime Design & Build",
    industry: "General contracting and remodeling",
    platform: "Meta",
    label: "General contracting | Meta Ads",
    description: "An actual advertisement created to attract homeowners interested in contracting and remodeling projects.",
    width: 1280,
    height: 720,
    videoSrc: "/videos/ads/sublime.mp4",
    posterSrc: "/videos/ads/sublime.jpg",
    sourceFile: "sublimeadexample.MOV",
    totalSpend: sublime.spend,
    totalLeads: sublime.leads,
    costPerLead: sublimeCpl,
    reportingPeriod: sublime.period,
    metricNote: "Lead-form results for this period. Not booked jobs, pipeline, or collected revenue.",
    approvedForPublishing: true,
  },
];

export function publishedWinningAds(feature?: string) {
  const ads = winningAds.filter((ad) => ad.approvedForPublishing && ad.videoSrc);
  if (!feature) return ads;
  return [...ads].sort((a, b) => Number(b.id === feature) - Number(a.id === feature));
}

export function featureForCaseStudy(slug: string) {
  if (slug === "arizona-window-washing-pros") return "azwwp";
  if (slug === "ball-bros-screens") return "ball-bros";
  if (slug === "sublime-design-build") return "sublime";
  return undefined;
}

/** Only facts that do not combine accounts or invent revenue. */
export const winningAdsIndustries = "Window cleaning, solar screens, and general contracting";
