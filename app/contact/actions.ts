"use server";

import {
  contactMessage,
  isSpam,
  qualifyLead,
  readContactForm,
  thankYouMessage,
  validateContact,
  type FieldErrors,
} from "@/lib/contact";

export type ContactState = {
  status: "idle" | "success" | "error" | "invalid" | "ready";
  message: string;
  fieldErrors: FieldErrors;
  delivery?: {
    subject: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  };
};

export async function submitContact(formData: FormData): Promise<ContactState> {
  const input = readContactForm(formData);

  if (isSpam(input)) {
    return { status: "success", message: thankYouMessage, fieldErrors: {} };
  }

  const fieldErrors = validateContact(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "invalid",
      message: "Check the highlighted fields and send it again.",
      fieldErrors,
    };
  }

  const fit = qualifyLead(input);
  return {
    status: "ready",
    message: "",
    fieldErrors: {},
    delivery: {
      subject: `Lead request — ${input.businessName} — ${fit}`,
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: contactMessage(input, fit),
    },
  };
}
