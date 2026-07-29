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
