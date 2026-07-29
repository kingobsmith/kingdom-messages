import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  try {
    await requireAdmin();
    const category = request.nextUrl.searchParams.get("category");
    const admin = createAdminClient();

    let query = admin
      .from("chamber_members")
      .select("*")
      .order("featured_order", { ascending: true });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;
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
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("chamber_members")
      .insert({
        category: body.category,
        display_name: body.displayName,
        subtitle: body.subtitle || null,
        location: body.location || null,
        bio: body.bio || null,
        topics: body.topics || null,
        media_text: body.mediaText || null,
        dues_text: body.duesText || null,
        official_link: body.officialLink || null,
        approved: Boolean(body.approved),
        featured_order: body.featuredOrder ?? null,
      })
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("chamber_members")
      .update({
        category: body.category,
        display_name: body.displayName,
        subtitle: body.subtitle || null,
        location: body.location || null,
        bio: body.bio || null,
        topics: body.topics || null,
        media_text: body.mediaText || null,
        dues_text: body.duesText || null,
        official_link: body.officialLink || null,
        approved: Boolean(body.approved),
        featured_order: body.featuredOrder ?? null,
      })
      .eq("id", body.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
    const { id } = await request.json();
    const admin = createAdminClient();
    const { error } = await admin.from("chamber_members").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  }
}
