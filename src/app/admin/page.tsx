"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DashboardData {
  counts: {
    contacts: number;
    applications: number;
    recipients: number;
    messages: number;
    proposals: number;
    replies: number;
    chamber: number;
  };
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
    created_at: string;
  }>;
  replies: Array<{
    id: string;
    full_name: string;
    email: string;
    reply_type: string;
    organization: string | null;
    created_at: string;
  }>;
  recipients: Array<{
    id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    status: string;
    created_at: string;
  }>;
  logs: Array<{
    id: string;
    event_type: string;
    recipient_identifier: string;
    created_at: string;
  }>;
}

function when(dateStr: string) {
  return new Date(dateStr).toLocaleString();
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Could not load dashboard");
          return;
        }
        setData(json);
      })
      .catch(() => setError("Could not load dashboard"));
  }, []);

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-gray-400">Loading dashboard...</p>
      </div>
    );
  }

  const cards = [
    { label: "Contact requests", value: data.counts.contacts, href: "/admin/leads" },
    { label: "Applications", value: data.counts.applications, href: "/admin/leads" },
    { label: "Proposal replies", value: data.counts.replies, href: "/admin/leads" },
    { label: "Recipients", value: data.counts.recipients, href: "/admin/recipients" },
    { label: "Messages", value: data.counts.messages, href: "/admin/messages" },
    { label: "Proposals", value: data.counts.proposals, href: "/admin/proposals" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="section-title mb-2">Dashboard</h1>
      <p className="mb-8 text-sm text-gray-400">
        Customer requests, form submissions, and activity from the live site.
      </p>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="card-royal block">
            <p className="text-sm text-gray-400">{card.label}</p>
            <p className="mt-2 font-serif text-3xl text-gold">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-serif text-xl text-gold">Latest contact requests</h2>
            <Link href="/admin/leads" className="text-xs text-gold-light hover:underline">
              View all
            </Link>
          </div>
          {data.contacts.length === 0 ? (
            <p className="text-sm text-gray-500">No contact form submissions yet.</p>
          ) : (
            <div className="space-y-3">
              {data.contacts.map((row) => (
                <div key={row.id} className="card-royal text-sm">
                  <p className="text-gold">{row.full_name}</p>
                  <p className="text-gray-400">{row.email} · {row.phone}</p>
                  <p className="mt-1 text-gray-500">
                    {row.who_are_you} · {row.request_type}
                  </p>
                  <p className="mt-2 line-clamp-2 text-gray-400">{row.message_details}</p>
                  <p className="mt-2 text-xs text-gray-600">{when(row.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-3 font-serif text-xl text-gold">Proposal replies</h2>
          {data.replies.length === 0 ? (
            <p className="text-sm text-gray-500">No briefing replies yet.</p>
          ) : (
            <div className="space-y-3">
              {data.replies.map((row) => (
                <div key={row.id} className="card-royal text-sm">
                  <p className="text-gold">{row.full_name}</p>
                  <p className="text-gray-400">{row.email}</p>
                  <p className="capitalize text-gray-500">
                    {row.reply_type.replace("_", " ")} · {row.organization || "—"}
                  </p>
                  <p className="mt-2 text-xs text-gray-600">{when(row.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="mt-10">
        <h2 className="mb-3 font-serif text-xl text-gold">Message unlock activity</h2>
        {data.logs.length === 0 ? (
          <p className="text-sm text-gray-500">No unlock or view logs yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-gold/20 text-gold-light">
                  <th className="px-2 py-2">Event</th>
                  <th className="px-2 py-2">Identifier</th>
                  <th className="px-2 py-2">When</th>
                </tr>
              </thead>
              <tbody>
                {data.logs.map((log) => (
                  <tr key={log.id} className="border-b border-gold/10 text-gray-400">
                    <td className="px-2 py-2 capitalize">{log.event_type.replace("_", " ")}</td>
                    <td className="px-2 py-2">{log.recipient_identifier}</td>
                    <td className="px-2 py-2">{when(log.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
