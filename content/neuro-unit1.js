// @ts-check

/**
 * Neuroscience, Unit 1: "How Your Brain Processes Reality"
 *
 * Three acts, played in order:
 *   n1a1-* → "n1a2-start" → n1a2-* → "n1a3-start" → n1a3-* → ending
 *
 * Built from "Unit 1: How Your Brain Processes Reality", whose three sections
 * (Brain Structure and Function, Sensory Processing, Cognitive Basics) map one
 * to one onto the three acts. Transcribed in content/sources/.
 *
 * The cast is separate from both other courses. Dr. Imani Reyes runs the
 * cognitive lab, Theo Lindqvist started six months earlier, and ATLAS is this
 * course's terminal. Nobody from the security operations centre or the credit
 * union appears here.
 *
 * All ten questions from the official Unit 1 quiz appear in the episode with
 * the form's wording, option order and correct answer. See
 * content/sources/neuro-unit1-quiz-questions.md and test/neuro-quiz.test.js.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./neuro-unit1-act1.js";
import { act2 } from "./neuro-unit1-act2.js";
import { act3 } from "./neuro-unit1-act3.js";

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
 * Three badges, one per act. Neuroscience has its own 15-badge cap.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "region-mapper",
    name: "Region Mapper",
    description: "Matched each job the brain does to the region that handles it.",
    icon: "brain",
  },
  {
    id: "signal-tracer",
    name: "Signal Tracer",
    description: "Followed each sense from the world to the cortex that decodes it.",
    icon: "waves",
  },
  {
    id: "neuro-unit1-certified",
    name: "Unit 1 Complete",
    description: "Completed Unit 1 of the Techinance Neuroscience course.",
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
  return { id, name, description: "Earned during Unit 1.", icon: "award" };
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
  id: "neuro-u1",
  course: "neuroscience",
  courseTitle: "Neuroscience",
  unit: 1,
  title: "How Your Brain Processes Reality",
  subtitle:
    "Which region does which job, how a signal gets from the world to the cortex, and the shortcuts your brain takes between seeing something and deciding about it.",
  role: "Research Assistant",
  estMinutes: 35,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "The Regions and What They Do", entry: act1.entry },
    { id: "act2", title: "How the Signal Gets In", entry: act2.entry },
    { id: "act3", title: "The Shortcuts Between Seeing and Deciding", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
