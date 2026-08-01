create table if not exists contact_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  who_are_you text not null,
  request_type text not null,
  budget_honorarium text,
  message_details text not null,
  created_at timestamptz not null default now()
);

alter table contact_requests enable row level security;

create policy "contact_requests insert" on contact_requests for insert with check (true);
