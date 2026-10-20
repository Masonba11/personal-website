import {
  azwwp,
  azwwpCplReduction,
  ballBros,
  ballBrosEstimatedSales,
  pct,
  sublime,
  sublimeCpl,
  usd,
  yard,
  yardIllustrativeLtv,
} from "@/lib/figures";

export type Metric = { value: string; label: string; detail?: string };

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type Comparison = {
  caption: string;
  beforeLabel: string;
  afterLabel: string;
  rows: { label: string; before: string; after: string }[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  industry: string;
  market: string;
  period: string;
  cardEyebrow: string;
  cardMetric: string;
  cardMetricLabel: string;
  cardSummary: string;
  title: string;
  subtitle: string;
  takeaway: string;
  context: string[];
  challenges: string[];
  strategy: string[];
  resultsLead: string[];
  metrics: Metric[];
  resultNotes: string[];
  estimate?: { display: string; formula: string; disclaimer: string };
  pipeline?: { statement: string; disclaimer: string };
  comparison?: Comparison;
  callout?: { title: string; body: string };
  screenshots: Shot[];
  analysis: string[];
  methodology: string[];
};

const shot = (file: string, alt: string, caption: string, width: number, height: number): Shot => ({
  src: `/images/case-studies/${encodeURI(file)}`,
  alt,
  caption,
  width,
  height,
});

export const caseStudies: CaseStudy[] = [
  {
    slug: "arizona-window-washing-pros",
    company: "Arizona Window Washing Pros",
    industry: "Window cleaning",
    market: "Arizona",
    period: "January 1 – October 19, 2026",
    cardEyebrow: "Business turnaround",
    cardMetric: "212",
    cardMetricLabel: "Meta leads after the market change",
    cardSummary:
      "The first five months of ads were too expensive for a $200 window-cleaning ticket. Moving the focus to Arizona's White Mountains changed the economics.",
    title: "We Were Close to Closing the Business. Then We Changed Our Strategy.",
    subtitle: "How a market pivot helped turn around Arizona Window Washing Pros",
    takeaway: "Sometimes the Problem Isn't Your Service. It's the Market You're Trying to Sell It In.",
    context: [
      "We started Arizona Window Washing Pros in January 2026. I own and operate the company. That matters here, because the advertising budget was not a client's test spend. It was money the business had to earn back after labor, supplies, fuel, and insurance.",
      "The service was professional window cleaning. The open question was whether we were trying to sell it in a market that could support the cost of getting the lead.",
    ],
    challenges: [
      "The early advertising was not profitable. Cost per lead sat around $60. We closed roughly 30% of the leads, and the average ticket was about $200.",
      "At that closing rate, acquiring a customer cost about $200 before labor, supplies, fuel, insurance, and the rest of the operating costs. The lead was consuming the job.",
      "By June, the advertising economics were unsustainable. Spending more inside the same approach would have made the problem larger, not smaller.",
    ],
    strategy: [
      "Sometimes you don't need a better ad. You need a better strategy. In June 2026 we stopped trying to win the same saturated market and looked for communities where professional window cleaning was underserved.",
      "We focused advertising on Arizona's White Mountains, including Show Low, Pinetop-Lakeside, Snowflake, and surrounding communities. A service business does not have to compete in the largest market to succeed. Sometimes the better opportunity is where demand is real and the competition is thinner.",
      "More ad spend isn't always the answer. The change was the market, the message, and who we were willing to drive to — not a promise that a bigger budget would fix a bad equation.",
    ],
    resultsLead: [
      "The original period, January 1 through May 31, 2026, is still part of the story. Meta recorded 88 leads, $5,101.02 spent, and a $57.97 cost per lead. Those numbers are on the screenshot. I am not going to smooth them over.",
      `From June 1 through October 19, 2026, the same ad account recorded 212 Meta leads, ${usd(azwwp.after.spend)} in spend, a ${usd(azwwp.after.cpl)} cost per lead, and ${azwwp.after.impressions.toLocaleString("en-US")} impressions.`,
      "Meta cost per lead fell by about 49.3%. That figure is ($57.97 − $29.40) ÷ $57.97. It describes the lead, not the profit on a finished job.",
      "We also logged about 150 Google-originated leads in our own business reporting for the later period. Those are separate from the 212 Meta leads. I do not have data that proves the two sources are entirely different people, so I do not add them into one customer total.",
    ],
    metrics: [
      { value: "88", label: "Meta leads before", detail: azwwp.before.period },
      { value: usd(azwwp.before.cpl), label: "Cost per lead before", detail: `${usd(azwwp.before.spend)} spent` },
      { value: "212", label: "Meta leads after", detail: azwwp.after.period },
      { value: usd(azwwp.after.cpl), label: "Cost per lead after", detail: `${usd(azwwp.after.spend)} spent` },
      { value: pct(azwwpCplReduction), label: "Lower Meta cost per lead", detail: "Compared with January–May" },
      { value: "~150", label: "Google-originated leads", detail: "Internal reporting, not the Meta export" },
    ],
    resultNotes: [
      "Reported closing rate moved from about 30% before the pivot to about 60% after it. Average project value was higher after the market change. I am not publishing a new ticket-size dollar figure, because I am not treating that increase as a verified revenue total.",
      "Before the pivot, the business was financially strained. After it, lead volume was stronger and the operation was able to keep growing. That is the business outcome I will stand behind. It is not a claim of overnight wealth.",
    ],
    comparison: {
      caption:
        "Same Meta ad account, two reporting periods. Closing rate and ticket size are reported business figures. They are not columns in Ads Manager.",
      beforeLabel: azwwp.before.period,
      afterLabel: azwwp.after.period,
      rows: [
        { label: "Meta leads", before: "88", after: "212" },
        { label: "Amount spent", before: usd(azwwp.before.spend), after: usd(azwwp.after.spend) },
        { label: "Cost per lead", before: usd(azwwp.before.cpl), after: usd(azwwp.after.cpl) },
        {
          label: "Impressions",
          before: azwwp.before.impressions.toLocaleString("en-US"),
          after: azwwp.after.impressions.toLocaleString("en-US"),
        },
        { label: "Reported closing rate", before: "About 30%", after: "About 60%" },
        { label: "Average ticket", before: "About $200", after: "Higher after the pivot" },
        {
          label: "Position of the business",
          before: "Advertising cost about as much as the average job, before operating costs",
          after: "Lower cost per lead, stronger lead volume, and a business that could keep operating",
        },
      ],
    },
    callout: {
      title: "Sometimes the Problem Isn't Your Service. It's the Market You're Trying to Sell It In.",
      body: "The screenshots show both seasons on purpose. Data, and a willingness to leave a market that would not pay, mattered more than raising the budget.",
    },
    screenshots: [
      shot(
        "azwwpfails.png",
        "Meta Ads Manager report for Arizona Window Washing Pros from January 1 to May 31, 2026, showing 88 leads, $5,101.02 spent, and a $57.97 cost per lead.",
        "Meta Ads Manager — Arizona Window Washing Pros, January 1 through May 31, 2026.",
        2048,
        908,
      ),
      shot(
        "azwwpcomeback.png",
        "Meta Ads Manager report for Arizona Window Washing Pros from June 1 to October 19, 2026, showing 212 leads, $6,232.45 spent, a $29.40 cost per lead, and 175,901 impressions.",
        "Meta Ads Manager — Arizona Window Washing Pros, June 1 through October 19, 2026.",
        2048,
        938,
      ),
      shot(
        "proofofbeingthebiggestcompany white mountains .png",
        "Google search screenshot in which Gemini describes Arizona Window Washing Pros as a leading window cleaning operation in Arizona's White Mountains. This is an AI-generated description, not an industry ranking.",
        "Google Gemini recognition screenshot, October 2026 — an AI-generated description, not a verified industry ranking.",
        2047,
        1284,
      ),
    ],
    analysis: [
      "The useful part of this story is that the first approach failed in a way we could measure. A $58 lead and a 30% close on a $200 ticket cannot carry a service business. Changing the creative without changing the market would have been activity, not a plan.",
      "Leads don't pay the bills. Customers do. The later account shows more leads at a lower Meta cost per lead, and the business reported a higher closing rate on higher-value work. Those are different facts, and they only help if follow-up and production can handle the demand.",
      "A Google Gemini response later described Arizona Window Washing Pros as a leading, or among the largest, window cleaning operators in the White Mountains. I am including the screenshot because it is part of the public record of that search. It is an AI-written description. It is not an audit, a market-share study, or proof that the company is definitively the largest in the region.",
    ],
    methodology: [
      "Both Meta totals are Leads (Form) — or the account's Leads column for this report — with the attribution setting shown in Ads Manager: 7-day click or 1-day view. A lead is a form submission, not a booked job or a collected payment.",
      "The 49.3% figure compares Meta cost per lead between the two exported periods. It is not a profit margin and it does not include operating costs.",
      "The closing rates, the $200 early ticket, and the note that tickets were higher after the pivot come from our own reporting. They are not cells in the screenshots.",
      "The approximate 150 Google leads are an internal count. They are not added to the 212 Meta leads.",
      "Impressions are included because both exports show them: 119,612 before and 175,901 after.",
    ],
  },
  {
    slug: "ball-bros-screens",
    company: "Ball Bros Screens",
    industry: "Solar screen installation",
    market: "Arizona",
    period: ballBros.period,
    cardEyebrow: "New business growth",
    cardMetric: "143",
    cardMetricLabel: "Customer lead-form inquiries",
    cardSummary:
      "A solar screen company started in July 2026 and used Meta ads to create demand, then to recruit help as the work showed up.",
    title: "143 Customer Inquiries in Just Over Three Months",
    subtitle: "Building a solar screen installation business through paid advertising",
    takeaway: "Growing demand is valuable. Understanding which leads turn into paying customers is even more important.",
    context: [
      "We started Ball Bros Screens in July 2026. I own the company. It installs residential solar screens and bug screens in Arizona.",
      "Starting a home-service business is one thing. Generating enough demand to support its growth is another. From the first month, customer acquisition ran through Facebook and Instagram.",
    ],
    challenges: [
      "A new installer does not inherit a pipeline. Every inquiry had to be created, answered, estimated, and scheduled while we were still learning the operation.",
      "Lead volume only helps if the business can tell a customer inquiry from a hiring inquiry, and if the close rate and ticket size can support the ad spend.",
    ],
    strategy: [
      "The primary campaign was a lead form aimed at homeowners who needed screens. As jobs came in, we opened additional campaigns to find workers and subcontractors. Those recruiting ads were supposed to support the operation. They were not customer acquisition, and they are not counted in the 143.",
    ],
    resultsLead: [
      `The customer campaign, ${ballBros.period}, produced ${ballBros.customerLeads} lead-form inquiries on ${usd(ballBros.customerSpend)} in spend, at ${usd(ballBros.customerCpl)} per lead.`,
      `Separate campaigns produced ${ballBros.hiringLeads} hiring-related lead-form submissions and ${ballBros.otherLeads} additional leads from another lead campaign.`,
      `Across the whole ad account, Meta shows ${ballBros.accountLeads} lead-form results, ${usd(ballBros.accountSpend)} spent, and a ${usd(ballBros.accountCpl)} blended cost per result. That account total includes the hiring inquiries. It is not 173 customer leads.`,
    ],
    metrics: [
      { value: "143", label: "Customer lead-form inquiries", detail: "Primary acquisition campaign" },
      { value: usd(ballBros.customerSpend), label: "Spend on that campaign", detail: usd(ballBros.customerCpl) + " per lead" },
      { value: "18", label: "Hiring lead-form submissions", detail: "Not customer leads" },
      { value: "12", label: "Leads from another campaign", detail: "Counted in the account total, not in the 143" },
      { value: "173", label: "Account-wide lead-form results", detail: "Includes hiring inquiries" },
      { value: usd(ballBros.accountSpend), label: "Account-wide spend", detail: usd(ballBros.accountCpl) + " blended cost per result" },
    ],
    resultNotes: [
      "Demand grew enough that recruiting became part of the advertising, which is a different problem than having no phone calls. It is also a reminder to keep the reports separate.",
    ],
    estimate: {
      display: "Approximately $51K in estimated sales",
      formula: `${ballBros.customerLeads} customer inquiries × 30% estimated closing rate × ${usd(ballBros.ticket, 0)} typical ticket = ${usd(ballBrosEstimatedSales, 0)}`,
      disclaimer:
        "This is an estimate based on our reported closing rate and typical ticket size. It is not a verified revenue total from the books, and it uses only the 143 customer inquiries.",
    },
    screenshots: [
      shot(
        "Ballbrosscreensresults.png",
        "Meta Ads Manager pivot table for Ball Bros Screens from July 1 to October 19, 2026, showing 143 lead-form results and $3,066.86 spent on the primary customer campaign, plus hiring and other lead campaigns in the account total of 173 results.",
        "Meta Ads Manager — Ball Bros Screens, July 1 through October 19, 2026.",
        2048,
        1178,
      ),
    ],
    analysis: [
      "The account did what a new home-service company needs first: it created inquiries at a cost that could sit next to a roughly $1,200 ticket and a closing rate around 30%. That relationship is the point of the estimate above. It is still an estimate.",
      "Growing demand is valuable. Understanding which leads turn into paying customers is even more important. The hiring leads are a good example. They are real results in the ad account, and they are the wrong number to show a homeowner-acquisition report.",
    ],
    methodology: [
      "143, $3,066.86, and $21.45 are the primary customer-acquisition campaign in the screenshot. 18 hiring submissions and 12 other leads are separate rows. 173, $3,238.89, and $18.72 are the account total.",
      "Meta labels these results as Leads (Form), with 7-day click or 1-day view attribution. A form fill is not a signed job.",
      `The sales figure multiplies the 143 customer inquiries by a 30% closing rate and a $1,200 ticket. ${usd(ballBrosEstimatedSales, 0)} is the arithmetic. Approximately $51K is the rounded label. Neither number is closed revenue.`,
    ],
  },
  {
    slug: "sublime-design-build",
    company: "Sublime Design & Build",
    industry: "General contracting and home remodeling",
    market: "Arizona White Mountains",
    period: sublime.period,
    cardEyebrow: "Contractor lead generation",
    cardMetric: "32",
    cardMetricLabel: "Meta lead-form submissions",
    cardSummary:
      "Early Meta campaigns for bathroom, kitchen, cabinet, and general remodeling inquiries. A lead today may not become a contract for weeks.",
    title: "32 General Contracting Leads in Approximately One Month",
    subtitle: "Early lead generation for higher-ticket remodeling work",
    takeaway:
      "For high-ticket contractors, a low cost per lead is only the beginning. Lead quality, follow-up, estimating, and closing determine the eventual return.",
    context: [
      "Sublime Design & Build LLC provides contracting and remodeling in the Arizona White Mountains: bathrooms, kitchens, cabinet installation, general home remodeling, and other residential improvements.",
      "I managed advertising to generate inquiries for that higher-ticket work. These are early-stage campaigns, and remodeling sales cycles are longer than a window-cleaning visit or a screen install.",
    ],
    challenges: [
      "A remodeling lead is the start of a qualification and estimating process. Someone who fills out a form in September may not sign a project until well after the reporting window closes.",
      "That lag makes it easy to mistake a promising cost per lead for revenue. The verified result in this window is lead generation, not a book of signed contracts.",
    ],
    strategy: [
      "The account ran lead-form campaigns around remodeling demand, including bathroom, kitchen, and cabinet creative. Spend stayed modest while we learned which inquiries were showing up.",
      "For this kind of contractor, the marketing job is to produce inquiries a salesperson can estimate. It is not to declare the project sold when the form is submitted.",
    ],
    resultsLead: [
      `${sublime.period}: ${sublime.leads} Meta lead-form submissions, ${usd(sublime.spend)} spent, about ${usd(sublimeCpl)} per lead, and ${sublime.impressions.toLocaleString("en-US")} impressions.`,
      "There is an internal expectation that these opportunities could develop into a substantial project pipeline. That expectation is not booked revenue, and it is not included in any homepage total.",
    ],
    metrics: [
      { value: "32", label: "Meta lead-form submissions", detail: sublime.period },
      { value: usd(sublime.spend), label: "Advertising spend", detail: "Early-stage campaigns" },
      { value: usd(sublimeCpl), label: "Approximate cost per lead", detail: "$1,115.36 ÷ 32" },
      { value: sublime.impressions.toLocaleString("en-US"), label: "Impressions", detail: "Shown in Ads Manager" },
    ],
    resultNotes: [
      "Home remodeling often takes weeks or months to move from inquiry to a signed project. A useful lead report has to leave room for that.",
    ],
    pipeline: {
      statement:
        "Working toward an estimated $250K potential project pipeline, subject to lead qualification and contract outcomes.",
      disclaimer:
        "This is an internal expectation, not confirmed contracted revenue. The verified result for this period is 32 Meta lead-form submissions.",
    },
    screenshots: [
      shot(
        "sublimeresultsgeneralcontractor.png",
        "Meta Ads Manager report for Sublime Design and Build LLC from September 1 to October 19, 2026, showing 32 lead-form results, $1,115.36 spent, and 29,241 impressions.",
        "Meta Ads Manager — Sublime Design & Build LLC, September 1 through October 19, 2026.",
        2048,
        998,
      ),
    ],
    analysis: [
      "Thirty-two inquiries at roughly $35 each is a reasonable early read on whether the market will raise its hand. It does not tell you which of those inquiries can pass financing, scope, and scheduling.",
      "For high-ticket contractors, a low cost per lead is only the beginning. Lead quality, follow-up, estimating, and closing determine the eventual return.",
    ],
    methodology: [
      "32 results are Leads (Form) in Ads Manager for September 1 through October 19, 2026. Cost per lead is $1,115.36 divided by 32, which is $34.86.",
      "Attribution on the export is 7-day click or 1-day view. A form submission is not a signed remodeling contract.",
      "The $250K figure is a pipeline expectation. It is not sales, and it is not added to results shown on the homepage.",
    ],
  },
  {
    slug: "the-yard-experts",
    company: "The Yard Experts",
    industry: "Landscaping and outdoor services",
    market: "Arizona",
    period: yard.period,
    cardEyebrow: "Google Ads and SEO",
    cardMetric: "2.36K",
    cardMetricLabel: "Google Ads reported conversions",
    cardSummary:
      "A longer Google Ads account history, plus search and website work aimed at high-intent landscaping queries. Conversions here are platform conversions, not closed jobs.",
    title: "2.36K Google Ads Conversions and a Stronger Search Presence",
    subtitle: "Search advertising, service-page targeting, and a landscaping site built to capture demand",
    takeaway:
      "Paid advertising creates opportunities. Search visibility and an optimized website help turn those opportunities into a sustainable acquisition system.",
    context: [
      "The Yard Experts is a landscaping and outdoor-services company in Arizona. My work on the account covered Google Ads, search optimization, local search targeting, website content, and the service pages those campaigns send people to.",
      "Some of that marketing work was done alongside Silverback Marketing. The numbers below are tied to the screenshots, not to a general claim about that firm.",
      "The goal was more visibility on high-intent searches and more opportunities for landscaping services. An opportunity in Google Ads is not the same event as a job on the calendar.",
    ],
    challenges: [
      "Landscaping demand splits across many services and towns. Broad keywords will buy clicks from people who want a job, a DIY guide, or a different service than the one the company sells.",
      "Paid search can create volume quickly. If the site and the service pages are thin, that volume does not become a system the company can keep.",
    ],
    strategy: [
      "On Google Ads, the work was search campaigns, keyword research, negative keywords, local geographic targeting, conversion tracking, and budget decisions against the queries that matched real services.",
      "On the site, the work was service-page targeting, content for relevant searches, and conversion-focused pages so a click had somewhere useful to land. I am not publishing ranking positions or an organic traffic percentage, because I do not have a current export that supports a specific rank or traffic claim.",
    ],
    resultsLead: [
      `For ${yard.period}, the Google Ads overview displays about ${yard.impressionsLabel} impressions, ${yard.clicksLabel} clicks, ${yard.conversionsLabel} conversions, and ${yard.spendLabel} in cost. Google rounds those figures on the overview.`,
      "I do not treat those conversions as verified unique customers or closed landscaping jobs. They are the conversion actions configured in the account.",
    ],
    metrics: [
      { value: yard.impressionsLabel, label: "Impressions", detail: "Rounded in Google Ads" },
      { value: yard.clicksLabel, label: "Clicks", detail: "Rounded in Google Ads" },
      { value: yard.conversionsLabel, label: "Reported conversions", detail: "Not confirmed jobs" },
      { value: yard.spendLabel, label: "Ad spend", detail: "Rounded in Google Ads" },
    ],
    resultNotes: [
      "Older analytics screenshots from this project show a separate, narrower read on lead events. A June GA4 report totals 9 new leads. A September GA4 report totals 72 new leads. In both tables the Qualified leads column is 0, so I do not call either number a qualified-lead count. Neither chart prints a year on the lead report itself.",
      "A visibility chart for theyardexperts.com shows 1.37% on June 25, 2025, and a later reading of 17.89% (+16.52 points) on the same chart. That is the tool's visibility index. It is not an organic traffic increase, and it is not a ranking position.",
    ],
    screenshots: [
      shot(
        "yardexpertsresultspaidmedia.png",
        "Google Ads overview for The Yard Experts from August 1, 2025 to October 19, 2026, showing about 523K impressions, $94.8K cost, 16.5K clicks, and 2.36K conversions.",
        "Google Ads overview — The Yard Experts, August 1, 2025 through October 19, 2026. Totals are rounded as displayed by Google Ads.",
        2048,
        1076,
      ),
      shot(
        "leadsprior.png",
        "GA4 lead acquisition chart totaling 9 new leads for a June date range. The qualified leads column shows 0.",
        "GA4 — 9 new leads for the June range shown. Qualified leads in this table are 0. The screenshot does not print a year.",
        1087,
        693,
      ),
      shot(
        "leadsnow.png",
        "GA4 lead acquisition chart totaling 72 new leads for a September date range. The qualified leads column shows 0.",
        "GA4 — 72 new leads for the September range shown. Qualified leads in this table are 0. The screenshot does not print a year.",
        1098,
        690,
      ),
      shot(
        "googlevisability.png",
        "Visibility chart for theyardexperts.com showing 1.37 percent on June 25, 2025 and a later reading of 17.89 percent.",
        "Visibility index for theyardexperts.com: 1.37% on June 25, 2025, and 17.89% (+16.52 points) at the later reading on the chart. This is not organic traffic and not a rank report.",
        545,
        419,
      ),
    ],
    analysis: [
      "The Google Ads account is the long view: a large number of impressions and clicks, and 2.36K reported conversions, over more than a year. That is evidence of sustained paid demand, with a large spend beside it. It is not, by itself, a profit and loss statement.",
      "The GA4 charts are a tighter window, and they are easy to over-read. Seventy-two new leads in the September chart is what the table says. The qualified column does not back up a 'qualified leads' headline, and the images do not prove a 60-day before-and-after.",
      "Paid advertising creates opportunities. Search visibility and an optimized website help turn those opportunities into a sustainable acquisition system. The visibility index moved. The durable work is the service pages, the queries, and the tracking — measured again the next time the data is exported.",
    ],
    methodology: [
      "Impressions, cost, clicks, and conversions are the rounded overview numbers in the Google Ads screenshot. They cover August 1, 2025 through October 19, 2026.",
      "A conversion is whatever action the account is configured to count. It is not automatically a unique person or a completed landscaping job.",
      `An illustrative lifetime-value example, not a revenue claim: ${yard.conversionsForIllustration.toLocaleString("en-US")} conversions × ${usd(yard.assumedLtv, 0)} assumed lifetime value = ${usd(yardIllustrativeLtv, 0)}. Nothing in the Google Ads export verifies that this amount was earned. It is not used as a result on the homepage.`,
      "The GA4 lead totals and the visibility readings are described only to the extent the older screenshots show them. No ranking positions are stated.",
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export const homepageMetrics = [
  {
    value: "143",
    label: "Solar screen customer inquiries",
    detail: "Ball Bros Screens · Meta lead forms · Jul 1–Oct 19, 2026",
    href: "/case-studies/ball-bros-screens",
  },
  {
    value: "212",
    label: "Window cleaning Meta leads",
    detail: "Arizona Window Washing Pros · Jun 1–Oct 19, 2026",
    href: "/case-studies/arizona-window-washing-pros",
  },
  {
    value: "32",
    label: "General contracting leads",
    detail: "Sublime Design & Build · Meta lead forms · Sep 1–Oct 19, 2026",
    href: "/case-studies/sublime-design-build",
  },
  {
    value: "2.36K",
    label: "Google Ads conversions",
    detail: "The Yard Experts · reported conversions · Aug 1, 2025–Oct 19, 2026",
    href: "/case-studies/the-yard-experts",
  },
] as const;
