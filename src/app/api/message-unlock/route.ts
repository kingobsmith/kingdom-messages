import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isMessageAccessible, recipientMatches } from "@/lib/messages";
import { verifyTotpCode } from "@/lib/totp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, emailOrPhone, code } = body;

    if (!slug || !emailOrPhone || !code) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");

    const { data: message, error } = await admin
      .from("messages")
      .select(
        `
        id, message_slug, status, expires_at,
        recipient:recipients(id, full_name, email, phone, totp_secret, status)
      `
      )
      .eq("message_slug", slug)
      .single();

    if (error || !message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    const access = isMessageAccessible(message);
    if (!access.ok) {
      return NextResponse.json(
        { error: access.reason === "revoked" ? "Access unavailable" : "Message expired" },
        { status: 410 }
      );
    }

    const recipient = Array.isArray(message.recipient) ? message.recipient[0] : message.recipient;

    if (!recipient || recipient.status !== "active") {
      await admin.from("message_access_logs").insert({
        message_id: message.id,
        recipient_identifier: emailOrPhone,
        ip_address: ip,
        user_agent: userAgent,
        event_type: "unlock_failed",
      });
      return NextResponse.json({ error: "Invalid contact or code" }, { status: 401 });
    }

    if (!recipientMatches(recipient, emailOrPhone)) {
      await admin.from("message_access_logs").insert({
        message_id: message.id,
        recipient_identifier: emailOrPhone,
        ip_address: ip,
        user_agent: userAgent,
        event_type: "unlock_failed",
      });
      return NextResponse.json({ error: "Invalid contact or code" }, { status: 401 });
    }

    if (!recipient.totp_secret || !verifyTotpCode(recipient.totp_secret, code)) {
      await admin.from("message_access_logs").insert({
        message_id: message.id,
        recipient_identifier: emailOrPhone,
        ip_address: ip,
        user_agent: userAgent,
        event_type: "unlock_failed",
      });
      return NextResponse.json({ error: "Invalid contact or code" }, { status: 401 });
    }

    await admin.from("message_access_logs").insert({
      message_id: message.id,
      recipient_identifier: emailOrPhone,
      ip_address: ip,
      user_agent: userAgent,
      event_type: "unlock_success",
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(`unlocked_${slug}`, "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: `/m/${slug}`,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Unlock failed" }, { status: 500 });
  }
}
