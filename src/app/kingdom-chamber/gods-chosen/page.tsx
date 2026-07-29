import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gods Chosen | Kingdom Chamber",
  description: "Invited pastors, politicians, stars, public figures, and speakers in the Kingdom Chamber.",
};

const members = [
  {
    name: "Pastor David King",
    role: "Senior Pastor, Kingdom Life Church",
    mission: "Equipping leaders to transform communities through faith and action.",
    dues: "$50/month",
  },
  {
    name: "Senator Lisa Monroe",
    role: "Public Servant & Advocate",
    mission: "Bridging faith and public service for the good of the people.",
    dues: "$75/month",
  },
  {
    name: 'Marcus "MJ" Johnson',
    role: "Artist & Kingdom Ambassador",
    mission: "Using music and media to spread hope and Kingdom values worldwide.",
    dues: "$100/month",
  },
];

export default function GodsChosenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="section-title mb-4">Gods Chosen</h1>
      <p className="mb-10 max-w-2xl text-gray-400">
        Gods Chosen is an exclusive network of invited or approved pastors, politicians, stars,
        public figures, and speakers. Each member carries the Kingdom Approved designation.
        Membership dues never exceed $100/month and support the Kingdom Chamber mission.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.name} className="card-royal">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-royal-dark">
              <span className="font-serif text-4xl text-gold/40">
                {member.name.charAt(0)}
              </span>
            </div>
            <span className="inline-block rounded-full border border-gold bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              Kingdom Approved
            </span>
            <h2 className="mt-3 font-serif text-xl text-gold">{member.name}</h2>
            <p className="text-sm text-gold-light">{member.role}</p>
            <p className="mt-3 text-sm text-gray-400">{member.mission}</p>
            <p className="mt-4 text-xs text-gray-500">Dues: {member.dues}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/apply" className="btn-outline-gold text-sm">
                Request Connection
              </Link>
              <Link href="/bio" className="text-sm text-gold hover:underline">
                Official Links
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
