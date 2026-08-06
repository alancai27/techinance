// @ts-check

/**
 * Drives leaderboard.html.
 *
 * SCOPE, because this is the thing to understand before reading any of it:
 * Techinance is a static site with no backend. Progress lives in localStorage,
 * which is per browser, per device. So this ranks the learners who have signed
 * in *on this device* and nobody else. It cannot see another student's XP,
 * because that XP never leaves their machine.
 *
 * That makes it genuinely useful on a shared classroom or family computer and
 * useless as a global ranking. The page says so rather than implying otherwise,
 * and it never invents rows to look busier than it is.
 *
 * Turning this into a real cross-student leaderboard needs a server that
 * receives and stores scores. See the note at the bottom of this file.
 */

import { getLearnerRoster, getUser, initAuth, onAuthChange } from "./auth.js";
import { icon } from "./icon.js";
import { getProgress } from "./progress.js";
import { startProgressSync } from "./progress-sync.js";
import { fetchLeaderboard, isRemoteEnabled } from "./supabase.js";

/** @typedef {import("./auth.js").User} User */
/** @typedef {{ id: string, name: string, xp: number, badges: number, episodes: number }} Row */

/** Episodes that count toward "episodes finished". */
const EPISODE_IDS = ["cyber-u1", "cyber-u2", "cyber-u3", "cyber-u4", "fin-u1", "fin-u4"];

/** The progress store, read directly so we can see every learner, not just the current one. */
const PROGRESS_KEY = "techinance.progress.v1";

/**
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {HTMLElement | null}
 */
function pick(selector, scope) {
  const found = (scope ?? document).querySelector(selector);
  return found instanceof HTMLElement ? found : null;
}

/**
 * @param {string} selector
 * @returns {HTMLElement[]}
 */
function pickAll(selector) {
  /** @type {HTMLElement[]} */
  const found = [];
  for (const node of document.querySelectorAll(selector)) {
    if (node instanceof HTMLElement) {
      found.push(node);
    }
  }
  return found;
}

/**
 * @param {string} tag
 * @param {string} [className]
 * @param {string} [text]
 * @returns {HTMLElement}
 */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

/**
 * @param {number} value
 * @returns {string}
 */
function formatNumber(value) {
  return value.toLocaleString("en-GB");
}

/**
 * Every user id the progress store knows about.
 *
 * progress.js exposes getProgress(userId) but no way to list ids, and adding
 * one would widen its API for a single caller. Reading the raw key here keeps
 * that surface unchanged; the shape is validated before use.
 *
 * @returns {string[]}
 */
function knownUserIds() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      return [];
    }
    const store = JSON.parse(raw);
    if (typeof store !== "object" || store === null) {
      return [];
    }
    const users = store.users;
    return typeof users === "object" && users !== null ? Object.keys(users) : [];
  } catch {
    return [];
  }
}

/**
 * @param {string} userId
 * @param {Record<string, { name: string, picture: string }>} roster
 * @returns {Row}
 */
function rowFor(userId, roster) {
  const progress = getProgress(userId);
  let episodes = 0;
  for (const id of EPISODE_IDS) {
    if (progress.episodes[id]?.completed) {
      episodes += 1;
    }
  }
  const known = roster[userId];
  const name = known?.name || (userId === "guest" ? "Guest learner" : userId);
  return { id: userId, name, xp: progress.xp, badges: progress.badges.length, episodes };
}

/**
 * Ranked rows, highest XP first. Ties break on badges, then episodes, then name,
 * so the order is stable rather than dependent on localStorage key order.
 *
 * @returns {Row[]}
 */
function buildRows() {
  const roster = getLearnerRoster();
  return knownUserIds()
    .map((id) => rowFor(id, roster))
    .filter((row) => row.xp > 0 || row.badges > 0)
    .sort(
      (a, b) =>
        b.xp - a.xp ||
        b.badges - a.badges ||
        b.episodes - a.episodes ||
        a.name.localeCompare(b.name),
    );
}

/**
 * @param {Row} row
 * @param {number} rank
 * @param {string | null} currentId
 * @returns {HTMLElement}
 */
