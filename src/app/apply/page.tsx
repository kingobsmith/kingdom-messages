"use client";

import { useState } from "react";

const categories = [
  "church/ministry",
  "speaker bureau",
  "public figure",
  "business",
];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 500);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="section-title mb-4">Application Received</h1>
        <p className="text-gray-400">
          Thank you for your interest in Kingdom Messages and the Kingdom Chamber. We will review
          your application and be in touch.
        </p>
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

        <button type="submit" disabled={loading} className="btn-gold w-full disabled:opacity-50">
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
