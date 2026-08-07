// @ts-check

/**
 * Neuroscience, Unit 3: "Hacking Reward Systems to Overcome Dopamine Addictions"
 *
 * Three acts, played in order:
 *   n3a1-* → "n3a2-start" → n3a2-* → "n3a3-start" → n3a3-* → ending
 *
 * Built from "Unit 3: Hacking Reward Systems to Overcome Dopamine Addictions", whose three
 * sections (The Dopamine System, Digital Addiction Mechanisms, Neuroplasticity and Recovery)
 * map one to one onto the three acts. Transcribed in content/sources/.
 *
 * Continues the same cast: Dr. Imani Reyes, Theo Lindqvist and ATLAS.
 *
 * All ten questions from the official Unit 3 quiz appear in the episode with
 * the form's wording, option order and correct answer, See
 * content/sources/neuro-unit3-quiz-questions.md and test/neuro-quiz.test.js.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./neuro-unit3-act1.js";
import { act2 } from "./neuro-unit3-act2.js";
import { act3 } from "./neuro-unit3-act3.js";

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
 *
 * Three badges, one per act. Neuroscience is at 9 of its 15-badge cap.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "reward-tracer",
    name: "Reward Tracer",
    description: "Told anticipation, learning and action apart in the dopamine system.",
    icon: "trending-up",
  },
  {
    id: "loop-breaker",
    name: "Loop Breaker",
    description: "Worked out which part of a habit loop each recovery strategy attacks.",
    icon: "unlink",
  },
  {
    id: "neuro-unit3-certified",
    name: "Unit 3 Complete",
    description: "Completed Unit 3 of the Techinance Neuroscience course.",
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
  return { id, name, description: "Earned during Unit 3.", icon: "award" };
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
  id: "neuro-u3",
  course: "neuroscience",
  courseTitle: "Neuroscience",
  unit: 3,
  title: "Hacking Reward Systems to Overcome Dopamine Addictions",
  subtitle:
    "Why anticipation beats reward, how platforms are engineered around that, and what actually restores a dopamine system that has been pulled too hard.",
  role: "Research Assistant",
  estMinutes: 35,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "What Dopamine Actually Does", entry: act1.entry },
    { id: "act2", title: "How Platforms Pull the Lever", entry: act2.entry },
    { id: "act3", title: "Unwinding the Loop", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
