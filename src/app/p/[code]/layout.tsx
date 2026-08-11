import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Briefing | Kingdom Messages",
  description: "Private proposal briefing. Not for public distribution.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function PrivateBriefingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
