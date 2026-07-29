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
        </div>
      </div>

      <div className="space-y-8">
        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Bio</h2>
          <p className="mt-3 text-gray-400">
            BJ is a visionary leader dedicated to delivering private, royal communication to
            pastors, players, stars, and leaders around the world. Through Kingdom Messages, BJ
            combines secure technology with curated music and intentional ministry to reach those
            who carry influence in culture and the church.
          </p>
        </section>

        <section className="card-royal">
          <h2 className="font-serif text-xl text-gold">Vision</h2>
          <p className="mt-3 text-gray-400">
            To create a trusted platform where Kingdom leaders receive messages with dignity,
            security, and spiritual impact — connecting heaven&apos;s voice to earth&apos;s influencers
            through technology that honors the sacred nature of private communication.
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
      </div>
    </div>
  );
}
