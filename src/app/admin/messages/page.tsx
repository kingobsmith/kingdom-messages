"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface MessageRow {
  id: string;
  title: string;
  body: string;
  message_slug: string;
  status: string;
  expires_at: string | null;
  created_at: string;
  track: { id: string; title: string } | null;
  recipient: { id: string; full_name: string; email: string | null; phone: string | null } | null;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getDisplayStatus(msg: MessageRow) {
  if (msg.status === "revoked") return "Revoked";
  if (msg.expires_at && new Date(msg.expires_at) < new Date()) return "Expired";
  return msg.status === "sent" ? "Active" : msg.status;
}

export default function MessagesListPage() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [viewMessage, setViewMessage] = useState<MessageRow | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function copyLink(slug: string) {
    const url = `${window.location.origin}/m/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="section-title">Messages</h1>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : messages.length === 0 ? (
        <div className="card-royal text-center">
          <p className="text-gray-400">No messages created yet.</p>
          <Link href="/admin/messages/new" className="btn-gold mt-4 inline-block">Create First Message</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gold/20 text-left text-gold-light">
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3">Recipient</th>
                <th className="px-3 py-3">Track</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3">Created</th>
                <th className="px-3 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => {
                const recipient = Array.isArray(msg.recipient) ? msg.recipient[0] : msg.recipient;
                const track = Array.isArray(msg.track) ? msg.track[0] : msg.track;
                return (
                  <tr key={msg.id} className="border-b border-gold/10">
                    <td className="px-3 py-4 text-gold">{msg.title}</td>
                    <td className="px-3 py-4 text-gray-400">{recipient?.full_name || "—"}</td>
                    <td className="px-3 py-4 text-gray-400">{track?.title || "—"}</td>
                    <td className="px-3 py-4 capitalize text-gray-400">{getDisplayStatus(msg)}</td>
                    <td className="px-3 py-4 text-gray-400">{formatDate(msg.created_at)}</td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button type="button" onClick={() => setViewMessage(msg)} className="text-gold hover:underline">
                          View
                        </button>
                        <button type="button" onClick={() => copyLink(msg.message_slug)} className="text-gold-light hover:underline">
                          {copiedSlug === msg.message_slug ? "Copied!" : "Copy Link"}
                        </button>
                        <Link href={`/m/${msg.message_slug}`} className="text-gold-light hover:underline">
                          Open Unlock Page
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {viewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="card-royal max-h-[80vh] w-full max-w-lg overflow-y-auto">
            <div className="flex items-start justify-between">
              <h2 className="font-serif text-xl text-gold">{viewMessage.title}</h2>
              <button type="button" onClick={() => setViewMessage(null)} className="text-gray-400 hover:text-gold">✕</button>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Recipient: {(() => {
                const r = Array.isArray(viewMessage.recipient) ? viewMessage.recipient[0] : viewMessage.recipient;
                return r?.full_name || "—";
              })()}
            </p>
            <div className="mt-4 whitespace-pre-wrap text-sm text-gray-300">{viewMessage.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}
