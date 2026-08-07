// @ts-check

/**
 * Registers the lucide icons used declaratively on learn.html.
 *
 * The markup carries `<i data-lucide="...">` placeholders; `createIcons` swaps
 * each one for a real SVG. Only the icons imported here can be resolved, so
 * adding a new `data-lucide` name to learn.html means adding it below too.
 *
 * Icons built at runtime (badge chips in learn.js) go through icon.js instead.
 */

import {
  Award,
  Brain,
  HardDrive,
  Headphones,
  Lock,
  Rocket,
  ShieldCheck,
  WalletCards,
  Zap,
  createIcons,
} from "lucide";

createIcons({
  attrs: {
    "aria-hidden": "true",
    "stroke-width": 1.8,
  },
  icons: {
    Award,
    Brain,
    HardDrive,
    Headphones,
    Lock,
    Rocket,
    ShieldCheck,
    WalletCards,
    Zap,
  },
});
