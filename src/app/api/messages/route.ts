import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  generateMessageQr,
  generateMessageSlug,
  getMessageUrl,
} from "@/lib/messages";

export async function GET() {
  try {
    await requireAdmin();
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("messages")
      .select(
        `
        id, title, body, message_slug, status, expires_at, created_at,
        track:tracks(id, title),
        recipient:recipients(id, full_name, email, phone)
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await requireAdmin();
    const body = await request.json();
    const {
      recipientId,
      title,
      messageBody,
      trackId,
      expiresAt,
      attachmentPath,
    } = body;

    if (!recipientId || !title?.trim() || !messageBody?.trim() || !trackId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const admin = createAdminClient();
    const messageSlug = generateMessageSlug();

    const { data: message, error } = await admin
      .from("messages")
      .insert({
        sender_id: user.id,
        recipient_id: recipientId,
        title: title.trim(),
        body: messageBody.trim(),
        track_id: trackId,
        attachment_path: attachmentPath || null,
        message_slug: messageSlug,
        expires_at: expiresAt || null,
        status: "sent",
      })
      .select("id, message_slug, title")
      .single();

    if (error) throw error;

    const messageUrl = getMessageUrl(message.message_slug, request.nextUrl.origin);
    const qrCode = await generateMessageQr(messageUrl);

    return NextResponse.json({ message, messageUrl, qrCode });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create message";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
