import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Kingdom Messages",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-4 font-serif text-4xl text-gold md:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-gray-400">
        This page does not exist or may have been moved. Return home or request an invitation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="btn-gold">
          Go Home
        </Link>
        <Link href="/apply" className="btn-outline-gold">
          Apply / Request Invitation
        </Link>
      </div>
    </div>
  );
}
