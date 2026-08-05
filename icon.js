// @ts-check

/**
 * Inline SVG icons for Story Mode.
 *
 * The marketing pages render icons declaratively with `<i data-lucide="...">`
 * plus `createIcons()` (see icons.js). Story Mode builds its DOM in JavaScript,
 * so it needs icons it can create on demand instead. `createElement` gives us a
 * real SVG node per call, which keeps everything in one icon family.
 *
 * Names are kebab-case and stable: story content refers to icons by name, so
 * renaming one here silently changes the content. Add, don't rename.
 */

import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BarChart3,
  Bird,
  BookOpen,
  Brain,
  Building2,
  Check,
  Clock,
  Dna,
  Eye,
  FileSearch,
  Fish,
  FolderOpen,
  HardDrive,
  Headphones,
  IdCard,
  KeyRound,
  Link2,
  Lock,
  Mail,
  MapPin,
  Medal,
  Monitor,
  Network,
  Radar,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Siren,
  Snowflake,
  Sparkles,
  Terminal,
  Trophy,
  Unlink,
  UserRound,
  WalletCards,
  Waves,
  X,
  Zap,
  createElement,
} from "lucide";

/** @type {Record<string, import("lucide").IconNode>} */
const ICONS = {
  "alert-triangle": AlertTriangle,
  "arrow-left": ArrowLeft,
  award: Award,
  "bar-chart": BarChart3,
  bird: Bird,
  "book-open": BookOpen,
  brain: Brain,
  building: Building2,
  check: Check,
  clock: Clock,
  dna: Dna,
  eye: Eye,
  "file-search": FileSearch,
  fish: Fish,
  folder: FolderOpen,
  "hard-drive": HardDrive,
  headphones: Headphones,
  "id-card": IdCard,
  key: KeyRound,
  link: Link2,
  lock: Lock,
  mail: Mail,
  "map-pin": MapPin,
  medal: Medal,
  monitor: Monitor,
  network: Network,
  radar: Radar,
  rocket: Rocket,
  search: Search,
  server: Server,
  "shield-check": ShieldCheck,
  siren: Siren,
  snowflake: Snowflake,
  sparkles: Sparkles,
  terminal: Terminal,
  trophy: Trophy,
  unlink: Unlink,
  user: UserRound,
  wallet: WalletCards,
  waves: Waves,
  x: X,
  zap: Zap,
};

const FALLBACK = "sparkles";

/**
 * Build an icon element.
 *
 * Icons are decorative by default: they sit next to text that already says the
 * same thing, so they are hidden from screen readers unless a label is given.
 *
 * @param {string} name kebab-case name from the map above
 * @param {{ className?: string, size?: number, label?: string }} [options]
 * @returns {SVGElement}
 */
export function icon(name, options = {}) {
  const node = ICONS[name] ?? ICONS[FALLBACK];
  const svg = createElement(node);
  svg.setAttribute("class", `icon${options.className ? ` ${options.className}` : ""}`);
  svg.setAttribute("stroke-width", "1.8");
  if (options.size) {
    svg.setAttribute("width", String(options.size));
    svg.setAttribute("height", String(options.size));
  }
  if (options.label) {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", options.label);
  } else {
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
  }
  return svg;
}

/**
 * Same icon, as a markup string, for the places that build HTML rather than
 * nodes (template literals in learn.js, for instance).
 *
 * @param {string} name
 * @param {{ className?: string, size?: number, label?: string }} [options]
 * @returns {string}
 */
export function iconMarkup(name, options = {}) {
  return icon(name, options).outerHTML;
}

/**
 * True when `name` is a real icon. Useful for content validation.
 *
 * @param {string} name
 * @returns {boolean}
 */
export function hasIcon(name) {
  return Object.prototype.hasOwnProperty.call(ICONS, name);
}
