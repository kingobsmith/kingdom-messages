import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const body = await request.json();
    const admin = createAdminClient();
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
    const userAgent = request.headers.get("user-agent");

    const { data: access, error } = await admin
      .from("proposal_accesses")
      .select("*")
      .eq("access_code", code)
      .single();

    if (error || !access || access.status === "revoked") {
      return NextResponse.json({ error: "Briefing not found" }, { status: 404 });
    }

    if (!body.fullName?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const replyType = body.replyType === "forward" ? "forward" : body.replyType === "general" ? "general" : "conversation";

    const { error: replyError } = await admin.from("proposal_replies").insert({
      proposal_id: access.proposal_id,
      access_id: access.id,
      reply_type: replyType,
      full_name: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      organization: body.organization?.trim() || access.organization_name,
      message: body.message.trim(),
    });

    if (replyError) throw replyError;

    const newStatus = replyType === "conversation" ? "meeting_requested" : "replied";
    await admin.from("proposal_accesses").update({ status: newStatus }).eq("id", access.id);

    await admin.from("proposal_events").insert({
      proposal_id: access.proposal_id,
      access_id: access.id,
      event_type: replyType === "conversation" ? "meeting_requested" : "replied",
      meta: { reply_type: replyType },
      ip_address: ip,
      user_agent: userAgent,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit reply" }, { status: 500 });
  }
}
