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
