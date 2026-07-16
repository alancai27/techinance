// @ts-check

import { calculateLockupLayout } from "./animation-math.js";

const HERO_TIMING = {
  openingBeat: 450,
  firstHop: 430,
  secondHop: 560,
  anticipation: 150,
  launch: 900,
  reveal: 520,
};
/** Fallback size only; live position sits flush against the stem top. */
const I_DOT_SIZE_EM = 0.036;
const I_DOT_SIZE_SCALE = 0.36;
/**
 * Finds the optical center/size of the i-dot, parked just above the live ı stem.
 *
 * @param {number} fontSize
 * @param {string} font
 * @param {DOMRect} iRect
 * @returns {{x: number, y: number, size: number}}
 */
function measureITittleInIBox(fontSize, font, iRect) {
  const canvas = document.createElement("canvas");
  const maybeContext = canvas.getContext("2d", { willReadFrequently: true });
  const fallbackSize = fontSize * I_DOT_SIZE_EM;
  if (!maybeContext) {
    return { x: iRect.width / 2, y: fontSize * 0.12, size: fallbackSize };
  }
  const context = maybeContext;

  const pad = Math.ceil(fontSize);
  canvas.width = Math.ceil(fontSize * 2) + pad * 2;
  canvas.height = Math.ceil(fontSize * 2) + pad * 2;
  context.font = font;
  context.textBaseline = "alphabetic";
  context.fillStyle = "#000";
  const canvasBaseline = pad + fontSize;

  /**
   * @param {string} glyph
   * @returns {Uint8ClampedArray}
   */
  function rasterize(glyph) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText(glyph, pad, canvasBaseline);
    return context.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  const dottedData = rasterize("i");
  const dotlessData = rasterize("ı");
  const metrics = context.measureText("ı");

  /** @type {number[]} */
  const tittleXs = [];
  /** @type {number[]} */
  const tittleYs = [];
  let stemTop = canvas.height;
  let stemLeft = canvas.width;
  let stemRight = 0;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const index = (y * canvas.width + x) * 4 + 3;
      const dottedAlpha = dottedData[index] ?? 0;
      const dotlessAlpha = dotlessData[index] ?? 0;
      if (dottedAlpha > 30 && dotlessAlpha < 20) {
        tittleXs.push(x);
        tittleYs.push(y);
      }
      if (dotlessAlpha > 30) {
        stemTop = Math.min(stemTop, y);
        stemLeft = Math.min(stemLeft, x);
        stemRight = Math.max(stemRight, x);
      }
    }
  }

  if (stemRight <= stemLeft) {
    return { x: iRect.width / 2, y: fontSize * 0.12, size: fallbackSize };
  }

  /**
   * @param {number[]} values
   * @returns {number}
   */
  const avg = (values) => values.reduce((sum, value) => sum + value, 0) / values.length;
  const stemWidth = stemRight - stemLeft;
  const stemCenterX = (stemLeft + stemRight) / 2;
  const tittleSize =
    tittleXs.length > 0
      ? Math.max(
          Math.max(...tittleXs) - Math.min(...tittleXs),
          Math.max(...tittleYs) - Math.min(...tittleYs),
        )
      : fallbackSize;
  const centerXCanvas = tittleXs.length > 0 ? avg(tittleXs) : stemCenterX;

  const textNode = [...dotlessI.childNodes].find(
    (node) => node.nodeType === Node.TEXT_NODE && (node.textContent ?? "").includes("ı"),
  );

  // Probe the live baseline, then step up by the glyph's actual stem ascent.
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "display:inline-block;width:0;height:0;overflow:hidden;vertical-align:baseline;";
  if (textNode) {
    dotlessI.insertBefore(probe, textNode);
  } else {
    dotlessI.insertBefore(probe, dotlessI.firstChild);
  }
  const baselineY = probe.getBoundingClientRect().top;
  probe.remove();

  const range = document.createRange();
  if (textNode) {
    range.selectNodeContents(textNode);
  } else {
    range.selectNodeContents(dotlessI);
  }
  const glyphRect = range.getBoundingClientRect();
  const scale = stemWidth > 0 ? glyphRect.width / stemWidth : 1;
  const size = Math.max(tittleSize * scale * I_DOT_SIZE_SCALE, fallbackSize * 0.85);

  const stemAscent =
    metrics.actualBoundingBoxAscent > 0
      ? metrics.actualBoundingBoxAscent
      : canvasBaseline - stemTop;
  const stemTopY = baselineY - iRect.top - stemAscent;
  // Park the dot above the stem with a clear breathing gap.
  const y = stemTopY - size / 2 - Math.max(4, fontSize * 0.07);

  return {
    x: glyphRect.left - iRect.left + (centerXCanvas - stemLeft) * scale,
    y,
    size,
  };
}

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

