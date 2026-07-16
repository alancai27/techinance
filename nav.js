// @ts-check

const hoverMedia = window.matchMedia("(hover: hover)");

/**
 * @param {string} selector
 * @returns {HTMLElement}
 */
function getHtmlElement(selector) {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLElement)) {
    throw new Error(`Missing required element: ${selector}`);
  }
  return element;
}

/**
 * @param {string} selector
 * @returns {HTMLButtonElement}
 */
function getButtonElement(selector) {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLButtonElement)) {
    throw new Error(`Missing required button: ${selector}`);
  }
  return element;
}

const moreMenu = getHtmlElement("[data-more-menu]");
const moreTrigger = getButtonElement("[data-more-trigger]");
const menuToggle = getButtonElement("[data-menu-toggle]");
const mobileMenu = getHtmlElement("[data-mobile-menu]");

/**
 * @param {boolean} isOpen
 * @returns {void}
 */
function setMoreMenu(isOpen) {
  moreMenu.classList.toggle("is-open", isOpen);
  moreTrigger.setAttribute("aria-expanded", String(isOpen));
}

/**
 * @param {boolean} isOpen
 * @returns {void}
 */
function setMobileMenu(isOpen) {
  mobileMenu.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

moreTrigger.addEventListener("click", (event) => {
  if (hoverMedia.matches && event.detail > 0) {
    setMoreMenu(true);
    return;
  }
  setMoreMenu(!moreMenu.classList.contains("is-open"));
});
moreMenu.addEventListener("pointerenter", () => {
  if (hoverMedia.matches) setMoreMenu(true);
});
moreMenu.addEventListener("pointerleave", () => {
  if (hoverMedia.matches) setMoreMenu(false);
});
moreMenu.addEventListener("focusin", () => {
  if (hoverMedia.matches) setMoreMenu(true);
});
moreMenu.addEventListener("focusout", () => {
  window.setTimeout(() => setMoreMenu(moreMenu.contains(document.activeElement)), 0);
});
menuToggle.addEventListener("click", () => {
  setMobileMenu(!mobileMenu.classList.contains("is-open"));
});
mobileMenu.addEventListener("click", () => setMobileMenu(false));
document.addEventListener("click", (event) => {
  if (event.target instanceof Node && !moreMenu.contains(event.target)) {
    setMoreMenu(false);
  }
  if (
    event.target instanceof Node &&
    !mobileMenu.contains(event.target) &&
    !menuToggle.contains(event.target)
  ) {
    setMobileMenu(false);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMoreMenu(false);
    setMobileMenu(false);
    moreTrigger.focus();
  }
});
