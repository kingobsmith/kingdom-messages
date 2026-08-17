import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

async function safeAll(table: string) {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from(table)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return [];
  return data || [];
}

export async function GET() {
  try {
    await requireAdmin();
    const [contacts, applications, replies] = await Promise.all([
      safeAll("contact_requests"),
      safeAll("applications"),
      safeAll("proposal_replies"),
    ]);

    return NextResponse.json({ contacts, applications, replies });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
