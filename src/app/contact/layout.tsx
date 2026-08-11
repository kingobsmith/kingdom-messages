import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Kingdom Messages",
  description: "Request a private Kingdom Message, booking, or consultation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
