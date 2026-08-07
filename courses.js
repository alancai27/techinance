// @ts-check

/**
 * Course deck on courses.html.
 *
 * One course is shown at a time. The arrows, the dots, the left and right arrow
 * keys, and Home / End all move between them, and the selection wraps at both
 * ends so there is never a dead control.
 *
 * The slides all stay in the DOM. Off-screen ones are marked `inert`, which
 * takes them out of the tab order and hides them from assistive tech without
 * the layout jumping, so tabbing from the deck lands on the visible Enroll
 * button rather than one three slides away.
 */

/**
 * @param {string} selector
 * @param {ParentNode} [scope]
 * @returns {HTMLElement | null}
 */
function pick(selector, scope) {
  const found = (scope ?? document).querySelector(selector);
  return found instanceof HTMLElement ? found : null;
}

const deck = pick("[data-deck]");
const track = pick("[data-deck-track]");
const prev = pick("[data-deck-prev]");
const next = pick("[data-deck-next]");
const dots = pick("[data-deck-dots]");
const count = pick("[data-deck-count]");
const live = pick("[data-deck-live]");

/** @type {HTMLElement[]} */
const slides = [];
if (track) {
  for (const node of track.children) {
    if (node instanceof HTMLElement) {
      slides.push(node);
    }
  }
}

/** @type {HTMLButtonElement[]} */
const dotButtons = [];

let index = 0;

/**
 * @returns {boolean}
 */
function prefersReducedMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * @param {number} value
 * @returns {number} the value wrapped into the slide range
 */
function wrap(value) {
  const total = slides.length;
  return ((value % total) + total) % total;
}

/**
 * @param {HTMLElement} slide
 * @returns {string}
 */
function titleOf(slide) {
  const heading = pick(".slide__title", slide);
  return heading ? heading.textContent ?? "" : "";
}

/**
 * @param {number} to
 * @param {boolean} [announce] whether to update the live region
 * @returns {void}
 */
function show(to, announce) {
  if (!track || slides.length === 0) {
    return;
  }

  index = wrap(to);
  track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;

  slides.forEach((slide, i) => {
    const current = i === index;
    slide.classList.toggle("is-current", current);
    // `inert` keeps off-screen links out of the tab order. Older browsers that
    // don't support it fall back to aria-hidden alone, which is still an
    // improvement over nothing.
    slide.inert = !current;
    slide.setAttribute("aria-hidden", current ? "false" : "true");
  });

  dotButtons.forEach((dot, i) => {
    const current = i === index;
    dot.classList.toggle("is-current", current);
    dot.setAttribute("aria-current", current ? "true" : "false");
    dot.tabIndex = current ? 0 : -1;
  });

  if (count) {
    count.textContent = `${index + 1} of ${slides.length}`;
  }
  if (announce && live) {
    live.textContent = `${titleOf(slides[index])}, ${index + 1} of ${slides.length}`;
  }
}

/**
 * @param {number} delta
 * @returns {void}
 */
function step(delta) {
  show(index + delta, true);
}

/* ------------------------------------------------------------------ *
 * Wiring
 * ------------------------------------------------------------------ */

if (deck && track && slides.length > 0) {
  if (prefersReducedMotion()) {
    track.style.transition = "none";
  }

  if (dots) {
    slides.forEach((slide, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "deck__dot";
      dot.setAttribute("aria-label", `Show ${titleOf(slide)}`);
      dot.addEventListener("click", () => show(i, true));

      const item = document.createElement("li");
      item.appendChild(dot);
      dots.appendChild(item);
      dotButtons.push(dot);
    });
  }

  if (prev instanceof HTMLButtonElement) {
    prev.addEventListener("click", () => step(-1));
  }
  if (next instanceof HTMLButtonElement) {
    next.addEventListener("click", () => step(1));
  }

  // Arrow keys work anywhere on the page, except while someone is typing or
  // using a native control, where the browser's own handling has to win.
  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      (target instanceof HTMLElement && target.isContentEditable)
    ) {
      return;
    }

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        step(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        step(1);
        break;
      case "Home":
        event.preventDefault();
        show(0, true);
        break;
      case "End":
        event.preventDefault();
        show(slides.length - 1, true);
        break;
      default:
        break;
    }
  });

  // Swipe on touch screens, where there are no arrow keys to press.
  let touchStartX = 0;
  let touchStartY = 0;

  track.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.changedTouches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (event) => {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStartX;
      const dy = touch.clientY - touchStartY;
      // Ignore anything that looks more like a vertical scroll than a swipe.
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        step(dx < 0 ? 1 : -1);
      }
    },
    { passive: true },
  );

  show(0, false);
}
