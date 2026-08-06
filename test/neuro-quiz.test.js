import assert from "node:assert/strict";
import test from "node:test";

import { episode as unit1 } from "../content/neuro-unit1.js";
import { episode as unit2 } from "../content/neuro-unit2.js";

/**
 * The Neuroscience course has one quiz per unit, like Cybersecurity, rather
 * than Financial Literacy's single course-wide final.
 *
 * Every question on a unit's form must appear in that unit's episode with the
 * same wording, the same options in the same order, and the same correct
 * answer. A house-style pass over the content files once rewrote a quoted
 * question in Cybersecurity unit 2 and silently dropped it from 10/10 to 8/10,
 * which is what this guards against.
 *
 * The forms number their options "A." / "B." and so on. Those prefixes are
 * stripped here and in the episodes, because the story engine renders its own
 * A/B/C/D markers and keeping them would display as "AA.".
 */

/** @type {[string, string[], number][]} question, options in form order, index of the correct one */
const UNIT_1_FORM = [
  [
    "What is the main function of the prefrontal cortex?",
    [
      "Processing auditory signals",
      "Planning, decision-making, and personality expression",
      "Controlling motor movement",
      "Regulating balance and coordination",
    ],
    1,
  ],
  [
    "Which part of the brain is responsible for processing visual information?",
    ["Temporal lobe", "Amygdala", "Parietal lobe", "Occipital lobe"],
    3,
  ],
  [
    "What role does the amygdala play in brain function?",
    [
      "Processing emotions like fear and aggression",
      "Movement coordination",
      "Auditory processing",
      "Spatial reasoning",
    ],
    0,
  ],
  [
    "Which sense bypasses the thalamus and connects directly to the brain's cortex?",
    ["Taste", "Touch", "Hearing", "Smell"],
    3,
  ],
  [
    "What does sensory integration allow the brain to do?",
    [
      "Increase reaction speed",
      "Eliminate distractions",
      "Form a complete understanding of the environment by combining multiple senses",
      "Suppress irrelevant stimuli",
    ],
    2,
  ],
  [
    "Which of the following is an example of the availability heuristic?",
    [
      "Trusting facts backed by statistics",
      "Judging the risk of plane crashes based on news stories",
      "Ignoring contrary evidence",
      "Double-checking all decisions",
    ],
    1,
  ],
  [
    "What is confirmation bias?",
    [
      "The tendency to overestimate rare events",
      "A memory flaw in eyewitnesses",
      "The tendency to favor information that supports existing beliefs",
      "The need for peer approval",
    ],
    2,
  ],
  [
    "Which brain structure is crucial for memory formation and navigation?",
    ["Thalamus", "Amygdala", "Cerebellum", "Hippocampus"],
    3,
  ],
  [
    "What does the temporal lobe primarily process?",
    ["Hearing and language", "Smell and taste", "Touch and movement", "Vision and balance"],
    0,
  ],
  [
    "Why is understanding cognitive biases important in daily decision-making?",
    [
      "It helps people multitask more efficiently",
      "It reduces the time needed to process information",
      "It helps avoid systematic errors in judgment",
      "It improves memory retention",
    ],
    2,
  ],
];

/** @type {[string, string[], number][]} */
const UNIT_2_FORM = [
  [
    "Which brain structure is most involved in processing fear?",
    ["Hippocampus", "Amygdala", "Prefrontal Cortex", "Thalamus"],
    1,
  ],
  [
    "The hippocampus is primarily responsible for:",
    ["Regulating heartbeat", "Controlling balace", "Releasing dopamine", "Long term memory formation"],
    3,
  ],
  [
    "The prefrontal cortex plays a major role in:",
    [
      "Decision making and emotion regulation",
      "Smell recognition",
      "Visual processing",
      "Motor control",
    ],
    0,
  ],
  [
    "Which neurotransmitter is linked to feelings of reward and motivation?",
    ["Acetylcholine", "GABA", "Serotonin", "Dopamine"],
    3,
  ],
  [
    "Low levels of serotonin are often associated with:",
    [
      "High motivation",
      "Reduced stress",
      "Depression and mood disorders",
      "Increased memory recall",
    ],
    2,
  ],
  [
    "Norepinephrine is mainly involved in:",
    ["Sleep cycles", "Stress response and alertness", "Digestion", "Creativity"],
    1,
  ],
  [
    "Which brain pathway is crucial for regulating emotions?",
    [
      "Amygdala-hippocampus connection",
      "Hippocampus-thalamus loop",
      "Amygdala-prefrontal cortex connectivity",
      "Cerebellum-motor cortex pathway",
    ],
    2,
  ],
  [
    "Mindfulness can improve emotional regulation by:",
    [
      "Shrinking the hippocampus",
      "Increasing cortisol levels",
      "Weakening dopamine release",
      "Strengthening the prefrontal-amygdala pathways",
    ],
    3,
  ],
  [
    "Which neurotransmitter is the brain's main inhibitory signal, helping to calm neural activity?",
    ["GABA", "Glutamate", "Dopamine", "Norepinephrine"],
    0,
  ],
  [
    "In emotion generation, which part of the brain is dominant before regulation takes place?",
    [
      "Brainstem nuclei",
      "Cortical structures like the PFC",
      "Subcortical structures like the amygdala",
      "Occipital lobe",
    ],
    2,
  ],
];

/**
 * @param {any} episode
 * @returns {Map<string, { id: string, options: any[] }>}
 */
function quizzesIn(episode) {
  const asked = new Map();
  for (const [id, scene] of Object.entries(episode.scenes)) {
    const s = /** @type {any} */ (scene);
    if (s.type === "quiz" && s.question) {
      asked.set(s.question, { id, options: s.options ?? [] });
    }
  }
  return asked;
}

const unit1Quizzes = quizzesIn(unit1);
const unit2Quizzes = quizzesIn(unit2);

UNIT_1_FORM.forEach(([question, options, correctIndex], index) => {
  test(`Neuroscience unit 1 quiz Q${index + 1} appears verbatim`, () => {
    const found = unit1Quizzes.get(question);
    assert.ok(found, `no scene asks "${question}"`);
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

test("Neuroscience unit 1 covers the whole form", () => {
  const missing = UNIT_1_FORM.map(([question]) => question).filter((q) => !unit1Quizzes.has(q));
  assert.deepEqual(missing, [], "form questions with no scene");
});

UNIT_2_FORM.forEach(([question, options, correctIndex], index) => {
  test(`Neuroscience unit 2 quiz Q${index + 1} appears verbatim`, () => {
    const found = unit2Quizzes.get(question);
    assert.ok(found, `no scene asks "${question}"`);
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

test("Neuroscience unit 2 covers the whole form", () => {
  const missing = UNIT_2_FORM.map(([question]) => question).filter((q) => !unit2Quizzes.has(q));
  assert.deepEqual(missing, [], "form questions with no scene");
});
