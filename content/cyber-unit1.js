// @ts-check

/**
 * Cybersecurity, Unit 1: "The Cost of Cybercrime"
 *
 * The episode is authored in three acts that hand off to one another:
 *   act1 (a1-*) → "a2-start" → act2 (a2-*) → "a3-start" → act3 (a3-*) → ending
 *
 * This module merges them into the single `episode` object the story engine
 * consumes. See SPEC in the repo history for the scene schema.
 */

import { act1 } from "./unit1-act1.js";
import { act2 } from "./unit1-act2.js";
import { act3 } from "./unit1-act3.js";

/**
 * @typedef {Object} Badge
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} icon
 */

/** Badges the acts are expected to award, in display order. */
const BADGE_REGISTRY = /** @type {Badge[]} */ ([
  {
    id: "first-shift",
    name: "Induction",
    description: "Completed the SOC induction briefing.",
    icon: "id-card",
  },
  {
    id: "phish-eye",
    name: "Phishing Analysis",
    description: "Identified the warning signs in a phishing email.",
    icon: "fish",
  },
  {
    id: "number-cruncher",
    name: "Cost of Cybercrime",
    description: "Learned what cybercrime costs globally and per breach.",
    icon: "bar-chart",
  },
  {
    id: "chain-breaker",
    name: "Supply Chain Attacks",
    description: "Traced an attack back through a software supply chain.",
    icon: "unlink",
  },
  {
    id: "case-historian",
    name: "Breach Case Files",
    description: "Reviewed six major breaches and what caused them.",
    icon: "folder",
  },
  {
    id: "cool-head",
    name: "Ransom Decision",
    description: "Worked through the decision on whether to pay a ransom.",
    icon: "snowflake",
  },
  {
    id: "traffic-reader",
    name: "Traffic Analysis",
    description: "Told a DoS from a DDoS by reading server logs.",
    icon: "waves",
  },
  {
    id: "threat-taxonomist",
    name: "Cybercrime Types",
    description: "Sorted incidents into the main categories of cybercrime.",
    icon: "dna",
  },
  {
    id: "nightjar-hunter",
    name: "Incident Response",
    description: "Contained the Nightjar intrusion before the payload ran.",
    icon: "bird",
  },
  {
    id: "unit1-certified",
    name: "Unit 1 Complete",
    description: "Completed Unit 1 of the Techinance Cybersecurity course.",
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
  id: "cyber-u1",
  course: "cybersecurity",
  courseTitle: "Cybersecurity",
  unit: 1,
  title: "The Cost of Cybercrime",
  subtitle:
    "Your first shift as a junior analyst in a Security Operations Centre: what cybercrime costs, how real breaches happened, and how to tell attack types apart.",
  role: "Junior Security Analyst",
  estMinutes: 35,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "What Cybercrime Costs", entry: act1.entry },
    { id: "act2", title: "How Recent Breaches Happened", entry: act2.entry },
    { id: "act3", title: "Types of Cybercrime", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
