import { nanoid } from "nanoid";
import { generateQRCodeDataUrl } from "@/lib/qr";

export function generateAccessCode() {
  return nanoid(14);
}

export function getProposalUrl(accessCode: string, baseUrl?: string) {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/p/${accessCode}`;
}

export async function generateProposalQr(url: string) {
  return generateQRCodeDataUrl(url);
}
