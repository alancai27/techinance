-- Techinance Story Mode: Supabase schema
--
-- Run this once in the Supabase SQL Editor (SQL Editor > New query > paste >
-- Run). It is written to be safe to re-run: every object is created with
-- "if not exists" or dropped first, so a second run is a no-op rather than an
-- error.
--
-- WHAT THIS SETS UP
--   profiles          one row per signed-in learner: display name and avatar
--   episode_progress  one row per learner per episode: XP, completion, checkpoint
--   earned_badges     one row per learner per badge
--   leaderboard()     an aggregate every signed-in learner may read
--
-- Row Level Security is ON for all three tables, and the policies are strict:
-- a learner can read and write ONLY their own rows. Nobody can read anyone
-- else's raw progress. The leaderboard is exposed through a SECURITY DEFINER
-- function instead, which returns aggregates and display names and nothing else.
-- That is the whole point: a leaderboard should reveal a score, not a history.

-- ---------------------------------------------------------------------------
-- 1. Profiles
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id           uuid primary key references auth.users on delete cascade,
  display_name text not null default 'Learner',
  avatar_url   text,
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "read own profile" on public.profiles;
create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "insert own profile" on public.profiles;
create policy "insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "update own profile" on public.profiles;
create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Create the profile row automatically the first time someone signs in, using
-- whatever name Google handed over. Doing it here rather than in the browser
-- means a learner always has a profile even if they close the tab immediately.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', ''),
      split_part(coalesce(new.email, 'learner@example.com'), '@', 1)
    ),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- 2. Episode progress
-- ---------------------------------------------------------------------------

-- The XP ceiling is a cheap integrity check, not real anti-cheat. The largest
-- episode (Cybersecurity unit 1) tops out at 1165 XP, so 2000 leaves headroom
-- for future episodes while still rejecting a browser that posts 999999.
create table if not exists public.episode_progress (
  user_id    uuid not null references auth.users on delete cascade,
  episode_id text not null,
  xp         integer not null default 0 check (xp >= 0 and xp <= 2000),
  completed  boolean not null default false,
  scene_id   text,
  updated_at timestamptz not null default now(),
  primary key (user_id, episode_id)
);

alter table public.episode_progress enable row level security;

drop policy if exists "read own progress" on public.episode_progress;
create policy "read own progress"
  on public.episode_progress for select
  using (auth.uid() = user_id);

drop policy if exists "write own progress" on public.episode_progress;
create policy "write own progress"
  on public.episode_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "update own progress" on public.episode_progress;
create policy "update own progress"
  on public.episode_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own progress" on public.episode_progress;
create policy "delete own progress"
  on public.episode_progress for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 3. Badges
-- ---------------------------------------------------------------------------

create table if not exists public.earned_badges (
  user_id   uuid not null references auth.users on delete cascade,
  badge_id  text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

alter table public.earned_badges enable row level security;

drop policy if exists "read own badges" on public.earned_badges;
create policy "read own badges"
  on public.earned_badges for select
  using (auth.uid() = user_id);

drop policy if exists "write own badges" on public.earned_badges;
create policy "write own badges"
  on public.earned_badges for insert
  with check (auth.uid() = user_id);

drop policy if exists "delete own badges" on public.earned_badges;
create policy "delete own badges"
  on public.earned_badges for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 4. The leaderboard
-- ---------------------------------------------------------------------------

-- SECURITY DEFINER so it can read across users despite the strict policies
-- above. It returns only what a leaderboard needs: a name, a picture, and three
-- totals. No scene history, no email address, no timestamps.
--
-- `set search_path = public` matters on a SECURITY DEFINER function: without it
-- a caller could shadow the table names and have this run against their own.
create or replace function public.leaderboard(limit_count integer default 50)
returns table (
  user_id      uuid,
  display_name text,
  avatar_url   text,
  xp           integer,
  badges       integer,
  episodes     integer
)
language sql
security definer
set search_path = public
stable
as $$
  select
    p.id,
    p.display_name,
    p.avatar_url,
    coalesce(sum(e.xp), 0)::integer                                as xp,
    (select count(*) from public.earned_badges b
      where b.user_id = p.id)::integer                             as badges,
    count(e.episode_id) filter (where e.completed)::integer        as episodes
  from public.profiles p
  left join public.episode_progress e on e.user_id = p.id
  group by p.id, p.display_name, p.avatar_url
  having coalesce(sum(e.xp), 0) > 0
  order by xp desc, badges desc, episodes desc, p.display_name asc
  limit greatest(1, least(coalesce(limit_count, 50), 200));
$$;

-- Signed-in learners only. An anonymous visitor cannot enumerate students.
revoke all on function public.leaderboard(integer) from public, anon;
grant execute on function public.leaderboard(integer) to authenticated;

-- ---------------------------------------------------------------------------
-- 5. Wiping your own progress
-- ---------------------------------------------------------------------------

-- The profile page has a "reset my progress" control. The delete policies above
-- already allow it, but doing it in one call keeps the client simple and the
-- two tables consistent.
create or replace function public.reset_my_progress()
returns void
language sql
security invoker
set search_path = public
as $$
  delete from public.episode_progress where user_id = auth.uid();
  delete from public.earned_badges   where user_id = auth.uid();
$$;

revoke all on function public.reset_my_progress() from public, anon;
grant execute on function public.reset_my_progress() to authenticated;
