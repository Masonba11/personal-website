"use server";

import { cookies } from "next/headers";
import {
  isLandingSpam,
  landingMessage,
  qualifyLanding,
  readLandingForm,
  validateLanding,
  type LandingErrors,
} from "@/lib/landing";

export type LandingState = {
  status: "idle" | "success" | "error" | "invalid" | "ready";
  message: string;
  fieldErrors: LandingErrors;
  delivery?: {
    subject: string;
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  tracking?: {
    eventId: string;
    qualified: boolean;
    variant: string;
  };
};

export async function submitLanding(formData: FormData): Promise<LandingState> {
  const input = readLandingForm(formData);

  if (isLandingSpam(input)) {
    return { status: "success", message: "", fieldErrors: {} };
  }

  const fieldErrors = validateLanding(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "invalid",
      message: "Check the highlighted fields and send it again.",
      fieldErrors,
    };
  }

  const fit = qualifyLanding(input);
  const receivedAt = new Date().toISOString();
  const eventId = crypto.randomUUID();
  const sourceLabel = input.variant === "video" ? "video landing page" : "results landing page";

  return {
    status: "ready",
    message: "",
    fieldErrors: {},
    delivery: {
      subject: `Landing application — ${input.businessName} — ${fit}`,
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: landingMessage(input, fit, receivedAt),
    },
    tracking: {
      eventId,
      qualified: fit !== "Needs Review",
      variant: sourceLabel,
    },
  };
}

export async function confirmLandingReceipt(input: {
  eventId: string;
  qualified: boolean;
  variant: string;
  eventSourceUrl: string;
}) {
  const jar = await cookies();
  jar.set("lp_receipt", input.eventId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 30,
  });

  // Browser provider acceptance is not a trusted server receipt. CAPI remains off
  // until a verified delivery webhook and persistent event deduplication exist.
  return { capi: false as const };
}