function renderRow(row, rank, currentId) {
  const isYou = row.id === currentId;
  const item = el("li", `board-row${isYou ? " board-row--you" : ""}`);

  const place = el("span", "board-row__rank");
  if (rank <= 3) {
    const marker = el("span", `board-row__medal board-row__medal--${rank}`);
    marker.setAttribute("aria-hidden", "true");
    marker.appendChild(icon("medal", { size: 18 }));
    place.append(marker);
  }
  place.append(el("span", "board-row__place", String(rank)));

  const who = el("div", "board-row__who");
  const name = el("p", "board-row__name", row.name);
  if (isYou) {
    name.append(el("span", "board-row__you", "You"));
  }
  const badgeWord = row.badges === 1 ? "badge" : "badges";
  const episodeWord = row.episodes === 1 ? "episode" : "episodes";
  who.append(
    name,
    el(
      "p",
      "board-row__meta",
      `${formatNumber(row.badges)} ${badgeWord} · ${formatNumber(row.episodes)} ${episodeWord} finished`,
    ),
  );

  const xp = el("p", "board-row__xp");
  xp.append(el("span", "board-row__xp-value", formatNumber(row.xp)), el("span", "board-row__xp-label", "XP"));

  item.append(place, who, xp);
  return item;
}

/**
 * Paints a set of rows. Shared by the local and remote paths so both render
 * identically and only the wording of the scope note differs.
 *
 * @param {Row[]} rows
 * @param {string} currentId
 * @param {string} countText
 * @returns {void}
 */
function paint(rows, currentId, countText) {
  const list = pick("[data-board-list]");
  const empty = pick("[data-board-empty]");
  const count = pick("[data-board-count]");
  if (!list) {
    return;
  }
  if (empty) {
    empty.hidden = rows.length > 0;
  }
  list.hidden = rows.length === 0;
  list.replaceChildren(...rows.map((row, index) => renderRow(row, index + 1, currentId)));
  if (count) {
    count.textContent = countText;
  }
}

/**
 * @param {User | null} user
 * @returns {void}
 */
function render(user) {
  for (const node of pickAll("[data-signed-out]")) {
    node.hidden = user !== null;
  }
  for (const node of pickAll("[data-signed-in]")) {
    node.hidden = user === null;
  }
  if (!user) {
    return;
  }

  const scope = pick("[data-board-scope]");
  const remote = isRemoteEnabled();

  if (scope) {
    scope.hidden = remote;
  }

  if (!remote) {
    const rows = buildRows();
    paint(
      rows,
      user.id,
      rows.length === 1
        ? "1 learner has played on this device."
        : `${formatNumber(rows.length)} learners have played on this device.`,
    );
    return;
  }

  // Show this device's rows straight away so the page is never blank, then
  // replace them once the real board arrives. A guest sees only themselves,
  // which is correct: guest progress never leaves the browser.
  const local = buildRows();
  paint(local, user.id, "Loading the leaderboard...");

  fetchLeaderboard(50)
    .then(({ rows, error }) => {
      if (error) {
        paint(
          local,
          user.id,
          "Couldn't reach the leaderboard, showing this device only.",
        );
        return;
      }
      const mapped = rows.map((row) => ({
        id: row.userId,
        name: row.name,
        xp: row.xp,
        badges: row.badges,
        episodes: row.episodes,
      }));
      paint(
        mapped,
        user.id,
        mapped.length === 1
          ? "1 learner on the board."
          : `${formatNumber(mapped.length)} learners on the board.`,
      );
    })
    .catch(() => {
      paint(local, user.id, "Couldn't reach the leaderboard, showing this device only.");
    });
}

/**
 * Fills every `[data-icon="name"]` placeholder in the static markup.
 *
 * @returns {void}
 */
function paintStaticIcons() {
  for (const node of pickAll("[data-icon]")) {
    const name = node.dataset.icon;
    if (!name) {
      continue;
    }
    const size = Number(node.dataset.iconSize);
    node.replaceChildren(icon(name, size > 0 ? { size } : {}));
  }
}

paintStaticIcons();
initAuth();
startProgressSync();
render(getUser());
onAuthChange(render);
window.addEventListener("techinance:progress-hydrated", () => render(getUser()));

/*
 * Making this a real leaderboard
 * -----------------------------
 * Everything above reads localStorage, so it can only ever rank one device.
 * A cross-student board needs three things this project does not have:
 *
 *   1. A server that accepts {userId, xp, badges} and stores it.
 *   2. Verified identity. Sign-in here decodes a Google token in the browser and
 *      never checks it against Google, so anyone can edit localStorage and post
 *      any score they like. A leaderboard is the first feature where that stops
 *      being an acceptable trade-off, because it gives people a reason to cheat.
 *   3. A privacy decision. Publishing student names and scores to other students
 *      is a different thing from storing progress on their own machine, and for
 *      a nonprofit teaching minors it needs consent before it needs code.
 */
