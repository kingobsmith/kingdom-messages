import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/kingdom-chamber", label: "Kingdom Chamber" },
  { href: "/bio", label: "Bio" },
  { href: "/books", label: "Books" },
  { href: "/apply", label: "Apply" },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-royal-dark">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-serif text-gold">Kingdom Messages</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gold">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Kingdom Messages. Private, royal communication for pastors, players, stars, and leaders.
        </p>
      </div>
    </footer>
  );
}
