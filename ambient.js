// @ts-check

/**
 * Injects a decorative ambient blob layer behind page content.
 * Skipped on the story player so it does not compete with immersive UI.
 */
function mountAmbient() {
  if (document.body.classList.contains("story-page")) {
    return;
  }

  if (document.querySelector(".ambient")) {
    return;
  }

  const ambient = document.createElement("div");
  ambient.className = "ambient";
  ambient.setAttribute("aria-hidden", "true");
  ambient.innerHTML =
    '<span class="ambient__blob ambient__blob--a"></span>' +
    '<span class="ambient__blob ambient__blob--b"></span>' +
    '<span class="ambient__blob ambient__blob--c"></span>';
  document.body.prepend(ambient);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountAmbient, { once: true });
} else {
  mountAmbient();
}
