// @ts-check

/**
 * Sign-in for the Techinance static site.
 *
 * IMPORTANT: THIS IS NOT A SECURITY BOUNDARY.
 * There's no backend and no server-side verification. The Google ID token is
 * decoded in the browser purely to read a display name, email and picture, and
 * the resulting session is kept in `localStorage`. Anyone can open devtools and
 * write whatever they like into that key. That's fine for what it's used for
 * here: personalising free learning content and remembering progress on this
 * device. Never use it to protect anything private, paid, or sensitive. If real
 * authorisation is ever needed, the ID token must be sent to a server and
 * verified against Google's public keys there.
 *
 * Guest mode always works, including when no Google client id is configured.
 */

import { GOOGLE_CLIENT_ID } from "./auth-config.js";

const STORAGE_KEY = "techinance.auth.v1";
const SESSION_VERSION = 1;
const GUEST_ID = "guest";
const GIS_SRC = "https://accounts.google.com/gsi/client";
const GIS_POLL_MS = 200;
const GIS_TIMEOUT_MS = 10000;
const LEARN_URL = "learn.html";
const PROFILE_URL = "profile.html";
const MAX_TIMEOUT = 2147483647;

/**
 * @typedef {object} User
 * @property {string} id       Stable per-identity key; also the progress namespace.
 * @property {string} name
 * @property {string} email    Empty string for guests.
 * @property {string} picture  Avatar URL, or empty string.
 * @property {boolean} guest
 */

/** @typedef {{ user: User, exp: number | null }} Session */

/**
 * Minimal shape of the bits of Google Identity Services we call.
 * @typedef {object} GoogleIdentity
 * @property {{ id: {
 *   initialize: (config: Record<string, unknown>) => void,
 *   renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void,
 *   disableAutoSelect: () => void,
 * } }} accounts
 */

/** @type {Session | null} */
let session = null;

/** @type {Set<(user: User | null) => void>} */
const listeners = new Set();

/** @type {Map<HTMLElement, () => void>} */
const navMounts = new Map();

/**
 * Aborts the document-level listeners left behind by the previous render of a
 * nav mount, so re-rendering on every sign-in doesn't stack them up.
 * @type {WeakMap<HTMLElement, AbortController>}
 */
const navControllers = new WeakMap();

/** @type {Promise<GoogleIdentity> | null} */
let gisPromise = null;

let gisInitialised = false;
let started = false;

/** @type {ReturnType<typeof setTimeout> | null} */
let expiryTimer = null;

/* ------------------------------------------------------------------ */
/* storage                                                             */
/* ------------------------------------------------------------------ */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function str(value) {
  return typeof value === "string" ? value : "";
}

/** @returns {string} */
function clientId() {
  return typeof GOOGLE_CLIENT_ID === "string" ? GOOGLE_CLIENT_ID.trim() : "";
}

/**
 * @param {Session} candidate
 * @returns {boolean}
 */
function isExpired(candidate) {
  return typeof candidate.exp === "number" && candidate.exp * 1000 <= Date.now();
}

/** @returns {Session | null} */
function readSession() {
  /** @type {string | null} */
  let raw;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (private browsing). Sign-in just doesn't persist.
    return null;
  }
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!isRecord(parsed) || !isRecord(parsed.user)) {
      return null;
    }
    const user = parsed.user;
    const id = str(user.id).trim();
    if (id === "") {
      return null;
    }
    const exp = typeof parsed.exp === "number" && Number.isFinite(parsed.exp) ? parsed.exp : null;
    return {
      exp,
      user: {
        id,
        name: str(user.name).trim() || "Learner",
        email: str(user.email),
        picture: str(user.picture),
        guest: user.guest === true,
      },
    };
  } catch {
    return null;
  }
}

/**
 * @param {Session | null} next
 * @returns {void}
 */
function writeSession(next) {
  try {
    if (next) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: SESSION_VERSION, ...next }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Nothing persists this session, but the in-memory session still works.
    return;
  }
}

/* ------------------------------------------------------------------ */
/* session state                                                       */
/* ------------------------------------------------------------------ */

/** @returns {void} */
function notify() {
  const user = session ? session.user : null;
  for (const listener of Array.from(listeners)) {
    try {
      listener(user);
    } catch {
      // A broken subscriber must not take down the others.
      continue;
    }
  }
}

