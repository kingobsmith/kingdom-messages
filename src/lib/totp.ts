import { authenticator } from "otplib";
import QRCode from "qrcode";

authenticator.options = { window: 1 };

export function generateTotpSecret() {
  return authenticator.generateSecret();
}

export function getTotpUri(secret: string, email: string) {
  return authenticator.keyuri(email, "Kingdom Messages", secret);
}

export async function generateTotpQrDataUrl(secret: string, email: string) {
  const uri = getTotpUri(secret, email);
  return QRCode.toDataURL(uri, {
    width: 256,
    margin: 2,
    color: { dark: "#C9A227", light: "#0A0A0A" },
  });
}

export function verifyTotpCode(secret: string, code: string) {
  return authenticator.verify({ token: code, secret });
}
