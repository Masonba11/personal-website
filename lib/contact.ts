export const industryOptions = [
  "General Contracting / Remodeling",
  "Landscaping / Lawn Care",
  "Window Cleaning",
  "Solar Screens / Window Screens",
  "Painting",
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Pressure Washing",
  "Other Home Service",
] as const;

export const projectValueOptions = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000+",
] as const;

export const revenueOptions = [
  "Under $10,000",
  "$10,000–$25,000",
  "$25,000–$50,000",
  "$50,000–$100,000",
  "Over $100,000",
  "Prefer Not to Say",
] as const;

export const leadVolumeOptions = [
  "10–20",
  "20–40",
  "40–60",
  "60–100",
  "100+",
  "Not Sure Yet",
] as const;

export const adBudgetOptions = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
] as const;

export const responseTimeOptions = [
  "Within 5 minutes",
  "Within 15 minutes",
  "Within 1 hour",
  "Same Day",
  "Within 24 Hours",
  "We Need Help With Follow-Up",
] as const;

export const salesHandlerOptions = [
  "I Do",
  "Dedicated Salesperson",
  "Sales Team",
  "Office Staff",
  "Other",
] as const;

export const challengeOptions = [
  "Not Enough Leads",
  "Leads Are Too Expensive",
  "Poor Lead Quality",
  "Low Closing Rate",
  "Inconsistent Work",
  "Entering a New Market",
  "Looking to Scale",
  "Other",
] as const;

export const formSteps = [
  "About Your Business",
  "Your Growth Goals",
  "Advertising Budget",
  "Lead Qualification",
  "Submit",
] as const;

export type FitLevel = "High Priority" | "Potential Fit" | "Needs Review";

export type ContactInput = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  projectValue: string;
  revenue: string;
  leadVolume: string;
  adBudget: string;
  responseTime: string;
  salesHandler: string;
  challenge: string;
  servicesWanted: string;
  details: string;
  botcheck: string;
  startedAt: string;
};

export type FieldErrors = Partial<Record<keyof ContactInput | "form", string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: string, max: number) {
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);
}

export function readContactForm(formData: FormData): ContactInput {
  return {
    name: clean(String(formData.get("name") ?? ""), 100),
    businessName: clean(String(formData.get("businessName") ?? ""), 120),
    email: clean(String(formData.get("email") ?? ""), 160),
    phone: clean(String(formData.get("phone") ?? ""), 40),
    website: clean(String(formData.get("website") ?? ""), 200),
    industry: clean(String(formData.get("industry") ?? ""), 80),
    location: clean(String(formData.get("location") ?? ""), 160),
    projectValue: clean(String(formData.get("projectValue") ?? ""), 40),
    revenue: clean(String(formData.get("revenue") ?? ""), 40),
    leadVolume: clean(String(formData.get("leadVolume") ?? ""), 40),
    adBudget: clean(String(formData.get("adBudget") ?? ""), 40),
    responseTime: clean(String(formData.get("responseTime") ?? ""), 40),
    salesHandler: clean(String(formData.get("salesHandler") ?? ""), 40),
    challenge: clean(String(formData.get("challenge") ?? ""), 80),
    servicesWanted: clean(String(formData.get("servicesWanted") ?? ""), 2000),
    details: clean(String(formData.get("details") ?? ""), 4000),
    botcheck: String(formData.get("botcheck") ?? ""),
    startedAt: String(formData.get("startedAt") ?? ""),
  };
}

function requiredChoice(value: string, options: readonly string[], message: string, errors: FieldErrors, key: keyof ContactInput) {
  if (!options.includes(value)) errors[key] = message;
}

