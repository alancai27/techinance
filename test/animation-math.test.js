import assert from "node:assert/strict";
import test from "node:test";

import { calculateLockupLayout } from "../animation-math.js";

test("centers the final logo and wordmark as one lockup", () => {
  const layout = calculateLockupLayout({
    heroLeft: 0,
    heroWidth: 1200,
    wordmarkWidth: 640,
    logoSize: 72,
    gap: 24,
  });

  assert.equal(layout.lockupLeft, 232);
  assert.equal(layout.logoCenterX, 268);
  assert.equal(layout.wordmarkLeft, 328);
  assert.equal(layout.lockupWidth, 736);
});

test("accounts for a hero offset when calculating the landing point", () => {
  const layout = calculateLockupLayout({
    heroLeft: 80,
    heroWidth: 360,
    wordmarkWidth: 220,
    logoSize: 48,
    gap: 12,
  });

  assert.equal(layout.lockupLeft, 120);
  assert.equal(layout.logoCenterX, 144);
  assert.equal(layout.wordmarkLeft, 180);
  assert.equal(layout.lockupWidth, 280);
});
