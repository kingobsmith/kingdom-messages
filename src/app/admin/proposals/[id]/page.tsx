"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Access {
  id: string;
  organization_name: string;
  contact_name: string | null;
  contact_email: string | null;
  access_code: string;
  status: string;
  created_at: string;
  last_opened_at: string | null;
}

interface Detail {
  proposal: {
    id: string;
    title: string;
    subtitle: string | null;
    status: string;
  };
  accesses: Access[];
  events: { event_type: string; created_at: string }[];
  replies: { full_name: string; email: string; reply_type: string; message: string; created_at: string }[];
}

export default function ProposalDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [detail, setDetail] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createdLink, setCreatedLink] = useState<{ url: string; qrCode: string; org: string } | null>(null);
  const [creating, setCreating] = useState(false);

  function load() {
    fetch(`/api/proposals/${id}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setDetail(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load");
        setLoading(false);
      });
  }

  useEffect(() => {
    load();
  }, [id]);

  async function handleCreateAccess(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCreating(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationName: formData.get("organizationName"),
          contactName: formData.get("contactName"),
          contactEmail: formData.get("contactEmail"),
          contactPhone: formData.get("contactPhone"),
          notes: formData.get("notes"),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed");
        return;
      }
      setCreatedLink({
        url: data.url,
        qrCode: data.qrCode,
        org: data.access.organization_name,
      });
      form.reset();
      load();
    } catch {
      setError("Failed to create link");
    } finally {
      setCreating(false);
    }
  }

  function copyUrl(code: string) {
    const url = `${window.location.origin}/p/${code}`;
    navigator.clipboard.writeText(url);
  }

  if (loading) return <p className="px-4 py-12 text-gray-400">Loading...</p>;
  if (!detail) return <p className="px-4 py-12 text-red-300">{error || "Not found"}</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin/proposals" className="text-sm text-gold hover:underline">← All Proposals</Link>
          <h1 className="section-title mt-2">{detail.proposal.title}</h1>
          {detail.proposal.subtitle && (
            <p className="mt-2 text-gray-400">{detail.proposal.subtitle}</p>
          )}
        </div>
        <span className="rounded-full border border-gold/40 px-3 py-1 text-xs capitalize text-gold">
          {detail.proposal.status}
        </span>
      </div>

      {createdLink && (
        <div className="card-royal mb-8">
          <h2 className="font-serif text-lg text-gold">Link Created — {createdLink.org}</h2>
          <p className="mt-2 break-all text-sm text-gold-light">{createdLink.url}</p>
          <img src={createdLink.qrCode} alt="QR Code" className="mx-auto mt-4 rounded-lg border border-gold/30" />
          <p className="mt-2 text-center text-xs text-gray-500">
            Email this QR / link, or print it in a certified letter under the web address.
          </p>
          <button type="button" onClick={() => setCreatedLink(null)} className="btn-outline-gold mt-4 text-sm">
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleCreateAccess} className="card-royal mb-8 space-y-4">
        <h2 className="font-serif text-lg text-gold">Add Organization / Recipient Link</h2>
        {error && <p className="text-sm text-red-300">{error}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="label-royal">Organization Name</label>
            <input name="organizationName" required className="input-royal" placeholder="Allen Family Investments, LLC" />
          </div>
          <div>
            <label className="label-royal">Contact Name</label>
            <input name="contactName" className="input-royal" placeholder="Mr. C. H. Braddy" />
          </div>
          <div>
            <label className="label-royal">Contact Email</label>
            <input name="contactEmail" type="email" className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Contact Phone</label>
            <input name="contactPhone" className="input-royal" />
          </div>
        </div>
        <div>
          <label className="label-royal">Notes</label>
          <input name="notes" className="input-royal" placeholder="Certified mail + email delivery" />
        </div>
        <button type="submit" disabled={creating} className="btn-gold disabled:opacity-50">
          {creating ? "Generating..." : "Generate Private Link + QR"}
        </button>
      </form>

      <h2 className="mb-4 font-serif text-xl text-gold">Recipient Links</h2>
      {detail.accesses.length === 0 ? (
        <p className="text-sm text-gray-400">No recipient links yet.</p>
      ) : (
        <div className="mb-10 space-y-3">
          {detail.accesses.map((a) => (
            <div key={a.id} className="card-royal">
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <p className="text-gold">{a.organization_name}</p>
                  <p className="text-sm text-gray-400">
                    {a.contact_name || "—"} {a.contact_email ? `· ${a.contact_email}` : ""}
                  </p>
                  <p className="mt-1 text-xs capitalize text-gray-500">
                    Status: {a.status.replace("_", " ")}
                    {a.last_opened_at ? ` · Opened ${new Date(a.last_opened_at).toLocaleString()}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => copyUrl(a.access_code)} className="text-sm text-gold hover:underline">
                    Copy Link
                  </button>
                  <a href={`/p/${a.access_code}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gold-light hover:underline">
                    Open Briefing
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-4 font-serif text-xl text-gold">Replies</h2>
      {detail.replies.length === 0 ? (
        <p className="mb-10 text-sm text-gray-400">No replies yet.</p>
      ) : (
        <div className="mb-10 space-y-3">
          {detail.replies.map((r, i) => (
            <div key={i} className="card-royal text-sm">
              <p className="text-gold">{r.full_name} · {r.email}</p>
              <p className="text-xs capitalize text-gray-500">{r.reply_type} · {new Date(r.created_at).toLocaleString()}</p>
              <p className="mt-2 text-gray-400">{r.message}</p>
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-4 font-serif text-xl text-gold">Recent Activity</h2>
      {detail.events.length === 0 ? (
        <p className="text-sm text-gray-400">No events yet.</p>
      ) : (
        <ul className="space-y-2 text-sm text-gray-400">
          {detail.events.slice(0, 20).map((e, i) => (
            <li key={i}>
              <span className="capitalize text-gold-light">{e.event_type.replace("_", " ")}</span>
              {" · "}
              {new Date(e.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
