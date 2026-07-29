import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-royal-dark">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="font-serif text-gold">Kingdom Messages</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/bio" className="hover:text-gold">
              Bio
            </Link>
            <Link href="/books" className="hover:text-gold">
              Books
            </Link>
            <Link href="/kingdom-chamber" className="hover:text-gold">
              Kingdom Chamber
            </Link>
            <Link href="/apply" className="hover:text-gold">
              Apply
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-600">
          Private, royal communication for pastors, players, stars, and leaders.
        </p>
      </div>
    </footer>
  );
}
