import Link from "next/link";

const howItWorks = [
  { step: "1", title: "Create message", desc: "BJ crafts a private royal message with curated music." },
  { step: "2", title: "Send QR/link", desc: "A unique link and QR code are delivered to the recipient." },
  { step: "3", title: "Recipient unlocks with code", desc: "Google Authenticator-style code access keeps it secure." },
  { step: "4", title: "Music plays while they read", desc: "The attached track plays as they receive the message." },
];

const audience = [
  "pastors",
  "churches",
  "ministries",
  "athletes",
  "artists",
  "politicians",
  "public speakers",
];

const chamberPreview = [
  { title: "Churches & Ministries", href: "/kingdom-chamber/churches", desc: "Approved churches and ministries in the Kingdom network." },
  { title: "Speaker Bureaus", href: "/kingdom-chamber/speakers", desc: "Curated speakers available for events and engagements." },
  { title: "Gods Chosen", href: "/kingdom-chamber/gods-chosen", desc: "Invited pastors, leaders, and public figures." },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-gold/20 bg-gradient-to-b from-royal-dark to-royal-black px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">Kingdom Messages</p>
          <h1 className="font-serif text-4xl font-bold text-gold md:text-6xl">
            Kingdom Messages
          </h1>
          <p className="mt-4 text-lg text-gray-300 md:text-xl">
            Private, royal communication for pastors, players, stars, and leaders
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-gray-400">
            Secure message delivery through unique links and QR codes, Google Authenticator-style
            code access, curated music attached to each message, and the Kingdom Chamber for
            approved members.
          </p>
          <p className="mt-8 font-serif text-2xl italic text-gold-light md:text-3xl">
            Private communication with a royal touch.
          </p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-10 text-center">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((item) => (
              <div key={item.step} className="card-royal text-center">
                <span className="font-serif text-3xl text-gold">{item.step}</span>
                <h3 className="mt-3 font-serif text-lg text-gold-light">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold/10 bg-royal-dark px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-10 text-center">Who it&apos;s for</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {audience.map((item) => (
              <span
                key={item}
                className="rounded-full border border-gold/30 px-5 py-2 text-sm capitalize text-gold-light"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-10 text-center">Kingdom Chamber preview</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {chamberPreview.map((item) => (
              <Link key={item.href} href={item.href} className="card-royal block">
                <h3 className="font-serif text-xl text-gold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
                <span className="mt-4 inline-block text-sm text-gold-light">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gold/20 bg-royal-dark px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title mb-4">Request your invitation</h2>
          <p className="mb-8 text-gray-400">
            Join the Kingdom Chamber network or receive private Kingdom Messages.
          </p>
          <Link href="/apply" className="btn-gold">
            Apply / Request Invitation
          </Link>
        </div>
      </section>
    </div>
  );
}
