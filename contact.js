// @ts-check

const CONTACT_EMAIL = "thetechinance@gmail.com";
const FORM_SUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

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

/**
 * @param {string} selector
 * @returns {HTMLButtonElement}
 */
function getSubmitButton(selector) {
  const element = document.querySelector(selector);
  if (!(element instanceof HTMLButtonElement)) {
    throw new Error(`Missing required submit button: ${selector}`);
  }
  return element;
}

const form = getFormElement("[data-contact-form]");
const statusEl = getHtmlElement("[data-contact-status]");
const submitButton = getSubmitButton("[data-contact-submit]");

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

/**
 * @param {boolean} isSubmitting
 * @returns {void}
 */
function setSubmitting(isSubmitting) {
  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting ? "Sending…" : "Submit";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  void handleSubmit();
});

/**
 * @returns {Promise<void>}
 */
async function handleSubmit() {
  if (!form.reportValidity()) {
    setStatus("Please fill out all required fields.", true);
    return;
  }

  const data = new FormData(form);
  const firstName = String(data.get("firstName") ?? "").trim();
  const lastName = String(data.get("lastName") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  setSubmitting(true);
  setStatus("Sending your message…", false);

  try {
    const response = await fetch(FORM_SUBMIT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email,
        message,
        _subject: `Techinance contact from ${firstName} ${lastName}`,
        _replyto: email,
        _captcha: "false",
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      const errorMessage =
        typeof payload.message === "string"
          ? payload.message
          : "We could not send your message. Please try again or email us directly.";
      setStatus(errorMessage, true);
      return;
    }

    setStatus("Thanks! Your message was sent. We will get back to you soon.", false);
    form.reset();
  } catch {
    setStatus(
      `Something went wrong. Please email us directly at ${CONTACT_EMAIL}.`,
      true,
    );
  } finally {
    setSubmitting(false);
  }
}
