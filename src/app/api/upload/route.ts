import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { uploadToBucket } from "@/lib/storage";
import { nanoid } from "nanoid";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = path.extname(file.name) || "";
    const filename = `${nanoid()}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await uploadToBucket("attachments", filename, buffer, file.type || "application/octet-stream");

    return NextResponse.json({ path: filename });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    if (message === "Unauthorized") {
      return NextResponse.json({ error: message }, { status: 401 });
    }
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
