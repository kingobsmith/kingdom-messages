"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function StickyMobileCTA() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/contact" || pathname.startsWith("/p/")) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gold/30 bg-royal-black/95 p-3 backdrop-blur md:hidden">
      <Link href="/contact" className="btn-gold block w-full text-center text-sm">
        Request a Message
      </Link>
    </div>
  );
}