/** @returns {void} */
function scheduleExpiry() {
  if (expiryTimer !== null) {
    clearTimeout(expiryTimer);
    expiryTimer = null;
  }
  if (!session || typeof session.exp !== "number") {
    return;
  }
  const delay = session.exp * 1000 - Date.now();
  if (delay <= 0 || delay > MAX_TIMEOUT) {
    return;
  }
  expiryTimer = setTimeout(() => {
    expiryTimer = null;
    if (session && isExpired(session)) {
      setSession(null);
    }
  }, delay);
}

/**
 * @param {Session | null} next
 * @param {boolean} [persist]
 * @returns {void}
 */
function setSession(next, persist = true) {
  session = next;
  if (persist) {
    writeSession(next);
  }
  scheduleExpiry();
  notify();
}

/* ------------------------------------------------------------------ */
/* Google Identity Services                                            */
/* ------------------------------------------------------------------ */

/** @returns {GoogleIdentity | null} */
function getGis() {
  const holder = /** @type {{ google?: GoogleIdentity }} */ (/** @type {unknown} */ (window));
  const gis = holder.google;
  return gis && gis.accounts && gis.accounts.id ? gis : null;
}

/**
 * Injects the GIS script the first time it's actually needed.
 * @returns {Promise<GoogleIdentity>}
 */
