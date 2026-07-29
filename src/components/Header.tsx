import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/kingdom-chamber", label: "Kingdom Chamber" },
  { href: "/bio", label: "Bio" },
  { href: "/books", label: "Books" },
  { href: "/apply", label: "Apply" },
];

export default function Header() {
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
        <nav className="flex items-center gap-3 md:hidden">
          <Link href="/kingdom-chamber" className="text-xs text-gray-300 hover:text-gold">
            Chamber
          </Link>
          <Link href="/apply" className="text-xs text-gold hover:text-gold-light">
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
