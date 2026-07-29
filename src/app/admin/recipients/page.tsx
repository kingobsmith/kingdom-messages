"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Recipient {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  organization: string | null;
  status: string;
  created_at: string;
}

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totpQr, setTotpQr] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  function loadRecipients() {
    fetch("/api/recipients")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setRecipients(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    loadRecipients();
  }, []);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("/api/recipients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        organization: formData.get("organization"),
        notes: formData.get("notes"),
        status: formData.get("status"),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to create recipient");
      return;
    }

    setTotpQr(data.totpQrCode);
    form.reset();
    setShowForm(false);
    loadRecipients();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title">Recipients</h1>
        <div className="flex gap-3">
          <Link href="/admin/messages" className="btn-outline-gold text-sm">
            Messages
          </Link>
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-gold text-sm">
            {showForm ? "Cancel" : "New Recipient"}
          </button>
        </div>
      </div>

      {totpQr && (
        <div className="card-royal mb-8">
          <h2 className="font-serif text-lg text-gold">Authenticator Setup QR</h2>
          <p className="mt-2 text-sm text-gray-400">
            Share this QR with the recipient to enroll in Google Authenticator before they unlock messages.
          </p>
          <img src={totpQr} alt="TOTP QR Code" className="mx-auto mt-4 rounded-lg border border-gold/30" />
          <button type="button" onClick={() => setTotpQr(null)} className="btn-outline-gold mt-4 text-sm">
            Dismiss
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleCreate} className="card-royal mb-8 space-y-4">
          {error && <p className="text-sm text-red-300">{error}</p>}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="label-royal">Full Name</label>
              <input name="fullName" required className="input-royal" />
            </div>
            <div>
              <label className="label-royal">Organization</label>
              <input name="organization" className="input-royal" />
            </div>
            <div>
              <label className="label-royal">Email</label>
              <input name="email" type="email" className="input-royal" />
            </div>
            <div>
              <label className="label-royal">Phone</label>
              <input name="phone" type="tel" className="input-royal" />
            </div>
            <div>
              <label className="label-royal">Status</label>
              <select name="status" className="input-royal" defaultValue="active">
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="revoked">Revoked</option>
              </select>
            </div>
            <div>
              <label className="label-royal">Notes</label>
              <input name="notes" className="input-royal" />
            </div>
          </div>
          <button type="submit" className="btn-gold">Create Recipient</button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-gold/20 text-left text-gold-light">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Contact</th>
                <th className="px-3 py-3">Organization</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recipients.map((r) => (
                <tr key={r.id} className="border-b border-gold/10">
                  <td className="px-3 py-4 text-gold">{r.full_name}</td>
                  <td className="px-3 py-4 text-gray-400">
                    {r.email || r.phone || "—"}
                  </td>
                  <td className="px-3 py-4 text-gray-400">{r.organization || "—"}</td>
                  <td className="px-3 py-4 capitalize text-gray-400">{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
