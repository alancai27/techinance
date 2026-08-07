// @ts-check

/**
 * Financial Literacy, Unit 1: "Budgeting and Smart Spending"
 *
 * Three acts, played in order:
 *   f1a1-* → "f1a2-start" → f1a2-* → "f1a3-start" → f1a3-* → ending
 *
 * Built from two lessons that are taught as one unit: "Budgeting Your Income"
 * (Dax G. Gajera) and "Smart Spending Habits". Both are transcribed in
 * content/sources/.
 *
 * The cast is deliberately separate from the Cybersecurity course. Nia Barros
 * coaches at a credit union, Marcus Ellery is a year ahead of the learner and
 * made the mistakes, and LEDGER is this course's terminal. Nobody from the
 * security operations centre appears here.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./finance-unit1-act1.js";
import { act2 } from "./finance-unit1-act2.js";
import { act3 } from "./finance-unit1-act3.js";

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
 * Three badges, one per act. Financial Literacy has its own 15-badge cap, so
 * there's room here as later units arrive.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "cash-flow-reader",
    name: "Cash Flow Reader",
    description: "Worked out whether money is coming in faster than it goes out.",
    icon: "trending-up",
  },
  {
    id: "budget-builder",
    name: "Budget Builder",
    description: "Split a month of income across needs, wants, and savings.",
    icon: "wallet",
  },
  {
    id: "fin-unit1-certified",
    name: "Unit 1 Complete",
    description: "Completed Unit 1 of the Techinance Financial Literacy course.",
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
  id: "fin-u1",
  course: "financial-literacy",
  courseTitle: "Financial Literacy",
  unit: 1,
  title: "Budgeting and Smart Spending",
  subtitle:
    "Your first paycheque, and what to do with it: what counts as income, where it actually goes, and which budgeting method survives contact with a real month.",
  role: "First-Year Earner",
  estMinutes: 30,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "Where Your Money Actually Goes", entry: act1.entry },
    { id: "act2", title: "Choosing a Budgeting Method", entry: act2.entry },
    { id: "act3", title: "Habits That Hold Up", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
