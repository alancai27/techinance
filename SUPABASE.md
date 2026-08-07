# Supabase setup

Verified Google sign-in and a real cross-device XP leaderboard. Until the two
values in `supabase-config.js` are filled in, none of this is active and the
site behaves exactly as before: guest mode, local progress, device-local board.

Roughly 20 minutes, most of it clicking through two dashboards.

## 1. Create the project

<https://supabase.com/dashboard> → New project. Any region. Free tier is ample:
this stores a few hundred bytes per learner.

## 2. Run the schema

SQL Editor → New query → paste all of [`supabase/schema.sql`](supabase/schema.sql)
→ Run. Safe to re-run; every object is `create if not exists` or dropped first.

It creates three tables (`profiles`, `episode_progress`, `earned_badges`), turns
on Row Level Security for all of them, adds a trigger that creates a profile on
first sign-in, and adds two functions: `leaderboard()` and `reset_my_progress()`.

## 3. Create a Google OAuth client

This is **not** the same thing as the browser client ID in `auth-config.js`. That
one runs entirely in the browser and verifies nothing. This one has a secret and
is checked by Supabase's servers, which is what makes a leaderboard trustworthy.

1. In Supabase: **Authentication → Providers → Google**. Copy the **Callback URL**
   it shows, which looks like `https://<project-ref>.supabase.co/auth/v1/callback`.
2. In <https://console.cloud.google.com> → **APIs & Services → Credentials** →
   Create credentials → **OAuth client ID** → **Web application**.
   - **Authorized JavaScript origins** (origin only, no path, no trailing slash):
     ```
     http://localhost:4173
     http://localhost:5173
     https://alancai27.github.io
     ```
   - **Authorized redirect URIs**: the Supabase callback URL from step 1, exactly.
3. Copy the **client ID and client secret** back into the Supabase Google provider
   form and enable it.

The secret lives in Supabase and never in this repo.

## 4. Tell Supabase where it may send people back

**Authentication → URL Configuration**:

- **Site URL**: `https://alancai27.github.io/techinance/`
- **Redirect URLs**: add each of
  ```
  http://localhost:4173/techinance/**
  http://localhost:5173/**
  https://alancai27.github.io/techinance/**
  ```

A redirect that isn't on this list is rejected and sign-in bounces with an error.
This is the step people usually miss.

## 5. Fill in the config

**Project Settings → API**, then paste into `supabase-config.js`:

```js
export const SUPABASE_URL = "https://<project-ref>.supabase.co";
export const SUPABASE_ANON_KEY = "eyJ...";
```

Both are public by design and belong in the repo. The **`service_role`** key does
not: it bypasses Row Level Security entirely and would let anyone holding it
rewrite every learner's score. It is never needed by this site.

Commit, push, done.

## Keeping the free project awake

Free projects pause after **7 days without database activity**, and a paused
project means sign-in stops working until someone restores it from the dashboard.
You'd usually find out because a student reports they can't log in.

[`.github/workflows/supabase-keepalive.yml`](.github/workflows/supabase-keepalive.yml)
runs a trivial query every Monday and Thursday, so a worst-case four-day gap
can't cross the seven-day line even if one run fails. It reads the URL and key
straight out of `supabase-config.js` rather than from GitHub variables, so
there's one source of truth, and it skips silently while that file is empty.

The query hits `profiles`, which RLS locks down, so an anonymous caller gets an
empty array. That's deliberate: it proves the database woke up without reading a
single learner's data.

Run it by hand any time from **Actions → Keep Supabase awake → Run workflow**, or
locally:

```bash
node scripts/supabase-keepalive.mjs
```

One catch worth knowing: **GitHub disables scheduled workflows in a repository
with no commits for 60 days.** It emails repo admins first. If Techinance goes
quiet for two months, re-enable it from the Actions tab, and be aware the
Supabase project may have paused in the meantime.

The alternative is Pro at $25/month, where projects never pause. Worth it once
there's real student traffic to protect; the ping is fine before that.

## What this does and doesn't protect

**Identity: solved.** After this, a learner cannot claim to be someone else. The
Google token is verified by Supabase's servers, and Row Level Security means a
learner can only read and write their own rows. Nobody can read anyone else's
progress, even signed in. The leaderboard is exposed through a `SECURITY DEFINER`
function that returns display names and three totals, nothing more.

**Scores: partly.** XP is still calculated in the browser and posted up, so a
learner with devtools can send a number they didn't earn. `schema.sql` caps XP at
2000 per episode, which stops the obvious "set it to a million" case, but not a
patient cheat. Fully trustworthy scores would need the scene graph to run
server-side, which is a large rewrite and probably not worth it for free content.
Worth knowing before anyone attaches a prize to a leaderboard position.

**Privacy: your call.** Publishing learners' names and scores to other learners is
a different thing from storing progress on their own device, and the current
[privacy policy](privacy.html) describes the local-only model. Update it before
switching this on, and decide whether under-13s should appear at all.

## How the code fits together

```
supabase-config.js  URL + anon key. Empty = everything below no-ops.
supabase.js         Client, Google OAuth, push/pull, leaderboard() RPC.
progress-sync.js    Debounced push, one-time pull on a new device.
auth.js             Prefers a verified Supabase session; guest mode unchanged.
leaderboard.js      Remote board when configured, device-local otherwise.
supabase/schema.sql Tables, RLS policies, functions.
```

Gameplay is deliberately local-first. `story-engine.js` writes XP to
localStorage exactly as before and never waits on the network, so a scene
advances at the speed of a click on bad school wifi. `progress-sync.js` pushes
that up a few seconds later, and on page hide. A learner signing in on a new
device pulls their progress down once, and local wins any conflict.

Guests are never synced and never appear on the board. Guest progress stays in
the browser, which is what the sign-in screen promises.
