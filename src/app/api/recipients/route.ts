import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateTotpQrDataUrl, generateTotpSecret } from "@/lib/totp";

export async function GET() {
  try {
    await requireAdmin();
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("recipients")
      .select("id, full_name, email, phone, organization, status, created_at")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { fullName, email, phone, organization, notes, status } = body;

    if (!fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!email?.trim() && !phone?.trim()) {
      return NextResponse.json({ error: "Email or phone is required" }, { status: 400 });
    }

    const totpSecret = generateTotpSecret();
    const admin = createAdminClient();

    const { data: recipient, error } = await admin
      .from("recipients")
      .insert({
        full_name: fullName.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        organization: organization?.trim() || null,
        notes: notes?.trim() || null,
        status: status || "active",
        totp_secret: totpSecret,
      })
      .select("id, full_name, email, phone, organization, status, created_at")
      .single();

    if (error) throw error;

    const totpEmail = email?.trim() || phone?.trim() || fullName.trim();
    const totpQrCode = await generateTotpQrDataUrl(totpSecret, totpEmail);

    return NextResponse.json({ recipient, totpQrCode });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create recipient" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { id, fullName, email, phone, organization, notes, status } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("recipients")
      .update({
        full_name: fullName?.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        organization: organization?.trim() || null,
        notes: notes?.trim() || null,
        status: status || "active",
      })
      .eq("id", id)
      .select("id, full_name, email, phone, organization, status, created_at")
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to update recipient" }, { status: 500 });
  }
}
