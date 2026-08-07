// @ts-check

/**
 * Learner progress store for Story Mode.
 *
 * Everything lives in `localStorage` under a single key, namespaced by user id
 * so a guest and a signed-in Google user keep separate progress on the same
 * device. Every storage touch is wrapped in try/catch: in private browsing, or
 * when storage is disabled or full, the store silently degrades to an
 * in-memory copy that lasts for the page session.
 *
 * This is a convenience record, not a source of truth. Anyone can edit it in
 * devtools. Never gate anything that matters on it.
 */

const STORAGE_KEY = "techinance.progress.v1";
const STORE_VERSION = 1;

/** @typedef {{ visited: boolean, correct: boolean }} SceneState */
/** @typedef {{ started: boolean, completed: boolean, xp: number, sceneId: string | null }} EpisodeState */
/**
 * @typedef {object} Progress
 * @property {number} xp                              Total XP across every episode.
 * @property {string[]} badges                        Badge ids, in the order awarded.
 * @property {Record<string, SceneState>} scenes      Keyed by scene id.
 * @property {Record<string, EpisodeState>} episodes  Keyed by episode id.
 */
/**
 * @typedef {object} Store
 * @property {number} v
 * @property {Record<string, Progress>} users
 * @property {Record<string, Record<string, string[]>>} index
 *   users -> episode id -> scene ids seen in that episode. Internal bookkeeping
 *   so `resetEpisode` knows which scene records belong to which episode. It's
 *   never part of the public `Progress` shape.
 */

/** @type {Store | null} */
let cache = null;

/** True until a localStorage call throws; after that we stay in memory. */
let storageAvailable = true;

/** @returns {Store} */
function emptyStore() {
  return { v: STORE_VERSION, users: {}, index: {} };
}

/** @returns {Progress} */
function emptyProgress() {
  return { xp: 0, badges: [], scenes: {}, episodes: {} };
}

/** @returns {EpisodeState} */
function emptyEpisode() {
  return { started: false, completed: false, xp: 0, sceneId: null };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {number}
 */
function toNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

/**
 * Ids arrive from URLs and content files, so normalise defensively.
 * @param {unknown} value
 * @param {string} fallback
 * @returns {string}
 */
function toId(value, fallback) {
  const id = typeof value === "string" ? value.trim() : "";
  return id === "" ? fallback : id;
}

/**
 * Rebuilds a trusted `Progress` object out of whatever was in storage.
 * @param {unknown} raw
 * @returns {Progress}
 */
function normaliseProgress(raw) {
  const progress = emptyProgress();
  if (!isRecord(raw)) {
    return progress;
  }
  progress.xp = toNumber(raw.xp);
  if (Array.isArray(raw.badges)) {
    for (const badge of raw.badges) {
      if (typeof badge === "string" && badge !== "" && !progress.badges.includes(badge)) {
        progress.badges.push(badge);
      }
    }
  }
  if (isRecord(raw.scenes)) {
    for (const [sceneId, state] of Object.entries(raw.scenes)) {
      progress.scenes[sceneId] = {
        visited: isRecord(state) ? state.visited === true : false,
        correct: isRecord(state) ? state.correct === true : false,
      };
    }
  }
  if (isRecord(raw.episodes)) {
    for (const [epId, state] of Object.entries(raw.episodes)) {
      const episode = emptyEpisode();
      if (isRecord(state)) {
        episode.started = state.started === true;
        episode.completed = state.completed === true;
        episode.xp = toNumber(state.xp);
        episode.sceneId = typeof state.sceneId === "string" && state.sceneId !== "" ? state.sceneId : null;
      }
      progress.episodes[epId] = episode;
    }
  }
  return progress;
}

/**
 * @param {unknown} raw
 * @returns {Store}
 */
function normaliseStore(raw) {
  const store = emptyStore();
  if (!isRecord(raw)) {
    return store;
  }
  if (isRecord(raw.users)) {
    for (const [userId, progress] of Object.entries(raw.users)) {
      store.users[userId] = normaliseProgress(progress);
    }
  }
  if (isRecord(raw.index)) {
    for (const [userId, episodes] of Object.entries(raw.index)) {
      if (!isRecord(episodes)) {
        continue;
      }
      /** @type {Record<string, string[]>} */
      const perEpisode = {};
      for (const [epId, sceneIds] of Object.entries(episodes)) {
        perEpisode[epId] = Array.isArray(sceneIds)
          ? sceneIds.filter((sceneId) => typeof sceneId === "string")
          : [];
      }
      store.index[userId] = perEpisode;
    }
  }
  return store;
}

/** @returns {Store} */
function load() {
  if (cache) {
    return cache;
  }
  cache = emptyStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      cache = normaliseStore(JSON.parse(raw));
    }
  } catch {
    // Storage unreadable (private mode, disabled cookies, corrupt JSON).
    storageAvailable = false;
    cache = emptyStore();
  }
  return cache;
}

/** @returns {void} */
function persist() {
  if (!storageAvailable || !cache) {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Quota exceeded or storage blocked. Keep going from memory.
    storageAvailable = false;
  }
}

/**
 * @param {unknown} userId
 * @returns {Progress}
 */
function record(userId) {
  const store = load();
  const key = toId(userId, "guest");
  let progress = store.users[key];
  if (!progress) {
    progress = emptyProgress();
    store.users[key] = progress;
  }
  return progress;
}

/**
 * @param {Progress} progress
 * @param {string} epId
 * @returns {EpisodeState}
 */
function episodeRecord(progress, epId) {
  let episode = progress.episodes[epId];
  if (!episode) {
    episode = emptyEpisode();
    progress.episodes[epId] = episode;
  }
  return episode;
}

