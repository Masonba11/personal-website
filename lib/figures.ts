/** Figures taken from ad-platform screenshots or stated business estimates. */

export const ballBros = {
  customerLeads: 143,
  customerSpend: 3066.86,
  customerCpl: 21.45,
  hiringLeads: 18,
  otherLeads: 12,
  accountLeads: 173,
  accountSpend: 3238.89,
  accountCpl: 18.72,
  closeRate: 0.3,
  ticket: 1200,
  period: "July 1 – October 19, 2026",
} as const;

export const ballBrosEstimatedSales =
  ballBros.customerLeads * ballBros.closeRate * ballBros.ticket;

export const azwwp = {
  before: {
    leads: 88,
    spend: 5101.02,
    cpl: 57.97,
    impressions: 119612,
    closeRate: 0.3,
    ticket: 200,
    period: "January 1 – May 31, 2026",
  },
  after: {
    leads: 212,
    spend: 6232.45,
    cpl: 29.4,
    impressions: 175901,
    closeRate: 0.6,
    googleLeads: 150,
    period: "June 1 – October 19, 2026",
  },
} as const;

export const azwwpCplReduction =
  (azwwp.before.cpl - azwwp.after.cpl) / azwwp.before.cpl;

export const sublime = {
  leads: 32,
  spend: 1115.36,
  impressions: 29241,
  period: "September 1 – October 19, 2026",
  pipeline: 250000,
} as const;

export const sublimeCpl = sublime.spend / sublime.leads;

export const yard = {
  impressionsLabel: "523K",
  spendLabel: "$94.8K",
  clicksLabel: "16.5K",
  conversionsLabel: "2.36K",
  conversionsForIllustration: 2360,
  assumedLtv: 1200,
  period: "August 1, 2025 – October 19, 2026",
} as const;

export const yardIllustrativeLtv =
  yard.conversionsForIllustration * yard.assumedLtv;

export function usd(amount: number, digits = 2) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function pct(ratio: number, digits = 1) {
  return `${(ratio * 100).toFixed(digits)}%`;
}
