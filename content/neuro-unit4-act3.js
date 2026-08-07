// @ts-check

/**
 * Neuroscience, Unit 4, Act 3: "What Actually Helps"
 *
 * Source material: "Unit 4: Understanding Neurological Disorders", section 3,
 * transcribed at content/sources/neuro-unit4-disorders.md.
 *
 * Figures quoted here come from that document and must stay exact:
 *   CBT is effective for 40-60% of patients with mood disorders,
 *   2-6 weeks of consistent CBT or lifestyle intervention can measurably
 *   improve mood and cognitive function.
 *
 * TONE: this act ends the whole course. It is about treatment, so it must be
 * accurate about what helps without implying that lifestyle changes replace
 * medical care, or that anyone whose condition persists has failed. The source
 * is explicit that medication alone is rarely enough and that the layers work
 * together; the episode keeps that framing.
 *
 * Three of Unit 4's ten official quiz questions live in this act (5, 9, 10).
 *
 * Scene ids are namespaced `n4a3-*`. The last scene ends the episode and the
 * course.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  cbt: {
    label: "Cognitive Behavioral Therapy: Techniques and Benefits (Verywell Mind)",
    url: "https://www.verywellmind.com/what-is-cognitive-behavioral-therapy-2795747",
  },
  mayoStroke: {
    label: "Stroke: Treatment and Recovery (Mayo Clinic)",
    url: "https://www.mayoclinic.org/diseases-conditions/stroke/diagnosis-treatment/drc-20350119",
  },
  harvard: {
    label: "Harvard Medical School: Neuroscience Reports",
    url: "https://neuro.hms.harvard.edu/",
  },
  brainFacts: {
    label: "Brain Facts",
    url: "https://www.brainfacts.org/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit4.js. This act
 * awards `neuro-unit4-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "n4a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n4a3-start": {
      id: "n4a3-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:30",
      text: [
        "\"Treatment combines medication, therapies and lifestyle strategies,\" Imani says. \"Three layers, and the order matters less than the fact that it's three.\"",
        "\"Medication is often most effective when tailored to the individual, because every brain reacts differently. And medication alone is rarely enough. That isn't a criticism of medication. It's a description of how recovery works.\"",
      ],
      source: SOURCES.harvard,
      xp: 10,
      next: "n4a3-treatment-terminal",
    },

    /* ---------------- 2. the three layers ---------------- */
    "n4a3-treatment-terminal": {
      id: "n4a3-treatment-terminal",
      type: "terminal",
      title: "ATLAS: treatment layers",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"All three files,\" Imani says. \"Notice how directly each medication targets the mechanism you learned in Act 1.\"",
      ],
      prompt: "Run the treatment commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "meds",
          cmd: "treatment --medication",
          output: [
            "NEUROLOGICAL",
            "  Epilepsy     : anti-seizure medications stabilise abnormal",
            "                 electrical activity.",
            "  Parkinson's  : dopamine-replacement therapy such as levodopa",
            "                 compensates for lost dopamine neurons.",
            "  MS           : immunomodulatory drugs reduce immune attacks on",
            "                 myelin, slowing progression.",
            "",
            "MENTAL HEALTH",
            "  Depression / anxiety : SSRIs and SNRIs correct neurotransmitter",
            "                         imbalances to stabilise mood.",
            "  Bipolar disorder     : mood stabilisers and antipsychotics.",
            "  ADHD                 : stimulants such as methylphenidate raise",
            "                         dopamine and norepinephrine in the PFC.",
          ],
          required: true,
        },
        {
          id: "rehab",
          cmd: "treatment --rehabilitation",
          output: [
            "REHABILITATION THERAPIES",
            "  Physical therapy",
            "    Strengthens muscles, improves coordination and balance in",
            "    stroke and Parkinson's.",
            "  Occupational therapy",
            "    Regaining daily living skills: cooking, dressing, typing.",
            "    Retrains neural circuits, builds adaptive strategies.",
            "  Speech and language therapy",
            "    Communication and swallowing after brain injury or stroke.",
            "  Cognitive Behavioral Therapy (CBT)",
            "    Reframing harmful thoughts and behaviours.",
            "",
            "  All of it leverages neuroplasticity. Consistent practice and",
            "  repetition can significantly restore lost function.",
          ],
          required: true,
        },
        {
          id: "lifestyle",
          cmd: "treatment --lifestyle",
          output: [
            "LIFESTYLE INTERVENTIONS",
            "  Exercise      : increases blood flow, promotes neurogenesis,",
            "                  boosts dopamine and serotonin.",
            "  Nutrition     : omega-3s, antioxidants and vitamins support",
            "                  neuron health and may slow neurodegeneration.",
            "  Mindfulness   : strengthens the prefrontal cortex, improving",
            "                  focus, self-control and emotional regulation.",
            "  Sleep         : critical for brain repair, memory consolidation",
            "                  and neurotransmitter balance.",
            "  Social and    : interaction and mental challenge promote",
            "  cognitive       cognitive resilience and prevent decline.",
          ],
          required: true,
        },
      ],
      source: SOURCES.harvard,
      xp: 30,
      next: "n4a3-cbt-quiz",
    },

    /* ---------------- 3. official quiz Q5 ---------------- */
    "n4a3-cbt-quiz": {
      id: "n4a3-cbt-quiz",
      type: "quiz",
      title: "Knowledge check: reframing the thought",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"One of the rehabilitation therapies works on thinking rather than on the body,\" Imani says. \"You saw its close relative in Unit 2 as cognitive reappraisal.\"",
      ],
      question: "What type of therapy helps patients reframe negative thoughts and improve coping strategies?",
      options: [
        {
          label: "Occupational Therapy",
          correct: false,
          feedback:
            "Occupational therapy retrains daily living skills like cooking, dressing and typing. Valuable, but it works on function rather than thought patterns.",
        },
        {
          label: "Physical Therapy",
          correct: false,
          feedback:
            "Physical therapy strengthens muscles and restores coordination and balance, particularly after stroke or in Parkinson's.",
        },
        {
          label: "Cognitive Behavioral Therapy (CBT)",
          correct: true,
          feedback:
            "Correct. CBT targets harmful thoughts and behaviours, helping patients reframe negative thinking and build coping strategies. It's effective for 40 to 60% of patients with mood disorders, and it's the clinical relative of the cognitive reappraisal you met in Unit 2.",
        },
        {
          label: "Speech Therapy",
          correct: false,
          feedback:
            "Speech and language therapy improves communication and swallowing after brain injury, stroke or neurodegenerative disease.",
        },
      ],
      source: SOURCES.cbt,
      xp: 25,
      next: "n4a3-cbt-reveal",
    },

    /* ---------------- 4. how well it works ---------------- */
    "n4a3-cbt-reveal": {
      id: "n4a3-cbt-reveal",
      type: "reveal",
      title: "How often CBT works",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Honest numbers matter here,\" Theo says. \"Guess the share of patients with mood disorders that CBT is effective for.\"",
      ],
      question: "For roughly what share of patients with mood disorders is CBT effective?",
      options: ["5-10%", "20-30%", "40-60%", "95-100%"],
      answerIndex: 2,
      value: "40-60%",
      caption: "Share of patients with mood disorders for whom CBT is effective.",
      explain:
        "CBT is effective for 40 to 60% of patients with mood disorders. Worth stating plainly in both directions: it helps around half, and it doesn't help everyone. Someone it doesn't work for hasn't failed at it, which is exactly why treatment combines medication, rehabilitation and lifestyle rather than relying on any single layer.",
      source: SOURCES.cbt,
      xp: 25,
      next: "n4a3-lifestyle-quiz",
    },

    /* ---------------- 5. official quiz Q9 ---------------- */
    "n4a3-lifestyle-quiz": {
      id: "n4a3-lifestyle-quiz",
      type: "quiz",
      title: "Knowledge check: the third layer",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Lifestyle changes support recovery. They support it, alongside the other two layers rather than instead of them,\" Imani says.",
      ],
      question: "Which of the following is a lifestyle strategy to support recovery from neurological or mental health disorders?",
      options: [
        {
          label: "Increasing caffeine intake",
          correct: false,
          feedback:
            "Not among the recommended interventions. Those are exercise, nutrition, mindfulness, sleep management, and social and cognitive engagement.",
        },
        {
          label: "Mindfulness and regular exercise",
          correct: true,
          feedback:
            "Correct. Exercise increases blood flow to the brain, promotes neurogenesis and boosts dopamine and serotonin. Mindfulness strengthens the prefrontal cortex, improving focus, self-control and emotional regulation. Both support recovery alongside medication and rehabilitation.",
        },
        {
          label: "Avoiding social interaction",
          correct: false,
          feedback:
            "The opposite of the advice. Social engagement and cognitive challenge promote resilience and help prevent decline.",
        },
        {
          label: "Reducing sleep to stay productive",
          correct: false,
          feedback:
            "Quality sleep is critical for brain repair, memory consolidation and neurotransmitter balance. Cutting it works against every other intervention.",
        },
      ],
      source: SOURCES.harvard,
      xp: 25,
      next: "n4a3-plasticity-quiz",
    },

    /* ---------------- 6. official quiz Q10 ---------------- */
    "n4a3-plasticity-quiz": {
      id: "n4a3-plasticity-quiz",
      type: "quiz",
      title: "Knowledge check: why recovery is possible at all",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Last question of the course,\" Imani says. \"And it's the same property that ran through all four units.\"",
      ],
      question: "How can neuroplasticity help someone recovering from a stroke?",
      options: [
        {
          label: "It allows the brain to reorganize and form new neural connections",
          correct: true,
          feedback:
            "Correct. Rehabilitation leverages neuroplasticity: undamaged regions take over functions lost to the damaged tissue, and consistent practice and repetition can significantly restore what was lost. It works in adulthood too, which is why therapy after a stroke is worth the effort at any age.",
        },
        {
          label: "It automatically restores dopamine receptor levels",
          correct: false,
          feedback:
            "Receptor sensitivity does recover with reduced overstimulation, from Unit 3, but that's a separate process and nothing about plasticity is automatic. It responds to practice.",
        },
        {
          label: "It prevents future strokes entirely",
          correct: false,
          feedback:
            "Plasticity helps the brain adapt after damage. It doesn't prevent damage happening again, which is what medication and lifestyle changes address.",
        },
        {
          label: "It eliminates the need for physical therapy",
          correct: false,
          feedback:
            "The reverse: physical therapy is how plasticity gets directed. The reorganisation happens through consistent practice and repetition, not instead of it.",
        },
      ],
      source: SOURCES.mayoStroke,
      xp: 25,
      next: "n4a3-plan-inspect",
    },

    /* ---------------- 7. review a recovery plan ---------------- */
    "n4a3-plan-inspect": {
      id: "n4a3-plan-inspect",
      type: "inspect",
      title: "Review the plan: what's missing or working against it?",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Workstation 3",
      text: [
        "\"A recovery plan written by a patient six weeks after a stroke,\" Imani says. \"Most of it is sound. Tap the lines that work against what we know.\"",
      ],
      prompt: "Tap the lines that contradict the evidence. Find at least 4.",
      artifact: {
        kind: "recovery",
        fields: [
          { label: "Patient", value: "Six weeks post-stroke", hot: "patient" },
          { label: "Goal", value: "Regain use of the left hand", hot: "goal" },
        ],
        body: [
          "CURRENT PLAN",
          "Attending physical therapy twice weekly as scheduled.",
          {
            hot: "stopped",
            text: "Stopped the occupational therapy sessions, since progress felt too slow to be worth the time.",
          },
          "Taking prescribed medication daily, reviewed monthly with the consultant.",
          {
            hot: "sleep",
            text: "Cutting sleep to five hours to fit more practice in.",
          },
          {
            hot: "alone",
            text: "Declining visits from friends until recovery is further along.",
          },
          "Walking for thirty minutes most days.",
          {
            hot: "wait",
            text: "Plans to stop home exercises entirely and wait for the brain to repair itself on its own.",
          },
          "Eating more fish and vegetables on the dietitian's advice.",
        ],
      },
      requiredFinds: 4,
      hotspots: {
        patient: {
          suspicious: false,
          explain: "Timing information. Six weeks is early, and recovery continues well past it.",
        },
        goal: {
          suspicious: false,
          explain: "A specific, functional goal. Exactly what rehabilitation should be organised around.",
        },
        stopped: {
          suspicious: true,
          explain: "Occupational therapy retrains neural circuits and rebuilds daily living skills. Recovery isn't instantaneous, and consistent, targeted effort is what produces it. Stopping because progress feels slow removes the mechanism.",
        },
        sleep: {
          suspicious: true,
          explain: "Quality sleep is critical for brain repair, memory consolidation and neurotransmitter balance. Trading sleep for practice time works against the repair the practice is meant to drive.",
        },
        alone: {
          suspicious: true,
          explain: "Social engagement promotes cognitive resilience and helps prevent decline. Isolation removes one of the five recommended lifestyle supports at the point it's most useful.",
        },
        wait: {
          suspicious: true,
          explain: "Neuroplasticity responds to practice; it isn't passive. Rehabilitation leverages it through consistent practice and repetition, so waiting rather than working is the one thing that stops it happening.",
        },
      },
      source: SOURCES.mayoStroke,
      xp: 40,
      next: "n4a3-dossier",
    },

    /* ---------------- 8. dossier ---------------- */
    "n4a3-dossier": {
      id: "n4a3-dossier",
      type: "dossier",
      title: "Lab card: treatment and management",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Final card of the course,\" Imani says.",
      ],
      terms: [
        { term: "Rehabilitation", definition: "Therapy to restore lost function." },
        { term: "Pharmacotherapy", definition: "Use of medication to manage symptoms." },
        {
          term: "Cognitive-Behavioral Therapy (CBT)",
          definition: "Therapy targeting harmful thoughts and behaviors.",
        },
        {
          term: "Neuroplasticity",
          definition: "Brain's ability to reorganize and form new neural connections.",
        },
        {
          term: "Lifestyle Intervention",
          definition: "Diet, exercise, and stress reduction to support brain health.",
        },
        {
          term: "Neurogenesis",
          definition: "The creation of new neurons, promoted by regular physical activity.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 20,
      next: "n4a3-final-choice",
    },

    /* ---------------- 9. putting it together ---------------- */
    "n4a3-final-choice": {
      id: "n4a3-final-choice",
      type: "choice",
      title: "What would you tell them?",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab, 12:20",
      text: [
        "\"That patient asks you directly whether any of this is worth doing, or whether the damage is just the damage,\" Theo says.",
        "\"What's the honest answer?\"",
      ],
      prompt: "Pick the answer that's both accurate and honest.",
      options: [
        {
          label: "Recovery is gradual and takes consistent effort, but the brain reorganises through practice, so the therapy is what makes the difference.",
          next: "n4a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct, and honest in both directions. Recovery is not instantaneous, and consistent, targeted effort produces meaningful improvement. Rehabilitation leverages neuroplasticity, so continuing is the mechanism rather than just the discipline.",
        },
        {
          label: "Promise a full recovery, since the brain can always repair itself completely.",
          next: "n4a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Overpromising isn't kind. Plasticity allows patients to regain partial function after injury, even in adulthood, and partial is the honest word. A promise that doesn't hold makes the next setback worse.",
        },
        {
          label: "Say the damage is permanent and manage expectations downward.",
          next: "n4a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "That's inaccurate as well as discouraging. Neuroplasticity allows patients to regain partial function after injury, even in adulthood, and 2 to 6 weeks of consistent intervention can measurably improve mood and cognitive function.",
        },
      ],
      source: SOURCES.mayoStroke,
    },

    /* ---------------- 10. ending ---------------- */
    "n4a3-ending": {
      id: "n4a3-ending",
      type: "ending",
      title: "Unit 4 complete",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 12:35",
      text: [
        "\"That's the placement,\" Imani says. \"Four units. Which region does which job. How a signal gets in and where perception is constructed rather than recorded. What emotion is made of. What happens when the reward system is pulled too hard, and what happens when any of it breaks for reasons nobody chose.\"",
        "\"One thing ran through all of it. The brain is adaptive. Even when damaged or dysregulated it can reorganise and strengthen new circuits. That's why bias can be trained against, why regulation improves with practice, why receptors recover, and why rehabilitation works.\"",
        "Theo hands you a lab badge with your own name on it. \"You're not a summer student any more,\" he says. \"Go and read something and argue with it.\"",
      ],
      xp: 20,
      badge: "neuro-unit4-certified",
      next: null,
    },
  },
};

export default act3;
