// @ts-check

/**
 * Financial Literacy, Unit 2: "Debt and Credit Management"
 *
 * Three acts, played in order:
 *   f2a1-* → "f2a2-start" → f2a2-* → "f2a3-start" → f2a3-* → ending
 *
 * Built from two lessons taught as one unit: "Different Types of Debt" and
 * "Debt Management". Both are transcribed in content/sources/.
 *
 * Continues Unit 1's cast. Marcus Ellery evaluates credit card offers and loan
 * options, coached by Nia Barros at Riverbend Credit Union with LEDGER terminal.
 *
 * This module merges the acts into the single `episode` object the story engine
 * consumes. See STORY-MODE.md for the scene schema.
 */

import { act1 } from "./finance-unit2-act1.js";
import { act2 } from "./finance-unit2-act2.js";
import { act3 } from "./finance-unit2-act3.js";

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
    id: "debt-class-master",
    name: "Debt Taxonomy",
    description: "Separated secured loans backed by collateral from unsecured credit.",
    icon: "building",
  },
  {
    id: "avalanche-strategist",
    name: "Payoff Planner",
    description: "Calculated interest savings using the avalanche and snowball methods.",
    icon: "trending-up",
  },
  {
    id: "fin-unit2-certified",
    name: "Unit 2 Complete",
    description: "Completed Unit 2 of the Techinance Financial Literacy course.",
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
 * the badge tray renders a blank tile.
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
  id: "fin-u2",
  course: "financial-literacy",
  courseTitle: "Financial Literacy",
  unit: 2,
  title: "Debt and Credit Management",
  subtitle:
    "Understanding student loans, credit cards, mortgages, and auto loans—plus the snowball, avalanche, and consolidation strategies to stay debt-free.",
  role: "First-Year Earner",
  estMinutes: 40,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "Types of Debt and How Loans Work", entry: act1.entry },
    { id: "act2", title: "Debt Management Strategies: Snowball vs Avalanche", entry: act2.entry },
    { id: "act3", title: "Staying Debt-Free and Avoiding Debt Cycles", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
