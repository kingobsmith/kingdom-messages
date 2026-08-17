import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

async function safeList(table: string, columns = "*", limit = 8) {
  const admin = createAdminClient();
  const { data, error, count } = await admin
    .from(table)
    .select(columns, { count: "exact" })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { rows: [] as Record<string, unknown>[], count: 0 };
  }

  return { rows: (data || []) as Record<string, unknown>[], count: count || 0 };
}

export async function GET() {
  try {
    await requireAdmin();

    const contacts = await safeList("contact_requests", "*", 8);
    const applications = await safeList("applications", "*", 8);
    const replies = await safeList("proposal_replies", "*", 8);
    const recipients = await safeList(
      "recipients",
      "id, full_name, email, phone, organization, status, created_at",
      8
    );
    const messages = await safeList("messages", "id", 1);
    const proposals = await safeList("proposals", "id", 1);
    const logs = await safeList(
      "message_access_logs",
      "id, event_type, recipient_identifier, created_at, message_id",
      12
    );
    const chamber = await safeList("chamber_members", "id", 1);

    return NextResponse.json({
      counts: {
        contacts: contacts.count,
        applications: applications.count,
        recipients: recipients.count,
        messages: messages.count,
        proposals: proposals.count,
        replies: replies.count,
        chamber: chamber.count,
      },
      contacts: contacts.rows,
      applications: applications.rows,
      replies: replies.rows,
      recipients: recipients.rows,
      logs: logs.rows,
    });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
