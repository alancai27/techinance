// @ts-check

/**
 * Neuroscience, Unit 3, Act 1: "What Dopamine Actually Does"
 *
 * Source material: "Unit 3: Hacking Reward Systems to Overcome Dopamine
 * Addictions", section 1, transcribed at content/sources/neuro-unit3-dopamine.md.
 *
 * Figures quoted here come from that document and must stay exact:
 *   the brain has around 400,000 dopamine-producing neurons,
 *   dopamine spikes more strongly in anticipation than during the reward.
 *
 * Three of Unit 3's ten official quiz questions live in this act (1, 2, 7).
 * See content/sources/neuro-unit3-quiz-questions.md.
 *
 * Scene ids are namespaced `n3a1-*`. The last scene hands off to `n3a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  brainFacts: {
    label: "Brain Facts",
    url: "https://www.brainfacts.org/",
  },
  ninds: {
    label: "National Institute of Neurological Disorders and Stroke",
    url: "https://www.ninds.nih.gov/",
  },
  harvard: {
    label: "Harvard Medical School: Neuroscience Reports",
    url: "https://neuro.hms.harvard.edu/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit3.js. This act
 * awards `reward-tracer`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "n3a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n3a1-start": {
      id: "n3a1-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 09:00",
      text: [
        "\"Unit 2 told you dopamine handles reward and motivation,\" Imani says. \"That's true and it's not the whole story, and the gap is where this unit lives.\"",
        "\"People call it the pleasure molecule. It isn't. Its main role is motivation, learning, and anticipation of rewards, not pleasure itself. Get that distinction wrong and nothing about digital addiction makes sense.\"",
      ],
      source: SOURCES.brainFacts,
      xp: 10,
      next: "n3a1-role-quiz",
    },

    /* ---------------- 2. official quiz Q1 ---------------- */
    "n3a1-role-quiz": {
      id: "n3a1-role-quiz",
      type: "quiz",
      title: "Knowledge check: what dopamine is for",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Start with the definition, because the popular one is wrong,\" Imani says.",
      ],
      question: "What is the primary role of dopamine in the brain?",
      options: [
        {
          label: "Controlling heart rate",
          correct: false,
          feedback:
            "Heart rate is a brainstem function, one of the basic life-sustaining jobs from Unit 1.",
        },
        {
          label: "Enhancing muscle coordination",
          correct: false,
          feedback:
            "Coordination belongs to the cerebellum. Dopamine loss does affect movement in Parkinson's, but that's a downstream consequence rather than its primary role.",
        },
        {
          label: "Motivation, learning, and anticipating rewards",
          correct: true,
          feedback:
            "Correct. Dopamine is often called the pleasure molecule, and that isn't accurate. Its main role is motivation, learning and anticipation. When something rewarding happens, dopamine strengthens the neural connections around the action you took, saying in effect: do this again, it's valuable.",
        },
        {
          label: "Regulating body temperature",
          correct: false,
          feedback:
            "Temperature regulation isn't dopamine's job. It handles motivation, learning and the anticipation of rewards.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 25,
      next: "n3a1-pathway-terminal",
    },

    /* ---------------- 3. the reward pathway ---------------- */
    "n3a1-pathway-terminal": {
      id: "n3a1-pathway-terminal",
      type: "terminal",
      title: "ATLAS: the reward pathway",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Three regions in a circuit,\" Imani says. \"One of them you already know well.\"",
      ],
      prompt: "Run the pathway commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "circuit",
          cmd: "reward --pathway",
          output: [
            "REWARD PATHWAY // 3 regions",
            "  Ventral Tegmental Area (VTA)",
            "    Produces dopamine and initiates the reward signal.",
            "  Nucleus Accumbens",
            "    The 'pleasure hub'. Dopamine release here reinforces",
            "    behaviour and creates motivation.",
            "  Prefrontal Cortex (PFC)",
            "    Integrates dopamine signals to plan, decide, and evaluate",
            "    long-term consequences. Weighs how rewarding an action is,",
            "    guiding both goal-directed behaviour and impulse control.",
            "",
            "  ~400,000 dopamine-producing neurons, each branching to",
            "  thousands of synapses.",
          ],
          required: true,
        },
        {
          id: "modes",
          cmd: "reward --drivers",
          output: [
            "DOPAMINE DRIVES BEHAVIOUR THREE WAYS",
            "  ANTICIPATION",
            "    Spikes when a reward is expected, not just received. Waiting",
            "    for a notification can feel more exciting than getting it.",
            "  LEARNING",
            "    Strengthens connections so you remember which behaviours led",
            "    to rewards, and repeat them.",
            "  ACTION",
            "    Supplies the drive to act: check the phone, reach for the",
            "    chocolate, finish the task.",
            "",
            "  Evolved for survival behaviours: eating, social bonding,",
            "  learning.",
          ],
          required: true,
        },
      ],
      source: SOURCES.ninds,
      xp: 30,
      next: "n3a1-hub-quiz",
    },

    /* ---------------- 4. official quiz Q2 ---------------- */
    "n3a1-hub-quiz": {
      id: "n3a1-hub-quiz",
      type: "quiz",
      title: "Knowledge check: where reinforcement happens",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"One of those three has a nickname,\" Theo says. \"It's a slightly misleading nickname, but it's the one in the literature.\"",
      ],
      question: "Which brain region is known as the “pleasure hub” where dopamine reinforces behavior?",
      options: [
        {
          label: "Prefrontal Cortex (PFC)",
          correct: false,
          feedback:
            "The PFC integrates dopamine signals to plan and evaluate consequences. It's the deliberating part of the circuit, not the reinforcing part.",
        },
        {
          label: "Amygdala",
          correct: false,
          feedback:
            "The amygdala handles fear and threat, from Unit 2. It isn't part of the reward pathway.",
        },
        {
          label: "Nucleus Accumbens",
          correct: true,
          feedback:
            "Correct. The nucleus accumbens is where dopamine release reinforces behaviour and creates motivation. The VTA produces the dopamine and initiates the signal; the accumbens is where that signal does its reinforcing work.",
        },
        {
          label: "Hippocampus",
          correct: false,
          feedback:
            "The hippocampus handles memory. It records what happened, but reinforcement of the behaviour happens elsewhere in the circuit.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n3a1-anticipation-quiz",
    },

    /* ---------------- 5. official quiz Q7 ---------------- */
    "n3a1-anticipation-quiz": {
      id: "n3a1-anticipation-quiz",
      type: "quiz",
      title: "Knowledge check: when the spike happens",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"This is the single most important fact in the unit,\" Imani says. \"Everything a platform does to hold your attention is built on it.\"",
      ],
      question: "When does dopamine spike the most?",
      options: [
        {
          label: "When anticipating a reward",
          correct: true,
          feedback:
            "Correct. Dopamine spikes more strongly in anticipation than during the actual reward. That's why waiting for a notification or a game drop can feel more thrilling than the thing itself, and why a system designed around waiting is so hard to put down.",
        },
        {
          label: "After eating a full meal",
          correct: false,
          feedback:
            "Eating is a rewarding behaviour, but the largest spike comes before the reward arrives rather than after it.",
        },
        {
          label: "Only during sleep",
          correct: false,
          feedback:
            "Dopamine is a waking motivation signal. Its biggest spike comes in anticipation of a reward.",
        },
        {
          label: "When exercising",
          correct: false,
          feedback:
            "Exercise does increase dopamine naturally, which matters in Act 3. But the pattern the question is after is that anticipation beats receipt.",
        },
      ],
      source: SOURCES.harvard,
      xp: 25,
      next: "n3a1-neurons-reveal",
    },

    /* ---------------- 6. scale ---------------- */
    "n3a1-neurons-reveal": {
      id: "n3a1-neurons-reveal",
      type: "reveal",
      title: "How few neurons run all of this",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Unit 1 put the whole brain at 86 billion neurons,\" Theo says. \"Guess how many of those actually produce dopamine.\"",
      ],
      question: "Roughly how many dopamine-producing neurons does the brain have?",
      options: ["around 4,000", "around 400,000", "around 40 million", "around 4 billion"],
      answerIndex: 1,
      value: "400,000",
      caption: "Dopamine-producing neurons in the human brain.",
      explain:
        "The brain has around 400,000 dopamine-producing neurons, each branching to thousands of synapses. Against 86 billion neurons overall that's a tiny population with enormous reach, which is part of why disrupting it has such wide effects.",
      source: SOURCES.brainFacts,
      xp: 25,
      next: "n3a1-drivers-sort",
    },

    /* ---------------- 7. sort the three drivers ---------------- */
    "n3a1-drivers-sort": {
      id: "n3a1-drivers-sort",
      type: "sort",
      title: "Which driver is at work?",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Six everyday moments,\" Imani says. \"Each one is dopamine doing one of its three jobs.\"",
      ],
      prompt: "Drag each moment to the driver behind it.",
      buckets: [
        { id: "anticipation", label: "Anticipation", hint: "Expecting the reward" },
        { id: "learning", label: "Learning", hint: "Remembering what worked" },
        { id: "action", label: "Action", hint: "The drive to do it" },
      ],
      items: [
        {
          id: "waiting",
          label: "The buzz while waiting to see if a message replied",
          bucket: "anticipation",
          explain: "Anticipation. Dopamine spikes when a reward is expected, often more than when it arrives.",
        },
        {
          id: "loot",
          label: "Refreshing to see whether the drop happened",
          bucket: "anticipation",
          explain: "Also anticipation, and this is the one platforms build around deliberately.",
        },
        {
          id: "remember",
          label: "Remembering which app gave you the good feeling",
          bucket: "learning",
          explain: "Learning. Dopamine strengthens the connections around a rewarded behaviour so you can find it again.",
        },
        {
          id: "habit",
          label: "The route to the fridge becoming automatic",
          bucket: "learning",
          explain: "Learning, hardening into habit formation: repeated behaviours become automatic through reinforced dopamine signalling.",
        },
        {
          id: "reach",
          label: "Reaching for your phone without deciding to",
          bucket: "action",
          explain: "Action. Dopamine supplies the drive to act, and by this point the deciding has stopped happening.",
        },
        {
          id: "finish",
          label: "Pushing to finish a task you've nearly completed",
          bucket: "action",
          explain: "Also action. The same drive that gets you to the phone gets you to the end of a piece of work.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 35,
      badge: "reward-tracer",
      next: "n3a1-dossier",
    },

    /* ---------------- 8. dossier ---------------- */
    "n3a1-dossier": {
      id: "n3a1-dossier",
      type: "dossier",
      title: "Lab card: the dopamine system",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"First card,\" Imani says. \"The last two terms are what Act 2 is about.\"",
      ],
      terms: [
        {
          term: "Dopamine",
          definition: "A neurotransmitter that signals reward, motivation, learning, and anticipation.",
        },
        {
          term: "Neurotransmitter",
          definition: "Chemical messenger that allows neurons to communicate across synapses.",
        },
        {
          term: "Reward Pathway",
          definition: "Neural circuit that drives motivated behavior, connecting the VTA, nucleus accumbens, and prefrontal cortex.",
        },
        {
          term: "Ventral Tegmental Area (VTA)",
          definition: "Produces dopamine and initiates reward signals.",
        },
        {
          term: "Nucleus Accumbens",
          definition: "Reinforces behavior and creates motivation; often called the “pleasure hub”.",
        },
        {
          term: "Prefrontal Cortex (PFC)",
          definition: "Uses dopamine signals to make decisions, plan actions, and control impulses.",
        },
        {
          term: "Anticipation",
          definition: "The spike of dopamine when expecting a reward, driving motivation.",
        },
        {
          term: "Downregulation",
          definition: "The reduction of dopamine receptors after overstimulation, decreasing sensitivity to rewards.",
        },
        {
          term: "Habit Formation",
          definition: "The process by which repeated behaviors become automatic due to reinforced dopamine signaling.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 20,
      next: "n3a1-handoff",
    },

    /* ---------------- 9. handoff to act 2 ---------------- */
    "n3a1-handoff": {
      id: "n3a1-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:10",
      text: [
        "\"This system evolved for eating, social bonding and learning,\" Imani says. \"It's perfectly good at those.\"",
        "\"The problem is that a system built to reward finding food occasionally now sits in a pocket next to something engineered to trigger it a few hundred times a day. Act 2 is how that engineering works.\"",
      ],
      xp: 15,
      next: "n3a2-start",
    },
  },
};

export default act1;
