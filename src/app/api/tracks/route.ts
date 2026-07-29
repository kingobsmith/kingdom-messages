import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from("tracks")
    .select("id, display_order, title, slug, audio_path, active")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: "Failed to load tracks" }, { status: 500 });
  }

  return NextResponse.json(data);
}
