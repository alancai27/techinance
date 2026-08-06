import assert from "node:assert/strict";
import test from "node:test";

import { episode as unit1 } from "../content/finance-unit1.js";
import { episode as unit4 } from "../content/finance-unit4.js";

/**
 * The Financial Literacy course has one final quiz covering the whole course,
 * transcribed at content/sources/finance-final-quiz.md.
 *
 * Any question that appears in an episode must match the form exactly: same
 * wording, same options in the same order, same correct answer. A house-style
 * pass over the content files once rewrote a quoted question in Cybersecurity
 * unit 2 and silently dropped it from 10/10 to 8/10, which is what this guards.
 *
 * Ten of the twenty questions cover debt, credit and taxes, which no unit is
 * written for yet. Those are listed in UNWRITTEN and skipped rather than failed,
 * so this file records the gap instead of hiding it.
 */

/** @type {[string, string[], number][]} question, options in form order, index of the correct one */
const FORM = [
  [
    "What is the 50/30/20 budgeting rule?",
    [
      "50% wants, 30% needs, 20% savings",
      "50% needs, 30% wants, 20% savings",
      "50% savings, 30% needs, 20% wants",
      "50% needs, 30% savings, 20% wants",
    ],
    1,
  ],
  [
    "What is the main strategy to combat impulse buying?",
    [
      "Use credit cards only",
      "Shop without a budget",
      "Make a shopping list before going out",
      "Purchase everything on sale",
    ],
    2,
  ],
  [
    "Which debt repayment method focuses on paying smallest balances first?",
    [
      "Debt avalanche method",
      "Debt snowball method",
      "Debt consolidation method",
      "Minimum payment method",
    ],
    1,
  ],
  [
    "What type of loan is a mortgage?",
    ["Unsecured loan", "Revolving debt", "Secured loan", "Personal loan"],
    2,
  ],
  [
    "When you buy a stock, you become a:",
    [
      "Company employee",
      "Partial owner of the company",
      "Company manager",
      "Financial Deputy Chief",
    ],
    1,
  ],
  [
    "What is a bond?",
    [
      "A type of stock",
      "An ownership share in a company/corporation",
      "A loan you give to a company/government",
      "A type of mutual fund",
    ],
    2,
  ],
  [
    "At what income level are you required to file taxes?",
    ["More than $10,000", "More than $12,200", "More than $15,000", "More than $20,000"],
    1,
  ],
  [
    "What does ETF stand for?",
    [
      "Electronic Trading Fund",
      "Exchange-Traded Fund",
      "European Trading Fund",
      "Enhanced Tax Fund",
    ],
    1,
  ],
  [
    "What is the tax filing deadline each year?",
    ["December 31st", "January 31st", "March 15th", "April 15th"],
    3,
  ],
  [
    "Which investment is considered one of the safest with low risk?",
    ["Individual stocks", "Cryptocurrency", "Gold", "Startup companies"],
    2,
  ],
  [
    "What is revolving debt?",
    [
      "Debt that disappears after one year",
      "Debt you can borrow repeatedly up to a limit",
      "Debt that only applies to mortgages",
      "Debt that has no interest",
    ],
    1,
  ],
  [
    "Which method saves the most money on interest payments?",
    [
      "Debt snowball method",
      "Debt avalanche method",
      "Making only minimum payments",
      "Debt consolidation always",
    ],
    1,
  ],
  [
    "What is an emergency fund?",
    [
      "Money for vacation expenses",
      "Money set aside for unexpected expenses",
      "Money for regular monthly bills",
      "Money for entertainment",
    ],
    1,
  ],
  [
    "What are dividends?",
    [
      "Taxes you pay on investments",
      "Fees charged by brokers",
      "Portions of company profits paid to shareholders",
      "Interest paid on bonds",
    ],
    2,
  ],
  [
    "What is a tax deduction?",
    [
      "Money the government owes you",
      "A penalty for filing late",
      "An amount that reduces your taxable income",
      "A type of tax credit",
    ],
    2,
  ],
  [
    "Which form do most employees receive for tax filing?",
    ["1099", "W-2", "W-4", "1040EZ"],
    1,
  ],
  [
    "What is the main risk of credit card debt?",
    [
      "Low interest rates",
      "Too much available credit",
      "Monthly statements",
      "High interest rates that can create debt cycles",
    ],
    3,
  ],
  [
    "Why is long-term investing generally recommended?",
    [
      "It guarantees profits",
      "It allows for compounding returns",
      "It has no risk",
      "It requires no research",
    ],
    1,
  ],
  [
    "What happens when you move to a higher tax bracket?",
    [
      "Your entire income is taxed at the higher rate",
      "Only the income in that bracket is taxed at the higher rate",
      "You pay double taxes",
      "You get a tax refund",
    ],
    1,
  ],
  [
    "What is the purpose of comparison shopping?",
    [
      "To buy the most expensive item",
      "To find the best price and quality",
      "To shop at only one store",
      "To avoid using coupons",
    ],
    1,
  ],
];

/**
 * Question numbers (1-indexed) whose subject matter has no unit written yet:
 * debt and credit, and taxes. Remove entries from here as units land.
 */
const UNWRITTEN = new Set([3, 4, 7, 9, 11, 12, 15, 16, 17, 19]);

/** Every quiz question asked across the written Financial Literacy units. */
const asked = new Map();
for (const episode of [unit1, unit4]) {
  for (const [id, scene] of Object.entries(episode.scenes)) {
    if (scene.type === "quiz" && scene.question) {
      asked.set(scene.question, { id, unit: episode.unit, options: scene.options ?? [] });
    }
  }
}

FORM.forEach(([question, options, correctIndex], index) => {
  const number = index + 1;
  if (UNWRITTEN.has(number)) {
    return;
  }

  test(`final quiz Q${number} appears verbatim in an episode`, () => {
    const found = asked.get(question);
    assert.ok(found, `no episode asks "${question}"`);
    assert.deepEqual(
      found.options.map((option) => option.label),
      options,
      `${found.id}: option text or order differs from the form`,
    );
    assert.equal(
      found.options.findIndex((option) => option.correct),
      correctIndex,
      `${found.id}: marks the wrong option correct`,
    );
  });
});

test("every final-quiz question is either written or listed as unwritten", () => {
  const unaccounted = FORM.map(([question], index) => [index + 1, question]).filter(
    ([number, question]) => !UNWRITTEN.has(Number(number)) && !asked.has(String(question)),
  );
  assert.deepEqual(unaccounted, [], "questions missing from both the episodes and UNWRITTEN");
});
