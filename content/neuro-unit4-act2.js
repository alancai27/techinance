// @ts-check

/**
 * Neuroscience, Unit 4, Act 2: "When the Signalling Fails"
 *
 * Source material: "Unit 4: Understanding Neurological Disorders", section 2,
 * transcribed at content/sources/neuro-unit4-disorders.md.
 *
 * Figures quoted here come from that document and must stay exact:
 *   depression affects over 264 million people worldwide,
 *   anxiety disorders impact more than 300 million globally,
 *   neuroimaging shows reduced PFC activity in chronic stress and depression.
 *
 * TONE: these are conditions learners may personally have. Everything here is
 * mechanism and prevalence, stated plainly. No disorder is framed as a
 * weakness, and nothing implies a sufferer chose it or could simply decide out
 * of it.
 *
 * Three of Unit 4's ten official quiz questions live in this act (2, 4, 6, 8).
 *
 * Scene ids are namespaced `n4a2-*`. The last scene hands off to `n4a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  verywellMental: {
    label: "Mental Health Disorders (Verywell Mind)",
    url: "https://www.verywellmind.com/mental-health-disorders",
  },
  harvard: {
    label: "Harvard Medical School: Neuroscience Reports",
    url: "https://neuro.hms.harvard.edu/",
  },
  ninds: {
    label: "Brain Basics (National Institute of Neurological Disorders and Stroke)",
    url: "https://www.ninds.nih.gov/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit4.js. This act
 * awards `circuit-diagnostician`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "n4a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n4a2-start": {
      id: "n4a2-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:15",
      text: [
        "\"Mental health disorders are conditions affecting mood, thinking or behaviour,\" Imani says. \"Three mechanisms sit underneath them, and you've met all three already.\"",
        "\"Neurotransmitter imbalances, from Unit 2. Circuit disruptions in the prefrontal cortex, amygdala and hippocampus, also Unit 2. And structural changes, where chronic stress shrinks the hippocampus, which was Unit 1.\"",
        "\"Nothing new. New combinations.\"",
      ],
      source: SOURCES.verywellMental,
      xp: 10,
      next: "n4a2-scale-reveal",
    },

    /* ---------------- 2. how many people ---------------- */
    "n4a2-scale-reveal": {
      id: "n4a2-scale-reveal",
      type: "reveal",
      title: "How many people this affects",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Before the mechanisms, the scale, because it changes how you think about the subject,\" Imani says. \"Guess how many people worldwide are affected by depression.\"",
      ],
      question: "Roughly how many people worldwide does depression affect?",
      options: ["over 26 million", "over 264 million", "over 2.6 billion", "over 12 million"],
      answerIndex: 1,
      value: "264 million",
      caption: "People worldwide affected by depression.",
      explain:
        "Depression affects over 264 million people worldwide, and anxiety disorders impact more than 300 million. At that scale these aren't edge cases: in any classroom, several people are living with one.",
      source: SOURCES.verywellMental,
      xp: 25,
      next: "n4a2-mechanisms-terminal",
    },

    /* ---------------- 3. the mechanisms ---------------- */
    "n4a2-mechanisms-terminal": {
      id: "n4a2-mechanisms-terminal",
      type: "terminal",
      title: "ATLAS: mechanisms and conditions",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Pull both,\" Imani says. \"The second file is the five conditions and what's happening in each.\"",
      ],
      prompt: "Run the reference commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "mechanisms",
          cmd: "mental --mechanisms",
          output: [
            "THREE MECHANISMS",
            "  Neurotransmitter imbalances",
            "    Dopamine, serotonin and norepinephrine regulate mood, reward",
            "    and motivation. Low serotonin is linked to depression;",
            "    dopamine dysregulation affects motivation and pleasure.",
            "  Circuit disruptions",
            "    Abnormal activity across the PFC, amygdala and hippocampus.",
            "  Structural changes",
            "    Chronic stress or trauma can shrink the hippocampus, reducing",
            "    memory and emotional control.",
            "",
            "CONTRIBUTING FACTORS",
            "  Genetics, trauma or chronic stress, and environmental factors",
            "  including infection, toxins and poor nutrition.",
          ],
          required: true,
        },
        {
          id: "conditions",
          cmd: "mental --conditions",
          output: [
            "FIVE CONDITIONS",
            "  Depression",
            "    Persistent low mood, lack of motivation, changes in sleep or",
            "    appetite. Low serotonin, dysregulated dopamine.",
            "  Anxiety Disorders",
            "    Excessive fear or worry. Hyperactive amygdala, PFC dysfunction.",
            "  Bipolar Disorder",
            "    Alternating mania and depression. Neurotransmitter imbalance",
            "    and circuit disruption.",
            "  ADHD",
            "    Inattention, hyperactivity, impulsivity. Impaired dopamine and",
            "    norepinephrine signalling in the PFC.",
            "  PTSD",
            "    Flashbacks and hyperarousal after trauma. Hippocampus and",
            "    amygdala changes.",
          ],
          required: true,
        },
      ],
      source: SOURCES.verywellMental,
      xp: 30,
      next: "n4a2-depression-quiz",
    },

    /* ---------------- 4. official quiz Q4 ---------------- */
    "n4a2-depression-quiz": {
      id: "n4a2-depression-quiz",
      type: "quiz",
      title: "Knowledge check: the chemistry of low mood",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Unit 2 told you what low serotonin is associated with,\" Imani says. \"This is the condition that sits on top of it.\"",
      ],
      question: "Which mental health disorder is linked to low serotonin levels and dysregulated dopamine?",
      options: [
        {
          label: "Anxiety",
          correct: false,
          feedback:
            "Anxiety disorders involve a hyperactive amygdala and PFC dysfunction. The serotonin and dopamine pairing points at a different condition.",
        },
        {
          label: "Bipolar Disorder",
          correct: false,
          feedback:
            "Bipolar disorder involves neurotransmitter imbalances and circuit disruptions producing alternating mania and depression. The specific pairing here describes something narrower.",
        },
        {
          label: "Depression",
          correct: true,
          feedback:
            "Correct. Depression is linked to low serotonin and dysregulated dopamine, producing persistent low mood, lack of motivation and changes in sleep or appetite. Low serotonin explains the mood; dysregulated dopamine explains why motivation goes with it.",
        },
        {
          label: "ADHD",
          correct: false,
          feedback:
            "ADHD involves impaired dopamine and norepinephrine signalling in the prefrontal cortex, producing inattention, hyperactivity and impulsivity. Serotonin isn't the primary story there.",
        },
      ],
      source: SOURCES.verywellMental,
      xp: 25,
      next: "n4a2-norepinephrine-quiz",
    },

    /* ---------------- 5. official quiz Q6 ---------------- */
    "n4a2-norepinephrine-quiz": {
      id: "n4a2-norepinephrine-quiz",
      type: "quiz",
      title: "Knowledge check: alertness and stress",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Straight callback to Unit 2,\" Theo says.",
      ],
      question: "Which neurotransmitter affects alertness and stress response?",
      options: [
        {
          label: "Dopamine",
          correct: false,
          feedback:
            "Dopamine handles reward and motivation. It's central to ADHD and Parkinson's, but alertness under stress is a different transmitter.",
        },
        {
          label: "Serotonin",
          correct: false,
          feedback:
            "Serotonin is mood stability. Low levels are linked to depression, but it isn't the arousal signal.",
        },
        {
          label: "Norepinephrine",
          correct: true,
          feedback:
            "Correct. Norepinephrine affects alertness and stress response, priming the body for action. It's also one of the two transmitters whose PFC signalling is impaired in ADHD, alongside dopamine.",
        },
        {
          label: "GABA",
          correct: false,
          feedback:
            "GABA is the primary inhibitory transmitter, calming neural activity. Alertness runs the other direction.",
        },
      ],
      source: SOURCES.harvard,
      xp: 25,
      next: "n4a2-hippocampus-quiz",
    },

    /* ---------------- 6. official quiz Q2 ---------------- */
    "n4a2-hippocampus-quiz": {
      id: "n4a2-hippocampus-quiz",
      type: "quiz",
      title: "Knowledge check: what chronic stress damages",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Chronic stress or trauma can physically shrink one structure, reducing both memory and emotional control,\" Imani says. \"Which one?\"",
      ],
      question: "What part of the brain is critical for memory formation and emotional regulation?",
      options: [
        {
          label: "Amygdala",
          correct: false,
          feedback:
            "The amygdala processes fear and emotion. It's involved in PTSD alongside the structure this question is after, but memory formation isn't its job.",
        },
        {
          label: "Hippocampus",
          correct: true,
          feedback:
            "Correct. The hippocampus handles memory formation and stress regulation, and chronic stress or trauma can shrink it, reducing both memory and emotional control. Note the division of labour from Unit 2: the hippocampus supplies emotional memory and context, while the prefrontal cortex does the top-down regulating.",
        },
        {
          label: "Prefrontal Cortex (PFC)",
          correct: false,
          feedback:
            "The PFC regulates emotion top-down and handles planning and impulse control. Memory formation belongs to a limbic structure.",
        },
        {
          label: "Cerebellum",
          correct: false,
          feedback:
            "The cerebellum handles balance and coordination, not memory or emotion.",
        },
      ],
      source: SOURCES.verywellMental,
      xp: 25,
      next: "n4a2-pfc-quiz",
    },

    /* ---------------- 7. official quiz Q8 ---------------- */
    "n4a2-pfc-quiz": {
      id: "n4a2-pfc-quiz",
      type: "quiz",
      title: "Knowledge check: planning and impulse control",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Fourth unit running for this region,\" Theo says. \"It turns up in almost everything.\"",
      ],
      question: "What brain region is most involved in planning, decision-making, and impulse control?",
      options: [
        {
          label: "Prefrontal Cortex (PFC)",
          correct: true,
          feedback:
            "Correct. The PFC handles planning, decision-making and impulse control. Neuroimaging shows reduced PFC activity in chronic stress and depression, and impaired dopamine and norepinephrine signalling there is central to ADHD.",
        },
        {
          label: "Amygdala",
          correct: false,
          feedback:
            "The amygdala generates emotional responses, particularly fear. It's what the PFC regulates rather than the regulator itself.",
        },
        {
          label: "Hippocampus",
          correct: false,
          feedback:
            "The hippocampus handles memory and stress regulation. Planning and impulse control sit at the front of the brain.",
        },
        {
          label: "Brainstem",
          correct: false,
          feedback:
            "The brainstem runs basic life functions like breathing and heart rate.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n4a2-conditions-sort",
    },

    /* ---------------- 8. sort condition to mechanism ---------------- */
    "n4a2-conditions-sort": {
      id: "n4a2-conditions-sort",
      type: "sort",
      title: "What's happening in each condition?",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Five conditions,\" Imani says. \"Sort them by which brain structure or transmitter is most central. It matters because it's what the treatment targets.\"",
      ],
      prompt: "Drag each condition to the mechanism most central to it.",
      buckets: [
        { id: "serotonin", label: "Serotonin and dopamine", hint: "Mood and motivation chemistry" },
        { id: "amygdala", label: "Amygdala overactivity", hint: "Fear response running hot" },
        { id: "pfc", label: "PFC signalling", hint: "Dopamine and norepinephrine at the front" },
      ],
      items: [
        {
          id: "depression",
          label: "Depression",
          bucket: "serotonin",
          explain: "Low serotonin and dysregulated dopamine, producing persistent low mood and lack of motivation.",
        },
        {
          id: "bipolar",
          label: "Bipolar Disorder",
          bucket: "serotonin",
          explain: "Neurotransmitter imbalances plus circuit disruptions, producing alternating mania and depression.",
        },
        {
          id: "anxiety",
          label: "Anxiety Disorders",
          bucket: "amygdala",
          explain: "Excessive fear or worry, involving a hyperactive amygdala together with PFC dysfunction.",
        },
        {
          id: "ptsd",
          label: "PTSD",
          bucket: "amygdala",
          explain: "Flashbacks and hyperarousal after trauma, with changes in both the hippocampus and the amygdala.",
        },
        {
          id: "adhd",
          label: "ADHD",
          bucket: "pfc",
          explain: "Impaired dopamine and norepinephrine signalling in the prefrontal cortex, producing inattention, hyperactivity and impulsivity.",
        },
      ],
      source: SOURCES.verywellMental,
      xp: 35,
      badge: "circuit-diagnostician",
      next: "n4a2-dossier",
    },

    /* ---------------- 9. dossier ---------------- */
    "n4a2-dossier": {
      id: "n4a2-dossier",
      type: "dossier",
      title: "Lab card: mental health disorders",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Second card,\" Imani says.",
      ],
      terms: [
        {
          term: "Mental Health Disorder",
          definition: "Condition affecting mood, thinking, or behavior.",
        },
        { term: "Serotonin", definition: "Neurotransmitter involved in mood regulation." },
        {
          term: "Norepinephrine",
          definition: "Neurotransmitter affecting alertness and stress response.",
        },
        {
          term: "Circuit Disruption",
          definition: "Malfunction of brain pathways controlling emotion and behavior.",
        },
        { term: "Hippocampus", definition: "Brain region for memory and stress regulation." },
        { term: "Amygdala", definition: "Brain region processing fear and emotion." },
      ],
      source: SOURCES.verywellMental,
      xp: 20,
      next: "n4a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "n4a2-handoff": {
      id: "n4a2-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:25",
      text: [
        "\"Two acts of things going wrong,\" Imani says. \"The last one is what's actually done about it, and it's more than most people assume.\"",
        "\"Medication, rehabilitation, lifestyle. Three layers, and the reason the third one works at all is a word you've now met in every single unit of this course.\"",
      ],
      xp: 15,
      next: "n4a3-start",
    },
  },
};

export default act2;
