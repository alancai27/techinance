// @ts-check

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

const menuToggle = getButtonElement("[data-menu-toggle]");
const mobileMenu = getHtmlElement("[data-mobile-menu]");

/**
 * @param {boolean} isOpen
 * @returns {void}
 */
function setMobileMenu(isOpen) {
  mobileMenu.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

menuToggle.addEventListener("click", () => {
  setMobileMenu(!mobileMenu.classList.contains("is-open"));
});
mobileMenu.addEventListener("click", () => setMobileMenu(false));
document.addEventListener("click", (event) => {
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
    setMobileMenu(false);
  }
});