/**
 * @param {unknown} userId
 * @param {string} epId
 * @param {string} sceneId
 * @returns {void}
 */
function indexScene(userId, epId, sceneId) {
  const store = load();
  const key = toId(userId, "guest");
  const perUser = store.index[key] || (store.index[key] = {});
  const sceneIds = perUser[epId] || (perUser[epId] = []);
  if (!sceneIds.includes(sceneId)) {
    sceneIds.push(sceneId);
  }
}

/**
 * Full progress snapshot for a user. Always returns an object. A brand new
 * learner just gets zeroed counters. The result is a copy: mutate it all you
 * like, nothing is stored until you call one of the setters below.
 *
 * @param {string | null | undefined} userId
 * @returns {Progress}
 */
export function getProgress(userId) {
  const progress = record(userId);
  /** @type {Record<string, SceneState>} */
  const scenes = {};
  for (const [sceneId, state] of Object.entries(progress.scenes)) {
    scenes[sceneId] = { visited: state.visited, correct: state.correct };
  }
  /** @type {Record<string, EpisodeState>} */
  const episodes = {};
  for (const [epId, state] of Object.entries(progress.episodes)) {
    episodes[epId] = {
      started: state.started,
      completed: state.completed,
      xp: state.xp,
      sceneId: state.sceneId,
    };
  }
  return { xp: progress.xp, badges: progress.badges.slice(), scenes, episodes };
}

/**
 * Records what happened on a scene. Also marks the episode as started.
 *
 * @param {string | null | undefined} userId
 * @param {string} epId
 * @param {string} sceneId
 * @param {{ visited?: boolean, correct?: boolean }} [patch]
 * @returns {void}
 */
export function saveScene(userId, epId, sceneId, patch) {
  const scene = toId(sceneId, "");
  if (scene === "") {
    return;
  }
  const episodeId = toId(epId, "unknown");
  const progress = record(userId);
  const current = progress.scenes[scene] || { visited: false, correct: false };
  if (patch && typeof patch === "object") {
    if (typeof patch.visited === "boolean") {
      current.visited = patch.visited;
    }
    if (typeof patch.correct === "boolean") {
      current.correct = patch.correct;
    }
  }
  progress.scenes[scene] = current;
  episodeRecord(progress, episodeId).started = true;
  indexScene(userId, episodeId, scene);
  persist();
}

/**
 * Adds XP to the user's running total and to the episode's own total.
 *
 * @param {string | null | undefined} userId
 * @param {string} epId
 * @param {number} amount
 * @returns {number} the user's new TOTAL xp across all episodes
 */
export function addXp(userId, epId, amount) {
  const progress = record(userId);
  const delta = toNumber(amount);
  if (delta !== 0) {
    const episode = episodeRecord(progress, toId(epId, "unknown"));
    episode.started = true;
    episode.xp += delta;
    progress.xp += delta;
    persist();
  }
  return progress.xp;
}

/**
 * @param {string | null | undefined} userId
 * @param {string} badgeId
 * @returns {boolean} true when the badge was awarded just now (false if already held)
 */
export function awardBadge(userId, badgeId) {
  const badge = toId(badgeId, "");
  if (badge === "") {
    return false;
  }
  const progress = record(userId);
  if (progress.badges.includes(badge)) {
    return false;
  }
  progress.badges.push(badge);
  persist();
  return true;
}

/**
 * Remembers where the learner is inside an episode so they can resume later.
 *
 * @param {string | null | undefined} userId
 * @param {string} epId
 * @param {string} sceneId
 * @returns {void}
 */
export function setCheckpoint(userId, epId, sceneId) {
  const scene = toId(sceneId, "");
  if (scene === "") {
    return;
  }
  const episodeId = toId(epId, "unknown");
  const episode = episodeRecord(record(userId), episodeId);
  episode.sceneId = scene;
  episode.started = true;
  indexScene(userId, episodeId, scene);
  persist();
}

/**
 * @param {string | null | undefined} userId
 * @param {string} epId
 * @returns {string | null} the saved scene id, or null when there's nothing to resume
 */
export function getCheckpoint(userId, epId) {
  const episode = record(userId).episodes[toId(epId, "unknown")];
  return episode && episode.sceneId ? episode.sceneId : null;
}

/**
 * Marks the episode finished and clears its checkpoint.
 *
 * @param {string | null | undefined} userId
 * @param {string} epId
 * @returns {void}
 */
export function completeEpisode(userId, epId) {
  const episode = episodeRecord(record(userId), toId(epId, "unknown"));
  episode.started = true;
  episode.completed = true;
  episode.sceneId = null;
  persist();
}

/**
 * Wipes one episode: its checkpoint, its XP, and every scene it recorded. XP
 * earned in that episode is subtracted from the user's total. Badges are kept:
 * once earned, they stay earned.
 *
 * @param {string | null | undefined} userId
 * @param {string} epId
 * @returns {void}
 */
export function resetEpisode(userId, epId) {
  const episodeId = toId(epId, "unknown");
  const progress = record(userId);
  const episode = progress.episodes[episodeId];
  if (episode) {
    progress.xp = Math.max(0, progress.xp - episode.xp);
    delete progress.episodes[episodeId];
  }
  const perUser = load().index[toId(userId, "guest")];
  if (perUser) {
    const sceneIds = perUser[episodeId];
    if (sceneIds) {
      for (const sceneId of sceneIds) {
        delete progress.scenes[sceneId];
      }
    }
    delete perUser[episodeId];
  }
  persist();
}
