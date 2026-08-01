-- Run this in Supabase SQL Editor

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists tracks (
  id uuid primary key default gen_random_uuid(),
  display_order integer not null unique,
  title text not null,
  slug text not null unique,
  audio_path text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists recipients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  organization text,
  notes text,
  totp_secret text,
  status text not null default 'active' check (status in ('active', 'pending', 'revoked')),
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references profiles(id),
  recipient_id uuid not null references recipients(id),
  title text not null,
  body text not null,
  track_id uuid not null references tracks(id),
  attachment_path text,
  message_slug text not null unique,
  expires_at timestamptz,
  status text not null default 'sent' check (status in ('draft', 'sent', 'expired', 'revoked')),
  created_at timestamptz not null default now()
);

create table if not exists message_access_logs (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references messages(id) on delete cascade,
  recipient_identifier text not null,
  ip_address text,
  user_agent text,
  event_type text not null check (event_type in ('unlock_success', 'unlock_failed', 'view_opened')),
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  organization_name text,
  category text not null,
  short_statement text not null,
  kingdom_chamber boolean not null default false,
  private_messages boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  who_are_you text not null,
  request_type text not null,
  budget text,
  message_details text not null,
  created_at timestamptz not null default now()
);

create table if not exists chamber_members (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('church', 'ministry', 'speaker', 'gods_chosen', 'business')),
  display_name text not null,
  subtitle text,
  location text,
  bio text,
  topics jsonb,
  media_text text,
  dues_text text,
  official_link text,
  approved boolean not null default false,
  featured_order integer,
  created_at timestamptz not null default now()
);

create index if not exists idx_messages_slug on messages(message_slug);
create index if not exists idx_messages_recipient on messages(recipient_id);
create index if not exists idx_chamber_category on chamber_members(category, approved);
create index if not exists idx_tracks_order on tracks(display_order);

alter table profiles enable row level security;
alter table tracks enable row level security;
alter table recipients enable row level security;
alter table messages enable row level security;
alter table message_access_logs enable row level security;
alter table applications enable row level security;
alter table contact_requests enable row level security;
alter table chamber_members enable row level security;

drop policy if exists "profiles read own" on profiles;
create policy "profiles read own" on profiles for select using (auth.uid() = id);

drop policy if exists "tracks public read" on tracks;
create policy "tracks public read" on tracks for select using (active = true);

drop policy if exists "chamber public read" on chamber_members;
create policy "chamber public read" on chamber_members for select using (approved = true);

drop policy if exists "applications insert" on applications;
create policy "applications insert" on applications for insert with check (true);

drop policy if exists "contact insert" on contact_requests;
create policy "contact insert" on contact_requests for insert with check (true);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', 'Admin'), 'admin');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into tracks (display_order, title, slug, audio_path) values
  (1, 'Letter to TD Jakes & Joel Osteen', 'letter-to-td-jakes-joel-osteen', 'letter-to-td-jakes-joel-osteen.mp3'),
  (2, 'Letter to The Industry Remix 2', 'letter-to-the-industry-remix-2', 'letter-to-the-industry-remix-2.mp3'),
  (3, 'Letter to the Industry 3', 'letter-to-the-industry-3', 'letter-to-the-industry-3.mp3'),
  (4, 'The Prophecy 5', 'the-prophecy-5', 'the-prophecy-5.mp3'),
  (5, 'The Rapture 6', 'the-rapture-6', 'the-rapture-6.mp3'),
  (6, 'America 1 7', 'america-1-7', 'america-1-7.mp3'),
  (7, 'America 8', 'america-8', 'america-8.mp3'),
  (8, 'He Left Us Men in Charge 10', 'he-left-us-men-in-charge-10', 'he-left-us-men-in-charge-10.mp3'),
  (9, 'I Am The Proof 11', 'i-am-the-proof-11', 'i-am-the-proof-11.mp3'),
  (10, 'Letter to Jay-Z 12', 'letter-to-jay-z-12', 'letter-to-jay-z-12.mp3')
on conflict (display_order) do nothing;

insert into chamber_members (category, display_name, subtitle, location, bio, topics, media_text, dues_text, approved, featured_order) values
  ('church', 'Grace Covenant Church', 'Pastor Michael Thompson', 'Atlanta, GA', 'A Spirit-led congregation committed to community outreach and Kingdom principles.', null, null, null, true, 1),
  ('ministry', 'New Life Ministries International', 'Bishop Sarah Williams', 'Dallas, TX', 'Approved ministry focused on discipleship, healing, and global missions.', null, null, null, true, 2),
  ('church', 'Victory Fellowship', 'Pastor James Rivera', 'Miami, FL', 'Multicultural church serving families and leaders across South Florida.', null, null, null, true, 3),
  ('speaker', 'Dr. Angela Foster', null, null, 'Award-winning speaker and author with 20 years of ministry and corporate leadership experience.', '["Leadership","Faith & Culture","Women in Ministry"]', 'The Kingdom Leader, Voices of Faith Podcast', null, true, 1),
  ('speaker', 'Marcus Cole', null, null, 'Former professional athlete turned motivational speaker inspiring the next generation.', '["Athletics & Faith","Youth Empowerment","Motivation"]', 'Game Changer, Rise Up Devotional', null, true, 2),
  ('speaker', 'Rev. Patricia Hughes', null, null, 'Dynamic preacher and worship leader known for powerful messages on spiritual renewal.', '["Worship","Revival","Prayer"]', 'Fire & Glory, Sacred Hour', null, true, 3),
  ('gods_chosen', 'Pastor David King', 'Senior Pastor, Kingdom Life Church', null, 'Equipping leaders to transform communities through faith and action.', null, null, '$50/month', true, 1),
  ('gods_chosen', 'Senator Lisa Monroe', 'Public Servant & Advocate', null, 'Bridging faith and public service for the good of the people.', null, null, '$75/month', true, 2),
  ('gods_chosen', 'Marcus "MJ" Johnson', 'Artist & Kingdom Ambassador', null, 'Using music and media to spread hope and Kingdom values worldwide.', null, null, '$100/month', true, 3);
