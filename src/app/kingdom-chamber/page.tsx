import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Chamber | Kingdom Messages",
  description: "A curated network of approved businesses, churches, ministries, speakers, and public leaders.",
};

const sections = [
  {
    title: "Approved Churches & Ministries",
    href: "/kingdom-chamber/churches",
    desc: "Verified churches and ministries approved for the Kingdom Chamber network.",
  },
  {
    title: "Speaker Bureaus",
    href: "/kingdom-chamber/speakers",
    desc: "Professional speakers available for conferences, churches, and events.",
  },
  {
    title: "Gods Chosen",
    href: "/kingdom-chamber/gods-chosen",
    desc: "Celebrities, politicians, pastors, and public figures — invited and Kingdom Approved.",
  },
];

export default function KingdomChamberPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-24 md:pb-12">
      <div className="mb-12 text-center">
        <h1 className="section-title">Kingdom Chamber</h1>
        <p className="mx-auto mt-6 max-w-2xl text-gray-400">
          Kingdom Chamber is a curated network of approved businesses, Churches, Ministries,
          speakers, and public leaders.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="card-royal block">
            <h2 className="font-serif text-xl text-gold">{section.title}</h2>
            <p className="mt-3 text-sm text-gray-400">{section.desc}</p>
            <span className="mt-4 inline-block text-sm text-gold-light">View listings →</span>
          </Link>
        ))}
      </div>

      <div className="card-royal mt-10">
        <h2 className="font-serif text-xl text-gold">Public Figures Lane</h2>
        <p className="mt-3 text-sm text-gray-400">
          A dedicated lane within Gods Chosen for celebrities, politicians, pastors, and public
          figures to build approved profiles with mission statements, platform links, and Kingdom
          Approved status. Dues never exceed $100/month.
        </p>
        <Link href="/kingdom-chamber/gods-chosen" className="btn-outline-gold mt-4 inline-block text-sm">
          Explore Gods Chosen
        </Link>
      </div>
    </div>
  );
}
