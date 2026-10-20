"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { confirmLandingReceipt, submitLanding } from "@/app/lp/actions";
import { track } from "@/components/landing/track";
import {
  landingBudgetOptions,
  landingIndustryOptions,
  landingProjectOptions,
  landingResponseOptions,
  landingStepForField,
  landingSteps,
  landingVolumeOptions,
  validateLandingStep,
  type LandingErrors,
  type LandingInput,
  type LandingVariant,
} from "@/lib/landing";
import { web3formsAccessKey } from "@/lib/web3forms";

const empty: LandingInput = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  location: "",
  projectValue: "",
  adBudget: "",
  leadVolume: "",
  responseTime: "",
  servicesWanted: "",
  details: "",
  variant: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
  fbclid: "",
  gclid: "",
  pageUrl: "",
  botcheck: "",
  startedAt: "",
};

const fieldClass = "mt-2 w-full border border-ink/15 bg-white px-3 py-3 text-base";

function readAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    utmTerm: params.get("utm_term") ?? "",
    fbclid: params.get("fbclid") ?? "",
    gclid: params.get("gclid") ?? "",
    pageUrl: window.location.href.split("#")[0],
  };
}

export function LandingForm({ variant }: { variant: LandingVariant }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [input, setInput] = useState<LandingInput>(empty);
  const [errors, setErrors] = useState<LandingErrors>({});
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const started = useRef(0);
  const submitting = useRef(false);
  const startedForm = useRef(false);
  const attribution = useRef({
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmContent: "",
    utmTerm: "",
    fbclid: "",
    gclid: "",
    pageUrl: "",
  });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skipFocus = useRef(true);

  useEffect(() => {
    started.current = Date.now();
    attribution.current = readAttribution();
  }, []);

  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function update<K extends keyof LandingInput>(key: K, value: LandingInput[K]) {
    if (!startedForm.current) {
      startedForm.current = true;
      track("application_started", { variant }, { once: true });
    }
    setInput((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function goNext() {
    const stepErrors = validateLandingStep(step, input);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    const next = Math.min(step + 1, landingSteps.length - 1);
    setStep(next);
    setReached((current) => Math.max(current, next));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    if (step < landingSteps.length - 1) {
      goNext();
      return;
    }
    for (let index = 0; index <= 3; index += 1) {
      const stepErrors = validateLandingStep(index, input);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setStep(index);
        return;
      }
    }

    const data = new FormData();
    (Object.keys(input) as (keyof LandingInput)[]).forEach((key) => data.set(key, input[key]));
    data.set("variant", variant);
    data.set("utmSource", attribution.current.utmSource);
    data.set("utmMedium", attribution.current.utmMedium);
    data.set("utmCampaign", attribution.current.utmCampaign);
    data.set("utmContent", attribution.current.utmContent);
    data.set("utmTerm", attribution.current.utmTerm);
    data.set("fbclid", attribution.current.fbclid);
    data.set("gclid", attribution.current.gclid);
    data.set("pageUrl", attribution.current.pageUrl);
    data.set("startedAt", String(started.current || Date.now() - 2000));
    track("application_submitted", { variant }, { once: true });
    submitting.current = true;
    setPending(true);
    try {
      const result = await submitLanding(data);

      if (result.status === "success") {
        setPending(false);
        setMessage("Thanks. We'll review your business and reply by email if working together makes sense.");
        return;
      }

      if (result.status === "ready" && result.delivery && result.tracking) {
        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              access_key: web3formsAccessKey,
              subject: result.delivery.subject,
              from_name: result.delivery.name,
              name: result.delivery.name,
              email: result.delivery.email,
              phone: result.delivery.phone,
              message: result.delivery.message,
              botcheck: "",
            }),
          });
          const body = (await response.json()) as { success?: boolean };
          if (!response.ok || !body.success) {
            setMessage("The form didn't go through. Email masonjball@gmail.com and include your business name.");
            setPending(false);
            return;
          }
          track("application_received", { variant: result.tracking.variant }, { eventId: result.tracking.eventId });
          await confirmLandingReceipt({
            eventId: result.tracking.eventId,
            qualified: result.tracking.qualified,
            variant: result.tracking.variant,
            eventSourceUrl: window.location.href.split("#")[0],
          }).catch(() => { /* Delivery succeeded; an optional receipt must not request a resubmission. */ });
          router.push("/lp/thank-you");
        } catch {
          setMessage("The form didn't go through. Email masonjball@gmail.com and include your business name.");
        }
        setPending(false);
        return;
      }

      setPending(false);
      setMessage(result.message);
      if (result.status === "invalid") {
        setErrors(result.fieldErrors);
        const first = Object.keys(result.fieldErrors)[0] as keyof LandingErrors | undefined;
        if (first) setStep(landingStepForField(first));
      }
    } catch {
      setMessage("Unable to send right now. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <form id="apply" onSubmit={onSubmit} className="scroll-mt-28 border border-ink/10 bg-white p-5 sm:p-8" noValidate>
      <p className="text-xs uppercase tracking-[0.18em] text-gold-deep">Step {step + 1} of {landingSteps.length}</p>
      <ol className="mt-3 grid grid-cols-4 gap-2" aria-label="Application progress">
        {landingSteps.map((label, index) => (
          <li key={label}>
            <button
              type="button"
              className={`h-1.5 w-full ${index <= step ? "bg-gold" : "bg-ink/10"}`}
              aria-current={index === step ? "step" : undefined}
              aria-label={label}
              disabled={index > reached}
              onClick={() => {
                if (index <= reached) setStep(index);
              }}
            />
          </li>
        ))}
      </ol>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-serif text-3xl outline-none">
        Let&apos;s See If Your Business Is a Good Fit.
      </h2>
      <p className="mt-3 text-body">
        Tell me a little about your business, what you&apos;re looking to accomplish, and what you&apos;re prepared to invest in advertising.
      </p>
      <p className="mt-4 text-xs uppercase tracking-[0.16em] text-gold-deep">{landingSteps[step]}</p>
      {message ? <p className="mt-4 text-sm text-gold-deep" role="alert">{message}</p> : null}
      <div className="mt-6 space-y-5">
        {step === 0 ? (
          <>
            <Field label="Full Name" required error={errors.name}>
              <input className={fieldClass} name="name" autoComplete="name" required value={input.name} aria-invalid={Boolean(errors.name)} onChange={(event) => update("name", event.target.value)} />
            </Field>
            <Field label="Business Name" required error={errors.businessName}>
              <input className={fieldClass} name="businessName" autoComplete="organization" required value={input.businessName} aria-invalid={Boolean(errors.businessName)} onChange={(event) => update("businessName", event.target.value)} />
            </Field>
            <Field label="Email Address" required error={errors.email}>
              <input className={fieldClass} name="email" type="email" autoComplete="email" required value={input.email} aria-invalid={Boolean(errors.email)} onChange={(event) => update("email", event.target.value)} />
            </Field>
            <Field label="Phone Number" required error={errors.phone}>
              <input className={fieldClass} name="phone" type="tel" autoComplete="tel" required value={input.phone} aria-invalid={Boolean(errors.phone)} onChange={(event) => update("phone", event.target.value)} />
            </Field>
            <Field label="Website URL" error={errors.website}>
              <input className={fieldClass} name="website" type="url" inputMode="url" placeholder="yourcompany.com" value={input.website} aria-invalid={Boolean(errors.website)} onChange={(event) => update("website", event.target.value)} />
            </Field>
          </>
        ) : null}
        {step === 1 ? (
          <>
            <Select label="What Type of Home-Service Business Do You Operate?" required value={input.industry} error={errors.industry} options={landingIndustryOptions} onChange={(value) => update("industry", value)} />
            <Field label="Where Does Your Business Operate?" required error={errors.location}>
              <input className={fieldClass} required placeholder="City, State or Service Area" value={input.location} aria-invalid={Boolean(errors.location)} onChange={(event) => update("location", event.target.value)} />
            </Field>
            <Select label="What Is Your Average Project Value?" required value={input.projectValue} error={errors.projectValue} options={landingProjectOptions} onChange={(value) => update("projectValue", value)} />
          </>
        ) : null}
        {step === 2 ? (
          <>
            <Select label="How Much Are You Prepared to Spend Monthly on Advertising?" required value={input.adBudget} error={errors.adBudget} options={landingBudgetOptions} onChange={(value) => update("adBudget", value)} />
            <p className="text-sm text-body">This is your advertising budget only. Qualified lead fees are charged separately.</p>
            <Select label="How Many Additional Customer Inquiries Are You Looking For Each Month?" required value={input.leadVolume} error={errors.leadVolume} options={landingVolumeOptions} onChange={(value) => update("leadVolume", value)} />
            <Select label="How Quickly Can You Typically Respond to New Leads?" required value={input.responseTime} error={errors.responseTime} options={landingResponseOptions} onChange={(value) => update("responseTime", value)} />
          </>
        ) : null}
        {step === 3 ? (
          <>
            <Field label="What Services Do You Want More Customers For?" required error={errors.servicesWanted}>
              <textarea className={`${fieldClass} min-h-28`} required value={input.servicesWanted} aria-invalid={Boolean(errors.servicesWanted)} onChange={(event) => update("servicesWanted", event.target.value)} />
            </Field>
            <Field label="Anything else?">
              <textarea className={`${fieldClass} min-h-24`} value={input.details} onChange={(event) => update("details", event.target.value)} />
            </Field>
          </>
        ) : null}
      </div>
      <input className="absolute -left-[9999px]" tabIndex={-1} autoComplete="off" aria-hidden="true" value={input.botcheck} onChange={(event) => update("botcheck", event.target.value)} name="botcheck" />
      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" className="border border-ink/20 px-4 py-3" onClick={() => setStep((current) => Math.max(0, current - 1))}>
            Back
          </button>
        ) : <span />}
        <button type="submit" className="bg-ink px-5 py-3 text-paper disabled:opacity-60" disabled={pending}>
          {step < landingSteps.length - 1 ? "Continue" : pending ? "Sending…" : "Request My Lead Generation Plan"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: ReactNode }) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string; "aria-describedby"?: string }>, {
        id,
        "aria-describedby": error ? `${id}-error` : undefined,
      })
    : children;
  return (
    <label className="block text-sm" htmlFor={id}>
      {label}{required ? " *" : ""}
      {control}
      {error ? <span id={`${id}-error`} className="mt-1 block text-sm text-gold-deep" role="alert">{error}</span> : null}
    </label>
  );
}

function Select({
  label,
  required,
  value,
  error,
  options,
  onChange,
}: {
  label: string;
  required?: boolean;
  value: string;
  error?: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <label className="block text-sm" htmlFor={id}>
      {label}{required ? " *" : ""}
      <select id={id} className={fieldClass} required={required} value={value} aria-invalid={Boolean(error)} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error ? <span className="mt-1 block text-sm text-gold-deep" role="alert">{error}</span> : null}
    </label>
  );
}
