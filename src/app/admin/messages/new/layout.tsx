import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Message | Kingdom Messages",
  description: "Create a new secure Kingdom Message with QR code and unlock access.",
};

export default function NewMessageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
