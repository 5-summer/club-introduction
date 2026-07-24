-- 공개 사용자는 조회만 가능하고 app_metadata.role이 admin인 사용자만 등록할 수 있습니다.

create table if not exists public.clubs (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  teacher text not null default '',
  description text not null default '',
  strengths text not null default '',
  faq text not null default '',
  category text[] not null default '{}',
  detail text[] not null default '{}',
  grade text[] not null default '{}',
  interview boolean not null default false,
  recruitment_count integer not null default 0 check (recruitment_count >= 0),
  type text,
  image_url text
);

alter table public.clubs
add column if not exists recruitment_count integer not null default 0;

alter table public.clubs
add column if not exists type text;

create table if not exists public.activities (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  club_id bigint references public.clubs(id) on delete set null,
  club_name text not null default '',
  title text not null,
  content text not null,
  image_urls text[] not null default '{}'
);

alter table public.activities
add column if not exists club_id bigint references public.clubs(id) on delete set null;

alter table public.activities
add column if not exists club_name text not null default '';

create index if not exists activities_club_id_idx
on public.activities (club_id);

create table if not exists public.recruitment_posts (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  teacher text not null default '',
  target text not null default '전체',
  interview boolean not null default false,
  description text not null default ''
);

alter table public.clubs enable row level security;
alter table public.activities enable row level security;
alter table public.recruitment_posts enable row level security;

drop policy if exists "clubs_public_read" on public.clubs;
create policy "clubs_public_read"
on public.clubs for select
to anon, authenticated
using (true);

drop policy if exists "clubs_public_insert" on public.clubs;
drop policy if exists "clubs_admin_insert" on public.clubs;
create policy "clubs_admin_insert"
on public.clubs for insert
to authenticated
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "clubs_admin_update" on public.clubs;
create policy "clubs_admin_update"
on public.clubs for update
to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "clubs_admin_delete" on public.clubs;
create policy "clubs_admin_delete"
on public.clubs for delete
to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "activities_public_read" on public.activities;
create policy "activities_public_read"
on public.activities for select
to anon, authenticated
using (true);

drop policy if exists "activities_public_insert" on public.activities;
drop policy if exists "activities_admin_insert" on public.activities;
create policy "activities_admin_insert"
on public.activities for insert
to authenticated
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "activities_admin_update" on public.activities;
create policy "activities_admin_update"
on public.activities for update
to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
)
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "activities_admin_delete" on public.activities;
create policy "activities_admin_delete"
on public.activities for delete
to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "recruitment_posts_public_read" on public.recruitment_posts;
create policy "recruitment_posts_public_read"
on public.recruitment_posts for select
to anon, authenticated
using (true);

drop policy if exists "recruitment_posts_admin_insert" on public.recruitment_posts;
create policy "recruitment_posts_admin_insert"
on public.recruitment_posts for insert
to authenticated
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'club-images',
  'club-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "club_images_public_insert" on storage.objects;
drop policy if exists "club_images_admin_insert" on storage.objects;
create policy "club_images_admin_insert"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'club-images'
  and storage.extension(name) in ('jpg', 'jpeg', 'png', 'webp')
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

drop policy if exists "club_images_admin_delete" on storage.objects;
create policy "club_images_admin_delete"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'club-images'
  and (select auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
