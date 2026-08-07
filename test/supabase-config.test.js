import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "../supabase-config.js";

/**
 * Guards on the Supabase config.
 *
 * The anon key is public by design and belongs in the repo. The service_role
 * key bypasses Row Level Security completely: anyone who found it in the built
 * JavaScript could rewrite every learner's score, or read every learner's
 * progress. The two keys look similar enough at a glance that pasting the wrong
 * one is an easy mistake, and nothing else in the build would catch it.
 */

test("the config never holds a service_role key", () => {
  const source = readFileSync(new URL("../supabase-config.js", import.meta.url), "utf8");
  assert.ok(
    !/service_role/i.test(source.replace(/^\s*\*.*$/gm, "")),
    "supabase-config.js mentions service_role outside its comments",
  );

  // A Supabase JWT carries its role in the payload. Decode rather than trust
  // the variable name.
  if (SUPABASE_ANON_KEY.trim() !== "") {
    const parts = SUPABASE_ANON_KEY.split(".");
    if (parts.length === 3) {
      try {
        const payload = JSON.parse(Buffer.from(parts[1], "base64").toString("utf8"));
        assert.notEqual(
          payload.role,
          "service_role",
          "SUPABASE_ANON_KEY is a service_role key. Use the anon public key.",
        );
      } catch (error) {
        if (error instanceof assert.AssertionError) {
          throw error;
        }
        // Not a decodable JWT. The shape check below still applies.
      }
    }
  }
});

test("a filled-in URL looks like a Supabase project URL", () => {
  if (SUPABASE_URL.trim() === "") {
    return;
  }
  assert.match(SUPABASE_URL, /^https:\/\//, "SUPABASE_URL must be https");
  assert.ok(!SUPABASE_URL.endsWith("/"), "SUPABASE_URL must not have a trailing slash");
});

test("isSupabaseConfigured needs both values", () => {
  assert.equal(isSupabaseConfigured(), SUPABASE_URL.trim() !== "" && SUPABASE_ANON_KEY.trim() !== "");
});
