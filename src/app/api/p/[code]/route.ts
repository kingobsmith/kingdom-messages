import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getSignedAttachmentUrl } from "@/lib/storage";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;
  const admin = createAdminClient();
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");

  const { data: access, error } = await admin
    .from("proposal_accesses")
    .select("*")
    .eq("access_code", code)
    .single();

  if (error || !access) {
    return NextResponse.json({ error: "Briefing not found" }, { status: 404 });
  }

  if (access.status === "revoked") {
    return NextResponse.json({ error: "Access unavailable" }, { status: 410 });
  }

  const { data: proposal, error: pError } = await admin
    .from("proposals")
    .select("id, title, subtitle, letter_body, executive_summary, pdf_path, status")
    .eq("id", access.proposal_id)
    .single();

  if (pError || !proposal || proposal.status === "archived") {
    return NextResponse.json({ error: "Briefing not found" }, { status: 404 });
  }

  if (proposal.status === "draft") {
    return NextResponse.json({ error: "Briefing not available" }, { status: 404 });
  }

  const now = new Date().toISOString();
  const updates: Record<string, string> = { last_opened_at: now };
  if (access.status === "sent") {
    updates.status = "opened";
  }

  await admin.from("proposal_accesses").update(updates).eq("id", access.id);

  await admin.from("proposal_events").insert({
    proposal_id: proposal.id,
    access_id: access.id,
    event_type: "opened",
    ip_address: ip,
    user_agent: userAgent,
  });

  let pdfUrl: string | null = null;
  if (proposal.pdf_path) {
    pdfUrl = await getSignedAttachmentUrl(proposal.pdf_path);
  }

  return NextResponse.json({
    access: {
      id: access.id,
      organization_name: access.organization_name,
      contact_name: access.contact_name,
      status: updates.status || access.status,
    },
    proposal: {
      id: proposal.id,
      title: proposal.title,
      subtitle: proposal.subtitle,
      letter_body: proposal.letter_body,
      executive_summary: proposal.executive_summary,
      pdf_url: pdfUrl,
    },
  });
}