function loadGis() {
  if (gisPromise) {
    return gisPromise;
  }
  gisPromise = new Promise((resolve, reject) => {
    const ready = getGis();
    if (ready) {
      resolve(ready);
      return;
    }
    // Poll as well as listen: if the script tag was already in the page and had
    // finished loading before we got here, no "load" event is ever coming.
    let waited = 0;
    const poll = setInterval(() => {
      waited += GIS_POLL_MS;
      const gis = getGis();
      if (gis) {
        clearInterval(poll);
        resolve(gis);
      } else if (waited >= GIS_TIMEOUT_MS) {
        clearInterval(poll);
        reject(new Error("Google Identity Services did not load in time."));
      }
    }, GIS_POLL_MS);

    const existing = document.querySelector(`script[src="${GIS_SRC}"]`);
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement("script");
    script.addEventListener("load", () => {
      const gis = getGis();
      if (gis) {
        clearInterval(poll);
        resolve(gis);
      }
    });
    script.addEventListener("error", () => {
      clearInterval(poll);
      reject(new Error("Could not load Google Identity Services."));
    });
    if (!existing) {
      script.src = GIS_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  });
  return gisPromise;
}

/**
 * @param {unknown} token
 * @returns {Record<string, unknown> | null}
 */
function decodeJwtPayload(token) {
  const parts = str(token).split(".");
  if (parts.length < 2 || parts[1] === "") {
    return null;
  }
  let base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  try {
    // atob yields one char per byte; decode those bytes as UTF-8 so names with
    // accents, CJK characters or emoji survive intact.
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes));
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * @param {{ credential?: unknown }} response
 * @returns {void}
 */
function handleCredential(response) {
  const payload = decodeJwtPayload(response && response.credential);
  if (!payload) {
    return;
  }
  const sub = str(payload.sub).trim();
  if (sub === "") {
    return;
  }
  const email = str(payload.email);
  const name = str(payload.name).trim() || str(payload.given_name).trim() || email.split("@")[0] || "Learner";
  const exp = typeof payload.exp === "number" && Number.isFinite(payload.exp) ? payload.exp : null;
  setSession({
    exp,
    user: {
      id: `google-${sub}`,
      name,
      email,
      picture: str(payload.picture),
      guest: false,
    },
  });
}

/**
 * Loads GIS and calls `initialize` exactly once.
 * @returns {Promise<GoogleIdentity>}
 */
function ensureGis() {
  const id = clientId();
  if (id === "") {
    return Promise.reject(new Error("No Google client id configured."));
  }
  return loadGis().then((gis) => {
    if (!gisInitialised) {
      gis.accounts.id.initialize({
        client_id: id,
        callback: handleCredential,
        auto_select: false,
        cancel_on_tap_outside: true,
        ux_mode: "popup",
      });
      gisInitialised = true;
    }
    return gis;
  });
}

/* ------------------------------------------------------------------ */
/* public API                                                          */
/* ------------------------------------------------------------------ */

/**
 * Restores any saved session and warms up Google Identity Services. Safe to
 * call from every page and safe to call more than once. Never throws, and never
 * blocks rendering. A missing or broken client id just means Google sign-in is
 * unavailable while guest mode carries on working.
 *
 * @returns {void}
 */
export function initAuth() {
  if (started) {
    return;
  }
  started = true;
  const restored = readSession();
  if (restored && !isExpired(restored)) {
    setSession(restored, false);
  } else if (restored) {
    setSession(null);
  }
  if (clientId() !== "") {
    ensureGis().catch(() => {
      // Offline, blocked, or misconfigured. Guest mode is unaffected.
    });
  }
}

/**
 * @returns {User | null} the signed-in user, or null for a signed-out visitor
 */
export function getUser() {
  if (!started) {
    initAuth();
  }
  if (session && isExpired(session)) {
    setSession(null);
  }
  return session ? session.user : null;
}

/**
 * Signs in without Google. Guest progress is namespaced under the id "guest",
 * so it survives across visits on this device but is kept separate from any
 * Google account's progress.
 *
 * @param {string} [name]
 * @returns {User}
 */
export function signInAsGuest(name) {
  /** @type {User} */
  const user = {
    id: GUEST_ID,
    name: (typeof name === "string" ? name.trim() : "") || "Guest learner",
    email: "",
    picture: "",
    guest: true,
  };
  setSession({ user, exp: null });
  return user;
}

/** @returns {void} */
export function signOut() {
  const gis = getGis();
  if (gis) {
    try {
      gis.accounts.id.disableAutoSelect();
    } catch {
      // Not fatal. We clear our own session regardless.
    }
  }
  setSession(null);
}

/**
 * Subscribes to sign-in / sign-out. The callback fires immediately with the
 * current user so subscribers never have to special-case first render.
 *
 * @param {(user: User | null) => void} cb
 * @returns {() => void} unsubscribe
 */
export function onAuthChange(cb) {
  if (typeof cb !== "function") {
    return () => {};
  }
  listeners.add(cb);
  try {
    cb(getUser());
  } catch {
    // Ignore a throwing subscriber; it stays subscribed.
  }
  return () => {
    listeners.delete(cb);
  };
}

/**
 * @param {string} text
 * @returns {HTMLParagraphElement}
 */
function note(text) {
  const el = document.createElement("p");
  el.className = "auth-note";
  el.textContent = text;
  return el;
}

/**
 * Renders the real Google sign-in button into `el`. When no client id is
 * configured (or the script can't load) it renders a short explanatory note
 * instead. It never throws and never blocks guest sign-in.
 *
 * @param {HTMLElement} el
 * @returns {void}
 */
export function mountGoogleButton(el) {
  if (!(el instanceof HTMLElement)) {
    return;
  }
  el.replaceChildren();
  if (clientId() === "") {
    el.appendChild(note("Google sign-in isn't set up yet. Carry on as a guest."));
    return;
  }
  const slot = document.createElement("div");
  slot.className = "auth-google-slot";
  el.appendChild(slot);
  ensureGis()
    .then((gis) => {
      gis.accounts.id.renderButton(slot, {
        type: "standard",
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "signin_with",
        logo_alignment: "left",
      });
    })
    .catch(() => {
      el.replaceChildren();
      el.appendChild(note("Google sign-in couldn't load. Carry on as a guest."));
    });
}

/* ------------------------------------------------------------------ */
/* header control                                                      */
/* ------------------------------------------------------------------ */

/**
 * Structural-only fallback styling, injected once. Every selector is wrapped in
 * `:where(...)` so it has zero specificity: any rule in learn.css wins without
 * needing `!important`. Nothing here is decorative. It only stops the dropdown
 * from rendering as a stack of loose links before the stylesheet lands.
 *
 * @returns {void}
 */
function ensureNavStyles() {
  if (document.querySelector("style[data-auth-styles]")) {
    return;
  }
  const style = document.createElement("style");
  style.setAttribute("data-auth-styles", "");
  style.textContent = [
    ":where(.auth-nav){position:relative;display:inline-flex;align-items:center}",
    ":where(.auth-user){display:inline-flex;align-items:center;gap:8px;cursor:pointer;",
    "border:0;background:transparent;font:inherit;padding:4px 6px;border-radius:999px}",
    ":where(.auth-avatar){width:28px;height:28px;border-radius:50%;object-fit:cover;flex:0 0 auto}",
    ":where(.auth-avatar--initial){display:inline-flex;align-items:center;justify-content:center;",
    "font-weight:700;font-size:13px;background:#d9e8f6;color:#0b2447}",
    ":where(.auth-menu){position:absolute;top:calc(100% + 8px);right:0;z-index:60;min-width:170px;",
    "display:flex;flex-direction:column;background:#fff;border-radius:12px;padding:6px;",
    "box-shadow:0 12px 30px rgba(11,36,71,0.18)}",
    ":where(.auth-menu[hidden]){display:none}",
    ":where(.auth-menu__item){display:block;width:100%;text-align:left;padding:9px 12px;",
    "border:0;background:transparent;font:inherit;color:#0b2447;text-decoration:none;",
    "border-radius:8px;cursor:pointer}",
    ":where(.auth-menu__item:hover),:where(.auth-menu__item:focus-visible){background:#d9e8f6}",
    ":where(.auth-menu__item--signout){margin-top:5px;padding-top:10px;",
    "border-top:1px solid #d9e8f6;color:#5a6b80}",
  ].join("");
  document.head.appendChild(style);
}

/**
 * @param {User} user
 * @returns {HTMLElement}
 */
function avatarFor(user) {
  if (user.picture !== "") {
    const img = document.createElement("img");
    img.className = "auth-avatar";
    img.src = user.picture;
    img.alt = "";
    img.width = 28;
    img.height = 28;
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => {
      img.replaceWith(initialAvatar(user.name));
    });
    return img;
  }
  return initialAvatar(user.name);
}

