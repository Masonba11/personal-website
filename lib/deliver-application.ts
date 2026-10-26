export type DeliveryResult = { ok: true } | { ok: false; message: string };

const fallback = "The form didn't go through. Email masonjball@gmail.com and include your business name.";

export async function deliverApplication(data: FormData, accessKey: string): Promise<DeliveryResult> {
  if (String(data.get("botcheck") ?? "").trim() !== "") return { ok: true };

  const name = String(data.get("name") ?? "").trim();
  const business = String(data.get("business_name") ?? "").trim();
  data.set("access_key", accessKey);
  data.set("from_name", name || "Website application");
  data.set("subject", business ? `New application — ${business}` : "New application from masonball.com");
  data.delete("redirect");
  data.delete("botcheck");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    const body = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
    if (!response.ok || !body?.success) return { ok: false, message: body?.message || fallback };
    return { ok: true };
  } catch {
    return { ok: false, message: fallback };
  }
}
