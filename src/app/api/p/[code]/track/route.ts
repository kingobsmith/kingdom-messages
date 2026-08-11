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

    const { data: access } = await admin
      .from("proposal_accesses")
      .select("id, proposal_id, status")
      .eq("access_code", code)
      .single();

    if (!access || access.status === "revoked") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const eventType = body.eventType;
    if (!["viewed", "forward_clicked", "pdf_downloaded"].includes(eventType)) {
      return NextResponse.json({ error: "Invalid event" }, { status: 400 });
    }

    await admin.from("proposal_events").insert({
      proposal_id: access.proposal_id,
      access_id: access.id,
      event_type: eventType,
      ip_address: request.headers.get("x-forwarded-for"),
      user_agent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