/**
 * @param {string} name
 * @returns {HTMLElement}
 */
function initialAvatar(name) {
  const span = document.createElement("span");
  span.className = "auth-avatar auth-avatar--initial";
  span.setAttribute("aria-hidden", "true");
  span.textContent = (name.trim()[0] || "?").toUpperCase();
  return span;
}

/**
 * @param {HTMLElement} el
 * @param {User | null} user
 * @returns {void}
 */
function renderAuthNav(el, user) {
  const stale = navControllers.get(el);
  if (stale) {
    stale.abort();
    navControllers.delete(el);
  }
  el.replaceChildren();
  if (!user) {
    const link = document.createElement("a");
    link.className = "auth-link";
    link.href = LEARN_URL;
    link.textContent = "Sign in";
    el.appendChild(link);
    return;
  }

  ensureNavStyles();
  const wrap = document.createElement("div");
  wrap.className = "auth-nav";

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "auth-user";
  toggle.setAttribute("aria-haspopup", "true");
  toggle.setAttribute("aria-expanded", "false");
  toggle.appendChild(avatarFor(user));
  const label = document.createElement("span");
  label.className = "auth-user__name";
  label.textContent = user.name.split(" ")[0] || user.name;
  toggle.appendChild(label);

  const menu = document.createElement("div");
  menu.className = "auth-menu";
  menu.hidden = true;

  const profile = document.createElement("a");
  profile.className = "auth-menu__item";
  profile.href = PROFILE_URL;
  profile.textContent = "Profile";

  const learn = document.createElement("a");
  learn.className = "auth-menu__item";
  learn.href = LEARN_URL;
  learn.textContent = "My Learning";

  const out = document.createElement("button");
  out.type = "button";
  out.className = "auth-menu__item auth-menu__item--signout";
  out.textContent = "Sign out";

  menu.append(profile, learn, out);
  wrap.append(toggle, menu);
  el.appendChild(wrap);

  /** @param {boolean} open */
  const setOpen = (open) => {
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  };

  const controller = new AbortController();
  navControllers.set(el, controller);
  const { signal } = controller;

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(menu.hidden !== false);
  });
  out.addEventListener("click", () => {
    setOpen(false);
    signOut();
  });
  document.addEventListener(
    "click",
    (event) => {
      if (event.target instanceof Node && !wrap.contains(event.target)) {
        setOpen(false);
      }
    },
    { signal },
  );
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    },
    { signal },
  );
}

/**
 * Renders the header auth control into `el` and keeps it in sync: a "Sign in"
 * pill when signed out, or an avatar + first name that opens a small menu with
 * "Profile", "My Learning" and "Sign out".
 *
 * @param {HTMLElement} el
 * @returns {void}
 */
export function mountAuthNav(el) {
  if (!(el instanceof HTMLElement)) {
    return;
  }
  const previous = navMounts.get(el);
  if (previous) {
    previous();
  }
  navMounts.set(
    el,
    onAuthChange((user) => renderAuthNav(el, user)),
  );
}
