"use client";

import { useState } from "react";

const categories = [
  "Church / Ministry",
  "Speaker Bureau",
  "Public Figure",
  "Business",
];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      organization: formData.get("organization") as string,
      category: formData.get("category") as string,
      statement: formData.get("statement") as string,
      kingdomChamber: formData.get("kingdomChamber") === "on",
      privateMessages: formData.get("privateMessages") === "on",
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Submission failed");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="section-title mb-4">Thank You</h1>
        <p className="text-gray-400">Your request has been received.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="section-title mb-4">Apply / Request Invitation</h1>
      <p className="mb-8 text-gray-400">
        Request membership in the Kingdom Chamber or apply to receive private Kingdom Messages.
      </p>

      <form onSubmit={handleSubmit} className="card-royal space-y-5">
        {error && (
          <p className="rounded bg-red-900/30 px-4 py-2 text-sm text-red-300">{error}</p>
        )}

        <div>
          <label htmlFor="fullName" className="label-royal">Full Name</label>
          <input id="fullName" name="fullName" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="email" className="label-royal">Email</label>
          <input id="email" name="email" type="email" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="phone" className="label-royal">Phone</label>
          <input id="phone" name="phone" type="tel" required className="input-royal" />
        </div>

        <div>
          <label htmlFor="organization" className="label-royal">Organization Name</label>
          <input id="organization" name="organization" className="input-royal" />
        </div>

        <div>
          <label htmlFor="category" className="label-royal">Category</label>
          <select id="category" name="category" required className="input-royal">
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="statement" className="label-royal">Short Statement</label>
          <textarea id="statement" name="statement" required rows={4} className="input-royal resize-y" />
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="kingdomChamber"
              className="h-4 w-4 rounded border-gold/30 bg-royal-dark text-gold"
            />
            Applying for Kingdom Chamber
          </label>
          <label className="flex items-center gap-3 text-sm text-gray-300">
            <input
              type="checkbox"
              name="privateMessages"
              className="h-4 w-4 rounded border-gold/30 bg-royal-dark text-gold"
            />
            Requesting private Kingdom Messages
          </label>
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