export function validateStep(step: number, input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};

  if (step === 0) {
    if (input.name.length < 2) errors.name = "Enter your name.";
    if (input.businessName.length < 2) errors.businessName = "Enter the business name.";
    if (!emailPattern.test(input.email)) errors.email = "Enter a valid email address.";
    const digits = input.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) errors.phone = "Enter a phone number with at least 10 digits.";
    if (input.website && !isWebsite(input.website)) errors.website = "Enter a website like yourcompany.com, or leave it blank.";
    requiredChoice(input.industry, industryOptions, "Choose an industry.", errors, "industry");
    if (input.location.length < 2) errors.location = "Enter the city, state, or service area.";
  }

  if (step === 1) {
    requiredChoice(input.projectValue, projectValueOptions, "Choose an average project value.", errors, "projectValue");
    if (input.revenue && !revenueOptions.includes(input.revenue as (typeof revenueOptions)[number])) {
      errors.revenue = "Choose a revenue range from the list.";
    }
    requiredChoice(input.leadVolume, leadVolumeOptions, "Choose a lead goal, or select Not Sure Yet.", errors, "leadVolume");
  }

  if (step === 2) {
    requiredChoice(input.adBudget, adBudgetOptions, "Choose the advertising budget you are willing to invest.", errors, "adBudget");
  }

  if (step === 3) {
    requiredChoice(input.responseTime, responseTimeOptions, "Choose how quickly you can contact a new lead.", errors, "responseTime");
    if (input.salesHandler && !salesHandlerOptions.includes(input.salesHandler as (typeof salesHandlerOptions)[number])) {
      errors.salesHandler = "Choose who handles sales, or leave it blank.";
    }
    requiredChoice(input.challenge, challengeOptions, "Choose the biggest acquisition challenge.", errors, "challenge");
    if (input.servicesWanted.length < 3) errors.servicesWanted = "Tell us which services you want more customers for.";
  }

  return errors;
}

export function validateContact(input: ContactInput): FieldErrors {
  return [0, 1, 2, 3].reduce<FieldErrors>((errors, step) => ({ ...errors, ...validateStep(step, input) }), {});
}

export function stepForField(field: keyof FieldErrors) {
  const map: Partial<Record<keyof ContactInput, number>> = {
    name: 0,
    businessName: 0,
    email: 0,
    phone: 0,
    website: 0,
    industry: 0,
    location: 0,
    projectValue: 1,
    revenue: 1,
    leadVolume: 1,
    adBudget: 2,
    responseTime: 3,
    salesHandler: 3,
    challenge: 3,
    servicesWanted: 3,
    details: 4,
  };
  return field in map ? map[field as keyof ContactInput] ?? 0 : 0;
}

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
  "Within 5 minutes": 4,
  "Within 15 minutes": 3,
  "Within 1 hour": 2,
  "Same Day": 1,
  "Within 24 Hours": 0,
  "We Need Help With Follow-Up": 0,
};

export function qualifyLead(input: ContactInput): FitLevel {
  const budget = budgetScore[input.adBudget] ?? 0;
  const project = projectScore[input.projectValue] ?? 0;
  const response = responseScore[input.responseTime] ?? 0;

  if (budget >= 2 && project >= 2 && response >= 2) return "High Priority";
  if (budget >= 1 && project >= 1) return "Potential Fit";
  return "Needs Review";
}

export function isSpam(input: ContactInput) {
  if (input.botcheck.trim() !== "") return true;
  const started = Number(input.startedAt);
  if (!Number.isFinite(started)) return true;
  if (Date.now() - started < 1500) return true;
  if (Date.now() - started > 1000 * 60 * 60 * 12) return true;
  return false;
}

function isWebsite(value: string) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(withProtocol);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

export function contactMessage(input: ContactInput, fit: FitLevel) {
  return [
    `Internal fit: ${fit}`,
    "This label is internal. It is not shown to the business owner.",
    "",
    `Name: ${input.name}`,
    `Business: ${input.businessName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `Website: ${input.website || "—"}`,
    `Industry: ${input.industry}`,
    `Service area: ${input.location}`,
    `Average project value: ${input.projectValue}`,
    `Monthly revenue: ${input.revenue || "—"}`,
    `Desired additional leads per month: ${input.leadVolume}`,
    `Advertising budget willing to invest: ${input.adBudget}`,
    `Lead response time: ${input.responseTime}`,
    `Sales and estimates: ${input.salesHandler || "—"}`,
    `Biggest acquisition challenge: ${input.challenge}`,
    "",
    "Services they want more customers for:",
    input.servicesWanted,
    "",
    "Anything else:",
    input.details || "—",
  ].join("\n");
}

export const thankYouMessage =
  "Thanks. We'll review your business, market, advertising budget, and lead goals, then reply by email if working together makes sense.";
