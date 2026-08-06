// @ts-check

/**
 * Startup, Module 2: "Finding a Real Problem Worth Solving"
 *
 * Three acts, played in order:
 *   s2a1-* → "s2a2-start" → s2a2-* → "s2a3-start" → s2a3-* → ending
 *
 * Built from the Module 2 slide deck (http://start-ups-module-2-yx9jh65lmo6g.netlify.app). Unlike the other courses, this one's
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

import { act1 } from "./startup-unit2-act1.js";
import { act2 } from "./startup-unit2-act2.js";
import { act3 } from "./startup-unit2-act3.js";

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
    id: "problem-spotter",
    name: "Problem Spotter",
    description: "Told a problem, a solution and a feature apart.",
    icon: "search",
  },
  {
    id: "interview-reader",
    name: "Interview Reader",
    description: "Spotted four broken interview habits in one transcript.",
    icon: "headphones",
  },
  {
    id: "startup-unit2-certified",
    name: "Module 2 Complete",
    description: "Completed Module 2 of the Techinance start-up course.",
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
  return { id, name, description: "Earned during Module 2.", icon: "award" };
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
  id: "startup-u2",
  course: "startup",
  courseTitle: "How 2 Build a Start Up",
  unit: 2,
  title: "Finding a Real Problem Worth Solving",
  subtitle:
    "Turning a vague idea into a specific problem a real person has, and learning to ask about it without leading them to the answer you want.",
  role: "Student Founder",
  estMinutes: 60,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "Problem, Solution, Feature", entry: act1.entry },
    { id: "act2", title: "How to Ask Without Leading", entry: act2.entry },
    { id: "act3", title: "Painkillers, Vitamins, and One Sentence", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
