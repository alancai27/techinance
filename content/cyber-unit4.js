// @ts-check

/**
 * Cybersecurity, Unit 4: "Programming for Cybersecurity"
 *
 * The episode is authored in three acts that hand off to one another:
 *   u4a1-* → "u4a2-start" → u4a2-* → "u4a3-start" → u4a3-* → ending
 *
 * This module merges them into the single `episode` object the story engine
 * consumes. Source material lives in content/sources/. See STORY-MODE.md for the
 * scene schema.
 */

import { act1 } from "./unit4-act1.js";
import { act2 } from "./unit4-act2.js";
import { act3 } from "./unit4-act3.js";

/**
 * @typedef {Object} Badge
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 */

/**
 * Badges the acts award, in display order. Ids are namespaced per unit because
 * progress.js stores earned badges in one flat list per user.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "code-induction",
    name: "Why Code",
    description: "Learned why cybersecurity work depends on programming.",
    icon: "book-open",
  },
  {
    id: "language-scout",
    name: "Language Scout",
    description: "Matched programming languages to the security jobs that use them.",
    icon: "search",
  },
  {
    id: "hello-console",
    name: "Hello, Console",
    description: "Read program output in Python and in JavaScript.",
    icon: "terminal",
  },
  {
    id: "variable-handler",
    name: "Variable Handler",
    description: "Stored strings, integers and booleans in variables.",
    icon: "file-search",
  },
  {
    id: "function-builder",
    name: "Function Builder",
    description: "Followed a function that does one job and returns an answer.",
    icon: "network",
  },
  {
    id: "boolean-thinker",
    name: "Boolean Thinker",
    description: "Used true and false logic to make a security decision.",
    icon: "check",
  },
  {
    id: "code-reviewer",
    name: "Code Reviewer",
    description: "Found the flaw in a script before it shipped.",
    icon: "eye",
  },
  {
    id: "tool-builder",
    name: "Tool Builder",
    description: "Planned a working security tool of your own.",
    icon: "key",
  },
  {
    id: "unit4-certified",
    name: "Unit 4 Complete",
    description: "Completed Unit 4 of the Techinance Cybersecurity course.",
    icon: "medal",
  },
]);

const acts = [act1, act2, act3];

/** @type {Record<string, any>} */
const scenes = Object.create(null);

for (const act of acts) {
  for (const [id, scene] of Object.entries(act.scenes)) {
    if (id in scenes) {
      throw new Error(`Duplicate scene id across acts: ${id}`);
    }
    scenes[id] = scene;
  }
}

/**
 * Any badge an act awards but did not register still needs metadata, otherwise
 * the badge tray renders a blank tile. Derive a readable fallback rather than
 * dropping the award.
 *
 * @param {string} id
 * @returns {Badge}
 */
function fallbackBadge(id) {
  const name = id
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return { id, name, description: "Earned during Unit 4.", icon: "award" };
}

const badges = BADGE_REGISTRY.slice();
const known = new Set(badges.map((badge) => badge.id));

for (const scene of Object.values(scenes)) {
  const id = /** @type {{ badge?: string }} */ (scene).badge;
  if (typeof id === "string" && !known.has(id)) {
    known.add(id);
    badges.push(fallbackBadge(id));
  }
}

export const episode = {
  id: "cyber-u4",
  course: "cybersecurity",
  courseTitle: "Cybersecurity",
  unit: 4,
  title: "Programming for Cybersecurity",
  subtitle:
    "Why security work runs on code: which languages matter, how to read Python and JavaScript, and building a small security tool of your own.",
  role: "Security Analyst",
  estMinutes: 30,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "Why Code Matters in Security", entry: act1.entry },
    { id: "act2", title: "Reading Python and JavaScript", entry: act2.entry },
    { id: "act3", title: "Building a Security Tool", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
