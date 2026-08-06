// @ts-check

/**
 * Financial Literacy, Unit 4: "Investing, Savings, and Retirement"
 *
 * Three acts, played in order:
 *   f4a1-* → "f4a2-start" → f4a2-* → "f4a3-start" → f4a3-* → ending
 *
 * Built from two lessons taught as one unit: "Basic Investment Concepts" and
 * "Savings and Retirement". Both are transcribed in content/sources/.
 *
 * Continues Unit 1's cast. Marcus Ellery has been budgeting for eight months and
 * now has money left over, which is what makes the unit's question live. Nia
 * Barros coaches, LEDGER is the terminal. Nobody from the Cybersecurity course
 * appears in this one.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./finance-unit4-act1.js";
import { act2 } from "./finance-unit4-act2.js";
import { act3 } from "./finance-unit4-act3.js";

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
 * Three badges, one per act, matching Unit 1. Financial Literacy is at 6 of its
 * 15-badge cap.
 */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "asset-mapper",
    name: "Asset Mapper",
    description: "Ranked stocks, bonds, ETFs and gold by the risk each one carries.",
    icon: "bar-chart",
  },
  {
    id: "horizon-planner",
    name: "Horizon Planner",
    description: "Matched money to the right home based on when it's needed.",
    icon: "clock",
  },
  {
    id: "fin-unit4-certified",
    name: "Unit 4 Complete",
    description: "Completed Unit 4 of the Techinance Financial Literacy course.",
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
  id: "fin-u4",
  course: "financial-literacy",
  courseTitle: "Financial Literacy",
  unit: 4,
  title: "Investing, Savings, and Retirement",
  subtitle:
    "What to do with money you don't need this year: what you can buy, how much risk you can live with, and the accounts built for the decades you won't touch it.",
  role: "First-Year Earner",
  estMinutes: 35,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "What You Can Put Money Into", entry: act1.entry },
    { id: "act2", title: "Risk, Time, and Compounding", entry: act2.entry },
    { id: "act3", title: "Retirement Accounts and the Number You Need", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
