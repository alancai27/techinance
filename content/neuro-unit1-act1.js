// @ts-check

/**
 * Neuroscience, Unit 1, Act 1: "The Regions and What They Do"
 *
 * Source material: "Unit 1: How Your Brain Processes Reality", section 1,
 * transcribed at content/sources/neuro-unit1-brain-processes-reality.md.
 *
 * Every figure quoted here comes from that document and must stay exact:
 *   the brain has around 86 billion neurons,
 *   the prefrontal cortex is not fully developed until around age 25,
 *   the brain uses about 20% of the body's total energy.
 *
 * Five of Unit 1's ten official quiz questions live in this act (1, 2, 3, 8, 9).
 * Their wording, option order and correct answer are fixed by the form. See
 * content/sources/neuro-unit1-quiz-questions.md.
 *
 * Scene ids are namespaced `n1a1-*`. The last scene hands off to `n1a2-start`.
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
  mcgill: {
    label: "The Brain from Top to Bottom (McGill University)",
    url: "https://thebrain.mcgill.ca/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit1.js. This act
 * awards `region-mapper`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "n1a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n1a1-start": {
      id: "n1a1-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 09:00",
      text: [
        "First morning as a research assistant. Dr. Imani Reyes runs the cognitive lab at Ashgrove, and she starts everyone the same way.",
        "\"Before you touch a scanner you need to know what you're looking at. The brain isn't one thing doing one job. It's a set of specialised regions, and each one handles something different: perception, emotion, memory, behaviour.\"",
        "\"Around 86 billion neurons in there. We'll start with which parts do what, because everything else this year depends on it.\"",
      ],
      source: SOURCES.brainFacts,
      xp: 10,
      next: "n1a1-neurons-reveal",
    },

    /* ---------------- 2. scale ---------------- */
    "n1a1-neurons-reveal": {
      id: "n1a1-neurons-reveal",
      type: "reveal",
      title: "How much is in there",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"People underestimate this by orders of magnitude,\" Imani says. \"Guess how many neurons a human brain holds.\"",
      ],
      question: "Roughly how many neurons does the human brain have?",
      options: ["86 million", "8.6 billion", "86 billion", "860 trillion"],
      answerIndex: 2,
      value: "86 billion",
      caption: "Approximate number of neurons in the human brain.",
      explain:
        "The human brain has around 86 billion neurons. It's also expensive to run: the brain uses about 20% of the body's total energy despite being a small fraction of its weight.",
      source: SOURCES.brainFacts,
      xp: 25,
      next: "n1a1-atlas-terminal",
    },

    /* ---------------- 3. the lobes ---------------- */
    "n1a1-atlas-terminal": {
      id: "n1a1-atlas-terminal",
      type: "terminal",
      title: "ATLAS: regional briefing",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"ATLAS is the lab's reference system,\" Imani says. \"Pull both briefings. You'll be sorting these in a minute, so read properly.\"",
      ],
      prompt: "Run the briefing commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "cortex",
          cmd: "regions --list cortex",
          output: [
            "CORTICAL REGIONS // 4 entries",
            "  Prefrontal cortex   : front of the brain",
            "    Decision-making, planning, personality expression. Evaluates",
            "    situations, weighs future consequences, controls impulses.",
            "    NOTE: not fully developed until around age 25.",
            "  Temporal lobe       : sides of the brain",
            "    Auditory processing and memory formation. Handles sound and",
            "    language.",
            "  Occipital lobe      : back of the brain",
            "    Vision. Decodes visual input into shapes, colours, motion.",
            "  Parietal lobe       : upper rear",
            "    Spatial awareness and touch. Contains the somatosensory cortex,",
            "    which receives touch-related data.",
          ],
          required: true,
        },
        {
          id: "deep",
          cmd: "regions --list subcortical",
          output: [
            "DEEPER STRUCTURES // 3 entries",
            "  Hippocampus  : part of the limbic system",
            "    Turns short-term memories into long-term ones. Central to",
            "    memory formation and navigation.",
            "    NOTE: can shrink under chronic stress.",
            "  Amygdala     : part of the limbic system",
            "    Emotional responses, particularly fear and aggression.",
            "  Brainstem",
            "    Breathing, heart rate, and other basic life functions.",
            "    Critical for survival.",
          ],
          required: true,
        },
      ],
      source: SOURCES.mcgill,
      xp: 30,
      next: "n1a1-pfc-quiz",
    },

    /* ---------------- 4. official quiz Q1 ---------------- */
    "n1a1-pfc-quiz": {
      id: "n1a1-pfc-quiz",
      type: "quiz",
      title: "Knowledge check: the front of the brain",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Start with the region that takes the longest to finish growing,\" Imani says.",
      ],
      question: "What is the main function of the prefrontal cortex?",
      options: [
        {
          label: "Processing auditory signals",
          correct: false,
          feedback:
            "That's the temporal lobe, on the sides of the brain. The prefrontal cortex sits at the front and handles planning, decision-making and personality expression.",
        },
        {
          label: "Planning, decision-making, and personality expression",
          correct: true,
          feedback:
            "Correct. The prefrontal cortex evaluates situations, weighs future consequences and controls impulses. It isn't fully developed until around age 25, which is a large part of why teenagers and adults weigh risk differently.",
        },
        {
          label: "Controlling motor movement",
          correct: false,
          feedback:
            "Movement isn't the prefrontal cortex's job. It handles planning, decision-making and personality expression, which is the deliberate layer sitting above reflex.",
        },
        {
          label: "Regulating balance and coordination",
          correct: false,
          feedback:
            "That's the cerebellum's territory. The prefrontal cortex is the front-of-brain region for planning, decision-making and personality.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n1a1-occipital-quiz",
    },

    /* ---------------- 5. official quiz Q2 ---------------- */
    "n1a1-occipital-quiz": {
      id: "n1a1-occipital-quiz",
      type: "quiz",
      title: "Knowledge check: where vision is handled",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "Theo Lindqvist started six months before you and is already running his own sessions.",
        "\"This one catches people out because the eyes are at the front and the processing isn't,\" he says.",
      ],
      question: "Which part of the brain is responsible for processing visual information?",
      options: [
        {
          label: "Temporal lobe",
          correct: false,
          feedback:
            "The temporal lobe handles hearing and memory formation, not sight. Vision is decoded at the back of the brain.",
        },
        {
          label: "Amygdala",
          correct: false,
          feedback:
            "The amygdala drives emotional responses, particularly fear. It reacts to what you see but doesn't decode it.",
        },
        {
          label: "Parietal lobe",
          correct: false,
          feedback:
            "The parietal lobe manages spatial awareness and touch, and holds the somatosensory cortex. Vision is processed further back.",
        },
        {
          label: "Occipital lobe",
          correct: true,
          feedback:
            "Correct. The occipital lobe sits at the back of the brain and decodes visual input into shapes, colours and motion. Damage to it can cause visual hallucinations or blindness, even when the eyes themselves are fine.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n1a1-temporal-quiz",
    },

    /* ---------------- 6. official quiz Q9 ---------------- */
    "n1a1-temporal-quiz": {
      id: "n1a1-temporal-quiz",
      type: "quiz",
      title: "Knowledge check: the sides of the brain",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Same region, two jobs that don't obviously belong together,\" Theo says.",
      ],
      question: "What does the temporal lobe primarily process?",
      options: [
        {
          label: "Hearing and language",
          correct: true,
          feedback:
            "Correct. The temporal lobe handles auditory processing, and it's also involved in memory formation. Sound and language sit together there.",
        },
        {
          label: "Smell and taste",
          correct: false,
          feedback:
            "Taste is interpreted by the gustatory cortex and smell by the olfactory bulb. The temporal lobe is where hearing and language are processed.",
        },
        {
          label: "Touch and movement",
          correct: false,
          feedback:
            "Touch belongs to the somatosensory cortex in the parietal lobe. The temporal lobe handles hearing and language.",
        },
        {
          label: "Vision and balance",
          correct: false,
          feedback:
            "Vision is the occipital lobe. The temporal lobe, on the sides of the brain, processes hearing and language.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n1a1-regions-sort",
    },

    /* ---------------- 7. sort the regions ---------------- */
    "n1a1-regions-sort": {
      id: "n1a1-regions-sort",
      type: "sort",
      title: "Match each job to its region",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Six functions, four regions,\" Imani says. \"Two regions take more than one job, which is the point. Nothing in here does exactly one thing.\"",
      ],
      prompt: "Drag each function to the region that handles it.",
      buckets: [
        { id: "pfc", label: "Prefrontal cortex", hint: "Front of the brain" },
        { id: "temporal", label: "Temporal lobe", hint: "Sides of the brain" },
        { id: "occipital", label: "Occipital lobe", hint: "Back of the brain" },
        { id: "parietal", label: "Parietal lobe", hint: "Upper rear" },
      ],
      items: [
        {
          id: "planning",
          label: "Planning and weighing consequences",
          bucket: "pfc",
          explain: "The prefrontal cortex. It evaluates situations and controls impulses, and it isn't fully developed until around age 25.",
        },
        {
          id: "personality",
          label: "Personality expression",
          bucket: "pfc",
          explain: "Also the prefrontal cortex, which is why frontal damage can change who somebody seems to be.",
        },
        {
          id: "hearing",
          label: "Auditory processing",
          bucket: "temporal",
          explain: "The temporal lobe, on the sides of the brain, handles sound and language.",
        },
        {
          id: "memory",
          label: "Memory formation",
          bucket: "temporal",
          explain: "Also the temporal lobe, which is where the hippocampus sits. Hearing and memory share a neighbourhood.",
        },
        {
          id: "vision",
          label: "Decoding shapes, colours and motion",
          bucket: "occipital",
          explain: "The occipital lobe at the back of the brain turns signals from the eyes into an image.",
        },
        {
          id: "touch",
          label: "Spatial awareness and touch",
          bucket: "parietal",
          explain: "The parietal lobe, which contains the somatosensory cortex where touch-related data arrives.",
        },
      ],
      source: SOURCES.mcgill,
      xp: 35,
      badge: "region-mapper",
      next: "n1a1-amygdala-quiz",
    },

    /* ---------------- 8. official quiz Q3 ---------------- */
    "n1a1-amygdala-quiz": {
      id: "n1a1-amygdala-quiz",
      type: "quiz",
      title: "Knowledge check: the limbic system",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Now go deeper than the cortex,\" Imani says. \"The limbic system sits underneath, and it's older, faster and less deliberate.\"",
      ],
      question: "What role does the amygdala play in brain function?",
      options: [
        {
          label: "Processing emotions like fear and aggression",
          correct: true,
          feedback:
            "Correct. The amygdala drives emotional responses, particularly fear. It's part of the limbic system, which handles emotion and memory together.",
        },
        {
          label: "Movement coordination",
          correct: false,
          feedback:
            "Coordination isn't the amygdala. It's the structure responsible for emotional reactions, fear most of all.",
        },
        {
          label: "Auditory processing",
          correct: false,
          feedback:
            "Sound is the temporal lobe. The amygdala reacts emotionally to what arrives rather than decoding it.",
        },
        {
          label: "Spatial reasoning",
          correct: false,
          feedback:
            "Spatial awareness belongs to the parietal lobe. The amygdala controls emotional responses like fear.",
        },
      ],
      source: SOURCES.ninds,
      xp: 25,
      next: "n1a1-hippocampus-quiz",
    },

    /* ---------------- 9. official quiz Q8 ---------------- */
    "n1a1-hippocampus-quiz": {
      id: "n1a1-hippocampus-quiz",
      type: "quiz",
      title: "Knowledge check: turning experience into memory",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"The other limbic structure,\" Theo says. \"It sits right next to the amygdala, which turns out to matter a lot in Unit 2.\"",
      ],
      question: "Which brain structure is crucial for memory formation and navigation?",
      options: [
        {
          label: "Thalamus",
          correct: false,
          feedback:
            "The thalamus is the brain's sensory relay station, routing incoming signals to the right areas. Memory formation happens elsewhere.",
        },
        {
          label: "Amygdala",
          correct: false,
          feedback:
            "The amygdala handles emotional responses like fear. It sits beside the structure that does memory, and the two work closely together.",
        },
        {
          label: "Cerebellum",
          correct: false,
          feedback:
            "The cerebellum deals with balance and coordination. Memory formation and navigation belong to a limbic structure.",
        },
        {
          label: "Hippocampus",
          correct: true,
          feedback:
            "Correct. The hippocampus turns short-term memories into long-term ones and is central to navigation. It can shrink under chronic stress, which is one reason prolonged stress affects memory.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 25,
      next: "n1a1-dossier",
    },

    /* ---------------- 10. dossier ---------------- */
    "n1a1-dossier": {
      id: "n1a1-dossier",
      type: "dossier",
      title: "Lab card: brain structure",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Take the card,\" Imani says. \"Every one of these turns up in a paper you'll read this year.\"",
      ],
      terms: [
        { term: "Prefrontal Cortex", definition: "Region involved in decision-making and personality." },
        { term: "Temporal Lobe", definition: "Processes auditory information and memory." },
        { term: "Occipital Lobe", definition: "Interprets visual information." },
        { term: "Parietal Lobe", definition: "Manages spatial awareness and touch." },
        { term: "Somatosensory Cortex", definition: "Area that processes touch and physical sensations." },
        { term: "Limbic System", definition: "Set of brain structures involved in emotions and memory." },
        { term: "Hippocampus", definition: "Brain structure involved in memory formation." },
        { term: "Amygdala", definition: "Controls emotional responses like fear." },
        { term: "Brainstem", definition: "Regulates basic life-sustaining functions." },
        { term: "Perception", definition: "The process of organizing and interpreting sensory information." },
      ],
      source: SOURCES.mcgill,
      xp: 20,
      next: "n1a1-handoff",
    },

    /* ---------------- 11. handoff to act 2 ---------------- */
    "n1a1-handoff": {
      id: "n1a1-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:20",
      text: [
        "\"You know the map,\" Imani says. \"Now the harder question: how does anything get from the outside world into those regions in the first place?\"",
        "\"Because none of this works if the signal doesn't arrive, and almost all of it goes through one structure on the way.\"",
      ],
      xp: 15,
      next: "n1a2-start",
    },
  },
};

export default act1;
