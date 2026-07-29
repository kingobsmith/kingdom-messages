import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Messages | Kingdom Messages",
  description: "Manage secure Kingdom Messages.",
};

export default function AdminMessagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
