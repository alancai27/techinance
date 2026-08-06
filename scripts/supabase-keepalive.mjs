// @ts-check

/**
 * Keeps the Supabase project awake.
 *
 * Free Supabase projects pause after 7 days without database activity, and a
 * paused project means sign-in stops working until somebody opens the dashboard
 * and restores it. A course site is exactly the usage pattern that trips this:
 * quiet stretches between cohorts, and nobody notices until a student reports
 * they can't log in.
 *
 * So this runs a trivial query twice a week. It reads the same
 * `supabase-config.js` the site does, rather than duplicating the URL and key
 * into GitHub variables, because two copies of a value drift apart eventually
 * and only one of them is the one the site actually uses.
 *
 * The query hits the `profiles` table, which Row Level Security locks down. An
 * anonymous caller gets an empty array back. That's the point: it proves the
 * database woke up and answered without reading a single learner's data.
 *
 * Exit codes: 0 for pinged or deliberately skipped, 1 for a real failure.
 */

import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "../supabase-config.js";

const TIMEOUT_MS = 20000;

if (!isSupabaseConfigured()) {
  console.log("Supabase isn't configured yet (supabase-config.js is empty). Nothing to ping.");
  process.exit(0);
}

const url = `${SUPABASE_URL}/rest/v1/profiles?select=id&limit=1`;
const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

try {
  const response = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    signal: controller.signal,
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`Ping failed: HTTP ${response.status} ${response.statusText}`);
    console.error(body.slice(0, 500));
    // 401 or 404 here usually means the key is wrong or the schema was never
    // run, both of which are worth failing loudly for rather than silently
    // letting the project pause a week later.
    process.exit(1);
  }

  const rows = await response.json();
  console.log(
    `Pinged ${SUPABASE_URL} successfully. ` +
      `Rows returned: ${Array.isArray(rows) ? rows.length : "unknown"} ` +
      `(0 is expected and correct: Row Level Security hides every profile from an anonymous caller.)`,
  );
} catch (error) {
  const reason = error instanceof Error ? error.message : String(error);
  console.error(`Ping failed: ${reason}`);
  process.exit(1);
} finally {
  clearTimeout(timer);
}
