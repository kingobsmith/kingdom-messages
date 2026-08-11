"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface BriefingData {
  access: {
    id: string;
    organization_name: string;
    contact_name: string | null;
    status: string;
  };
  proposal: {
    id: string;
    title: string;
    subtitle: string | null;
    letter_body: string;
    executive_summary: string | null;
    pdf_url: string | null;
  };
}

export default function PrivateBriefingPage() {
  const params = useParams();
  const code = params.code as string;

  const [data, setData] = useState<BriefingData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState<"conversation" | "forward" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetch(`/api/p/${code}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Briefing not found");
          return;
        }
        setData(json);
        fetch(`/api/p/${code}/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ eventType: "viewed" }),
        });
      })
      .catch(() => setError("Failed to load briefing"))
      .finally(() => setLoading(false));
  }, [code]);

  async function handleReply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!showForm) return;
    setFormLoading(true);
    setFormError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`/api/p/${code}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          replyType: showForm,
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          organization: formData.get("organization"),
          message: formData.get("message"),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFormError(json.error || "Failed to submit");
        return;
      }
      setSubmitted(true);
      setShowForm(null);
    } catch {
      setFormError("Something went wrong");
    } finally {
      setFormLoading(false);
    }
  }

  function handleForwardClick() {
    fetch(`/api/p/${code}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventType: "forward_clicked" }),
    });
    setShowForm("forward");
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-gray-400">Loading private briefing...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="section-title mb-4">Access Unavailable</h1>
        <p className="text-gray-400">{error || "This private briefing could not be found."}</p>
        <p className="mt-4 text-sm text-gray-500">This page is private and not listed publicly.</p>
      </div>
    );
  }

  const { proposal, access } = data;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 pb-24 md:pb-12">
      <p className="mb-2 text-center text-xs uppercase tracking-[0.25em] text-gold">Private Briefing</p>
      <h1 className="text-center font-serif text-3xl text-gold md:text-4xl">{proposal.title}</h1>
      {proposal.subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">{proposal.subtitle}</p>
      )}
      <p className="mt-4 text-center text-sm text-gold-light">
        Prepared for: {access.organization_name}
        {access.contact_name ? ` · ${access.contact_name}` : ""}
      </p>
      <p className="mt-2 text-center text-xs text-gray-500">
        Private link — do not share on social media or public channels.
      </p>

      {proposal.executive_summary && (
        <section className="card-royal mt-10">
          <h2 className="font-serif text-xl text-gold">Executive Summary</h2>
          <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
            {proposal.executive_summary}
          </div>
        </section>
      )}

      <section className="card-royal mt-6">
        <h2 className="font-serif text-xl text-gold">Letter</h2>
        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
          {proposal.letter_body}
        </div>
      </section>

      {proposal.pdf_url && (
        <div className="mt-6 text-center">
          <a
            href={proposal.pdf_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              fetch(`/api/p/${code}/track`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventType: "pdf_downloaded" }),
              })
            }
            className="btn-outline-gold inline-block text-sm"
          >
            Download PDF Attachment
          </a>
        </div>
      )}

      <div className="mt-8 rounded-lg border border-gold/20 bg-royal-dark p-4 text-sm text-gray-400">
        Associations and agents are welcome to forward these materials to appropriate players,
        former players, clients, or colleagues when relevant. Please keep the briefing private and
        do not post it publicly.
      </div>

      {submitted ? (
        <div className="card-royal mt-8 text-center">
          <h2 className="font-serif text-xl text-gold">Thank You</h2>
          <p className="mt-2 text-gray-400">Your response has been received. We will follow up shortly.</p>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button type="button" onClick={() => setShowForm("conversation")} className="btn-gold">
            Request a Conversation
          </button>
          <button type="button" onClick={handleForwardClick} className="btn-outline-gold">
            Forward to a Player / Client
          </button>
        </div>
      )}

      {showForm && (
        <form onSubmit={handleReply} className="card-royal mt-8 space-y-4">
          <h3 className="font-serif text-lg text-gold">
            {showForm === "conversation" ? "Request a Conversation" : "Forward / Reply"}
          </h3>
          {formError && <p className="text-sm text-red-300">{formError}</p>}
          <div>
            <label className="label-royal">Full Name</label>
            <input name="fullName" required className="input-royal" defaultValue={access.contact_name || ""} />
          </div>
          <div>
            <label className="label-royal">Email</label>
            <input name="email" type="email" required className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Phone</label>
            <input name="phone" type="tel" className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Organization</label>
            <input name="organization" className="input-royal" defaultValue={access.organization_name} />
          </div>
          <div>
            <label className="label-royal">
              {showForm === "conversation" ? "Message / Meeting preference" : "Who should receive this / your note"}
            </label>
            <textarea name="message" required rows={4} className="input-royal resize-y" />
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={formLoading} className="btn-gold disabled:opacity-50">
              {formLoading ? "Sending..." : "Submit"}
            </button>
            <button type="button" onClick={() => setShowForm(null)} className="btn-outline-gold">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-12 flex flex-wrap justify-center gap-4 border-t border-gold/20 pt-8 text-sm">
        <Link href="/bio" className="text-gray-400 hover:text-gold">Bio</Link>
        <Link href="/contact" className="text-gray-400 hover:text-gold">Contact</Link>
      </div>
    </div>
  );
}
