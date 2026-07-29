import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }
    if (!body.category?.trim()) {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }
    if (!body.statement?.trim()) {
      return NextResponse.json({ error: "Short statement is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from("applications").insert({
      full_name: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      organization_name: body.organization?.trim() || null,
      category: body.category.trim(),
      short_statement: body.statement.trim(),
      kingdom_chamber: Boolean(body.kingdomChamber),
      private_messages: Boolean(body.privateMessages),
    });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
