"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/recipients", label: "Recipients" },
  { href: "/admin/proposals", label: "Proposals" },
  { href: "/admin/chamber-members", label: "Chamber" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  }

  return (
    <div className="min-h-[70vh] bg-royal-black">
      <div className="border-b border-gold/20 bg-royal-dark">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <p className="font-serif text-gold">Admin</p>
          <nav className="flex flex-wrap items-center gap-3">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm ${active ? "text-gold" : "text-gray-400 hover:text-gold"}`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link href="/admin/messages/new" className="btn-gold px-3 py-1 text-xs">
              New Message
            </Link>
            <button type="button" onClick={handleLogout} className="text-sm text-gray-500 hover:text-gold">
              Logout
            </button>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
