// @ts-check

/**
 * Startup, Module 1: "What Is a Startup, Really?"
 *
 * Three acts, played in order:
 *   s1a1-* → "s1a2-start" → s1a2-* → "s1a3-start" → s1a3-* → ending
 *
 * Built from the Module 1 slide deck. Unlike the other courses, this one's
 * lessons are public Netlify sites rather than Google Docs. See
 * content/sources/startup-modules/README.md for the URLs and how to pull them.
 *
 * Fourth course, fourth cast. Sofia Okonkwo runs the student founder programme,
 * Devin Cho came through it last year, and RUNWAY is this course's terminal.
 * Nobody crosses over from the other three courses.
 *
 * NOTE: this course's quizzes are 5-question Google Forms that have not been
 * transcribed, so unlike Cybersecurity and Neuroscience there is no verbatim
 * quiz match enforced yet. The knowledge checks here are written from the deck.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./startup-unit1-act1.js";
import { act2 } from "./startup-unit1-act2.js";
import { act3 } from "./startup-unit1-act3.js";

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
 * Three badges, one per act. This course has its own 15-badge cap.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "model-mapper",
    name: "Model Mapper",
    description: "Told a startup, a small business and a side project apart.",
    icon: "compass",
  },
  {
    id: "failure-reader",
    name: "Failure Reader",
    description: "Matched each student advantage to the failure it works against.",
    icon: "target",
  },
  {
    id: "startup-unit1-certified",
    name: "Unit 1 Complete",
    description: "Completed Module 1 of the Techinance start-up course.",
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
  id: "startup-u1",
  course: "startup",
  courseTitle: "How 2 Build a Start Up",
  unit: 1,
  title: "What Is a Startup, Really?",
  subtitle:
    "What a startup actually is, why most of them fail, and the four advantages you have right now that most full-time founders would pay for.",
  role: "Student Founder",
  estMinutes: 45,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "Three Things People Confuse", entry: act1.entry },
    { id: "act2", title: "Why They Fail, and What You Have", entry: act2.entry },
    { id: "act3", title: "Myths, Borders, and an Honest Page", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
