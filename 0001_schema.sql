-- MSU E-SPORTS: schema, RLS, storage. Run in Supabase SQL Editor (or `supabase db push`).
create extension if not exists "pgcrypto";

-- ===== Enums =====
create type admin_role as enum ('SUPER_ADMIN','ADMIN','EDITOR','VIEWER');
create type content_status as enum ('draft','published','archived');
create type event_status as enum ('open','upcoming','ongoing','ended','cancelled');
create type match_status as enum ('UPCOMING','LIVE','COMPLETED','CANCELLED');
create type match_format as enum ('BO1','BO3','BO5');
create type match_result as enum ('WIN','LOSS','DRAW');
create type member_status as enum ('Pending','Approved','Rejected','Active','Inactive');
create type placement as enum ('Champion','Runner Up','Top 4','Special Award','Other');
create type news_category as enum ('ข่าวสาร','ประกาศ','การแข่งขัน','กิจกรรม');
create type gallery_category as enum ('การแข่งขัน','กิจกรรมชมรม','Training','Campus','Members','Other');

-- ===== Helpers =====
create or replace function set_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ===== Admins =====
create table admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role admin_role not null default 'VIEWER',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Role helpers (SECURITY DEFINER avoids RLS recursion on admins)
create or replace function current_admin_role() returns admin_role
language sql stable security definer set search_path = public as $$
  select role from admins where user_id = auth.uid() and is_active limit 1
$$;
create or replace function has_role(allowed admin_role[]) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(current_admin_role() = any(allowed), false)
$$;

