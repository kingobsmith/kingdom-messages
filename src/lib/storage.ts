import { createAdminClient } from "@/lib/supabase/admin";

export async function getSignedTrackUrl(audioPath: string) {
  const admin = createAdminClient();
  const { data, error } = await admin.storage.from("tracks").createSignedUrl(audioPath, 3600);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}

export async function getSignedAttachmentUrl(attachmentPath: string) {
  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("attachments")
    .createSignedUrl(attachmentPath, 3600);
  if (error || !data?.signedUrl) return null;
  return data.signedUrl;
}

export async function uploadToBucket(
  bucket: "tracks" | "attachments" | "profiles",
  path: string,
  file: Buffer,
  contentType: string
) {
  const admin = createAdminClient();
  const { error } = await admin.storage.from(bucket).upload(path, file, {
    contentType,
    upsert: true,
  });
  if (error) throw error;
  return path;
}
