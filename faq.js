// @ts-check

/**
 * Smooth expand and collapse for the FAQ list on faqs.html.
 *
 * The markup stays as plain `<details>`/`<summary>`, so keyboard, screen
 * readers, and a JS failure all still get a working accordion. This module only
 * intercepts the click to swap the instant snap for a height animation, and it
 * defers dropping the `open` attribute until the closing animation finishes.
 *
 * The chevron is a lucide `<i data-lucide="chevron-down">` placeholder that
 * `createIcons` swaps for a real SVG, same pattern as icons.js.
 */

import { ChevronDown, createIcons } from "lucide";

createIcons({
  attrs: {
    "aria-hidden": "true",
    "stroke-width": 2,
  },
  icons: {
    ChevronDown,
  },
});

const DURATION = 260;
const EASING = "cubic-bezier(0.33, 1, 0.68, 1)";

/**
 * Animations in flight, keyed by the `<details>` they belong to. A second click
 * mid-flight needs to cancel the old one instead of stacking on top of it.
 *
 * @type {WeakMap<HTMLDetailsElement, Animation>}
 */
const running = new WeakMap();

/** @returns {boolean} */
function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * @param {HTMLDetailsElement} faq
 * @returns {HTMLElement | null}
 */
function answerOf(faq) {
  return /** @type {HTMLElement | null} */ (
    faq.querySelector("[data-faq-answer]")
  );
}

/**
 * Slides the answer open or shut, then settles back to its natural height.
 *
 * @param {HTMLDetailsElement} faq
 * @param {boolean} shouldOpen
 * @returns {void}
 */
function slide(faq, shouldOpen) {
  const answer = answerOf(faq);

  if (!answer) {
    faq.open = shouldOpen;
    return;
  }

  // Measure before cancelling: cancelling snaps the element back to its
  // natural height, which would lose the mid-animation starting point. A closed
  // `<details>` can still report a real height (browsers hide the content
  // without collapsing its box), so trust the `open` flag for the shut state.
  const start = faq.open ? answer.getBoundingClientRect().height : 0;
  const inFlight = running.get(faq);

  if (inFlight) {
    running.delete(faq);
    inFlight.cancel();
  }

  // Opening has to set `open` first, otherwise the answer is still display:none
  // and there's nothing to measure.
  if (shouldOpen) {
    faq.open = true;
  }

  const end = shouldOpen ? answer.scrollHeight : 0;

  if (start === end) {
    faq.open = shouldOpen;
    return;
  }

  const animation = answer.animate(
    [{ height: `${start}px` }, { height: `${end}px` }],
    { duration: DURATION, easing: EASING, fill: "forwards" },
  );

  running.set(faq, animation);

  // Settle on the `finished` promise rather than the "finish" event. The event
  // is not reliably dispatched when the document is hidden, which would leave
  // the panel stuck with `open` set and its height frozen at zero. The promise
  // resolves either way, so a backgrounded tab still ends in the right state.
  animation.finished
    .then(() => {
      if (running.get(faq) !== animation) {
        return;
      }

      running.delete(faq);
      // Drop `open` before clearing the fill so the answer never flashes back
      // to full height for a frame.
      faq.open = shouldOpen;
      animation.cancel();
    })
    .catch(() => {
      // cancel() rejects this promise. A newer animation owns the panel now and
      // will set the final state itself, so there is nothing to do here.
    });
}

/**
 * Keeps one answer open at a time.
 *
 * @param {HTMLDetailsElement[]} group
 * @param {HTMLDetailsElement} current
 * @param {boolean} instant
 * @returns {void}
 */
function closeOthers(group, current, instant) {
  for (const other of group) {
    if (other === current || !other.open) {
      continue;
    }

    if (instant) {
      other.open = false;
    } else {
      slide(other, false);
    }
  }
}

const group = Array.from(
  /** @type {NodeListOf<HTMLDetailsElement>} */ (
    document.querySelectorAll("details[data-faq]")
  ),
);

for (const faq of group) {
  const summary = faq.querySelector("summary");

  if (!summary) {
    continue;
  }

  summary.addEventListener("click", (event) => {
    const shouldOpen = !faq.open;

    if (prefersReducedMotion()) {
      // Let the browser toggle it instantly, just tidy up the siblings.
      if (shouldOpen) {
        closeOthers(group, faq, true);
      }
      return;
    }

    event.preventDefault();

    if (shouldOpen) {
      closeOthers(group, faq, false);
    }

    slide(faq, shouldOpen);
  });
}
