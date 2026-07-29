import { NextRequest, NextResponse } from "next/server";
import { getMessageById, getPublicMessage, isMessageExpired } from "@/lib/messages";

export async function GET(
  _request: NextRequest,
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

  return NextResponse.json(getPublicMessage(message));
}
