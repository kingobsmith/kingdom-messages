"use client";

import { useState } from "react";
import Link from "next/link";

const whoOptions = [
  "Pastor",
  "Athlete",
  "Public Figure",
  "Business Leader",
  "Other",
];

const requestTypes = [
  "Private Kingdom Message",
  "Speaking / Booking Request",
  "Kingdom Chamber Application",
  "Consultation",
  "General Inquiry",
];

export default function ContactForm() {
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
      whoAreYou: formData.get("whoAreYou") as string,
      requestType: formData.get("requestType") as string,
      budget: formData.get("budget") as string,
      messageDetails: formData.get("messageDetails") as string,
    };

    try {
      const res = await fetch("/api/contact", {
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
        <p className="text-gray-400">
          Your request has been received. We will review your message and be in touch soon.
        </p>
        <Link href="/" className="btn-outline-gold mt-8 inline-block">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 pb-24 md:pb-12">
      <h1 className="section-title mb-4">Request a Message</h1>
      <p className="mb-8 text-gray-400">
        Submit a booking or private message request. All inquiries are reviewed personally.
      </p>

      <form onSubmit={handleSubmit} className="card-royal space-y-5">
        {error && (
          <p className="rounded bg-red-900/30 px-4 py-2 text-sm text-red-300">{error}</p>
        )}

        <div>
          <label htmlFor="fullName" className="label-royal">Name</label>
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
          <label htmlFor="whoAreYou" className="label-royal">Who are you?</label>
          <select id="whoAreYou" name="whoAreYou" required className="input-royal">
            <option value="">Select one</option>
            {whoOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="requestType" className="label-royal">Type of request</label>
          <select id="requestType" name="requestType" required className="input-royal">
            <option value="">Select type</option>
            {requestTypes.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="label-royal">Budget or honorarium</label>
          <input
            id="budget"
            name="budget"
            placeholder="Optional"
            className="input-royal"
          />
        </div>

        <div>
          <label htmlFor="messageDetails" className="label-royal">Message details</label>
          <textarea
            id="messageDetails"
            name="messageDetails"
            required
            rows={5}
            placeholder="Tell us about your request, audience, timeline, or message purpose."
            className="input-royal resize-y"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
