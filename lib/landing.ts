export const landingIndustryOptions = [
  "General Contracting / Remodeling",
  "Landscaping",
  "Window Cleaning",
  "Solar Screens",
  "Painting",
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Pressure Washing",
  "Other Home Service",
] as const;

export const landingProjectOptions = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000+",
] as const;

export const landingBudgetOptions = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
] as const;

export const landingVolumeOptions = [
  "10–20",
  "20–40",
  "40–60",
  "60–100",
  "100+",
  "Not Sure Yet",
] as const;

export const landingResponseOptions = [
  "Within 5 Minutes",
  "Within 15 Minutes",
  "Within 1 Hour",
  "Same Day",
  "Within 24 Hours",
  "Need Help With Follow-Up",
] as const;

export const landingSteps = ["Contact", "Your Business", "Advertising Budget", "Submit"] as const;

export type LandingVariant = "video" | "results";

export type LandingInput = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  projectValue: string;
  adBudget: string;
  leadVolume: string;
  responseTime: string;
  servicesWanted: string;
  details: string;
  variant: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  fbclid: string;
  gclid: string;
  pageUrl: string;
  botcheck: string;
  startedAt: string;
};

export type LandingErrors = Partial<Record<keyof LandingInput, string>>;

const budgetScore: Record<string, number> = {
  "Under $500": 0,
  "$500–$1,000": 1,
  "$1,000–$2,500": 2,
  "$2,500–$5,000": 3,
  "$5,000–$10,000": 4,
  "$10,000+": 5,
};

const projectScore: Record<string, number> = {
  "Under $500": 0,
  "$500–$1,000": 1,
  "$1,000–$2,500": 2,
  "$2,500–$5,000": 3,
  "$5,000–$10,000": 4,
  "$10,000–$25,000": 5,
  "$25,000+": 6,
};

const responseScore: Record<string, number> = {
  "Within 5 Minutes": 4,
  "Within 15 Minutes": 3,
  "Within 1 Hour": 2,
  "Same Day": 1,
  "Within 24 Hours": 0,
  "Need Help With Follow-Up": 0,
};

export type FitLevel = "High Priority" | "Potential Fit" | "Needs Review";

function clip(value: FormDataEntryValue | null, max = 300) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function oneOf(value: string, options: readonly string[]) {
  return options.includes(value);
}

export function readLandingForm(formData: FormData): LandingInput {
  return {
    name: clip(formData.get("name"), 120),
    businessName: clip(formData.get("businessName"), 160),
    email: clip(formData.get("email"), 160),
    phone: clip(formData.get("phone"), 40),
    website: clip(formData.get("website"), 200),
    industry: clip(formData.get("industry"), 80),
    location: clip(formData.get("location"), 160),
    projectValue: clip(formData.get("projectValue"), 40),
    adBudget: clip(formData.get("adBudget"), 40),
    leadVolume: clip(formData.get("leadVolume"), 40),
    responseTime: clip(formData.get("responseTime"), 40),
    servicesWanted: clip(formData.get("servicesWanted"), 800),
    details: clip(formData.get("details"), 1200),
    variant: clip(formData.get("variant"), 20),
    utmSource: clip(formData.get("utmSource"), 120),
    utmMedium: clip(formData.get("utmMedium"), 120),
    utmCampaign: clip(formData.get("utmCampaign"), 160),
    utmContent: clip(formData.get("utmContent"), 160),
    utmTerm: clip(formData.get("utmTerm"), 160),
    fbclid: clip(formData.get("fbclid"), 200),
    gclid: clip(formData.get("gclid"), 200),
    pageUrl: clip(formData.get("pageUrl"), 300),
    botcheck: String(formData.get("botcheck") ?? ""),
    startedAt: clip(formData.get("startedAt"), 20),
  };
}

function websiteOk(value: string) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    return new URL(withProtocol).hostname.includes(".");
  } catch {
    return false;
  }
}

