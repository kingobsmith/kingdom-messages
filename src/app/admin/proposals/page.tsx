"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ProposalRow {
  id: string;
  title: string;
  subtitle: string | null;
  status: string;
  created_at: string;
  proposal_accesses: { count: number }[] | null;
}

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<ProposalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proposals")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) setProposals(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="section-title">Private Proposals</h1>
        <div className="flex gap-3">
          <Link href="/admin/messages" className="btn-outline-gold text-sm">Messages</Link>
          <Link href="/admin/proposals/new" className="btn-gold text-sm">New Proposal</Link>
        </div>
      </div>

      <p className="mb-6 text-sm text-gray-400">
        Private briefings with unique links and QR codes per organization. Not public or searchable.
      </p>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : proposals.length === 0 ? (
        <div className="card-royal text-center">
          <p className="text-gray-400">No proposals yet.</p>
          <Link href="/admin/proposals/new" className="btn-gold mt-4 inline-block">Create First Proposal</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((p) => {
            const count = Array.isArray(p.proposal_accesses) ? p.proposal_accesses[0]?.count ?? 0 : 0;
            return (
              <Link key={p.id} href={`/admin/proposals/${p.id}`} className="card-royal block">
                <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                  <div>
                    <h2 className="font-serif text-xl text-gold">{p.title}</h2>
                    {p.subtitle && <p className="mt-1 text-sm text-gray-400">{p.subtitle}</p>}
                    <p className="mt-2 text-xs text-gray-500">
                      {count} recipient link{count === 1 ? "" : "s"} · {p.status}
                    </p>
                  </div>
                  <span className="text-sm text-gold-light">Manage →</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
