"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { confirmLandingReceipt } from "@/app/lp/actions";
import { track } from "@/components/landing/track";
import { deliverApplication } from "@/lib/deliver-application";
import {
  applicationFit,
  landingBudgetOptions,
  landingIndustryOptions,
  landingProjectOptions,
  landingResponseOptions,
  landingVolumeOptions,
} from "@/lib/landing";
import { web3formsAccessKey } from "@/lib/web3forms";

const fieldClass = "mt-2 w-full border border-ink/15 bg-white px-3 py-3 text-base text-ink";

function SelectField({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  const id = name;
  return (
    <label className="block text-sm" htmlFor={id}>
      {label} *
      <select id={id} name={name} required className={fieldClass} defaultValue="">
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ApplyForm({ source, redirectTo }: { source: string; redirectTo?: string }) {
  const router = useRouter();
  const sending = useRef(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const redirect = redirectTo ? `https://www.masonball.com${redirectTo}` : "https://www.masonball.com/contact?submitted=1";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    sending.current = true;
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    data.set("source", source);
    data.set("page", window.location.href.split("#")[0]);
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"]) {
      const value = params.get(key);
      if (value) data.set(key, value);
    }
    data.set(
      "review_label",
      applicationFit(
        String(data.get("advertising_budget") ?? ""),
        String(data.get("average_project_value") ?? ""),
        String(data.get("response_time") ?? ""),
      ),
    );

    const result = await deliverApplication(data, web3formsAccessKey);
    if (!result.ok) {
      sending.current = false;
      setPending(false);
      setError(result.message);
      return;
    }

    const eventId = track("application_received", { variant: source });
    if (redirectTo) {
      await confirmLandingReceipt({
        eventId,
        qualified: data.get("review_label") !== "Needs Review",
        variant: source,
        eventSourceUrl: window.location.href.split("#")[0],
      }).catch(() => {
        /* The email already went out. A receipt cookie must not look like a failed send. */
      });
      router.push(redirectTo);
      return;
    }
    setSent(true);
    setPending(false);
    sending.current = false;
  }

  if (sent) {
    return (
      <div id="apply" className="scroll-mt-28 border border-ink/10 bg-white p-5 sm:p-8" role="status">
        <h2 className="font-serif text-3xl">Request received.</h2>
        <p className="mt-3 text-body">We&apos;ll review your business and reply by email if working together makes sense.</p>
      </div>
    );
  }

  return (
    <form
      id="apply"
      action="https://api.web3forms.com/submit"
      method="POST"
      onSubmit={onSubmit}
      className="relative z-40 scroll-mt-28 border border-ink/10 bg-white p-5 sm:p-8"
    >
      <input type="hidden" name="access_key" value={web3formsAccessKey} />
      <input type="hidden" name="subject" value="New application from masonball.com" />
      <input type="hidden" name="from_name" value="Website application" />
      <input type="hidden" name="redirect" value={redirect} />
      <input type="hidden" name="source" value={source} />
      <h2 className="font-serif text-3xl">Let&apos;s See If Your Business Is a Good Fit.</h2>
      <p className="mt-3 text-body">
        Tell me about your business, the customers you want, and what you&apos;re prepared to spend on advertising. One form, then it comes straight to me.
      </p>
      {error ? (
        <p className="mt-4 text-sm text-gold-deep" role="alert">
          {error}
        </p>
      ) : null}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="block text-sm">
          Full Name *
          <input className={fieldClass} name="name" autoComplete="name" required />
        </label>
        <label className="block text-sm">
          Business Name *
          <input className={fieldClass} name="business_name" autoComplete="organization" required />
        </label>
        <label className="block text-sm">
          Email Address *
          <input className={fieldClass} name="email" type="email" autoComplete="email" required />
        </label>
        <label className="block text-sm">
          Phone Number *
          <input className={fieldClass} name="phone" type="tel" autoComplete="tel" required inputMode="tel" />
        </label>
        <label className="block text-sm md:col-span-2">
          Website URL
          <input className={fieldClass} name="website" type="text" inputMode="url" placeholder="yourcompany.com" autoComplete="url" />
        </label>
        <SelectField label="What Type of Home-Service Business Do You Operate?" name="business_type" options={landingIndustryOptions} />
        <label className="block text-sm">
          Where Does Your Business Operate? *
          <input className={fieldClass} name="service_area" required placeholder="City, State or Service Area" />
        </label>
        <SelectField label="What Is Your Average Project Value?" name="average_project_value" options={landingProjectOptions} />
        <SelectField label="How Much Are You Prepared to Spend Monthly on Advertising?" name="advertising_budget" options={landingBudgetOptions} />
        <SelectField label="How Many Additional Customer Inquiries Are You Looking For Each Month?" name="inquiries_wanted" options={landingVolumeOptions} />
        <SelectField label="How Quickly Can You Typically Respond to New Leads?" name="response_time" options={landingResponseOptions} />
        <label className="block text-sm md:col-span-2">
          What Services Do You Want More Customers For? *
          <textarea className={`${fieldClass} min-h-28`} name="services" required />
        </label>
        <label className="block text-sm md:col-span-2">
          Anything else?
          <textarea className={`${fieldClass} min-h-24`} name="details" />
        </label>
      </div>
      <p className="mt-4 text-sm text-body">Advertising spend is separate from qualified-lead fees. This request does not start a campaign.</p>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <button type="submit" className="mt-6 w-full bg-ink px-5 py-4 font-medium text-paper disabled:opacity-60" disabled={pending}>
        {pending ? "Sending…" : "Request My Lead Generation Plan"}
      </button>
    </form>
  );
}
