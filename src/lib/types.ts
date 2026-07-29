export interface Message {
  id: string;
  recipientName: string;
  recipientContact: string;
  title: string;
  body: string;
  trackId: string;
  expirationDate: string;
  attachmentUrl?: string;
  unlockCode: string;
  createdAt: string;
}

export interface CreateMessageInput {
  recipientName: string;
  recipientContact: string;
  title: string;
  body: string;
  trackId: string;
  expirationDate: string;
  attachmentUrl?: string;
}
