import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import type { CreateMessageInput, Message } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, "[]", "utf-8");
  }
}

function readMessages(): Message[] {
  ensureDataDir();
  const raw = fs.readFileSync(MESSAGES_FILE, "utf-8");
  return JSON.parse(raw) as Message[];
}

function writeMessages(messages: Message[]) {
  ensureDataDir();
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), "utf-8");
}

function generateUnlockCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getAllMessages(): Message[] {
  return readMessages().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getMessageById(id: string): Message | undefined {
  return readMessages().find((m) => m.id === id);
}

export function createMessage(input: CreateMessageInput): Message {
  const messages = readMessages();
  const message: Message = {
    id: uuidv4(),
    ...input,
    unlockCode: generateUnlockCode(),
    createdAt: new Date().toISOString(),
  };
  messages.push(message);
  writeMessages(messages);
  return message;
}

export function isMessageExpired(message: Message): boolean {
  if (!message.expirationDate) return false;
  return new Date(message.expirationDate) < new Date();
}

export function verifyUnlock(
  message: Message,
  contact: string,
  code: string
): boolean {
  if (isMessageExpired(message)) return false;
  const contactMatch =
    contact.trim().toLowerCase() === message.recipientContact.trim().toLowerCase();
  const codeMatch = code.trim() === message.unlockCode;
  return contactMatch && codeMatch;
}

export function getPublicMessage(message: Message) {
  const { unlockCode: _, ...publicMessage } = message;
  return publicMessage;
}
