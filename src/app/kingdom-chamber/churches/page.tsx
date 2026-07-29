import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { ChamberMember } from "@/lib/types";

export const metadata: Metadata = {
  title: "Approved Churches & Ministries | Kingdom Chamber",
  description: "Approved churches and ministries in the Kingdom Chamber network.",
};

export default async function ChurchesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("chamber_members")
    .select("*")
    .eq("approved", true)
    .in("category", ["church", "ministry"])
    .order("featured_order", { ascending: true });

  const churches = (data || []) as ChamberMember[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="section-title mb-4">Approved Churches & Ministries</h1>
      <p className="mb-10 max-w-2xl text-gray-400">
        These churches and ministries have been reviewed and approved for listing in the Kingdom
        Chamber. Each organization is verified for identity, leadership, and Kingdom alignment.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {churches.map((church) => (
          <div key={church.id} className="card-royal">
            <span className="inline-block rounded-full border border-gold/40 px-3 py-1 text-xs text-gold">
              Kingdom Approved
            </span>
            <h2 className="mt-3 font-serif text-xl text-gold">{church.display_name}</h2>
            {church.subtitle && <p className="mt-1 text-sm text-gold-light">{church.subtitle}</p>}
            {church.location && <p className="text-sm text-gray-500">{church.location}</p>}
            {church.bio && <p className="mt-3 text-sm text-gray-400">{church.bio}</p>}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/apply" className="btn-gold">Apply for Approval</Link>
      </div>
    </div>
  );
}
