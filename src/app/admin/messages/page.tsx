"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TRACKS } from "@/lib/tracks";

interface MessageListItem {
  id: string;
  recipientName: string;
  recipientContact: string;
  title: string;
  body: string;
  trackId: string;
  expirationDate: string;
  createdAt: string;
}

function getStatus(expirationDate: string): string {
  return new Date(expirationDate) < new Date() ? "Expired" : "Active";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function MessagesListPage() {
  const [messages, setMessages] = useState<MessageListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMessage, setViewMessage] = useState<MessageListItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function copyLink(id: string) {
    const url = `${window.location.origin}/m/${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title">Messages</h1>
        <Link href="/admin/messages/new" className="btn-gold">
          New Message
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : messages.length === 0 ? (
        <div className="card-royal text-center">
          <p className="text-gray-400">No messages created yet.</p>
          <Link href="/admin/messages/new" className="btn-gold mt-4 inline-block">
            Create First Message
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-gold/20 text-left text-sm text-gold-light">
                <th className="px-3 py-3 font-medium">Title</th>
                <th className="px-3 py-3 font-medium">Recipient</th>
                <th className="px-3 py-3 font-medium">Track</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Created</th>
                <th className="px-3 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => {
                const track = TRACKS.find((t) => t.id === msg.trackId);
                const status = getStatus(msg.expirationDate);
                return (
                  <tr key={msg.id} className="border-b border-gold/10 text-sm">
                    <td className="px-3 py-4 text-gold">{msg.title}</td>
                    <td className="px-3 py-4 text-gray-400">
                      {msg.recipientName}
                      <br />
                      <span className="text-xs text-gray-500">{msg.recipientContact}</span>
                    </td>
                    <td className="px-3 py-4 text-gray-400">{track?.name || msg.trackId}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          status === "Active"
                            ? "bg-green-900/30 text-green-300"
                            : "bg-red-900/30 text-red-300"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-gray-400">{formatDate(msg.createdAt)}</td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setViewMessage(msg)}
                          className="text-gold hover:underline"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => copyLink(msg.id)}
                          className="text-gold-light hover:underline"
                        >
                          {copiedId === msg.id ? "Copied!" : "Copy Link"}
                        </button>
                        <Link href={`/m/${msg.id}`} className="text-gold-light hover:underline">
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
              <button
                type="button"
                onClick={() => setViewMessage(null)}
                className="text-gray-400 hover:text-gold"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              To: {viewMessage.recipientName} ({viewMessage.recipientContact})
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Track: {TRACKS.find((t) => t.id === viewMessage.trackId)?.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">Expires: {viewMessage.expirationDate}</p>
            <div className="mt-4 whitespace-pre-wrap text-sm text-gray-300">{viewMessage.body}</div>
          </div>
        </div>
      )}
    </div>
  );
}
