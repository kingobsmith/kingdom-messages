import { nanoid } from "nanoid";
import { generateQRCodeDataUrl } from "@/lib/qr";

export function generateMessageSlug() {
  return nanoid(12);
}

export function getMessageUrl(slug: string, baseUrl?: string) {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/m/${slug}`;
}

export async function generateMessageQr(url: string) {
  return generateQRCodeDataUrl(url);
}

export function normalizeContact(value: string) {
  return value.trim().toLowerCase();
}

export function recipientMatches(
  recipient: { email: string | null; phone: string | null },
  identifier: string
) {
  const normalized = normalizeContact(identifier);
  const emailMatch = recipient.email && normalizeContact(recipient.email) === normalized;
  const phoneMatch =
    recipient.phone &&
    normalizeContact(recipient.phone).replace(/\D/g, "") === normalized.replace(/\D/g, "");
  return Boolean(emailMatch || phoneMatch);
}

export function isMessageAccessible(message: {
  status: string;
  expires_at: string | null;
}) {
  if (message.status === "revoked") return { ok: false, reason: "revoked" as const };
  if (message.status === "expired") return { ok: false, reason: "expired" as const };
  if (message.expires_at && new Date(message.expires_at) < new Date()) {
    return { ok: false, reason: "expired" as const };
  }
  return { ok: true, reason: null };
}
