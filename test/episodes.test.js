import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { episode as unit1 } from "../content/cyber-unit1.js";
import { episode as unit2 } from "../content/cyber-unit2.js";
import { episode as unit3 } from "../content/cyber-unit3.js";
import { episode as unit4 } from "../content/cyber-unit4.js";

/**
 * Structural checks on the Story Mode episodes.
 *
 * These exist because a broken episode still type-checks, lints and renders. A
 * `sort` scene with no buckets or a `terminal` with no commands looks fine in a
 * diff and in the browser right up until a learner reaches it and can't
 * continue. An automated badge-trimming pass once emptied 17 of these arrays at
 * once, which is what these tests are here to catch.
 */

const EPISODES = [unit1, unit2, unit3, unit4];

/** Badges the whole Cybersecurity course is allowed to award. See STORY-MODE.md. */
const COURSE_BADGE_CAP = 15;

/**
 * Every scene id a scene can hand control to.
 *
 * @param {any} scene
 * @returns {string[]}
 */
function exits(scene) {
  const out = [];
  if (scene.next) {
    out.push(scene.next);
  }
  if (scene.type === "choice") {
    for (const option of scene.options ?? []) {
      if (option.next) {
        out.push(option.next);
      }
    }
  }
  return out;
}

for (const episode of EPISODES) {
  const label = `unit ${episode.unit}`;
  const scenes = episode.scenes;
  const ids = Object.keys(scenes);

  test(`${label}: every scene is reachable from the start`, () => {
    const seen = new Set();
    const stack = [episode.startScene];
    while (stack.length > 0) {
      const id = stack.pop();
      if (seen.has(id) || !scenes[id]) {
        continue;
      }
      seen.add(id);
      exits(scenes[id]).forEach((next) => stack.push(next));
    }
    assert.deepEqual(
      ids.filter((id) => !seen.has(id)),
      [],
      "unreachable scenes",
    );
  });

  test(`${label}: no scene points at an id that doesn't exist`, () => {
    const dangling = [];
    for (const id of ids) {
      for (const next of exits(scenes[id])) {
        if (!scenes[next]) {
          dangling.push(`${id} -> ${next}`);
        }
      }
    }
    assert.deepEqual(dangling, [], "dangling next ids");
  });

  test(`${label}: only the ending has no way out`, () => {
    const stuck = ids.filter((id) => scenes[id].type !== "ending" && exits(scenes[id]).length === 0);
    assert.deepEqual(stuck, [], "dead ends");
  });

  test(`${label}: interactive scenes carry the content they need`, () => {
    const empty = [];
    for (const id of ids) {
      const scene = scenes[id];
      const needs = {
        terminal: () => (scene.commands ?? []).length > 0,
        sort: () => (scene.buckets ?? []).length > 0 && (scene.items ?? []).length > 0,
        inspect: () => Object.keys(scene.hotspots ?? {}).length > 0,
        dossier: () => (scene.terms ?? []).length > 0,
        quiz: () => (scene.options ?? []).length > 0,
        choice: () => (scene.options ?? []).length > 0,
        reveal: () => (scene.options ?? []).length > 0,
      }[scene.type];
      if (needs && !needs()) {
        empty.push(`${id} (${scene.type})`);
      }
    }
    assert.deepEqual(empty, [], "scenes with empty content arrays");
  });

  test(`${label}: every scene is winnable`, () => {
    const problems = [];
    for (const id of ids) {
      const scene = scenes[id];
      if (scene.type === "quiz") {
        const correct = (scene.options ?? []).filter((option) => option.correct).length;
        if (correct !== 1) {
          problems.push(`${id}: ${correct} correct answers, expected exactly 1`);
        }
      }
      if (scene.type === "reveal") {
        const count = (scene.options ?? []).length;
        if (!Number.isInteger(scene.answerIndex) || scene.answerIndex < 0 || scene.answerIndex >= count) {
          problems.push(`${id}: answerIndex ${scene.answerIndex} outside 0..${count - 1}`);
        }
      }
      if (scene.type === "sort") {
        const buckets = new Set((scene.buckets ?? []).map((bucket) => bucket.id));
        for (const item of scene.items ?? []) {
          if (!buckets.has(item.bucket)) {
            problems.push(`${id}: item "${item.id}" wants unknown bucket "${item.bucket}"`);
          }
        }
      }
      if (scene.type === "inspect") {
        const hotspots = scene.hotspots ?? {};
        const suspicious = Object.values(hotspots).filter((spot) => spot.suspicious === true).length;
        if ((scene.requiredFinds ?? 0) > suspicious) {
          problems.push(`${id}: needs ${scene.requiredFinds} finds but only ${suspicious} are suspicious`);
        }
        const rendered = new Set();
        for (const field of scene.artifact?.fields ?? []) {
          if (field.hot) {
            rendered.add(field.hot);
          }
        }
        for (const line of scene.artifact?.body ?? []) {
          if (line && line.hot) {
            rendered.add(line.hot);
          }
        }
        for (const hot of rendered) {
          if (!hotspots[hot]) {
            problems.push(`${id}: artifact references hotspot "${hot}" that isn't defined`);
          }
        }
        for (const hot of Object.keys(hotspots)) {
          if (!rendered.has(hot)) {
            problems.push(`${id}: hotspot "${hot}" is never rendered, so it can't be clicked`);
          }
        }
      }
    }
    assert.deepEqual(problems, [], "unwinnable scenes");
  });

  test(`${label}: badges and the scenes awarding them agree`, () => {
    const awarded = new Set(ids.map((id) => scenes[id].badge).filter(Boolean));
    const registered = new Set(episode.badges.map((badge) => badge.id));
    assert.deepEqual(
      [...awarded].filter((id) => !registered.has(id)),
      [],
      "awarded without a registry entry, so fallbackBadge() invented the metadata",
    );
    assert.deepEqual(
      [...registered].filter((id) => !awarded.has(id)),
      [],
      "registered but no scene awards it",
    );
  });
}

test("every icon and avatar name resolves in icon.js", () => {
  const source = readFileSync(new URL("../icon.js", import.meta.url), "utf8");
  const known = new Set([...source.matchAll(/^\s+"?([a-z][a-z-]*)"?:\s+[A-Z]/gm)].map((m) => m[1]));
  const missing = [];
  for (const episode of EPISODES) {
    const names = new Set();
    const walk = (node) => {
      if (!node || typeof node !== "object") {
        return;
      }
      for (const [key, value] of Object.entries(node)) {
        if ((key === "icon" || key === "avatar") && typeof value === "string") {
          names.add(value);
        } else {
          walk(value);
        }
      }
    };
    walk(episode.scenes);
    walk(episode.badges);
    for (const name of names) {
      if (!known.has(name)) {
        missing.push(`unit ${episode.unit}: ${name}`);
      }
    }
  }
  assert.deepEqual(missing, [], "icon names that fall back to the sparkles placeholder");
});

test("the Cybersecurity course stays within its badge cap", () => {
  const total = EPISODES.reduce((sum, episode) => sum + episode.badges.length, 0);
  assert.ok(
    total <= COURSE_BADGE_CAP,
    `course awards ${total} badges, cap is ${COURSE_BADGE_CAP}`,
  );
});