const stage = getHtmlElement("[data-stage]");
const lockup = getHtmlElement("[data-lockup]");
const wordmark = getHtmlElement("[data-wordmark]");
const dotlessI = getHtmlElement("[data-i]");
const iDot = getHtmlElement("[data-i-dot]");
const logoSlot = getHtmlElement("[data-logo-slot]");
const flyer = getHtmlElement("[data-flyer]");
const flyerDot = getHtmlElement("[data-flyer-dot]");
const flyerLogo = getHtmlElement("[data-flyer-logo]");
const heroLogo = getButtonElement("[data-hero-logo]");
const heroContent = getHtmlElement("[data-hero-content]");
const header = getHtmlElement("[data-header]");

/** @typedef {{fontSize: number, logoSize: number, gap: number, dotScale: number, startX: number, startY: number, targetX: number, targetY: number, wordLeft: number, wordTop: number, finalLeft: number}} HeroGeometry */

/** @type {Animation[]} */
let activeAnimations = [];
let animationRun = 0;
let isAnimating = false;
let resizeTimer = 0;

/**
 * @param {number} x
 * @param {number} y
 * @param {number} scaleX
 * @param {number} scaleY
 * @param {number} rotation
 * @returns {string}
 */
function logoTransform(x, y, scaleX, scaleY, rotation) {
  return `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
}

/**
 * @param {Element} element
 * @param {Keyframe[]} keyframes
 * @param {KeyframeAnimationOptions} options
 * @returns {Promise<void>}
 */
async function animate(element, keyframes, options) {
  const animation = element.animate(keyframes, {
    fill: "forwards",
    ...options,
  });
  activeAnimations.push(animation);

  try {
    await animation.finished;
  } catch (error) {
    if (!(error instanceof DOMException && error.name === "AbortError")) {
      throw error;
    }
  }
}

/**
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */
function wait(milliseconds) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

/**
 * @returns {HeroGeometry}
 */
function measureHero() {
  const stageRect = stage.getBoundingClientRect();
  const wordRect = wordmark.getBoundingClientRect();
  const iRect = dotlessI.getBoundingClientRect();
  const wordStyle = getComputedStyle(wordmark);
  const fontSize = Number.parseFloat(wordStyle.fontSize);
  const logoSize = fontSize * 0.58;
  const gap = fontSize * 0.18;
  const font = `${wordStyle.fontWeight} ${fontSize}px ${wordStyle.fontFamily}`;
  const tittle = measureITittleInIBox(fontSize, font, iRect);
  const layout = calculateLockupLayout({
    heroLeft: 0,
    heroWidth: stageRect.width,
    wordmarkWidth: wordRect.width,
    logoSize,
    gap,
  });

  document.documentElement.style.setProperty("--logo-size", `${logoSize}px`);
  document.documentElement.style.setProperty("--lockup-gap", `${gap}px`);
  iDot.style.left = `${tittle.x}px`;
  iDot.style.top = `${tittle.y}px`;
  iDot.style.width = `${tittle.size}px`;
  iDot.style.height = `${tittle.size}px`;

  const wordLeft = (stageRect.width - wordRect.width) / 2;
  const wordTop = (stageRect.height - wordRect.height) / 2;
  const iOffsetLeft = iRect.left - wordRect.left;
  const iOffsetTop = iRect.top - wordRect.top;

  return {
    fontSize,
    logoSize,
    gap,
    dotScale: tittle.size / logoSize,
    startX: wordLeft + iOffsetLeft + tittle.x,
    startY: wordTop + iOffsetTop + tittle.y,
    targetX: layout.logoCenterX,
    targetY: stageRect.height / 2,
    wordLeft,
    wordTop,
    finalLeft: layout.lockupLeft,
  };
}

/**
 * @param {HeroGeometry} geometry
 * @returns {void}
 */
function setIntroState(geometry) {
  document.body.classList.add("is-loading");
  logoSlot.style.width = "0px";
  lockup.style.columnGap = "0px";
  lockup.style.left = `${geometry.wordLeft}px`;
  lockup.style.top = `${geometry.wordTop}px`;
  lockup.style.transform = "none";
  wordmark.style.transform = "none";
  iDot.style.transform = "translate(-50%, -50%) scale(0)";
  flyerDot.style.opacity = "1";
  flyerLogo.style.opacity = "0";
  flyer.style.display = "block";
  flyer.style.transform = logoTransform(
    geometry.startX - geometry.logoSize / 2,
    geometry.startY - geometry.logoSize / 2,
    geometry.dotScale,
    geometry.dotScale,
    0,
  );
  flyer.style.visibility = "visible";
  flyer.style.opacity = "1";
  heroLogo.style.opacity = "0";
  heroLogo.disabled = true;
  header.style.visibility = "hidden";
  heroContent.style.visibility = "hidden";
}

/**
 * @param {HeroGeometry} geometry
 * @returns {void}
 */
function setFinalState(geometry) {
  logoSlot.style.width = `${geometry.logoSize}px`;
  lockup.style.columnGap = `${geometry.gap}px`;
  lockup.style.left = `${geometry.finalLeft}px`;
  lockup.style.top = `${geometry.wordTop}px`;
  lockup.style.transform = "none";
  wordmark.style.transform = "none";
  iDot.style.transform = "translate(-50%, -50%) scale(1)";
  flyerDot.style.opacity = "0";
  flyerLogo.style.opacity = "1";
  flyer.style.display = "none";
  heroLogo.style.opacity = "1";
  heroLogo.disabled = false;
  header.style.removeProperty("visibility");
  header.style.removeProperty("transform");
  heroContent.style.removeProperty("visibility");
  heroContent.style.removeProperty("opacity");
  heroContent.style.removeProperty("transform");
  document.body.classList.remove("is-loading");
}

/**
 * @param {HeroGeometry} geometry
 * @returns {Promise<void>}
 */
async function animateHops(geometry) {
  const baseX = geometry.startX - geometry.logoSize / 2;
  const baseY = geometry.startY - geometry.logoSize / 2;
  const scale = geometry.dotScale;

  await animate(
    flyer,
    [
      { offset: 0, transform: logoTransform(baseX, baseY, scale, scale, 0) },
      { offset: 0.12, transform: logoTransform(baseX, baseY, scale * 1.14, scale * 0.82, 0) },
      { offset: 0.48, transform: logoTransform(baseX, baseY - geometry.fontSize * 0.29, scale * 0.86, scale * 1.18, -2) },
      { offset: 0.7, transform: logoTransform(baseX, baseY - geometry.fontSize * 0.33, scale, scale, 1) },
      { offset: 0.9, transform: logoTransform(baseX, baseY, scale * 1.27, scale * 0.72, 0) },
      { offset: 1, transform: logoTransform(baseX, baseY, scale, scale, 0) },
    ],
    { duration: HERO_TIMING.firstHop, easing: "linear" },
  );

  await Promise.all([
    animate(
      flyer,
      [
        { offset: 0, transform: logoTransform(baseX, baseY, scale, scale, 0) },
        { offset: 0.1, transform: logoTransform(baseX, baseY, scale * 1.16, scale * 0.8, 0) },
        { offset: 0.46, transform: logoTransform(baseX, baseY - geometry.fontSize * 0.46, scale * 0.82, scale * 1.22, 3) },
        { offset: 0.67, transform: logoTransform(baseX, baseY - geometry.fontSize * 0.5, scale, scale, -1) },
        { offset: 0.88, transform: logoTransform(baseX, baseY, scale * 1.36, scale * 0.64, 0) },
        { offset: 1, transform: logoTransform(baseX, baseY, scale, scale, 0) },
      ],
      { duration: HERO_TIMING.secondHop, easing: "linear" },
    ),
    animate(
      wordmark,
      [
        { offset: 0, transform: "translateY(0)" },
        { offset: 0.82, transform: "translateY(0)" },
        { offset: 0.9, transform: "translateY(4px) scaleY(0.985)" },
        { offset: 1, transform: "translateY(0)" },
      ],
      { duration: HERO_TIMING.secondHop, easing: "ease-out" },
    ),
  ]);
}

/**
 * @param {HeroGeometry} geometry
 * @returns {Promise<void>}
 */
async function animateLaunch(geometry) {
  const baseX = geometry.startX - geometry.logoSize / 2;
  const baseY = geometry.startY - geometry.logoSize / 2;
  const targetX = geometry.targetX - geometry.logoSize / 2;
  const targetY = geometry.targetY - geometry.logoSize / 2;
  const scale = geometry.dotScale;
  const arcX = Math.min(baseX, targetX) - geometry.fontSize * 0.2;
  const arcY = Math.min(baseY, targetY) - geometry.fontSize * 1.1;

  await animate(
    flyer,
    [
      { transform: logoTransform(baseX, baseY, scale, scale, 0) },
      { transform: logoTransform(baseX, baseY + geometry.fontSize * 0.025, scale * 1.34, scale * 0.66, -1) },
    ],
    { duration: HERO_TIMING.anticipation, easing: "cubic-bezier(0.55, 0, 0.8, 0.35)" },
  );

  await Promise.all([
    animate(
      iDot,
      [
        { offset: 0, transform: "translate(-50%, -50%) scale(0)" },
        { offset: 0.28, transform: "translate(-50%, -50%) scale(0)" },
        { offset: 0.62, transform: "translate(-50%, -50%) scale(1.28)" },
        { offset: 0.82, transform: "translate(-50%, -50%) scale(0.9)" },
        { offset: 1, transform: "translate(-50%, -50%) scale(1)" },
      ],
      { duration: HERO_TIMING.launch, easing: "linear" },
    ),
    animate(
      flyerDot,
      [
        { offset: 0, opacity: 1 },
        { offset: 0.22, opacity: 1 },
        { offset: 0.5, opacity: 0 },
        { offset: 1, opacity: 0 },
      ],
      { duration: HERO_TIMING.launch, easing: "linear" },
    ),
    animate(
      flyerLogo,
      [
        { offset: 0, opacity: 0 },
        { offset: 0.22, opacity: 0 },
        { offset: 0.5, opacity: 1 },
        { offset: 1, opacity: 1 },
      ],
      { duration: HERO_TIMING.launch, easing: "linear" },
    ),
    animate(
      flyer,
      [
        { offset: 0, transform: logoTransform(baseX, baseY, scale * 1.34, scale * 0.66, -1) },
        { offset: 0.34, transform: logoTransform(arcX, arcY, 0.46, 0.62, -8) },
        { offset: 0.66, transform: logoTransform(targetX - geometry.fontSize * 0.13, targetY - geometry.fontSize * 0.62, 0.84, 0.98, 5) },
        { offset: 0.84, transform: logoTransform(targetX, targetY, 1.16, 0.78, 0) },
        { offset: 0.93, transform: logoTransform(targetX, targetY - geometry.fontSize * 0.035, 0.96, 1.06, 0) },
        { offset: 1, transform: logoTransform(targetX, targetY, 1, 1, 0) },
      ],
      { duration: HERO_TIMING.launch, easing: "linear" },
    ),
    animate(
      logoSlot,
      [{ width: "0px" }, { width: `${geometry.logoSize}px` }],
      {
        duration: HERO_TIMING.launch * 0.74,
        delay: HERO_TIMING.launch * 0.12,
        easing: "cubic-bezier(0.34, 1.45, 0.5, 1)",
      },
    ),
    animate(
      lockup,
      [
        { left: `${geometry.wordLeft}px`, columnGap: "0px" },
        { left: `${geometry.finalLeft - geometry.fontSize * 0.018}px`, columnGap: `${geometry.gap * 1.06}px`, offset: 0.84 },
        { left: `${geometry.finalLeft}px`, columnGap: `${geometry.gap}px` },
      ],
      {
        duration: HERO_TIMING.launch * 0.76,
        delay: HERO_TIMING.launch * 0.1,
        easing: "cubic-bezier(0.34, 1.45, 0.5, 1)",
      },
    ),
    animate(
      wordmark,
      [
        { offset: 0, transform: "rotate(0deg)" },
        { offset: 0.32, transform: "rotate(0deg)" },
        { offset: 0.55, transform: "rotate(0.7deg)" },
        { offset: 0.78, transform: "rotate(-0.4deg)" },
        { offset: 1, transform: "rotate(0deg)" },
      ],
      { duration: HERO_TIMING.launch, easing: "ease-out" },
    ),
  ]);
}

/**
 * @returns {Promise<void>}
 */
async function revealPage() {
  header.style.visibility = "visible";
  header.style.transform = "translateY(-100%)";
  heroContent.style.visibility = "visible";
  heroContent.style.opacity = "0";
  heroContent.style.transform = "translateY(18px)";
  document.body.classList.remove("is-loading");

  await Promise.all([
    animate(
      header,
      [{ transform: "translateY(-100%)" }, { transform: "translateY(0)" }],
      { duration: HERO_TIMING.reveal, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    ),
    animate(
      heroContent,
      [
        { opacity: 0, transform: "translateY(18px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: HERO_TIMING.reveal,
        delay: 90,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    ),
  ]);
}

/**
 * @returns {Promise<void>}
 */
async function playIntro() {
  animationRun += 1;
  const run = animationRun;
  isAnimating = true;
  activeAnimations.forEach((animation) => animation.cancel());
  activeAnimations = [];
  const geometry = measureHero();
  setIntroState(geometry);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setFinalState(geometry);
    isAnimating = false;
    return;
  }

  await wait(HERO_TIMING.openingBeat);
  if (run !== animationRun) return;
  await animateHops(geometry);
  if (run !== animationRun) return;
  await animateLaunch(geometry);
  if (run !== animationRun) return;

  logoSlot.style.width = `${geometry.logoSize}px`;
  lockup.style.left = `${geometry.finalLeft}px`;
  lockup.style.columnGap = `${geometry.gap}px`;
  flyer.style.display = "none";
  heroLogo.style.opacity = "1";
  heroLogo.disabled = false;
  await revealPage();
  isAnimating = false;
}

heroLogo.addEventListener("click", () => {
  void playIntro();
});
window.addEventListener("resize", () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(() => {
    if (!isAnimating) setFinalState(measureHero());
  }, 120);
});

await document.fonts.ready;
await playIntro();
