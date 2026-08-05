import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateLockupLayout,
  countUpValue,
  easeOutCubic,
  formatStatValue,
  parseStatValue,
} from "../animation-math.js";

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

test("parses the stat labels used on the home page", () => {
  assert.deepEqual(parseStatValue("1050+"), {
    prefix: "",
    suffix: "+",
    value: 1050,
    grouped: false,
    decimals: 0,
  });
  assert.deepEqual(parseStatValue("21"), {
    prefix: "",
    suffix: "",
    value: 21,
    grouped: false,
    decimals: 0,
  });
  assert.deepEqual(parseStatValue("25+"), {
    prefix: "",
    suffix: "+",
    value: 25,
    grouped: false,
    decimals: 0,
  });
});

test("keeps prefixes, separators and decimals when parsing", () => {
  const money = parseStatValue("$4.35M");
  assert.equal(money.prefix, "$");
  assert.equal(money.suffix, "M");
  assert.equal(money.value, 4.35);
  assert.equal(money.decimals, 2);

  const grouped = parseStatValue("1,050+");
  assert.equal(grouped.value, 1050);
  assert.equal(grouped.grouped, true);
});

test("returns null when there is nothing to count", () => {
  assert.equal(parseStatValue("Coming soon"), null);
  assert.equal(parseStatValue(""), null);
});

test("rebuilds the label exactly as authored", () => {
  const plain = parseStatValue("1050+");
  assert.equal(formatStatValue(1050, plain), "1050+");
  assert.equal(formatStatValue(812.6, plain), "813+");

  const grouped = parseStatValue("1,050+");
  assert.equal(formatStatValue(1050, grouped), "1,050+");

  const money = parseStatValue("$4.35M");
  assert.equal(formatStatValue(4.35, money), "$4.35M");
});

test("counts up from zero and lands exactly on the target", () => {
  assert.equal(countUpValue(1050, 0), 0);
  assert.equal(countUpValue(1050, 1), 1050);
  assert.ok(countUpValue(1050, 0.5) > 525, "eases out, so past halfway by midpoint");
  assert.ok(countUpValue(1050, 0.5) < 1050);
});

test("easing is clamped so a late frame cannot overshoot", () => {
  assert.equal(easeOutCubic(-0.5), 0);
  assert.equal(easeOutCubic(1.5), 1);
  assert.equal(countUpValue(21, 2), 21);
});
