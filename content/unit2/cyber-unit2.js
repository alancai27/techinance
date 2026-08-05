// @ts-check

/**
 * Cybersecurity, Unit 2: "Digital Footprint & Defense"
 *
 * The episode is authored in three acts that hand off to one another:
 *   u2a1-* → "u2a2-start" → u2a2-* → "u2a3-start" → u2a3-* → ending
 *
 * This module merges them into the single `episode` object the story engine
 * consumes. See SPEC in STORY-MODE.md for the scene schema.
 */

import { act1 } from "./unit2-act1.js";
import { act2 } from "./unit2-act2.js";
import { act3 } from "./unit2-act3.js";

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
    id: "footprint-initiate",
    name: "Digital Shadow",
    description: "Started Unit 2 briefing on digital footprints.",
    icon: "user",
  },
  {
    id: "reputation-guardian",
    name: "Reputation Audit",
    description: "Analyzed how online behavior impacts long-term career opportunities.",
    icon: "shield-check",
  },
  {
    id: "shadow-analyst",
    name: "Footprint Classifier",
    description: "Identified active and passive digital footprints.",
    icon: "network",
  },
  {
    id: "cookie-inspector",
    name: "Cookie Inspector",
    description: "Discovered that only 26% of websites secure their session cookies.",
    icon: "lock",
  },
  {
    id: "passive-tracker",
    name: "Passive Data Audit",
    description: "Identified passive footprint components like search history and IP addresses.",
    icon: "eye",
  },
  {
    id: "wifi-defender",
    name: "Wi-Fi Defender",
    description: "Identified public network security risks (1 in 4 statistic).",
    icon: "network",
  },
  {
    id: "shield-master",
    name: "Credential Defense",
    description: "Mastered strong passwords, unique credentials, and 2FA strategies.",
    icon: "key",
  },
  {
    id: "footprint-minimizer",
    name: "Footprint Minimizer",
    description: "Applied strategies to minimize digital footprints and delete old accounts.",
    icon: "shield-check",
  },
  {
    id: "unit2-certified",
    name: "Unit 2 Complete",
    description: "Completed Unit 2 of the Techinance Cybersecurity course.",
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
  id: "cyber-u2",
  course: "cybersecurity",
  courseTitle: "Cybersecurity",
  unit: 2,
  title: "Digital Footprint & Defense",
  subtitle:
    "Protecting personal information, active vs passive digital footprints, cookie security, public Wi-Fi risks, and strategies to minimize your online shadow.",
  role: "Security Analyst",
  estMinutes: 30,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "Digital Footprint & Reputation", entry: act1.entry },
    { id: "act2", title: "Active vs Passive Footprint & Privacy Risks", entry: act2.entry },
    { id: "act3", title: "Strategies for Protection & Minimizing Footprint", entry: act3.entry },
  ],
  badges,
  scenes,
};

export default episode;
