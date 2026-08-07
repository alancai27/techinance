import assert from "node:assert/strict";
import test from "node:test";

import { episode as unit1 } from "../content/neuro-unit1.js";
import { episode as unit2 } from "../content/neuro-unit2.js";
import { episode as unit3 } from "../content/neuro-unit3.js";
import { episode as unit4 } from "../content/neuro-unit4.js";

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

/** @type {[string, string[], number][]} */
const UNIT_3_FORM = [
  [
    "What is the primary role of dopamine in the brain?",
    [
      "Controlling heart rate",
      "Enhancing muscle coordination",
      "Motivation, learning, and anticipating rewards",
      "Regulating body temperature",
    ],
    2,
  ],
  [
    "Which brain region is known as the “pleasure hub” where dopamine reinforces behavior?",
    [
      "Prefrontal Cortex (PFC)",
      "Amygdala",
      "Nucleus Accumbens",
      "Hippocampus",
    ],
    2,
  ],
  [
    "What happens to dopamine receptors after chronic overstimulation from digital activities?",
    [
      "They increase in number",
      "They decrease in sensitivity (downregulation)",
      "They start producing serotonin instead",
      "They migrate to other brain regions",
    ],
    1,
  ],
  [
    "Which is an example of a “variable reward” in digital platforms?",
    [
      "Completing a daily exercise",
      "Receiving a random “like” on social media",
      "Eating breakfast every day",
      "Getting a paycheck on the same day each month",
    ],
    1,
  ],
  [
    "What does neuroplasticity allow the brain to do?",
    [
      "Store unlimited information permanently",
      "Reorganize and form new neural connections",
      "Avoid all digital stimulation automatically",
      "Repair broken bones faster",
    ],
    1,
  ],
  [
    "Which strategy helps restore dopamine sensitivity after digital overstimulation?",
    [
      "Increasing screen time gradually",
      "Engaging in alternative rewards like exercise or hobbies",
      "Avoiding all forms of social interaction",
      "Watching more variable-reward content",
    ],
    1,
  ],
  [
    "When does dopamine spike the most?",
    [
      "When anticipating a reward",
      "After eating a full meal",
      "Only during sleep",
      "When exercising",
    ],
    0,
  ],
  [
    "Strengthening which brain region can improve self-control and decision-making in overcoming digital addiction?",
    [
      "Amygdala",
      "Prefrontal Cortex (PFC)",
      "Cerebellum",
      "Nucleus Accumbens",
    ],
    1,
  ],
  [
    "What is the “habit loop” in digital addiction?",
    [
      "Stimulus → diet → exercise",
      "Cue → behavior → reward",
      "Thought → memory → sleep",
      "Impulse → reflex → reaction",
    ],
    1,
  ],
  [
    "How long of a consistent reduction in screen time can measurably restore dopamine receptor sensitivity?",
    [
      "1–2 days",
      "2–6 weeks",
      "6 months",
      "1 year",
    ],
    1,
  ],
];

/** @type {[string, string[], number][]} */
const UNIT_4_FORM = [
  [
    "Which of the following is a neurodegenerative disorder?",
    [
      "Stroke",
      "Parkinson's Disease",
      "Multiple Sclerosis",
      "Epilepsy",
    ],
    1,
  ],
  [
    "What part of the brain is critical for memory formation and emotional regulation?",
    [
      "Amygdala",
      "Hippocampus",
      "Prefrontal Cortex (PFC)",
      "Cerebellum",
    ],
    1,
  ],
  [
    "What is the main issue in Multiple Sclerosis (MS)?",
    [
      "Loss of dopamine-producing neurons",
      "Immune system attacks myelin, slowing nerve signaling",
      "Protein deposits destroy neurons",
      "Abnormal electrical activity in the brain",
    ],
    1,
  ],
  [
    "Which mental health disorder is linked to low serotonin levels and dysregulated dopamine?",
    [
      "Anxiety",
      "Bipolar Disorder",
      "Depression",
      "ADHD",
    ],
    2,
  ],
  [
    "What type of therapy helps patients reframe negative thoughts and improve coping strategies?",
    [
      "Occupational Therapy",
      "Physical Therapy",
      "Cognitive Behavioral Therapy (CBT)",
      "Speech Therapy",
    ],
    2,
  ],
  [
    "Which neurotransmitter affects alertness and stress response?",
    [
      "Dopamine",
      "Serotonin",
      "Norepinephrine",
      "GABA",
    ],
    2,
  ],
  [
    "Which neurological disorder is caused by abnormal electrical activity in the brain?",
    [
      "Parkinson's Disease",
      "Epilepsy",
      "Alzheimer's Disease",
      "Stroke",
    ],
    1,
  ],
  [
    "What brain region is most involved in planning, decision-making, and impulse control?",
    [
      "Prefrontal Cortex (PFC)",
      "Amygdala",
      "Hippocampus",
      "Brainstem",
    ],
    0,
  ],
  [
    "Which of the following is a lifestyle strategy to support recovery from neurological or mental health disorders?",
    [
      "Increasing caffeine intake",
      "Mindfulness and regular exercise",
      "Avoiding social interaction",
      "Reducing sleep to stay productive",
    ],
    1,
  ],
  [
    "How can neuroplasticity help someone recovering from a stroke?",
    [
      "It allows the brain to reorganize and form new neural connections",
      "It automatically restores dopamine receptor levels",
      "It prevents future strokes entirely",
      "It eliminates the need for physical therapy",
    ],
    0,
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
const unit3Quizzes = quizzesIn(unit3);
const unit4Quizzes = quizzesIn(unit4);

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

[
  [3, UNIT_3_FORM, unit3Quizzes],
  [4, UNIT_4_FORM, unit4Quizzes],
].forEach(([unitNumber, form, quizzes]) => {
  form.forEach(([question, options, correctIndex], index) => {
    test(`Neuroscience unit ${unitNumber} quiz Q${index + 1} appears verbatim`, () => {
      const found = quizzes.get(question);
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

  test(`Neuroscience unit ${unitNumber} covers the whole form`, () => {
    const missing = form.map(([question]) => question).filter((q) => !quizzes.has(q));
    assert.deepEqual(missing, [], "form questions with no scene");
  });
});
