"use server";

import { contactMessage, isSpam, readContactForm, validateContact, type FieldErrors } from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error" | "invalid";
  message: string;
  fieldErrors: FieldErrors;
};

const EXISTING_WEB3FORMS_KEY = "445fec98-4d22-4adc-b9bb-ddf078751f46";

export async function submitContact(formData: FormData): Promise<ContactState> {
  const input = readContactForm(formData);

  if (isSpam(input)) {
    return {
      status: "success",
      message: "Thanks. If this is a fit, I'll reply by email.",
      fieldErrors: {},
    };
  }

  const fieldErrors = validateContact(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "invalid",
      message: "Check the highlighted fields and send it again.",
      fieldErrors,
    };
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY || EXISTING_WEB3FORMS_KEY;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `MBall Marketing consultation — ${input.businessName}`,
        from_name: input.name,
        name: input.name,
        email: input.email,
        phone: input.phone,
        message: contactMessage(input),
        botcheck: "",
      }),
    });

    const result = (await response.json()) as { success?: boolean };
    if (!response.ok || !result.success) {
      return {
        status: "error",
        message: "The form didn't go through. Email me directly and include your business name.",
        fieldErrors: {},
      };
    }
  } catch {
    return {
      status: "error",
      message: "The form didn't go through. Email me directly and include your business name.",
      fieldErrors: {},
    };
  }

  return {
    status: "success",
    message: "I have it. I read these myself and typically reply within one business day.",
    fieldErrors: {},
  };
}
