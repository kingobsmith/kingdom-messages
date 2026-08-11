export interface Profile {
  id: string;
  full_name: string | null;
  role: "admin" | "editor";
  created_at: string;
}

export interface Track {
  id: string;
  display_order: number;
  title: string;
  slug: string;
  audio_path: string;
  active: boolean;
  created_at: string;
}

export interface Recipient {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  organization: string | null;
  notes: string | null;
  totp_secret: string | null;
  status: "active" | "pending" | "revoked";
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  title: string;
  body: string;
  track_id: string;
  attachment_path: string | null;
  message_slug: string;
  expires_at: string | null;
  status: "draft" | "sent" | "expired" | "revoked";
  created_at: string;
}

export interface ChamberMember {
  id: string;
  category: "church" | "ministry" | "speaker" | "gods_chosen" | "business";
  display_name: string;
  subtitle: string | null;
  location: string | null;
  bio: string | null;
  topics: string[] | null;
  media_text: string | null;
  dues_text: string | null;
  official_link: string | null;
  approved: boolean;
  featured_order: number | null;
  created_at: string;
}

export interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  organization_name: string | null;
  category: string;
  short_statement: string;
  kingdom_chamber: boolean;
  private_messages: boolean;
  created_at: string;
}

export interface Proposal {
  id: string;
  title: string;
  subtitle: string | null;
  letter_body: string;
  executive_summary: string | null;
  pdf_path: string | null;
  status: "draft" | "active" | "archived";
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProposalAccess {
  id: string;
  proposal_id: string;
  organization_name: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  access_code: string;
  status: "sent" | "opened" | "replied" | "meeting_requested" | "revoked";
  notes: string | null;
  created_at: string;
  last_opened_at: string | null;
}

export interface ProposalReply {
  id: string;
  proposal_id: string;
  access_id: string | null;
  reply_type: "conversation" | "forward" | "general";
  full_name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  message: string;
  created_at: string;
}
