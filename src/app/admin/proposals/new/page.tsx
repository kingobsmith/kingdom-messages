"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewProposalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to create");
        return;
      }
      router.push(`/admin/proposals/${data.id}`);
    } catch {
      setError("Failed to create proposal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title">New Private Proposal</h1>
        <Link href="/admin/proposals" className="text-sm text-gold hover:underline">All Proposals</Link>
      </div>

      <form onSubmit={handleSubmit} className="card-royal space-y-5">
        {error && <p className="text-sm text-red-300">{error}</p>}

        <div>
          <label className="label-royal">Proposal Title</label>
          <input name="title" required className="input-royal" placeholder="Legacy Leagues Partnership Briefing" />
        </div>

        <div>
          <label className="label-royal">Subtitle</label>
          <input name="subtitle" className="input-royal" placeholder="A private overview for..." />
        </div>

        <div>
          <label className="label-royal">Executive Summary</label>
          <textarea name="executiveSummary" rows={5} className="input-royal resize-y" />
        </div>

        <div>
          <label className="label-royal">Letter Body</label>
          <textarea name="letterBody" required rows={12} className="input-royal resize-y" />
        </div>

        <div>
          <label className="label-royal">PDF Attachment (optional)</label>
          <input name="pdf" type="file" accept=".pdf,application/pdf" className="input-royal file:mr-4 file:rounded file:border-0 file:bg-gold file:px-4 file:py-2 file:text-royal-black" />
        </div>

        <div>
          <label className="label-royal">Status</label>
          <select name="status" className="input-royal" defaultValue="active">
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
          {loading ? "Creating..." : "Create Proposal"}
        </button>
      </form>
    </div>
  );
}
