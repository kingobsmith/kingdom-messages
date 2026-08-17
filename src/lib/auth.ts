import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const admin = createAdminClient();
  let { data: profile } = await admin
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const { data: created } = await admin
      .from("profiles")
      .insert({
        id: user.id,
        full_name: user.email || "Admin",
        role: "admin",
      })
      .select("role, full_name")
      .single();
    profile = created;
  }

  if (!profile || !["admin", "editor"].includes(profile.role)) {
    return null;
  }

  return { user, profile };
}

export async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) {
    throw new Error("Unauthorized");
  }
  return admin;
}
