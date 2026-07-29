import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { getMessageById, isMessageExpired } from "@/lib/messages";
import { getTrackById } from "@/lib/tracks";

export default async function MessageViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = await cookies();
  const unlocked = cookieStore.get(`unlocked_${id}`);

  if (!unlocked) {
    redirect(`/m/${id}`);
  }

  const message = getMessageById(id);

  if (!message) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="section-title">Message Not Found</h1>
        <p className="mt-4 text-gray-400">This message does not exist or has been removed.</p>
      </div>
    );
  }

  if (isMessageExpired(message)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="section-title">Message Expired</h1>
        <p className="mt-4 text-gray-400">This Kingdom Message is no longer available.</p>
      </div>
    );
  }

  const track = getTrackById(message.trackId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gold">Royal Message</p>
        <h1 className="mt-2 font-serif text-3xl text-gold md:text-4xl">{message.title}</h1>
        {track && (
          <p className="mt-2 text-gold-light">{track.name}</p>
        )}
      </div>

      {track && <AudioPlayer src={track.url} title={track.name} />}

      <div className="card-royal mt-8">
        <div className="prose prose-invert max-w-none whitespace-pre-wrap text-gray-300">
          {message.body}
        </div>

        {message.attachmentUrl && (
          <div className="mt-6 border-t border-gold/20 pt-6">
            <p className="label-royal">Attachment</p>
            <a
              href={message.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              View Attachment
            </a>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4 border-t border-gold/20 pt-8 text-sm">
        <Link href="/bio" className="text-gray-400 hover:text-gold">Bio</Link>
        <Link href="/books" className="text-gray-400 hover:text-gold">Books</Link>
        <Link href="/kingdom-chamber" className="text-gray-400 hover:text-gold">Kingdom Chamber</Link>
        <Link href="/apply" className="text-gray-400 hover:text-gold">Apply</Link>
      </div>
    </div>
  );
}