-- ===== Core content =====
create table games (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  description text,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  game_id uuid not null references games(id) on delete restrict,
  logo_url text,
  description text,
  captain_id uuid, -- FK to players added below
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table players (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  nickname text not null,
  student_id text,            -- private: never selected by public pages
  faculty text,
  major text,
  year smallint check (year between 1 and 8),
  position text,
  avatar_url text,
  team_id uuid references teams(id) on delete set null,
  bio text,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table teams add constraint teams_captain_fk
  foreign key (captain_id) references players(id) on delete set null;

create table news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category news_category not null default 'ข่าวสาร',
  excerpt text,
  content text not null default '',
  cover_url text,
  author text,
  published_at timestamptz,
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null default '',
  is_pinned boolean not null default false,
  published_at timestamptz,
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  type text,
  description text,
  poster_url text,
  location text,
  start_date timestamptz,
  end_date timestamptz,
  registration_url text,
  capacity integer check (capacity >= 0),
  event_status event_status not null default 'upcoming',
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table matches (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references games(id) on delete restrict,
  team_id uuid not null references teams(id) on delete cascade,
  opponent text not null,
  match_date date not null,
  match_time time,
  round text,
  format match_format not null default 'BO3',
  venue text,
  stream_url text,
  match_status match_status not null default 'UPCOMING',
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table match_results (
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null unique references matches(id) on delete cascade,
  team_score smallint not null default 0 check (team_score >= 0),
  opponent_score smallint not null default 0 check (opponent_score >= 0),
  result match_result not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  game_id uuid references games(id) on delete set null,
  year smallint not null,
  placement placement not null default 'Other',
  description text,
  image_url text,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  alt_text text not null default '',
  image_url text not null,
  category gallery_category not null default 'Other',
  sort_order integer not null default 0,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image_url text,
  button_text text,
  button_url text,
  start_date timestamptz,
  end_date timestamptz,
  sort_order integer not null default 0,
  status content_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table committee (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  position text not null,
  avatar_url text,
  sort_order integer not null default 0,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  category text,
  status content_status not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  student_id text not null,
  faculty text not null,
  major text not null,
  year smallint not null check (year between 1 and 8),
  email text not null,
  phone text not null,
  interested_game text,
  interested_role text not null,
  member_status member_status not null default 'Pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references admins(id) on delete set null,
  admin_email text,
  action text not null check (action in ('LOGIN','CREATE','UPDATE','DELETE','PUBLISH','UNPUBLISH')),
  resource text not null,
  resource_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ===== Indexes =====
create index on teams (game_id);
create index on players (team_id);
create index on matches (game_id);
create index on matches (team_id);
create index on matches (match_date desc);
create index on news (status, published_at desc);
create index on events (status, start_date);
create index on achievements (year desc);
create index on gallery (category, sort_order);
create index on banners (status, sort_order);
create index on members (member_status, created_at desc);
create unique index members_student_id_uq on members (student_id);
create index on activity_logs (created_at desc);

-- ===== updated_at triggers =====
do $$ declare t text; begin
  foreach t in array array['admins','games','teams','players','news','announcements','events',
    'matches','match_results','achievements','gallery','banners','committee','documents','settings','members']
  loop execute format('create trigger trg_%1$s_updated before update on %1$s for each row execute function set_updated_at()', t); end loop;
end $$;

-- ===== RLS =====
do $$ declare t text; begin
  foreach t in array array['admins','games','teams','players','news','announcements','events','matches',
    'match_results','achievements','gallery','banners','committee','documents','settings','members','activity_logs']
  loop execute format('alter table %I enable row level security', t); end loop;
end $$;

-- Public read: published rows only
create policy "public read" on games         for select using (status = 'published');
create policy "public read" on teams         for select using (status = 'published');
create policy "public read" on news          for select using (status = 'published' and published_at <= now());
create policy "public read" on announcements for select using (status = 'published');
create policy "public read" on events        for select using (status = 'published');
create policy "public read" on matches       for select using (status = 'published');
create policy "public read" on match_results for select using (
  exists (select 1 from matches m where m.id = match_id and m.status = 'published'));
create policy "public read" on achievements  for select using (status = 'published');
create policy "public read" on gallery       for select using (status = 'published');
create policy "public read" on committee     for select using (status = 'published');
create policy "public read" on documents     for select using (status = 'published');
create policy "public read" on banners       for select using (
  status = 'published' and (start_date is null or start_date <= now()) and (end_date is null or end_date >= now()));
create policy "public read" on settings      for select using (true);

-- Players: public sees published rows through a view that omits private columns
create view public_players with (security_invoker = false) as
  select id, full_name, nickname, faculty, major, year, position, avatar_url, team_id, bio
  from players where status = 'published';
grant select on public_players to anon, authenticated;
-- (no public policy on players base table: student_id stays private)

-- Staff access
create policy "staff read"  on players for select using (has_role(array['SUPER_ADMIN','ADMIN','EDITOR','VIEWER']::admin_role[]));
create policy "esports write" on players for all
  using (has_role(array['SUPER_ADMIN','ADMIN']::admin_role[])) with check (has_role(array['SUPER_ADMIN','ADMIN']::admin_role[]));

do $$ declare t text; begin
  -- Esports modules: SUPER_ADMIN / ADMIN
  foreach t in array array['games','teams','matches','match_results','achievements','committee','members']
  loop
    execute format($f$create policy "admin write" on %I for all
      using (has_role(array['SUPER_ADMIN','ADMIN']::admin_role[]))
      with check (has_role(array['SUPER_ADMIN','ADMIN']::admin_role[]))$f$, t);
  end loop;
  -- Content modules: + EDITOR
  foreach t in array array['news','announcements','events','gallery','banners','documents']
  loop
    execute format($f$create policy "editor write" on %I for all
      using (has_role(array['SUPER_ADMIN','ADMIN','EDITOR']::admin_role[]))
      with check (has_role(array['SUPER_ADMIN','ADMIN','EDITOR']::admin_role[]))$f$, t);
  end loop;
  -- Viewers can read everything (incl. drafts) in staff tables
  foreach t in array array['games','teams','matches','match_results','achievements','committee','members',
    'news','announcements','events','gallery','banners','documents','activity_logs']
  loop
    execute format($f$create policy "viewer read" on %I for select
      using (has_role(array['SUPER_ADMIN','ADMIN','EDITOR','VIEWER']::admin_role[]))$f$, t);
  end loop;
end $$;

create policy "settings write" on settings for all
  using (has_role(array['SUPER_ADMIN','ADMIN']::admin_role[])) with check (has_role(array['SUPER_ADMIN','ADMIN']::admin_role[]));
create policy "admins self read" on admins for select using (user_id = auth.uid());
create policy "super manages admins" on admins for all
  using (has_role(array['SUPER_ADMIN']::admin_role[])) with check (has_role(array['SUPER_ADMIN']::admin_role[]));
create policy "staff insert logs" on activity_logs for insert
  with check (has_role(array['SUPER_ADMIN','ADMIN','EDITOR','VIEWER']::admin_role[]));

-- Join form: anonymous INSERT only, forced to Pending; no public read of members
create policy "public join" on members for insert to anon, authenticated
  with check (member_status = 'Pending');

-- ===== Storage =====
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
select b, b, true, 5242880, array['image/jpeg','image/png','image/webp','image/avif']
from unnest(array['banners','news','teams','players','gallery','achievements']) b
on conflict (id) do nothing;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('documents','documents',true,20971520,array['application/pdf','image/png','image/jpeg'])
on conflict (id) do nothing;

create policy "public read files" on storage.objects for select
  using (bucket_id in ('banners','news','teams','players','gallery','achievements','documents'));
create policy "staff upload files" on storage.objects for insert to authenticated
  with check (bucket_id in ('banners','news','teams','players','gallery','achievements','documents')
    and has_role(array['SUPER_ADMIN','ADMIN','EDITOR']::admin_role[]));
create policy "staff update files" on storage.objects for update to authenticated
  using (has_role(array['SUPER_ADMIN','ADMIN','EDITOR']::admin_role[]));
create policy "staff delete files" on storage.objects for delete to authenticated
  using (has_role(array['SUPER_ADMIN','ADMIN','EDITOR']::admin_role[]));
