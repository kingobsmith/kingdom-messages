"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ChamberMember } from "@/lib/types";

const categories = ["church", "ministry", "speaker", "gods_chosen", "business"];

export default function ChamberMembersAdminPage() {
  const [members, setMembers] = useState<ChamberMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  function load() {
    fetch("/api/chamber-members")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const topicsRaw = (formData.get("topics") as string) || "";

    await fetch("/api/chamber-members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        category: formData.get("category"),
        displayName: formData.get("displayName"),
        subtitle: formData.get("subtitle"),
        location: formData.get("location"),
        bio: formData.get("bio"),
        topics: topicsRaw ? topicsRaw.split(",").map((t) => t.trim()) : null,
        mediaText: formData.get("mediaText"),
        duesText: formData.get("duesText"),
        officialLink: formData.get("officialLink") || null,
        approved: formData.get("approved") === "on",
        featuredOrder: Number(formData.get("featuredOrder")) || null,
      }),
    });

    form.reset();
    setShowForm(false);
    load();
  }

  async function toggleApproved(id: string, approved: boolean) {
    const member = members.find((m) => m.id === id);
    if (!member) return;

    await fetch("/api/chamber-members", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        category: member.category,
        displayName: member.display_name,
        subtitle: member.subtitle,
        location: member.location,
        bio: member.bio,
        topics: member.topics,
        mediaText: member.media_text,
        duesText: member.dues_text,
        officialLink: member.official_link,
        approved: !approved,
        featuredOrder: member.featured_order,
      }),
    });
    load();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="section-title">Chamber Members</h1>
        <div className="flex gap-3">
          <Link href="/admin/messages" className="btn-outline-gold text-sm">Messages</Link>
          <button type="button" onClick={() => setShowForm(!showForm)} className="btn-gold text-sm">
            {showForm ? "Cancel" : "Add Member"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="card-royal mb-8 grid gap-4 md:grid-cols-2">
          <div>
            <label className="label-royal">Category</label>
            <select name="category" required className="input-royal">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label-royal">Display Name</label>
            <input name="displayName" required className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Subtitle / Leader</label>
            <input name="subtitle" className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Location</label>
            <input name="location" className="input-royal" />
          </div>
          <div className="md:col-span-2">
            <label className="label-royal">Bio</label>
            <textarea name="bio" rows={3} className="input-royal resize-y" />
          </div>
          <div>
            <label className="label-royal">Topics (comma separated)</label>
            <input name="topics" className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Media Text</label>
            <input name="mediaText" className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Dues Text</label>
            <input name="duesText" className="input-royal" />
          </div>
          <div>
            <label className="label-royal">Featured Order</label>
            <input name="featuredOrder" type="number" className="input-royal" />
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" name="approved" id="approved" className="h-4 w-4" />
            <label htmlFor="approved" className="text-sm text-gray-300">Approved</label>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="btn-gold">Save Member</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="space-y-4">
          {members.map((m) => (
            <div key={m.id} className="card-royal flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-gold">{m.display_name}</p>
                <p className="text-sm text-gray-400">{m.category} · {m.subtitle || m.location || "—"}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleApproved(m.id, m.approved)}
                className={m.approved ? "btn-outline-gold text-sm" : "btn-gold text-sm"}
              >
                {m.approved ? "Approved" : "Approve"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
