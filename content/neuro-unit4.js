// @ts-check

/**
 * Neuroscience, Unit 4: "Understanding Neurological Disorders"
 *
 * Three acts, played in order:
 *   n4a1-* → "n4a2-start" → n4a2-* → "n4a3-start" → n4a3-* → ending
 *
 * Built from "Unit 4: Understanding Neurological Disorders", whose three
 * sections (Common Neurological Disorders, Mental Health Disorders, Treatment and Management)
 * map one to one onto the three acts. Transcribed in content/sources/.
 *
 * Continues the same cast: Dr. Imani Reyes, Theo Lindqvist and ATLAS.
 *
 * All ten questions from the official Unit 4 quiz appear in the episode with
 * the form's wording, option order and correct answer, See
 * content/sources/neuro-unit4-quiz-questions.md and test/neuro-quiz.test.js.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./neuro-unit4-act1.js";
import { act2 } from "./neuro-unit4-act2.js";
import { act3 } from "./neuro-unit4-act3.js";

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
 * Three badges, one per act. Neuroscience is at 12 of its 15-badge cap.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "mechanism-reader",
    name: "Mechanism Reader",
    description: "Matched each neurological condition to what is actually going wrong.",
    icon: "search",
  },
  {
    id: "circuit-diagnostician",
    name: "Circuit Diagnostician",
    description: "Traced five mental health conditions to the chemistry and circuits behind them.",
    icon: "network",
  },
  {
    id: "neuro-unit4-certified",
    name: "Unit 4 Complete",
    description: "Completed Unit 4 of the Techinance Neuroscience course.",
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
  id: "neuro-u4",
  course: "neuroscience",
  courseTitle: "Neuroscience",
  unit: 4,
  title: "Understanding Neurological Disorders",
  subtitle:
    "What goes wrong when the hardware is damaged, what goes wrong when the signalling is, and the three layers of treatment that work because the brain adapts.",
  role: "Research Assistant",
  estMinutes: 40,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "When the Hardware Fails", entry: act1.entry },
    { id: "act2", title: "When the Signalling Fails", entry: act2.entry },
    { id: "act3", title: "What Actually Helps", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
