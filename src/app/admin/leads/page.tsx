"use client";

import { useEffect, useState } from "react";

interface LeadsData {
  contacts: Array<{
    id: string;
    full_name: string;
    email: string;
    phone: string;
    who_are_you: string;
    request_type: string;
    budget?: string | null;
    budget_honorarium?: string | null;
    message_details: string;
    created_at: string;
  }>;
  applications: Array<{
    id: string;
    full_name: string;
    email: string;
    phone: string;
    organization_name: string | null;
    category: string;
    short_statement: string;
    kingdom_chamber?: boolean;
    private_messages?: boolean;
    created_at: string;
  }>;
  replies: Array<{
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    organization: string | null;
    reply_type: string;
    message: string;
    created_at: string;
  }>;
}

function when(dateStr: string) {
  return new Date(dateStr).toLocaleString();
}

export default function AdminLeadsPage() {
  const [data, setData] = useState<LeadsData | null>(null);
  const [tab, setTab] = useState<"contacts" | "applications" | "replies">("contacts");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/leads")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Could not load leads");
          return;
        }
        setData(json);
      })
      .catch(() => setError("Could not load leads"));
  }, []);

  if (error) {
    return <div className="mx-auto max-w-6xl px-4 py-12 text-red-300">{error}</div>;
  }

  if (!data) {
    return <div className="mx-auto max-w-6xl px-4 py-12 text-gray-400">Loading leads...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="section-title mb-2">Leads</h1>
      <p className="mb-6 text-sm text-gray-400">
        Everyone who submitted a form on the public site or replied to a private briefing.
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("contacts")}
          className={tab === "contacts" ? "btn-gold text-sm" : "btn-outline-gold text-sm"}
        >
          Contact ({data.contacts.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("applications")}
          className={tab === "applications" ? "btn-gold text-sm" : "btn-outline-gold text-sm"}
        >
          Applications ({data.applications.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("replies")}
          className={tab === "replies" ? "btn-gold text-sm" : "btn-outline-gold text-sm"}
        >
          Briefing replies ({data.replies.length})
        </button>
      </div>

      {tab === "contacts" && (
        <div className="space-y-4">
          {data.contacts.length === 0 && <p className="text-gray-500">No contact submissions yet.</p>}
          {data.contacts.map((row) => (
            <div key={row.id} className="card-royal">
              <p className="font-serif text-lg text-gold">{row.full_name}</p>
              <p className="text-sm text-gray-400">{row.email} · {row.phone}</p>
              <p className="mt-1 text-sm text-gold-light">
                {row.who_are_you} · {row.request_type}
              </p>
              {(row.budget || row.budget_honorarium) && (
                <p className="mt-1 text-sm text-gray-500">
                  Budget: {row.budget || row.budget_honorarium}
                </p>
              )}
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-300">{row.message_details}</p>
              <p className="mt-3 text-xs text-gray-600">{when(row.created_at)}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "applications" && (
        <div className="space-y-4">
          {data.applications.length === 0 && <p className="text-gray-500">No applications yet.</p>}
          {data.applications.map((row) => (
            <div key={row.id} className="card-royal">
              <p className="font-serif text-lg text-gold">{row.full_name}</p>
              <p className="text-sm text-gray-400">{row.email} · {row.phone}</p>
              <p className="mt-1 text-sm text-gold-light">
                {row.category} {row.organization_name ? `· ${row.organization_name}` : ""}
              </p>
              <p className="mt-3 text-sm text-gray-300">{row.short_statement}</p>
              <p className="mt-3 text-xs text-gray-600">{when(row.created_at)}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "replies" && (
        <div className="space-y-4">
          {data.replies.length === 0 && <p className="text-gray-500">No briefing replies yet.</p>}
          {data.replies.map((row) => (
            <div key={row.id} className="card-royal">
              <p className="font-serif text-lg text-gold">{row.full_name}</p>
              <p className="text-sm text-gray-400">
                {row.email} {row.phone ? `· ${row.phone}` : ""}
              </p>
              <p className="mt-1 text-sm capitalize text-gold-light">
                {row.reply_type.replace("_", " ")} · {row.organization || "—"}
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm text-gray-300">{row.message}</p>
              <p className="mt-3 text-xs text-gray-600">{when(row.created_at)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
