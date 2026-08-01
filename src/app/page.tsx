import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kingdom Messages | Private Royal Communication",
  description:
    "Private, royal communication for pastors, players, stars, and leaders. Secure messages, booking requests, and the Kingdom Chamber.",
};

const howItWorks = [
  { step: "1", title: "Request or receive invitation", desc: "Leaders submit a request or receive a private invitation from BJ." },
  { step: "2", title: "Secure link or QR delivered", desc: "A unique link and QR code are sent only to the intended recipient." },
  { step: "3", title: "Unlock with authenticator code", desc: "Google Authenticator-style access keeps every message protected." },
  { step: "4", title: "Music plays while they read", desc: "A curated track accompanies the royal message experience." },
];

const whoCards = [
  { title: "Pastors & Churches", desc: "Private royal correspondence for ministry leaders and congregations." },
  { title: "Athletes & Artists", desc: "Secure messages for players, performers, and culture-shapers." },
  { title: "Public Figures", desc: "Dignified communication for politicians, speakers, and leaders." },
  { title: "Business Leaders", desc: "Executive-level messaging with discretion and intention." },
];

const books = [
  { title: "The Royal Message", desc: "Private Kingdom communication for leaders in every sphere." },
  { title: "Kingdom Chamber", desc: "Building approved networks of churches, ministries, and leaders." },
  { title: "Letters to the Industry", desc: "Prophetic words for decision-makers and culture-shapers." },
];

const chamberSections = [
  { title: "Churches & Ministries", href: "/kingdom-chamber/churches", desc: "Approved churches and ministries in the Kingdom network." },
  { title: "Speaker Bureaus", href: "/kingdom-chamber/speakers", desc: "Curated speakers for conferences, churches, and events." },
  { title: "Gods Chosen", href: "/kingdom-chamber/gods-chosen", desc: "Celebrities, politicians, pastors, and public figures — dues never exceed $100/month." },
];

const testimonials = [
  { quote: "The most dignified way I have ever received a private message. Royal, secure, and unforgettable.", name: "Ministry Leader", role: "Pastor" },
  { quote: "Kingdom Messages feels built for people who carry real influence. The music and presentation are unmatched.", name: "Public Speaker", role: "Conference Speaker" },
  { quote: "Finally — private communication that respects who you are and protects what you receive.", name: "Business Executive", role: "CEO" },
];

const faqs = [
  { q: "Who can request a Kingdom Message?", a: "Pastors, athletes, public figures, business leaders, and invited leaders may submit a request through our contact form." },
  { q: "How secure is the message delivery?", a: "Each message uses a unique link, QR code, and Google Authenticator-style unlock code. Only the intended recipient can access it." },
  { q: "What is the Kingdom Chamber?", a: "A curated network of approved churches, ministries, speakers, and public figures connected through Kingdom Messages." },
  { q: "Is there a cost?", a: "Gods Chosen membership dues never exceed $100/month. Message and booking requests are reviewed individually." },
];

export default function HomePage() {
  return (
    <div className="pb-16 md:pb-0">
      <section className="relative overflow-hidden border-b border-gold/20 bg-gradient-to-b from-royal-dark to-royal-black px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-gold md:text-6xl">Kingdom Messages</h1>
          <p className="mt-6 font-serif text-2xl italic text-gold-light md:text-3xl">
            Private, royal communication for pastors, players, stars, and leaders.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-gold">Request a Message</Link>
            <Link href="/kingdom-chamber" className="btn-outline-gold">Enter Kingdom Chamber</Link>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-gold/10 px-4 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="section-title mb-4">About BJ</h2>
            <p className="text-gray-400">
              BJ delivers private, royal communication to pastors, players, stars, and leaders
              through secure technology, curated music, and intentional ministry. Kingdom Messages
              was built for those who carry influence and deserve dignified, protected correspondence.
            </p>
            <Link href="/bio" className="mt-6 inline-block text-gold hover:underline">Read full bio →</Link>
          </div>
          <div className="flex h-56 items-center justify-center rounded-lg border border-gold/20 bg-royal-card">
            <span className="font-serif text-6xl text-gold/40">BJ</span>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-4 text-center">How it works</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-400">
            From request to royal delivery — every step is private, secure, and intentional.
          </p>
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
          <h2 className="section-title mb-10 text-center">Who this is for</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whoCards.map((card) => (
              <div key={card.title} className="card-royal">
                <h3 className="font-serif text-lg text-gold">{card.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-4 text-center">Books</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-400">
            Resources from BJ and the Kingdom Messages ministry.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {books.map((book) => (
              <div key={book.title} className="card-royal flex flex-col">
                <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-royal-dark">
                  <span className="font-serif text-lg text-gold/50">Cover</span>
                </div>
                <h3 className="font-serif text-xl text-gold">{book.title}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-400">{book.desc}</p>
                <Link href="/books" className="btn-outline-gold mt-4 text-center text-sm">Where to Buy</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gold/10 bg-royal-dark px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-4 text-center">Kingdom Chamber</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-400">
            A curated network of approved businesses, churches, ministries, speakers, and public leaders.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {chamberSections.map((item) => (
              <Link key={item.href} href={item.href} className="card-royal block">
                <h3 className="font-serif text-xl text-gold">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
                <span className="mt-4 inline-block text-sm text-gold-light">Explore →</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/kingdom-chamber" className="btn-gold">Enter Kingdom Chamber</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-10 text-center">Gods Chosen Preview</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-gray-400">
            An exclusive lane for celebrities, politicians, pastors, and public figures.
            Membership dues never exceed $100/month.
          </p>
          <div className="text-center">
            <Link href="/kingdom-chamber/gods-chosen" className="btn-outline-gold">View Gods Chosen</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gold/10 bg-royal-dark px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title mb-10 text-center">Trusted by leaders</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="card-royal">
                <p className="text-sm italic text-gray-300">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-gold">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="section-title mb-10 text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="card-royal">
                <h3 className="font-serif text-lg text-gold">{faq.q}</h3>
                <p className="mt-2 text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gold/20 bg-royal-dark px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="section-title mb-4">Request a message or booking</h2>
          <p className="mb-8 text-gray-400">
            Ready for a private Kingdom Message or speaking engagement? Submit your request today.
          </p>
          <Link href="/contact" className="btn-gold">Contact / Request</Link>
        </div>
      </section>
    </div>
  );
}
