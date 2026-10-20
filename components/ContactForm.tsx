"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import {
  adBudgetOptions,
  industryOptions,
  marketingBudgetOptions,
  revenueOptions,
  serviceOptions,
} from "@/lib/contact";
import { site } from "@/lib/site";

const initial: ContactState = { status: "idle", message: "", fieldErrors: {} };

const fieldClass =
  "mt-2 w-full border border-ink/15 bg-white px-3 py-3 text-ink outline-none focus:border-gold-deep";

export function ContactForm() {
  const [state, setState] = useState<ContactState>(initial);
  const [pending, setPending] = useState(false);
  const startedRef = useRef<number>(0);

  useEffect(() => {
    startedRef.current = Date.now();
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const started = startedRef.current || Date.now() - 2000;
    data.set("startedAt", String(started));
    setPending(true);
    const result = await submitContact(data);
    setPending(false);
    setState(result);
    if (result.status === "success") form.reset();
  }

  if (state.status === "success") {
    return (
      <div className="border border-gold/50 bg-white p-8" role="status">
        <h2 className="font-serif text-3xl">Message sent.</h2>
        <p className="mt-4 leading-relaxed text-body">{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <p className="text-sm text-body">
        Name, business, and email are required. Everything else helps me see whether paid marketing is a fit, and you can skip it.
      </p>
      {state.message ? (
        <p className="border border-ink/15 bg-white px-4 py-3 text-sm" role="alert">
          {state.message}
          {state.status === "error" ? (
            <>
              {" "}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </>
          ) : null}
        </p>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Full name" id="name" error={state.fieldErrors.name} required>
          <input id="name" name="name" autoComplete="name" required className={fieldClass} />
        </Field>
        <Field label="Business name" id="businessName" error={state.fieldErrors.businessName} required>
          <input id="businessName" name="businessName" autoComplete="organization" required className={fieldClass} />
        </Field>
        <Field label="Email address" id="email" error={state.fieldErrors.email} required>
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldClass} />
        </Field>
        <Field label="Phone number" id="phone" error={state.fieldErrors.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </Field>
        <Field label="Website URL" id="website" error={state.fieldErrors.website}>
          <input id="website" name="website" inputMode="url" autoComplete="url" className={fieldClass} placeholder="yourcompany.com" />
        </Field>
        <Field label="Business industry" id="industry" error={state.fieldErrors.industry}>
          <select id="industry" name="industry" className={fieldClass} defaultValue="">
            <option value="">Select</option>
            {industryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Business location" id="location" error={state.fieldErrors.location}>
          <input id="location" name="location" autoComplete="address-level2" className={fieldClass} placeholder="City, state" />
        </Field>
        <Field label="Monthly revenue range" id="revenue" error={state.fieldErrors.revenue}>
          <select id="revenue" name="revenue" className={fieldClass} defaultValue="">
            <option value="">Select</option>
            {revenueOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Current monthly advertising budget" id="adBudget" error={state.fieldErrors.adBudget}>
          <select id="adBudget" name="adBudget" className={fieldClass} defaultValue="">
            <option value="">Select</option>
            {adBudgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Monthly marketing budget" id="marketingBudget" error={state.fieldErrors.marketingBudget}>
          <select id="marketingBudget" name="marketingBudget" className={fieldClass} defaultValue="">
            <option value="">Select</option>
            {marketingBudgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Biggest challenge" id="challenge" error={state.fieldErrors.challenge}>
        <textarea id="challenge" name="challenge" rows={4} className={fieldClass} />
      </Field>

      <fieldset>
        <legend className="text-sm font-medium">Primary services you need</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 text-sm">
              <input type="checkbox" name="services" value={option} className="size-4 accent-gold-deep" />
              {option}
            </label>
          ))}
        </div>
        {state.fieldErrors.services ? <p className="mt-2 text-sm text-gold-deep">{state.fieldErrors.services}</p> : null}
      </fieldset>

      <Field label="Optional additional information" id="details" error={state.fieldErrors.details}>
        <textarea id="details" name="details" rows={4} className={fieldClass} />
      </Field>

      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="botcheck">Leave this field empty</label>
        <input id="botcheck" name="botcheck" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" defaultValue="" />

      <button
        type="submit"
        disabled={pending}
        className="bg-gold px-6 py-3 text-sm font-medium text-ink disabled:opacity-60"
      >
        {pending ? "Sending…" : "Let's See If We Can Grow Your Business"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-invalid"?: boolean; "aria-describedby"?: string }>, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })
    : children;

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? <span className="text-gold-deep"> *</span> : null}
      </label>
      {control}
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-gold-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
