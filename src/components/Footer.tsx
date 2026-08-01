import Link from "next/link";
import { siteContact, socialLinks } from "@/lib/site";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/bio", label: "Bio" },
  { href: "/books", label: "Books" },
  { href: "/kingdom-chamber", label: "Kingdom Chamber" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-royal-dark">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-xl text-gold">Kingdom Messages</p>
            <p className="mt-2 text-sm text-gray-400">
              Private, royal communication for pastors, players, stars, and leaders.
            </p>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-gold-light">Contact</p>
            <a href={`mailto:${siteContact.email}`} className="block text-sm text-gray-400 hover:text-gold">
              {siteContact.email}
            </a>
            {siteContact.phone && (
              <a href={`tel:${siteContact.phone}`} className="mt-1 block text-sm text-gray-400 hover:text-gold">
                {siteContact.phone}
              </a>
            )}
            <Link href="/contact" className="mt-2 inline-block text-sm text-gold hover:underline">
              Request a message →
            </Link>
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-gold-light">Connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <Link key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs text-gray-500 hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-gold/10 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Kingdom Messages. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
