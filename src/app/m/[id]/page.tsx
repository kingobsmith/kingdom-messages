"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UnlockPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [contact, setContact] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/messages/${id}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unlock failed");
        return;
      }

      router.push(`/m/${id}/view`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl text-gold">Kingdom Messages</h1>
          <p className="mt-4 text-gray-400">
            You have received a private Kingdom Message.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-royal space-y-5">
          {error && (
            <p className="rounded bg-red-900/30 px-4 py-2 text-sm text-red-300">{error}</p>
          )}

          <div>
            <label htmlFor="contact" className="label-royal">Email or Phone</label>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              className="input-royal"
              placeholder="Enter your email or phone"
            />
          </div>

          <div>
            <label htmlFor="code" className="label-royal">6-Digit Code</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              maxLength={6}
              pattern="[0-9]{6}"
              className="input-royal font-mono text-center text-xl tracking-[0.5em]"
              placeholder="000000"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
            {loading ? "Unlocking..." : "Unlock"}
          </button>
        </form>
      </div>
    </div>
  );
}
