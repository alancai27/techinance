// @ts-check

/**
 * Boots the Story Mode player in story.html.
 *
 * Reads `?episode=` from the URL, looks it up in the registry, requires a
 * signed-in (or guest) user, and hands the rest over to the story engine.
 */

import { getUser, initAuth, onAuthChange } from "./auth.js";
import { episode as cyberUnit1 } from "./content/cyber-unit1.js";
import { episode as cyberUnit2 } from "./content/cyber-unit2.js";
import { episode as cyberUnit3 } from "./content/cyber-unit3.js";
import { episode as cyberUnit4 } from "./content/cyber-unit4.js";
import { episode as financeUnit1 } from "./content/finance-unit1.js";
import { episode as financeUnit2 } from "./content/finance-unit2.js";
import { episode as financeUnit4 } from "./content/finance-unit4.js";
import { episode as neuroUnit1 } from "./content/neuro-unit1.js";
import { mountStory } from "./story-engine.js";
import { startProgressSync } from "./progress-sync.js";

/** @typedef {import("./story-engine.js").Episode} Episode */

const DEFAULT_EPISODE_ID = "cyber-u1";
const LEARN_URL = "learn.html";

/** @type {Record<string, Episode>} */
const EPISODES = {
  "cyber-u1": /** @type {Episode} */ (/** @type {unknown} */ (cyberUnit1)),
  "cyber-u2": /** @type {Episode} */ (/** @type {unknown} */ (cyberUnit2)),
  "cyber-u3": /** @type {Episode} */ (/** @type {unknown} */ (cyberUnit3)),
  "cyber-u4": /** @type {Episode} */ (/** @type {unknown} */ (cyberUnit4)),
  "fin-u1": /** @type {Episode} */ (/** @type {unknown} */ (financeUnit1)),
  "fin-u2": /** @type {Episode} */ (/** @type {unknown} */ (financeUnit2)),
  "fin-u4": /** @type {Episode} */ (/** @type {unknown} */ (financeUnit4)),
  "neuro-u1": /** @type {Episode} */ (/** @type {unknown} */ (neuroUnit1)),
};

/**
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
function pick(selector) {
  const found = document.querySelector(selector);
  return found instanceof HTMLElement ? found : null;
}

/**
 * @returns {void}
 */
function goToLearn() {
  window.location.href = LEARN_URL;
}

/**
 * Renders a self-contained message inside the player shell. Used when the
 * requested episode does not exist.
 *
 * @param {HTMLElement} root
 * @param {string} title
 * @param {string} body
 * @returns {void}
 */
function renderMessage(root, title, body) {
  const panel = document.createElement("section");
  panel.className = "story-message";

  const heading = document.createElement("h1");
  heading.className = "story-message__title";
  heading.textContent = title;

  const text = document.createElement("p");
  text.className = "story-message__text";
  text.textContent = body;

  const link = document.createElement("a");
  link.className = "button button--primary story-message__action";
  link.href = LEARN_URL;
  link.textContent = "Back to my learning";

  panel.append(heading, text, link);
  root.replaceChildren(panel);
}

initAuth();
startProgressSync();

const root = pick("#story-root");

if (root) {
  const requested = new URLSearchParams(window.location.search).get("episode");
  const episodeId = requested && requested.trim() !== "" ? requested.trim() : DEFAULT_EPISODE_ID;
  const episode = Object.prototype.hasOwnProperty.call(EPISODES, episodeId)
    ? EPISODES[episodeId]
    : null;
  const user = getUser();

  if (!user) {
    // The player needs a progress namespace, so sign-in comes first.
    window.location.replace(LEARN_URL);
  } else if (!episode) {
    document.title = "Episode not found | Techinance";
    renderMessage(
      root,
      "That episode isn't here yet",
      `We couldn't find an episode called "${episodeId}". It might still be in writing, so pick another one from your learning hub.`,
    );
  } else {
    if (typeof episode.title === "string" && episode.title !== "") {
      document.title = `${episode.title} | Techinance Story Mode`;
    }

    mountStory({
      root,
      episode,
      user,
      onExit: goToLearn,
    });

    // Signing out from another tab should not leave a live session on screen.
    onAuthChange((next) => {
      if (!next) {
        window.location.replace(LEARN_URL);
      }
    });
  }
}
