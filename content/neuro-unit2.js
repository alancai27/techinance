// @ts-check

/**
 * Neuroscience, Unit 2: "The Neuroscience Behind Emotions"
 *
 * Three acts, played in order:
 *   n2a1-* → "n2a2-start" → n2a2-* → "n2a3-start" → n2a3-* → ending
 *
 * Built from "Unit 2: The Neuroscience Behind Emotions", whose three sections
 * (Emotional Brain Networks, Neurochemistry of Emotions, Emotional Regulation)
 * map one to one onto the three acts. Transcribed in content/sources/.
 *
 * Continues Unit 1's cast: Dr. Imani Reyes, Theo Lindqvist and ATLAS. The
 * learner is a few weeks further into the placement.
 *
 * All ten questions from the official Unit 2 quiz appear in the episode with
 * the form's wording, option order and correct answer, including the two whose
 * options are missing their letters in the form. See
 * content/sources/neuro-unit2-quiz-questions.md and test/neuro-quiz.test.js.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./neuro-unit2-act1.js";
import { act2 } from "./neuro-unit2-act2.js";
import { act3 } from "./neuro-unit2-act3.js";

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
 * Three badges, one per act. Neuroscience is at 6 of its 15-badge cap.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "circuit-reader",
    name: "Circuit Reader",
    description: "Told the alarm, the memory and the brake apart in one emotional moment.",
    icon: "network",
  },
  {
    id: "chemistry-reader",
    name: "Chemistry Reader",
    description: "Matched five neurotransmitters to what each one actually does.",
    icon: "zap",
  },
  {
    id: "neuro-unit2-certified",
    name: "Unit 2 Complete",
    description: "Completed Unit 2 of the Techinance Neuroscience course.",
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
  return { id, name, description: "Earned during Unit 2.", icon: "award" };
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
  id: "neuro-u2",
  course: "neuroscience",
  courseTitle: "Neuroscience",
  unit: 2,
  title: "The Neuroscience Behind Emotions",
  subtitle:
    "Why you feel something before you decide anything: the three structures that generate and moderate emotion, the chemistry that sets its tone, and what actually changes the response.",
  role: "Research Assistant",
  estMinutes: 35,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "The Three Structures", entry: act1.entry },
    { id: "act2", title: "The Chemistry", entry: act2.entry },
    { id: "act3", title: "Changing the Response", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
