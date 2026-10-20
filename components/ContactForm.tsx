"use client";

import { useEffect, useId, useRef, useState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import {
  adBudgetOptions,
  challengeOptions,
  formSteps,
  industryOptions,
  leadVolumeOptions,
  projectValueOptions,
  responseTimeOptions,
  revenueOptions,
  salesHandlerOptions,
  stepForField,
  thankYouMessage,
  validateStep,
  type ContactInput,
  type FieldErrors,
} from "@/lib/contact";
import { site } from "@/lib/site";
import { web3formsAccessKey } from "@/lib/web3forms";

const initialInput: ContactInput = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  industry: "",
  location: "",
  projectValue: "",
  revenue: "",
  leadVolume: "",
  adBudget: "",
  responseTime: "",
  salesHandler: "",
  challenge: "",
  servicesWanted: "",
  details: "",
  botcheck: "",
  startedAt: "",
};

const idle: ContactState = { status: "idle", message: "", fieldErrors: {} };

const fieldClass =
  "mt-2 w-full border border-ink/15 bg-white px-3 py-3 text-ink outline-none focus:border-gold-deep";

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [reached, setReached] = useState(0);
  const [input, setInput] = useState<ContactInput>(initialInput);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<ContactState>(idle);
  const [pending, setPending] = useState(false);
  const startedRef = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skipInitialFocus = useRef(true);
  const baseId = useId();

  useEffect(() => {
    startedRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (skipInitialFocus.current) {
      skipInitialFocus.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setInput((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function goNext() {
    const stepErrors = validateStep(step, input);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;
    setStatus(idle);
    const next = Math.min(step + 1, formSteps.length - 1);
    setStep(next);
    setReached((current) => Math.max(current, next));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < formSteps.length - 1) {
      goNext();
      return;
    }

    for (let index = 0; index <= 3; index += 1) {
      const stepErrors = validateStep(index, input);
      if (Object.keys(stepErrors).length > 0) {
        setErrors(stepErrors);
        setStep(index);
        return;
      }
    }

    const data = new FormData();
    (Object.keys(input) as (keyof ContactInput)[]).forEach((key) => {
      data.set(key, input[key]);
    });
    data.set("startedAt", String(startedRef.current || Date.now() - 2000));
    setPending(true);
    const result = await submitContact(data);
    if (result.status === "ready" && result.delivery) {
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
        setStatus(
          response.ok && body.success
            ? { status: "success", message: thankYouMessage, fieldErrors: {} }
            : {
                status: "error",
                message:
                  "The form didn't go through. Email me directly and include your business name.",
                fieldErrors: {},
              },
        );
      } catch {
        setStatus({
          status: "error",
          message: "The form didn't go through. Email me directly and include your business name.",
          fieldErrors: {},
        });
      }
      setPending(false);
      return;
    }
    setPending(false);
    setStatus(result);
    if (result.status === "invalid") {
      setErrors(result.fieldErrors);
      const first = Object.keys(result.fieldErrors)[0] as keyof FieldErrors | undefined;
      if (first) setStep(stepForField(first));
    }
  }

  if (status.status === "success") {
    return (
      <div className="border border-gold/50 bg-white p-8" role="status">
        <h2 className="font-serif text-3xl">Request received.</h2>
        <p className="mt-4 leading-relaxed text-body">{status.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border border-ink/10 bg-white p-5 md:p-8" noValidate>
      <nav aria-label="Form progress">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-gold-deep">
          Step {step + 1} of {formSteps.length}
        </p>
        <ol className="mt-3 grid grid-cols-5 gap-2">
          {formSteps.map((label, index) => {
            const complete = index < step;
            const current = index === step;
            return (
              <li key={label}>
                <button
                  type="button"
                  className="block w-full text-left disabled:cursor-default"
                  disabled={index > reached}
                  aria-current={current ? "step" : undefined}
                  onClick={() => {
                    if (index <= reached) setStep(index);
                  }}
                >
                  <span className={`block h-1 ${current || complete ? "bg-gold" : "bg-ink/10"}`} />
                  <span className={`mt-2 hidden text-xs md:block ${current ? "text-ink" : "text-body"}`}>{label}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="step-in mt-8" key={step}>
        <h2 ref={headingRef} tabIndex={-1} id={`${baseId}-title`} className="font-serif text-3xl outline-none">
          {formSteps[step]}
        </h2>

        {status.message ? (
          <p className="mt-4 border border-ink/15 px-4 py-3 text-sm" role="alert">
            {status.message}
            {status.status === "error" ? (
              <>
                {" "}
                <a className="underline" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </>
            ) : null}
          </p>
        ) : null}

        {step === 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TextField id="name" label="Full Name" required value={input.name} error={errors.name} autoComplete="name" onChange={(value) => update("name", value)} />
            <TextField id="businessName" label="Business Name" required value={input.businessName} error={errors.businessName} autoComplete="organization" onChange={(value) => update("businessName", value)} />
            <TextField id="email" label="Email Address" type="email" required value={input.email} error={errors.email} autoComplete="email" onChange={(value) => update("email", value)} />
            <TextField id="phone" label="Phone Number" type="tel" required value={input.phone} error={errors.phone} autoComplete="tel" onChange={(value) => update("phone", value)} />
            <TextField id="website" label="Website URL" type="url" value={input.website} error={errors.website} autoComplete="url" placeholder="yourcompany.com" onChange={(value) => update("website", value)} />
            <SelectField id="industry" label="What Industry Are You In?" required value={input.industry} error={errors.industry} options={industryOptions} onChange={(value) => update("industry", value)} />
            <div className="md:col-span-2">
              <TextField id="location" label="Where Does Your Business Operate?" required value={input.location} error={errors.location} placeholder="City, State or Service Area" onChange={(value) => update("location", value)} />
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div className="mt-6 grid gap-6">
            <SelectField id="projectValue" label="What Is Your Average Project Value?" required value={input.projectValue} error={errors.projectValue} options={projectValueOptions} onChange={(value) => update("projectValue", value)} />
            <SelectField id="revenue" label="What Is Your Approximate Monthly Business Revenue?" value={input.revenue} error={errors.revenue} options={revenueOptions} onChange={(value) => update("revenue", value)} />
            <SelectField id="leadVolume" label="How Many Additional Leads Would You Like Per Month?" required value={input.leadVolume} error={errors.leadVolume} options={leadVolumeOptions} onChange={(value) => update("leadVolume", value)} />
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-6">
            <h3 className="font-serif text-2xl">Let&apos;s Talk Advertising Budget</h3>
            <p className="mt-3 leading-relaxed text-body">
              With our pay-per-lead model, your advertising budget is separate from the cost of qualified leads. You fund the advertising campaigns, and we charge an agreed amount for each qualified lead generated.
            </p>
            <div className="mt-6">
              <SelectField id="adBudget" label="How Much Are You Willing to Invest in Advertising Each Month?" required value={input.adBudget} error={errors.adBudget} options={adBudgetOptions} onChange={(value) => update("adBudget", value)} />
            </div>
            <p className="mt-3 text-sm text-body">
              Advertising spend is paid separately from lead fees. We&apos;ll discuss a realistic starting budget based on your market and goals.
            </p>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-6 grid gap-6">
            <SelectField id="responseTime" label="How Quickly Can You Typically Contact a New Lead?" required value={input.responseTime} error={errors.responseTime} options={responseTimeOptions} onChange={(value) => update("responseTime", value)} />
            <SelectField id="salesHandler" label="Who Handles Sales and Estimates?" value={input.salesHandler} error={errors.salesHandler} options={salesHandlerOptions} onChange={(value) => update("salesHandler", value)} />
            <SelectField id="challenge" label="What Is Your Biggest Customer Acquisition Challenge?" required value={input.challenge} error={errors.challenge} options={challengeOptions} onChange={(value) => update("challenge", value)} />
            <TextArea
              id="servicesWanted"
              label="What Services Do You Want More Customers For?"
              required
              value={input.servicesWanted}
              error={errors.servicesWanted}
              placeholder="Example: Bathroom remodels, kitchen renovations, landscaping installations, window cleaning, or residential painting."
              onChange={(value) => update("servicesWanted", value)}
            />
          </div>
        ) : null}

        {step === 4 ? (
          <div className="mt-6">
            <TextArea
              id="details"
              label="Anything Else We Should Know?"
              value={input.details}
              error={errors.details}
              placeholder="Tell us more about your business, your goals, or your current marketing challenges."
              onChange={(value) => update("details", value)}
            />
            <p className="mt-6 text-sm leading-relaxed text-body">
              No obligation. We&apos;ll review your business, market, advertising budget, and lead goals to determine whether working together makes sense.
            </p>
          </div>
        ) : null}
      </div>

      <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" name="botcheck" tabIndex={-1} autoComplete="off" value={input.botcheck} onChange={(event) => update("botcheck", event.target.value)} />
      </div>
      <input type="hidden" name="startedAt" value="" />

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        {step > 0 ? (
          <button type="button" className="border border-ink/20 px-5 py-3 text-sm" onClick={() => setStep((current) => current - 1)}>
            Back
          </button>
        ) : (
          <span />
        )}
        {step < formSteps.length - 1 ? (
          <button type="button" className="bg-gold px-5 py-3 text-sm font-medium text-ink" onClick={goNext}>
            Continue
          </button>
        ) : (
          <button type="submit" className="bg-gold px-5 py-3 text-sm font-medium text-ink disabled:opacity-60" disabled={pending}>
            {pending ? "Sending…" : "Request My Lead Generation Plan"}
          </button>
        )}
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-gold-deep" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  options,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  options: readonly string[];
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-gold-deep" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  error,
  onChange,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </label>
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-gold-deep" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
