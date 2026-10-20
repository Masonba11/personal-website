"use server";

import { cookies, headers } from "next/headers";
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

  const pixel = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixel || !token) return { capi: false as const };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "";
  const userAgent = headerList.get("user-agent") || "";
  const now = Math.floor(Date.now() / 1000);
  const events = [
    {
      event_name: "Lead",
      event_time: now,
      event_id: input.eventId,
      action_source: "website",
      event_source_url: input.eventSourceUrl,
      user_data: { client_ip_address: ip, client_user_agent: userAgent },
      custom_data: { content_name: input.variant },
    },
  ];
  if (input.qualified) {
    events.push({
      event_name: "QualifiedApplication",
      event_time: now,
      event_id: `${input.eventId}-qualified`,
      action_source: "website",
      event_source_url: input.eventSourceUrl,
      user_data: { client_ip_address: ip, client_user_agent: userAgent },
      custom_data: { content_name: input.variant },
    });
  }

  const response = await fetch(`https://graph.facebook.com/v21.0/${pixel}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: events, access_token: token }),
  });
  return { capi: response.ok };
}
