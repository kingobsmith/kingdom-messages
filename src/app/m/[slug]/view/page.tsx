import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import AudioPlayer from "@/components/AudioPlayer";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSignedAttachmentUrl, getSignedTrackUrl } from "@/lib/storage";
import { isMessageAccessible } from "@/lib/messages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const admin = createAdminClient();
  const { data } = await admin
    .from("messages")
    .select("title")
    .eq("message_slug", slug)
    .single();

  return {
    title: data ? `${data.title} | Kingdom Messages` : "Royal Message | Kingdom Messages",
    description: "Your private Kingdom Message.",
  };
}

export default async function MessageViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const unlocked = cookieStore.get(`unlocked_${slug}`);

  if (!unlocked) {
    redirect(`/m/${slug}`);
  }

  const admin = createAdminClient();
  const { data: message, error } = await admin
    .from("messages")
    .select(
      `
      id, title, body, attachment_path, status, expires_at, message_slug,
      track:tracks(id, title, audio_path)
    `
    )
    .eq("message_slug", slug)
    .single();

  if (error || !message) {
    notFound();
  }

  const access = isMessageAccessible(message);
  if (!access.ok) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="section-title">
          {access.reason === "revoked" ? "Access Unavailable" : "Message Expired"}
        </h1>
        <p className="mt-4 text-gray-400">
          {access.reason === "revoked"
            ? "This Kingdom Message is no longer available."
            : "This Kingdom Message has expired."}
        </p>
      </div>
    );
  }

  const track = Array.isArray(message.track) ? message.track[0] : message.track;
  const audioUrl = track?.audio_path ? await getSignedTrackUrl(track.audio_path) : null;
  const attachmentUrl = message.attachment_path
    ? await getSignedAttachmentUrl(message.attachment_path)
    : null;

  await admin.from("message_access_logs").insert({
    message_id: message.id,
    recipient_identifier: "view",
    event_type: "view_opened",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-widest text-gold">Royal Message</p>
        <h1 className="mt-2 font-serif text-3xl text-gold md:text-4xl">{message.title}</h1>
        {track && <p className="mt-2 text-gold-light">{track.title}</p>}
      </div>

      {audioUrl && track && <AudioPlayer src={audioUrl} title={track.title} />}

      <div className="card-royal mt-8">
        <div className="whitespace-pre-wrap text-gray-300">{message.body}</div>

        {attachmentUrl && (
          <div className="mt-6 border-t border-gold/20 pt-6">
            <p className="label-royal">Attachment</p>
            <a href={attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
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
