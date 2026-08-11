-- Private proposals / briefings (run in Supabase SQL Editor)

create table if not exists proposals (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  letter_body text not null,
  executive_summary text,
  pdf_path text,
  status text not null default 'draft' check (status in ('draft', 'active', 'archived')),
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists proposal_accesses (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  organization_name text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  access_code text not null unique,
  status text not null default 'sent' check (status in ('sent', 'opened', 'replied', 'meeting_requested', 'revoked')),
  notes text,
  created_at timestamptz not null default now(),
  last_opened_at timestamptz
);

create table if not exists proposal_events (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  access_id uuid references proposal_accesses(id) on delete set null,
  event_type text not null check (event_type in (
    'sent', 'opened', 'viewed', 'replied', 'meeting_requested', 'forward_clicked', 'pdf_downloaded'
  )),
  meta jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

create table if not exists proposal_replies (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  access_id uuid references proposal_accesses(id) on delete set null,
  reply_type text not null check (reply_type in ('conversation', 'forward', 'general')),
  full_name text not null,
  email text not null,
  phone text,
  organization text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_proposal_access_code on proposal_accesses(access_code);
create index if not exists idx_proposal_access_proposal on proposal_accesses(proposal_id);
create index if not exists idx_proposal_events_proposal on proposal_events(proposal_id);

alter table proposals enable row level security;
alter table proposal_accesses enable row level security;
alter table proposal_events enable row level security;
alter table proposal_replies enable row level security;

-- Seed Legacy Leagues briefing (skip if title already exists)
insert into proposals (title, subtitle, letter_body, executive_summary, status)
select
  'Legacy Leagues Partnership Briefing',
  'A private overview for retired-player associations, sports agencies, and athlete representatives.',
  E'This private briefing introduces a partnership opportunity for retired-player associations, sports agencies, and individual agents.\n\nLegacy Leagues is designed to honor the careers of former players while creating structured pathways for mentorship, community leadership, entrepreneurship readiness, and civic participation.\n\nThis page is private. Please do not share on social media or public channels. You may forward materials to appropriate players, former players, clients, or colleagues when relevant.',
  E'Legacy Leagues partners with associations and agencies to support retired athletes through leadership development, entrepreneurship education, mentoring, and community impact programs.\n\nPrimary audiences:\n• Retired-player associations\n• Sports agencies\n• Individual agents\n• Colleges and intern outreach (later phase)\n\nNext step: Request a conversation or forward this briefing to a player or client.',
  'active'
where not exists (
  select 1 from proposals where title = 'Legacy Leagues Partnership Briefing'
);

-- Seed Allen Family briefing
insert into proposals (title, subtitle, letter_body, executive_summary, status)
select
  'Allen Family Briefing',
  'A respectful request for conversation regarding the future of the Allen Entrepreneurial Institute campus.',
  E'Revised Allen Family Letter\nOtis Bernard Smith Jr.\nFounder, The Wise Men Group\nAtlanta, Georgia\n404-585-8118\nAdmin@Groovv.org\nTheWiseMen.co\n\n[Date]\n\nThe Allen Family\nc/o Mr. C. H. Braddy, Family Spokesperson\nAllen Family Investments, LLC\nAEI StartUp Factory\n7310 Stonecrest Concourse\nStonecrest, Georgia 30038\n\nRe: A request for conversation about the future of the Allen Entrepreneurial Institute campus\n\nDear Mrs. Allen, Mr. Braddy, and Members of the Allen Family:\n\nI write with respect for the legacy of Mr. Lecester “Bill” Allen and for the work your family has continued to steward through the Allen Entrepreneurial Institute and the broader Allen family vision.\n\nMy name is Otis Bernard Smith Jr. I am the founder of The Wise Men Group, an Atlanta-based organization focused on faith-rooted leadership, entrepreneurship, education, family development, community advancement, and civic readiness.\n\nI am not writing to ask your family for an immediate commitment, property transfer, or decision. I am writing to request a conversation.\n\nThe Allen Entrepreneurial Institute represents more than a property. It represents a belief that people from our community deserve a real place to build businesses, develop skills, receive mentorship, and create lasting opportunity. That mission still matters.\n\nThe Wise Men Group is building programs designed to help emerging entrepreneurs, community leaders, service providers, professionals, and future civic leaders develop practical skills in entrepreneurship, financial literacy, public speaking, ethics, leadership, communication, community service, and responsible civic participation.\n\nI believe there may be an opportunity to explore whether portions of the AEI campus could one day support that kind of work while honoring the Allen family’s original purpose.\n\nPossible pathways could include:\n\n• A short-term pilot program or limited facility-use agreement.\n• A lease or license arrangement for approved training sessions.\n• A community entrepreneurship and leadership partnership.\n• A co-hosted business, mentoring, youth, or civic-readiness program.\n• A longer-term conversation about preserving and activating the Allen legacy through future programming.\n\nAny discussion would begin with your family’s priorities, your legal and operational requirements, and your complete control over whether any partnership makes sense. The Wise Men Group would not use the Allen name, campus, photographs, or legacy in any public communication without written approval from the Allen Family.\n\nIf you are open to it, I would appreciate 30 minutes to introduce myself, share a concise overview of what we are building, and listen to your vision for the future of the property and Mr. Allen’s legacy.\n\nI am available to meet in Stonecrest, Atlanta, by phone, or by video at your convenience.\n\nThank you for considering this request. Whatever your decision, I respect the Allen Family’s stewardship of this legacy and appreciate the opportunity to ask for a conversation.\n\nWith respect,\n\nOtis Bernard Smith Jr.\nFounder, The Wise Men Group\n404-585-8118\nAdmin@Groovv.org\nTheWiseMen.co',
  E'This private briefing is a respectful request for conversation about the future of the Allen Entrepreneurial Institute campus. No immediate commitment, property transfer, or decision is requested — only a conversation.',
  'active'
where not exists (
  select 1 from proposals where title = 'Allen Family Briefing'
);
