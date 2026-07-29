"use client";

import { useState } from "react";
import Link from "next/link";
import { TRACKS } from "@/lib/tracks";

interface CreatedMessage {
  id: string;
  unlockCode: string;
  messageUrl: string;
  qrCode: string;
}

export default function NewMessagePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState<CreatedMessage | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    let attachmentUrl: string | undefined;

    const file = formData.get("attachment") as File | null;
    if (file && file.size > 0) {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: uploadData });
      if (uploadRes.ok) {
        const uploadJson = await uploadRes.json();
        attachmentUrl = uploadJson.url;
      }
    }

    const payload = {
      recipientName: formData.get("recipientName") as string,
      recipientContact: formData.get("recipientContact") as string,
      title: formData.get("title") as string,
      body: formData.get("body") as string,
      trackId: formData.get("trackId") as string,
      expirationDate: formData.get("expirationDate") as string,
      attachmentUrl,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create message");
        return;
      }

      setCreated({
        id: data.message.id,
        unlockCode: data.message.unlockCode,
        messageUrl: data.messageUrl,
        qrCode: data.qrCode,
      });
      form.reset();
    } catch {
      setError("Failed to create message");
    } finally {
      setLoading(false);
    }
  }

  if (created) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="section-title mb-6">Message Created</h1>
        <div className="card-royal space-y-4">
          <p className="text-gray-300">
            Share this link and QR code with the recipient. They will need their email or phone
            and the unlock code below.
          </p>
          <div>
            <p className="label-royal">Message URL</p>
            <a href={created.messageUrl} className="break-all text-gold hover:underline">
              {created.messageUrl}
            </a>
          </div>
          <div>
            <p className="label-royal">Unlock Code (share securely)</p>
            <p className="font-mono text-2xl tracking-widest text-gold">{created.unlockCode}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <p className="label-royal">QR Code</p>
            <img src={created.qrCode} alt="Message QR Code" className="rounded-lg border border-gold/30" />
          </div>
          <div className="flex gap-4 pt-4">
            <button onClick={() => setCreated(null)} className="btn-outline-gold">
              Create Another
            </button>
            <Link href="/admin/messages" className="btn-gold">
              View All Messages
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title">Create Secure Message</h1>
        <Link href="/admin/messages" className="text-sm text-gold hover:underline">
          All Messages
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card-royal space-y-5">
        {error && <p className="rounded bg-red-900/30 px-4 py-2 text-sm text-red-300">{error}</p>}

        <div>
          <label htmlFor="recipientName" className="label-royal">Recipient Name</label>
          <input id="recipientName" name="recipientName" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="recipientContact" className="label-royal">Recipient Email or Phone</label>
          <input id="recipientContact" name="recipientContact" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="title" className="label-royal">Message Title</label>
          <input id="title" name="title" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="body" className="label-royal">Message Body</label>
          <textarea id="body" name="body" required rows={6} className="input-royal resize-y" />
        </div>

        <div>
          <label htmlFor="trackId" className="label-royal">Track</label>
          <select id="trackId" name="trackId" required className="input-royal">
            <option value="">Select a track</option>
            {TRACKS.map((track) => (
              <option key={track.id} value={track.id}>
                {track.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expirationDate" className="label-royal">Expiration Date</label>
          <input id="expirationDate" name="expirationDate" type="date" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="attachment" className="label-royal">Optional File Upload</label>
          <input id="attachment" name="attachment" type="file" className="input-royal file:mr-4 file:rounded file:border-0 file:bg-gold file:px-4 file:py-2 file:text-royal-black" />
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
          {loading ? "Creating..." : "Create Message"}
        </button>
      </form>
    </div>
  );
}