export function validateLandingStep(step: number, input: LandingInput): LandingErrors {
  const errors: LandingErrors = {};
  if (step === 0) {
    if (input.name.length < 2) errors.name = "Enter your name.";
    if (input.businessName.length < 2) errors.businessName = "Enter the business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = "Enter a valid email address.";
    if (input.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a phone number with at least 10 digits.";
    if (input.website && !websiteOk(input.website)) errors.website = "Enter a valid website, or leave it blank.";
  }
  if (step === 1) {
    if (!oneOf(input.industry, landingIndustryOptions)) errors.industry = "Choose a business type.";
    if (input.location.length < 2) errors.location = "Enter the city, state, or service area.";
    if (!oneOf(input.projectValue, landingProjectOptions)) errors.projectValue = "Choose an average project value.";
  }
  if (step === 2) {
    if (!oneOf(input.adBudget, landingBudgetOptions)) errors.adBudget = "Choose an advertising budget.";
    if (!oneOf(input.leadVolume, landingVolumeOptions)) errors.leadVolume = "Choose a lead goal.";
    if (!oneOf(input.responseTime, landingResponseOptions)) errors.responseTime = "Choose a response time.";
  }
  if (step === 3) {
    if (input.servicesWanted.trim().length < 3) errors.servicesWanted = "Tell us which services you want more customers for.";
  }
  return errors;
}

export function validateLanding(input: LandingInput): LandingErrors {
  return {
    ...validateLandingStep(0, input),
    ...validateLandingStep(1, input),
    ...validateLandingStep(2, input),
    ...validateLandingStep(3, input),
    ...(input.variant === "video" || input.variant === "results" ? {} : { variant: "Missing landing page source." }),
  };
}

export function landingStepForField(field: keyof LandingInput) {
  if (["name", "businessName", "email", "phone", "website"].includes(field)) return 0;
  if (["industry", "location", "projectValue"].includes(field)) return 1;
  if (["adBudget", "leadVolume", "responseTime"].includes(field)) return 2;
  return 3;
}

export function applicationFit(adBudget: string, projectValue: string, responseTime: string): FitLevel {
  const budget = budgetScore[adBudget] ?? 0;
  const project = projectScore[projectValue] ?? 0;
  const response = responseScore[responseTime] ?? 0;
  if (budget >= 2 && project >= 2 && response >= 2) return "High Priority";
  if (budget >= 1 && project >= 1) return "Potential Fit";
  return "Needs Review";
}

export function qualifyLanding(input: LandingInput): FitLevel {
  return applicationFit(input.adBudget, input.projectValue, input.responseTime);
}

export function isLandingSpam(input: LandingInput) {
  if (input.botcheck.trim() !== "") return true;
  const started = Number(input.startedAt);
  if (!Number.isFinite(started)) return true;
  const elapsed = Date.now() - started;
  if (elapsed < 1500 || elapsed > 1000 * 60 * 60 * 12) return true;
  return false;
}

export function landingMessage(input: LandingInput, fit: FitLevel, receivedAt: string) {
  const source = input.variant === "video" ? "video-first landing page" : "results-first landing page";
  return [
    `Internal fit: ${fit}`,
    "This label is internal. It is not shown to the business owner.",
    `Source: ${source}`,
    `Received: ${receivedAt}`,
    `Page: ${input.pageUrl || "—"}`,
    "",
    `Name: ${input.name}`,
    `Business: ${input.businessName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Website: ${input.website || "—"}`,
    `Business type: ${input.industry}`,
    `Service area: ${input.location}`,
    `Average project value: ${input.projectValue}`,
    `Advertising budget prepared to spend: ${input.adBudget}`,
    `Additional inquiries wanted: ${input.leadVolume}`,
    `Lead response time: ${input.responseTime}`,
    "",
    "Services they want more customers for:",
    input.servicesWanted,
    "",
    "Additional comments:",
    input.details || "—",
    "",
    `utm_source: ${input.utmSource || "—"}`,
    `utm_medium: ${input.utmMedium || "—"}`,
    `utm_campaign: ${input.utmCampaign || "—"}`,
    `utm_content: ${input.utmContent || "—"}`,
    `utm_term: ${input.utmTerm || "—"}`,
    `fbclid: ${input.fbclid || "—"}`,
    `gclid: ${input.gclid || "—"}`,
  ].join("\n");
}
