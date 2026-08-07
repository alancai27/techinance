// @ts-check

/**
 * @typedef {object} LockupMeasurements
 * @property {number} heroLeft
 * @property {number} heroWidth
 * @property {number} wordmarkWidth
 * @property {number} logoSize
 * @property {number} gap
 */

/**
 * @typedef {object} LockupLayout
 * @property {number} lockupLeft
 * @property {number} logoCenterX
 * @property {number} wordmarkLeft
 * @property {number} lockupWidth
 */

/**
 * Calculates the exact final geometry for the centered hero lockup.
 *
 * @param {LockupMeasurements} measurements
 * @returns {LockupLayout}
 */
export function calculateLockupLayout(measurements) {
  const lockupWidth =
    measurements.logoSize + measurements.gap + measurements.wordmarkWidth;
  const lockupLeft =
    measurements.heroLeft + (measurements.heroWidth - lockupWidth) / 2;

  return {
    lockupLeft,
    logoCenterX: lockupLeft + measurements.logoSize / 2,
    wordmarkLeft:
      lockupLeft + measurements.logoSize + measurements.gap,
    lockupWidth,
  };
}

/**
 * @typedef {object} StatValue
 * @property {string} prefix text before the number, e.g. "$"
 * @property {string} suffix text after the number, e.g. "+"
 * @property {number} value
 * @property {boolean} grouped whether the source used thousands separators
 * @property {number} decimals digits after the decimal point in the source
 */

/**
 * Splits a rendered stat like "1050+" into the parts a counter needs, so the
 * animation can rebuild the label exactly as it was authored.
 *
 * @param {string} raw
 * @returns {StatValue | null} null when there is no number to count
 */
export function parseStatValue(raw) {
  const match = /^([^\d]*)(\d[\d,]*(?:\.\d+)?)([^\d]*)$/.exec(raw.trim());
  if (!match) {
    return null;
  }

  const [, prefix, digits, suffix] = match;
  const value = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(value)) {
    return null;
  }

  const decimalPart = digits.split(".")[1];

  return {
    prefix,
    suffix,
    value,
    grouped: digits.includes(","),
    decimals: decimalPart ? decimalPart.length : 0,
  };
}

/**
 * Rebuilds the label for a given count, preserving the source formatting.
 *
 * @param {number} value
 * @param {StatValue} shape
 * @returns {string}
 */
export function formatStatValue(value, shape) {
  const rounded = shape.decimals > 0 ? value : Math.round(value);
  const body = shape.grouped
    ? rounded.toLocaleString("en-US", {
        minimumFractionDigits: shape.decimals,
        maximumFractionDigits: shape.decimals,
      })
    : rounded.toFixed(shape.decimals);

  return `${shape.prefix}${body}${shape.suffix}`;
}

/**
 * Decelerating easing. Counters that ease out feel like they are settling on a
 * figure rather than stopping dead.
 *
 * @param {number} t progress from 0 to 1
 * @returns {number}
 */
export function easeOutCubic(t) {
  const clamped = Math.min(Math.max(t, 0), 1);
  return 1 - (1 - clamped) ** 3;
}

/**
 * The value a counter should display at a point in its run.
 *
 * @param {number} target
 * @param {number} progress 0 to 1
 * @returns {number}
 */
export function countUpValue(target, progress) {
  return target * easeOutCubic(progress);
}
