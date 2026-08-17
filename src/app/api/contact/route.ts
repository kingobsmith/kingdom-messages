import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.fullName?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }
    if (!body.whoAreYou?.trim()) {
      return NextResponse.json({ error: "Please select who you are" }, { status: 400 });
    }
    if (!body.requestType?.trim()) {
      return NextResponse.json({ error: "Type of request is required" }, { status: 400 });
    }
    if (!body.messageDetails?.trim()) {
      return NextResponse.json({ error: "Message details are required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const payload = {
      full_name: body.fullName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      who_are_you: body.whoAreYou.trim(),
      request_type: body.requestType.trim(),
      budget: body.budget?.trim() || null,
      budget_honorarium: body.budget?.trim() || null,
      message_details: body.messageDetails.trim(),
    };

    let { error } = await admin.from("contact_requests").insert(payload);

    if (error) {
      const fallback = { ...payload };
      delete (fallback as { budget?: string | null }).budget;
      delete (fallback as { budget_honorarium?: string | null }).budget_honorarium;
      const retry = await admin.from("contact_requests").insert({
        ...fallback,
        budget: body.budget?.trim() || null,
      });
      error = retry.error;
      if (error) {
        const retry2 = await admin.from("contact_requests").insert({
          ...fallback,
          budget_honorarium: body.budget?.trim() || null,
        });
        error = retry2.error;
      }
    }

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
