import { NextRequest, NextResponse } from "next/server";
import { getMessageById, isMessageExpired, verifyUnlock } from "@/lib/messages";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const message = getMessageById(id);

  if (!message) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
  }

  if (isMessageExpired(message)) {
    return NextResponse.json({ error: "Message has expired" }, { status: 410 });
  }

  const { contact, code } = await request.json();

  if (!contact || !code) {
    return NextResponse.json({ error: "Contact and code are required" }, { status: 400 });
  }

  if (!verifyUnlock(message, contact, code)) {
    return NextResponse.json({ error: "Invalid contact or code" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(`unlocked_${id}`, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: `/m/${id}`,
  });

  return response;
}
