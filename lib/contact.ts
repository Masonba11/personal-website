export const revenueOptions = [
  "Under $10K monthly",
  "$10K–$25K",
  "$25K–$50K",
  "$50K–$100K",
  "$100K+ monthly",
] as const;

export const adBudgetOptions = [
  "Not currently advertising",
  "Under $1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
] as const;

export const marketingBudgetOptions = [
  ...adBudgetOptions,
  "Not sure yet",
] as const;

export const industryOptions = [
  "General contracting / remodeling",
  "Landscaping",
  "Window cleaning",
  "Solar screens",
  "Other home service",
  "Something else",
] as const;

export const serviceOptions = [
  "Meta Advertising",
  "Google Ads",
  "Local SEO",
  "Website and conversion work",
  "Marketing analytics",
  "Not sure yet",
] as const;

export type ContactInput = {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  location: string;
  revenue: string;
  adBudget: string;
  marketingBudget: string;
  challenge: string;
  services: string[];
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
    location: clean(String(formData.get("location") ?? ""), 120),
    revenue: clean(String(formData.get("revenue") ?? ""), 40),
    adBudget: clean(String(formData.get("adBudget") ?? ""), 40),
    marketingBudget: clean(String(formData.get("marketingBudget") ?? ""), 40),
    challenge: clean(String(formData.get("challenge") ?? ""), 2000),
    services: formData
      .getAll("services")
      .map((value) => clean(String(value), 80))
      .filter(Boolean),
    details: clean(String(formData.get("details") ?? ""), 4000),
    botcheck: String(formData.get("botcheck") ?? ""),
    startedAt: String(formData.get("startedAt") ?? ""),
  };
}

function allowed(value: string, options: readonly string[]) {
  return value === "" || options.includes(value);
}

export function validateContact(input: ContactInput): FieldErrors {
  const errors: FieldErrors = {};

  if (input.name.length < 2) errors.name = "Enter your name.";
  if (input.businessName.length < 2) errors.businessName = "Enter the business name.";
  if (!emailPattern.test(input.email)) errors.email = "Enter a valid email address.";

  if (input.phone) {
    const digits = input.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      errors.phone = "Enter a phone number with at least 10 digits, or leave it blank.";
    }
  }

  if (input.website && !isWebsite(input.website)) {
    errors.website = "Enter a website like yourcompany.com, or leave it blank.";
  }

  if (!allowed(input.industry, industryOptions)) errors.industry = "Choose an industry from the list.";
  if (!allowed(input.revenue, revenueOptions)) errors.revenue = "Choose a revenue range from the list.";
  if (!allowed(input.adBudget, adBudgetOptions)) errors.adBudget = "Choose an advertising budget from the list.";
  if (!allowed(input.marketingBudget, marketingBudgetOptions)) {
    errors.marketingBudget = "Choose a marketing budget from the list.";
  }

  const unknownService = input.services.find((service) => !serviceOptions.includes(service as (typeof serviceOptions)[number]));
  if (unknownService) errors.services = "Choose services from the list.";

  return errors;
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

export function contactMessage(input: ContactInput) {
  const lines = [
    `Name: ${input.name}`,
    `Business: ${input.businessName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "—"}`,
    `Website: ${input.website || "—"}`,
    `Industry: ${input.industry || "—"}`,
    `Location: ${input.location || "—"}`,
    `Monthly revenue: ${input.revenue || "—"}`,
    `Monthly advertising budget: ${input.adBudget || "—"}`,
    `Monthly marketing budget: ${input.marketingBudget || "—"}`,
    `Services of interest: ${input.services.length ? input.services.join(", ") : "—"}`,
    "",
    "Biggest challenge:",
    input.challenge || "—",
    "",
    "Additional information:",
    input.details || "—",
  ];
  return lines.join("\n");
}
