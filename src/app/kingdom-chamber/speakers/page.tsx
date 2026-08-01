import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ChamberMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "Speaker Bureaus | Kingdom Chamber",
  description: "Curated speakers available for churches, conferences, and Kingdom gatherings.",
};

export default async function SpeakersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chamber_members")
    .select("*")
    .eq("approved", true)
    .eq("category", "speaker")
    .order("featured_order", { ascending: true });

  const speakers = (data || []) as ChamberMember[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="section-title mb-4">Speaker Bureaus</h1>
      <p className="mb-10 max-w-2xl text-gray-400">
        Curated speakers available for churches, conferences, corporate events, and Kingdom
        gatherings. Each profile includes topics, bio, and booking information.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {speakers.map((speaker) => (
          <div key={speaker.id} className="card-royal">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-royal-dark">
              <span className="font-serif text-4xl text-gold/40">
                {speaker.display_name.charAt(0)}
              </span>
            </div>
            <h2 className="font-serif text-xl text-gold">{speaker.display_name}</h2>
            {speaker.topics && speaker.topics.length > 0 && (
              <p className="mt-2 text-xs text-gold-light">{speaker.topics.join(" · ")}</p>
            )}
            {speaker.bio && <p className="mt-3 text-sm text-gray-400">{speaker.bio}</p>}
            {speaker.media_text && (
              <p className="mt-3 text-xs text-gray-500">Books/Media: {speaker.media_text}</p>
            )}
            <Link href="/contact" className="btn-outline-gold mt-4 inline-block text-sm">
              Book Speaker
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
