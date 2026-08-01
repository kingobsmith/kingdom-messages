import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ChamberMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "Gods Chosen | Kingdom Chamber",
  description: "Invited pastors, politicians, stars, public figures, and speakers in the Kingdom Chamber.",
};

export default async function GodsChosenPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chamber_members")
    .select("*")
    .eq("approved", true)
    .eq("category", "gods_chosen")
    .order("featured_order", { ascending: true });

  const members = (data || []) as ChamberMember[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-24 md:pb-12">
      <h1 className="section-title mb-4">Gods Chosen</h1>
      <p className="mb-10 max-w-2xl text-gray-400">
        Gods Chosen is an exclusive network of invited or approved pastors, politicians, stars,
        public figures, and speakers. Each profile includes name, bio, mission, platform links,
        and approved status. Membership dues never exceed $100/month.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="card-royal">
            <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-royal-dark">
              <span className="font-serif text-4xl text-gold/40">
                {member.display_name.charAt(0)}
              </span>
            </div>
            <span className="inline-block rounded-full border border-gold bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
              Kingdom Approved · Invited
            </span>
            <h2 className="mt-3 font-serif text-xl text-gold">{member.display_name}</h2>
            {member.subtitle && (
              <p className="text-sm text-gold-light">{member.subtitle}</p>
            )}
            {member.bio && (
              <div className="mt-3">
                <p className="text-xs uppercase tracking-wide text-gray-500">Mission Statement</p>
                <p className="mt-1 text-sm text-gray-400">{member.bio}</p>
              </div>
            )}
            {member.dues_text && (
              <p className="mt-4 text-xs text-gray-500">
                Monthly dues: {member.dues_text} (never more than $100/month)
              </p>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/contact" className="btn-outline-gold text-sm">Request Connection</Link>
              {member.official_link ? (
                <a
                  href={member.official_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:underline"
                >
                  Platform Links
                </a>
              ) : (
                <Link href="/contact" className="text-sm text-gold hover:underline">
                  Platform Links
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/contact" className="btn-gold">Apply for Gods Chosen</Link>
      </div>
    </div>
  );
}
