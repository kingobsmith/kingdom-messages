"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/bio", label: "Bio" },
  { href: "/books", label: "Books" },
  { href: "/kingdom-chamber", label: "Kingdom Chamber" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gold/20 bg-royal-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-serif text-xl font-semibold text-gold md:text-2xl">
          Kingdom Messages
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 transition hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 md:hidden">
          <Link href="/contact" className="text-xs text-gold">Contact</Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded border border-gold/30 px-3 py-1 text-sm text-gold"
            aria-label="Toggle menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-gold/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-gray-300 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
