import { NextRequest, NextResponse } from "next/server";
import { createApplication } from "@/lib/applications";
import type { CreateApplicationInput } from "@/lib/applications";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateApplicationInput;

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

    createApplication({
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      organization: body.organization?.trim() || "",
      category: body.category.trim(),
      statement: body.statement.trim(),
      kingdomChamber: Boolean(body.kingdomChamber),
      privateMessages: Boolean(body.privateMessages),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
