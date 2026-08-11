import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { generateAccessCode, generateProposalQr, getProposalUrl } from "@/lib/proposals";
import { uploadToBucket } from "@/lib/storage";
import { nanoid } from "nanoid";
import path from "path";

export async function GET() {
  try {
    await requireAdmin();
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("proposals")
      .select("*, proposal_accesses(count)")
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
    const contentType = request.headers.get("content-type") || "";

    let title = "";
    let subtitle = "";
    let letterBody = "";
    let executiveSummary = "";
    let status = "draft";
    let pdfPath: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      title = String(form.get("title") || "");
      subtitle = String(form.get("subtitle") || "");
      letterBody = String(form.get("letterBody") || "");
      executiveSummary = String(form.get("executiveSummary") || "");
      status = String(form.get("status") || "draft");
      const file = form.get("pdf") as File | null;
      if (file && file.size > 0) {
        const ext = path.extname(file.name) || ".pdf";
        const filename = `proposals/${nanoid()}${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        await uploadToBucket("attachments", filename, buffer, file.type || "application/pdf");
        pdfPath = filename;
      }
    } else {
      const body = await request.json();
      title = body.title || "";
      subtitle = body.subtitle || "";
      letterBody = body.letterBody || "";
      executiveSummary = body.executiveSummary || "";
      status = body.status || "draft";
      pdfPath = body.pdfPath || null;
    }

    if (!title.trim() || !letterBody.trim()) {
      return NextResponse.json({ error: "Title and letter body are required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("proposals")
      .insert({
        title: title.trim(),
        subtitle: subtitle.trim() || null,
        letter_body: letterBody.trim(),
        executive_summary: executiveSummary.trim() || null,
        pdf_path: pdfPath,
        status,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("proposals")
      .update({
        title: body.title,
        subtitle: body.subtitle || null,
        letter_body: body.letterBody,
        executive_summary: body.executiveSummary || null,
        status: body.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to update proposal" }, { status: 500 });
  }
}
