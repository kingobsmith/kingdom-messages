import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateAccessCode, generateProposalQr, getProposalUrl } from "@/lib/proposals";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const admin = createAdminClient();

    const { data: proposal, error } = await admin
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !proposal) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { data: accesses } = await admin
      .from("proposal_accesses")
      .select("*")
      .eq("proposal_id", id)
      .order("created_at", { ascending: false });

    const { data: events } = await admin
      .from("proposal_events")
      .select("*")
      .eq("proposal_id", id)
      .order("created_at", { ascending: false })
      .limit(50);

    const { data: replies } = await admin
      .from("proposal_replies")
      .select("*")
      .eq("proposal_id", id)
      .order("created_at", { ascending: false });

    return NextResponse.json({ proposal, accesses: accesses || [], events: events || [], replies: replies || [] });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    if (!body.organizationName?.trim()) {
      return NextResponse.json({ error: "Organization name is required" }, { status: 400 });
    }

    const accessCode = generateAccessCode();
    const admin = createAdminClient();

    const { data: access, error } = await admin
      .from("proposal_accesses")
      .insert({
        proposal_id: id,
        organization_name: body.organizationName.trim(),
        contact_name: body.contactName?.trim() || null,
        contact_email: body.contactEmail?.trim() || null,
        contact_phone: body.contactPhone?.trim() || null,
        access_code: accessCode,
        status: "sent",
        notes: body.notes?.trim() || null,
      })
      .select()
      .single();

    if (error) throw error;

    await admin.from("proposal_events").insert({
      proposal_id: id,
      access_id: access.id,
      event_type: "sent",
      meta: { organization: access.organization_name },
    });

    const url = getProposalUrl(accessCode, request.nextUrl.origin);
    const qrCode = await generateProposalQr(url);

    return NextResponse.json({ access, url, qrCode });
  } catch {
    return NextResponse.json({ error: "Failed to create access link" }, { status: 500 });
  }
}
