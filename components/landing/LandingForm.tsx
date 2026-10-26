"use client";

import { ApplyForm } from "@/components/ApplyForm";
import type { LandingVariant } from "@/lib/landing";

export function LandingForm({ variant }: { variant: LandingVariant }) {
  const source = variant === "video" ? "video landing page" : "results landing page";
  return <ApplyForm source={source} redirectTo="/lp/thank-you" />;
}
