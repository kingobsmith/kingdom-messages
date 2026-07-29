import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMessageAccessible } from "@/lib/messages";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const admin = createAdminClient();

  const { data: message, error } = await admin
    .from("messages")
    .select("id, title, message_slug, status, expires_at")
    .eq("message_slug", slug)
    .single();

  if (error || !message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  const access = isMessageAccessible(message);
  if (!access.ok) {
    return NextResponse.json({ error: access.reason }, { status: 410 });
  }

  return NextResponse.json({ slug: message.message_slug, title: message.title });
}
