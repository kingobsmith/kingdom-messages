import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login | Kingdom Messages",
  description: "Sign in to Kingdom Messages administration.",
};

export default function AdminLoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
