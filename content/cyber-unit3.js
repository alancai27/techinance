// @ts-check

/**
 * Cybersecurity, Unit 3: "Careers, Skills, and Certifications"
 *
 * Currently authored in two acts (no Act 3 source material exists yet):
 *   u3a1-* → "u3a2-start" → u3a2-* → ending
 *
 * This module merges them into the single `episode` object the story engine
 * consumes. Source material lives in content/sources/. See STORY-MODE.md for the
 * scene schema.
 */

import { act1 } from "./unit3-act1.js";
import { act2 } from "./unit3-act2.js";

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
    id: "market-scout",
    name: "Market Scout",
    description: "Learned how much demand there is for cybersecurity talent right now.",
    icon: "trending-up",
  },
  {
    id: "career-mapper",
    name: "Career Mapper",
    description: "Sorted cybersecurity roles by entry, mid, and advanced level.",
    icon: "map",
  },
  {
    id: "cert-strategist",
    name: "Cert Strategist",
    description: "Learned which certifications and free resources build cybersecurity skills.",
    icon: "graduation-cap",
  },
  {
    id: "skill-sorter",
    name: "Skill Sorter",
    description: "Told hard skills and soft skills apart.",
    icon: "list-checks",
  },
  {
    id: "unit3-certified",
    name: "Unit 3 Complete",
    description: "Completed Unit 3 of the Techinance Cybersecurity course.",
    icon: "medal",
  },
]);

const acts = [act1, act2];

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
  return { id, name, description: "Earned during Unit 3.", icon: "award" };
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
  id: "cyber-u3",
  course: "cybersecurity",
  courseTitle: "Cybersecurity",
  unit: 3,
  title: "Careers, Skills, and Certifications",
  subtitle:
    "How much demand there is for cybersecurity talent, what the common roles pay, and how a beginner actually builds toward one without going broke first.",
  role: "Security Analyst",
  estMinutes: 20,
  startScene: act1.entry,
  acts: [
    { id: "act1", title: "The Cybersecurity Job Market", entry: act1.entry },
    { id: "act2", title: "Skills and Certifications", entry: act2.entry },
  ],
  badges,
  scenes,
};

export default episode;