import QRCode from "qrcode";

export async function generateQRCodeDataUrl(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    width: 256,
    margin: 2,
    color: { dark: "#C9A227", light: "#0A0A0A" },
  });
}

export function getMessageUrl(id: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/m/${id}`;
}
