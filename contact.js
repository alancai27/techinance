// @ts-check

const CONTACT_EMAIL = "thetechinance@gmail.com";

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
 * @returns {HTMLFormElement}
 */
function getFormElement(selector) {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLFormElement)) {
    throw new Error(`Missing required form: ${selector}`);
  }
  return element;
}

const form = getFormElement("[data-contact-form]");
const statusEl = getHtmlElement("[data-contact-status]");

/**
 * @param {string} message
 * @param {boolean} isError
 * @returns {void}
 */
function setStatus(message, isError) {
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.classList.toggle("is-error", isError);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.reportValidity()) {
    setStatus("Please fill out all required fields.", true);
    return;
  }

  const data = new FormData(form);
  const firstName = String(data.get("firstName") ?? "").trim();
  const lastName = String(data.get("lastName") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  const subject = encodeURIComponent(`Techinance contact from ${firstName} ${lastName}`);
  const body = encodeURIComponent(
    `Name: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`,
  );

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  setStatus("Opening your email app to send the message…", false);
  form.reset();
});
