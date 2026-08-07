// @ts-check

/**
 * Neuroscience, Unit 2, Act 2: "The Chemistry"
 *
 * Source material: "Unit 2: The Neuroscience Behind Emotions", section 2,
 * transcribed at content/sources/neuro-unit2-emotions.md.
 *
 * Facts quoted here come from that document and must stay exact:
 *   excessive glutamate without GABA causes overstimulation and anxiety,
 *   too much GABA may cause lethargy or depression,
 *   dopamine dysregulation is implicated in addiction and schizophrenia,
 *   exercise increases endorphins and boosts dopamine.
 *
 * Four of Unit 2's ten official quiz questions live in this act (4, 5, 6, 9).
 *
 * Scene ids are namespaced `n2a2-*`. The last scene hands off to `n2a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  neurotransmitters: {
    label: "Editorial: Neurotransmitters and Emotions (Frontiers in Psychology)",
    url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.00021/full",
  },
  neuromodulators: {
    label: "Neuromodulator regulation and emotions (Frontiers in Molecular Neuroscience)",
    url: "https://www.frontiersin.org/journals/molecular-neuroscience/articles/10.3389/fnmol.2024.1376762/full",
  },
  dopamineSerotonin: {
    label: "Dopamine and Serotonin Drive Emotional Word Processing (Neuroscience News)",
    url: "https://neurosciencenews.com/dopamine-serotonin-emotional-language-28334/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit2.js. This act
 * awards `chemistry-reader`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "n2a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n2a2-start": {
      id: "n2a2-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:20",
      text: [
        "\"Neurotransmitters are chemical messengers between neurons,\" Imani says. \"Five of them shape emotional tone, intensity and flexibility.\"",
        "\"People know one or two by reputation and get them slightly wrong. Dopamine isn't happiness. Serotonin isn't confidence. Let's do this properly.\"",
      ],
      source: SOURCES.neurotransmitters,
      xp: 10,
      next: "n2a2-chem-terminal",
    },

    /* ---------------- 2. the five ---------------- */
    "n2a2-chem-terminal": {
      id: "n2a2-chem-terminal",
      type: "terminal",
      title: "ATLAS: neurotransmitter briefing",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Pull both,\" Imani says. \"The second one is the pair that has to stay in balance.\"",
      ],
      prompt: "Run the briefing commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "monoamines",
          cmd: "chem --info dopamine serotonin norepinephrine",
          output: [
            "DOPAMINE",
            "  Reward processing and motivation. Surges during pleasure and",
            "  goal-seeking behaviour, reinforcing the action that produced it.",
            "  Dysregulation is implicated in addiction and schizophrenia.",
            "  Exercise increases endorphins and boosts dopamine.",
            "",
            "SEROTONIN",
            "  Mood stability and contentment. Modulates how negative events",
            "  are interpreted; higher serotonin tends toward resilience.",
            "  Lower levels are associated with depressive and anxious states.",
            "",
            "NOREPINEPHRINE",
            "  Primes the body for action under stress. Heightens attention,",
            "  mobilises energy, readies fight-or-flight.",
            "  Spikes can feel like alertness or agitation depending on context.",
          ],
          required: true,
        },
        {
          id: "balance",
          cmd: "chem --info gaba glutamate",
          output: [
            "THE EXCITATORY / INHIBITORY PAIR",
            "  GLUTAMATE  : primary excitatory transmitter. Excites neurons,",
            "               vital for learning.",
            "  GABA       : primary inhibitory transmitter. Calms the nervous",
            "               system, reduces anxiety.",
            "",
            "  BALANCE IS THE POINT",
            "    glutamate dominant -> restlessness, anxiety",
            "    GABA dominant      -> lethargy, numbness",
            "    balanced           -> emotion felt without being overwhelmed",
          ],
          required: true,
        },
      ],
      source: SOURCES.neuromodulators,
      xp: 30,
      next: "n2a2-dopamine-quiz",
    },

    /* ---------------- 3. official quiz Q4 ---------------- */
    "n2a2-dopamine-quiz": {
      id: "n2a2-dopamine-quiz",
      type: "quiz",
      title: "Knowledge check: the reward chemical",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Achieving something you've worked toward produces a specific chemical signature,\" Imani says.",
      ],
      question: "Which neurotransmitter is linked to feelings of reward and motivation?",
      options: [
        {
          label: "Acetylcholine",
          correct: false,
          feedback:
            "Not one of the five this unit covers. Reward and motivation belong to the transmitter that surges during goal-seeking behaviour.",
        },
        {
          label: "GABA",
          correct: false,
          feedback:
            "GABA is the primary inhibitory transmitter. It calms activity rather than driving pursuit of a goal.",
        },
        {
          label: "Serotonin",
          correct: false,
          feedback:
            "Serotonin is about mood stability and contentment. Motivation to chase something is a different system.",
        },
        {
          label: "Dopamine",
          correct: true,
          feedback:
            "Correct. Dopamine surges in the brain's reward pathways during pleasure and goal-seeking, reinforcing the behaviour that produced it. That reinforcement is also why its dysregulation is implicated in addiction.",
        },
      ],
      source: SOURCES.dopamineSerotonin,
      xp: 25,
      next: "n2a2-serotonin-quiz",
    },

    /* ---------------- 4. official quiz Q5 ---------------- */
    "n2a2-serotonin-quiz": {
      id: "n2a2-serotonin-quiz",
      type: "quiz",
      title: "Knowledge check: when levels drop",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"This is the one with the clearest clinical link,\" Theo says.",
      ],
      question: "Low levels of serotonin are often associated with:",
      options: [
        {
          label: "High motivation",
          correct: false,
          feedback:
            "Motivation is dopamine's territory. Serotonin governs mood stability, and low levels move it the wrong way.",
        },
        {
          label: "Reduced stress",
          correct: false,
          feedback:
            "The opposite. Balanced serotonin is tied to emotional calm and resilience; low serotonin makes negative events land harder.",
        },
        {
          label: "Depression and mood disorders",
          correct: true,
          feedback:
            "Correct. Lower serotonin is associated with depressive and anxious states, and the link to depression symptoms is strong. Serotonin modulates how negative events are interpreted, so less of it means less resilience.",
        },
        {
          label: "Increased memory recall",
          correct: false,
          feedback:
            "Memory is the hippocampus rather than a serotonin effect. Low serotonin is linked to depression and mood disorders.",
        },
      ],
      source: SOURCES.dopamineSerotonin,
      xp: 25,
      next: "n2a2-norepinephrine-quiz",
    },

    /* ---------------- 5. official quiz Q6 ---------------- */
    "n2a2-norepinephrine-quiz": {
      id: "n2a2-norepinephrine-quiz",
      type: "quiz",
      title: "Knowledge check: the stress signal",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"The one that makes you feel switched on, or wired, depending on the day,\" Imani says.",
      ],
      question: "Norepinephrine is mainly involved in:",
      options: [
        {
          label: "Sleep cycles",
          correct: false,
          feedback:
            "Norepinephrine works in the opposite direction: it heightens attention and readies the body for action.",
        },
        {
          label: "Stress response and alertness",
          correct: true,
          feedback:
            "Correct. Norepinephrine primes the body for action during stress, heightening attention and mobilising energy for fight-or-flight. Whether a spike feels like alertness or agitation depends on the context you're in.",
        },
        {
          label: "Digestion",
          correct: false,
          feedback:
            "Not what this transmitter does. Norepinephrine handles stress response and alertness. (This option is missing its letter in the form.)",
        },
        {
          label: "Creativity",
          correct: false,
          feedback:
            "Creativity isn't traced to a single transmitter. Norepinephrine's job is arousal: attention, energy, fight-or-flight readiness.",
        },
      ],
      source: SOURCES.neurotransmitters,
      xp: 25,
      next: "n2a2-gaba-quiz",
    },

    /* ---------------- 6. official quiz Q9 ---------------- */
    "n2a2-gaba-quiz": {
      id: "n2a2-gaba-quiz",
      type: "quiz",
      title: "Knowledge check: the brake pedal",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Two transmitters work as a pair, one pushing and one holding back,\" Theo says. \"Name the one holding back.\"",
      ],
      question: "Which neurotransmitter is the brain's main inhibitory signal, helping to calm neural activity?",
      options: [
        {
          label: "GABA",
          correct: true,
          feedback:
            "Correct. GABA is the primary inhibitory neurotransmitter. It calms the nervous system and reduces anxiety, and it's the counterweight to glutamate. Balance between the two is what lets you feel an emotion without being overwhelmed by it.",
        },
        {
          label: "Glutamate",
          correct: false,
          feedback:
            "Glutamate is the other half of the pair: the primary excitatory transmitter, vital for learning. When it dominates without GABA, the result is restlessness and anxiety.",
        },
        {
          label: "Dopamine",
          correct: false,
          feedback:
            "Dopamine drives reward and motivation rather than damping activity down.",
        },
        {
          label: "Norepinephrine",
          correct: false,
          feedback:
            "Norepinephrine raises arousal for stress response. That's the opposite of an inhibitory signal.",
        },
      ],
      source: SOURCES.neuromodulators,
      xp: 25,
      next: "n2a2-balance-reveal",
    },

    /* ---------------- 7. what imbalance feels like ---------------- */
    "n2a2-balance-reveal": {
      id: "n2a2-balance-reveal",
      type: "reveal",
      title: "When the pair goes out of balance",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Excitatory and inhibitory only work as a ratio,\" Imani says. \"If glutamate runs ahead of GABA, what would you predict someone feels?\"",
      ],
      question: "Too much glutamate without enough GABA produces:",
      options: [
        "Lethargy and numbness",
        "No change, they are unrelated",
        "Overstimulation and anxiety",
        "Improved memory recall",
      ],
      answerIndex: 2,
      value: "Anxiety",
      caption: "Excess glutamate without GABA leads to overstimulation and anxiety.",
      explain:
        "Excessive glutamate without GABA can result in overstimulation and anxiety. Tip it the other way and too much GABA may cause lethargy or depression. Neither transmitter is good or bad on its own; the ratio between them is what shapes emotional tone.",
      source: SOURCES.neuromodulators,
      xp: 25,
      next: "n2a2-chem-sort",
    },

    /* ---------------- 8. sort the transmitters ---------------- */
    "n2a2-chem-sort": {
      id: "n2a2-chem-sort",
      type: "sort",
      title: "Match each effect to its transmitter",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Five transmitters, five effects,\" Imani says. \"No trick in this one, but get it wrong and the whole of Unit 3 stops making sense.\"",
      ],
      prompt: "Drag each effect to the transmitter behind it.",
      buckets: [
        { id: "dopamine", label: "Dopamine", hint: "Reward" },
        { id: "serotonin", label: "Serotonin", hint: "Mood" },
        { id: "norepinephrine", label: "Norepinephrine", hint: "Arousal" },
        { id: "gaba", label: "GABA", hint: "Inhibition" },
        { id: "glutamate", label: "Glutamate", hint: "Excitation" },
      ],
      items: [
        {
          id: "goal",
          label: "Satisfaction on reaching a goal you worked for",
          bucket: "dopamine",
          explain: "Dopamine surges in the reward pathways during goal-seeking, reinforcing whatever produced the result.",
        },
        {
          id: "resilient",
          label: "Taking a setback in your stride",
          bucket: "serotonin",
          explain: "Serotonin modulates how negative events are interpreted. Higher levels tend toward resilience; lower levels are linked to depression.",
        },
        {
          id: "alert",
          label: "Sharpened attention when something goes wrong",
          bucket: "norepinephrine",
          explain: "Norepinephrine heightens attention and mobilises energy, readying fight-or-flight.",
        },
        {
          id: "calm",
          label: "Settling down after being wound up",
          bucket: "gaba",
          explain: "GABA is the primary inhibitory transmitter: it calms the nervous system and reduces anxiety.",
        },
        {
          id: "learn",
          label: "Neurons firing hard while you learn something new",
          bucket: "glutamate",
          explain: "Glutamate is the primary excitatory transmitter and is vital for learning. Unchecked by GABA it tips into restlessness.",
        },
      ],
      source: SOURCES.neurotransmitters,
      xp: 35,
      badge: "chemistry-reader",
      next: "n2a2-exercise-choice",
    },

    /* ---------------- 9. a practical lever ---------------- */
    "n2a2-exercise-choice": {
      id: "n2a2-exercise-choice",
      type: "choice",
      title: "A question from a study participant",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"One of our participants asked whether there's anything she can do herself, without medication, that has a real chemical effect,\" Theo says.",
        "\"What does the literature actually support?\"",
      ],
      prompt: "Pick the answer the research supports.",
      options: [
        {
          label: "Exercise, which increases endorphins and boosts dopamine.",
          next: "n2a2-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Exercise increases endorphins and boosts dopamine, and it's one of the few levers a person controls directly. It doesn't replace treatment where treatment is needed, but the effect is real and measurable.",
        },
        {
          label: "Nothing without medication. Neurotransmitter levels aren't affected by behaviour.",
          next: "n2a2-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Behaviour does move these systems. Exercise increases endorphins and boosts dopamine, and Act 3 covers regulation techniques that change prefrontal-amygdala connectivity.",
        },
        {
          label: "Anything that raises dopamine as high as possible, as often as possible.",
          next: "n2a2-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "More isn't the goal. Dopamine dysregulation is implicated in addiction, and the same logic applies to the glutamate and GABA pair: balance produces stable emotion, not maximum signal.",
        },
      ],
      source: SOURCES.dopamineSerotonin,
    },

    /* ---------------- 10. dossier ---------------- */
    "n2a2-dossier": {
      id: "n2a2-dossier",
      type: "dossier",
      title: "Lab card: neurochemistry",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Second card,\" Imani says. \"Unit 3 is entirely about what happens when the first one on this list gets hijacked.\"",
      ],
      terms: [
        { term: "Neurotransmitter", definition: "Chemical messenger between neurons." },
        { term: "Dopamine", definition: "Neurotransmitter associated with reward and motivation." },
        { term: "Serotonin", definition: "Mood-stabilizing neurotransmitter." },
        { term: "Norepinephrine", definition: "Involved in arousal and stress responses." },
        { term: "GABA", definition: "Primary inhibitory neurotransmitter, reduces anxiety." },
        { term: "Glutamate", definition: "Primary excitatory neurotransmitter, supports learning." },
        {
          term: "Monoamine Model",
          definition: "Theory linking dopamine, serotonin, and norepinephrine to basic emotions.",
        },
        { term: "Reward Pathway", definition: "Neural circuits activated by dopamine." },
        {
          term: "Homeostasis",
          definition: "Stable internal environment including neurochemical balance.",
        },
        {
          term: "Emotional Dysregulation",
          definition: "Impaired balance of neurotransmitter systems.",
        },
      ],
      source: SOURCES.neurotransmitters,
      xp: 20,
      next: "n2a2-handoff",
    },

    /* ---------------- 11. handoff to act 3 ---------------- */
    "n2a2-handoff": {
      id: "n2a2-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:20",
      text: [
        "\"Structures, then chemistry. The obvious next question is whether any of it can be changed deliberately,\" Imani says.",
        "\"It can. That's the last act, and it's the part participants actually care about.\"",
      ],
      xp: 15,
      next: "n2a3-start",
    },
  },
};

export default act2;
