import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books | Kingdom Messages",
  description: "Books and resources from BJ and the Kingdom Messages ministry.",
};

const books = [
  {
    title: "The Royal Message",
    description: "A guide to private Kingdom communication for leaders in every sphere of influence.",
  },
  {
    title: "Kingdom Chamber",
    description: "Building approved networks of churches, ministries, and public figures for the Kingdom.",
  },
  {
    title: "Letters to the Industry",
    description: "Prophetic words and royal correspondence for culture-shapers and decision-makers.",
  },
];

export default function BooksPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 pb-24 md:pb-12">
      <h1 className="section-title mb-4">Books</h1>
      <p className="mb-4 max-w-2xl text-gray-400">
        Explore books and resources from BJ and the Kingdom Messages ministry.
      </p>
      <p className="mb-10 max-w-2xl text-sm text-gray-500">
        Where to Buy Books — purchase requests and availability are handled through our contact team.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book.title} className="card-royal flex flex-col">
            <div className="mb-4 flex h-48 items-center justify-center rounded-lg bg-royal-dark">
              <span className="font-serif text-lg text-gold/50">Cover</span>
            </div>
            <h2 className="font-serif text-xl text-gold">{book.title}</h2>
            <p className="mt-2 flex-1 text-sm text-gray-400">{book.description}</p>
            <Link href="/contact" className="btn-gold mt-4 w-full text-center text-sm">
              Buy Books
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
