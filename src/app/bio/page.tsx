import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bio | Kingdom Messages",
  description: "Learn about BJ, founder of Kingdom Messages, and the vision behind private royal communication.",
};

export default function BioPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full border-2 border-gold/40 bg-royal-card">
          <span className="font-serif text-5xl text-gold">BJ</span>
        </div>
        <div>
          <h1 className="section-title">BJ</h1>
          <p className="mt-2 text-gold-light">Founder, Kingdom Messages</p>
          <p className="mt-4 text-gray-400">
            A visionary leader delivering private, royal communication to pastors, players, stars,
            politicians, and public leaders through secure technology and curated music.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Who BJ Is</h2>
          <p className="mt-3 text-gray-400">
            BJ is a visionary leader dedicated to delivering private, royal communication to
            pastors, players, stars, and leaders around the world. Through Kingdom Messages, BJ
            combines secure technology with curated music and intentional ministry to reach those
            who carry influence in culture and the church.
          </p>
        </section>

        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">What Kingdom Messages Is</h2>
          <p className="mt-3 text-gray-400">
            Kingdom Messages is a secure platform for delivering private royal communications
            through unique links, QR codes, and authenticator-style access. Each message can
            include curated music, optional attachments, and a premium reading experience designed
            for leaders who deserve dignified, protected correspondence.
          </p>
        </section>

        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Why This Platform Exists</h2>
          <p className="mt-3 text-gray-400">
            To create a trusted platform where Kingdom leaders receive messages with dignity,
            security, and spiritual impact — connecting heaven&apos;s voice to earth&apos;s influencers
            through technology that honors the sacred nature of private communication.
          </p>
        </section>

        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Who It Serves</h2>
          <p className="mt-3 text-gray-400">
            Churches, ministries, speaker bureaus, pastors, athletes, artists, politicians, and
            public figures who need a secure, royal way to send and receive meaningful messages.
          </p>
        </section>

        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Mission</h2>
          <p className="mt-3 text-gray-400">
            Kingdom Messages exists to deliver secure, music-enriched royal communications while
            building the Kingdom Chamber — a curated network of approved churches, ministries,
            speakers, and public leaders united in purpose and never exceeding $100/month in dues.
          </p>
        </section>

        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Vision</h2>
          <p className="mt-3 text-gray-400">
            To become the trusted standard for private Kingdom communication — where every message
            is delivered with security, elegance, and spiritual intention.
          </p>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link href="/books" className="btn-outline-gold">View Books</Link>
          <Link href="/kingdom-chamber" className="btn-gold">Enter Kingdom Chamber</Link>
          <Link href="/contact" className="btn-outline-gold">Request a Message</Link>
        </div>
      </div>
    </div>
  );
}
