import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speaker Bureaus | Kingdom Chamber",
  description: "Curated speakers available for churches, conferences, and Kingdom gatherings.",
};

const speakers = [
  {
    name: "Dr. Angela Foster",
    topics: ["Leadership", "Faith & Culture", "Women in Ministry"],
    bio: "Award-winning speaker and author with 20 years of ministry and corporate leadership experience.",
    media: "The Kingdom Leader, Voices of Faith Podcast",
  },
  {
    name: "Marcus Cole",
    topics: ["Athletics & Faith", "Youth Empowerment", "Motivation"],
    bio: "Former professional athlete turned motivational speaker inspiring the next generation.",
    media: "Game Changer, Rise Up Devotional",
  },
  {
    name: "Rev. Patricia Hughes",
    topics: ["Worship", "Revival", "Prayer"],
    bio: "Dynamic preacher and worship leader known for powerful messages on spiritual renewal.",
    media: "Fire & Glory, Sacred Hour",
  },
];

export default function SpeakersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="section-title mb-4">Speaker Bureaus</h1>
      <p className="mb-10 max-w-2xl text-gray-400">
        Curated speakers available for churches, conferences, corporate events, and Kingdom
        gatherings. Each profile includes topics, bio, and booking information.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <div key={speaker.name} className="card-royal">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-royal-dark">
              <span className="font-serif text-4xl text-gold/40">
                {speaker.name.charAt(0)}
              </span>
            </div>
            <h2 className="font-serif text-xl text-gold">{speaker.name}</h2>
            <p className="mt-2 text-xs text-gold-light">
              {speaker.topics.join(" · ")}
            </p>
            <p className="mt-3 text-sm text-gray-400">{speaker.bio}</p>
            <p className="mt-3 text-xs text-gray-500">
              Books/Media: {speaker.media}
            </p>
            <Link href="/apply" className="btn-outline-gold mt-4 inline-block text-sm">
              Book Speaker
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
