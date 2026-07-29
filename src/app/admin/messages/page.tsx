"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TRACKS } from "@/lib/tracks";

interface MessageListItem {
  id: string;
  recipientName: string;
  recipientContact: string;
  title: string;
  trackId: string;
  expirationDate: string;
  createdAt: string;
}

export default function MessagesListPage() {
  const [messages, setMessages] = useState<MessageListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
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
        <div className="space-y-4">
          {messages.map((msg) => {
            const track = TRACKS.find((t) => t.id === msg.trackId);
            return (
              <div key={msg.id} className="card-royal">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="font-serif text-xl text-gold">{msg.title}</h2>
                    <p className="mt-1 text-sm text-gray-400">
                      To: {msg.recipientName} ({msg.recipientContact})
                    </p>
                    <p className="text-sm text-gray-500">
                      Track: {track?.name || msg.trackId} · Expires: {msg.expirationDate}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/m/${msg.id}`} className="btn-outline-gold text-sm">
                      Unlock Page
                    </Link>
                    <a
                      href={`/m/${msg.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gold-light hover:underline"
                    >
                      Copy Link
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
