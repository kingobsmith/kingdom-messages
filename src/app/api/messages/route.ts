import { NextRequest, NextResponse } from "next/server";
import { createMessage, getAllMessages } from "@/lib/messages";
import { generateQRCodeDataUrl, getMessageUrl } from "@/lib/qr";
import type { CreateMessageInput } from "@/lib/types";

export async function GET() {
  const messages = getAllMessages();
  const safe = messages.map(({ unlockCode, ...rest }) => rest);
  return NextResponse.json(safe);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateMessageInput;
    const required = [
      "recipientName",
      "recipientContact",
      "title",
      "body",
      "trackId",
      "expirationDate",
    ] as const;

    for (const field of required) {
      if (!body[field]?.trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const message = createMessage(body);
    const messageUrl = getMessageUrl(
      message.id,
      request.nextUrl.origin
    );
    const qrCode = await generateQRCodeDataUrl(messageUrl);

    return NextResponse.json({
      message: {
        id: message.id,
        recipientName: message.recipientName,
        recipientContact: message.recipientContact,
        title: message.title,
        trackId: message.trackId,
        expirationDate: message.expirationDate,
        createdAt: message.createdAt,
        unlockCode: message.unlockCode,
      },
      messageUrl,
      qrCode,
    });
  } catch {
    return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
  }
}
