// @ts-check

/**
 * Neuroscience, Unit 1, Act 2: "How the Signal Gets In"
 *
 * Source material: "Unit 1: How Your Brain Processes Reality", section 2,
 * transcribed at content/sources/neuro-unit1-brain-processes-reality.md.
 *
 * Every figure quoted here comes from that document and must stay exact:
 *   1 in 6 children have sensory processing challenges,
 *   vision accounts for over 80% of the information the brain receives,
 *   the thalamus handles around 98% of all sensory input,
 *   touch sensitivity affects up to 95% of children with autism,
 *   the human nose can detect over 1 trillion different scents.
 *
 * The "smell bypasses the thalamus" question (official Q4) is the reason the
 * thalamus figure is 98% rather than 100%. The source states both facts
 * separately; the episode connects them rather than adding anything.
 *
 * Two of Unit 1's ten official quiz questions live in this act (4 and 5).
 *
 * Scene ids are namespaced `n1a2-*`. The last scene hands off to `n1a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  sensory101: {
    label: "Sensory Processing 101 (The Inspired Treehouse)",
    url: "https://theinspiredtreehouse.com/sensory-processing-101/",
  },
  nidcd: {
    label: "National Institute on Deafness and Other Communication Disorders",
    url: "https://www.nidcd.nih.gov/",
  },
  harvard: {
    label: "Harvard Medical School: Neuroscience Reports",
    url: "https://neuro.hms.harvard.edu/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit1.js. This act
 * awards `signal-tracer`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "n1a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n1a2-start": {
      id: "n1a2-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:25",
      text: [
        "\"Sensory processing is how the brain receives, organises and interprets input from the environment,\" Imani says. \"Five primary senses: sight, sound, touch, taste, smell. Each one has a region that handles it.\"",
        "\"But almost nothing goes straight there. There's a relay in the middle, and it decides what gets through.\"",
      ],
      source: SOURCES.sensory101,
      xp: 10,
      next: "n1a2-thalamus-reveal",
    },

    /* ---------------- 2. the relay ---------------- */
    "n1a2-thalamus-reveal": {
      id: "n1a2-thalamus-reveal",
      type: "reveal",
      title: "How much goes through the thalamus",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"The thalamus is the sensory relay station. It filters incoming data and directs it to the right area,\" Imani says. \"Guess what share of sensory input passes through it.\"",
      ],
      question: "Roughly what share of all sensory input does the thalamus handle?",
      options: ["around 45%", "around 70%", "around 98%", "100%"],
      answerIndex: 2,
      value: "98%",
      caption: "Share of all sensory input routed through the thalamus.",
      explain:
        "The thalamus handles around 98% of all sensory input. Note that it isn't 100%, and the gap isn't rounding. One sense skips the relay entirely, which is the next question.",
      source: SOURCES.harvard,
      xp: 25,
      next: "n1a2-smell-quiz",
    },

    /* ---------------- 3. official quiz Q4 ---------------- */
    "n1a2-smell-quiz": {
      id: "n1a2-smell-quiz",
      type: "quiz",
      title: "Knowledge check: the sense that skips the relay",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Ninety-eight percent, not a hundred,\" Theo says. \"One sense has its own route straight to the cortex, and it's the oldest one we've got.\"",
      ],
      question: "Which sense bypasses the thalamus and connects directly to the brain's cortex?",
      options: [
        {
          label: "Taste",
          correct: false,
          feedback:
            "Taste is interpreted by the gustatory cortex, and it routes through the thalamus like most senses. The exception is the one handled by the olfactory bulb.",
        },
        {
          label: "Touch",
          correct: false,
          feedback:
            "Touch travels to the somatosensory cortex in the parietal lobe, via the thalamus. It isn't the exception.",
        },
        {
          label: "Hearing",
          correct: false,
          feedback:
            "Auditory information goes to the temporal lobe through the thalamus, the same as vision goes to the occipital lobe.",
        },
        {
          label: "Smell",
          correct: true,
          feedback:
            "Correct. Smell is processed by the olfactory bulb and reaches the cortex without passing through the thalamus. That's why the thalamus handles around 98% of sensory input rather than all of it, and part of why a smell can trigger a memory or an emotion before you have consciously identified it.",
        },
      ],
      source: SOURCES.nidcd,
      xp: 25,
      next: "n1a2-senses-terminal",
    },

    /* ---------------- 4. sense routing ---------------- */
    "n1a2-senses-terminal": {
      id: "n1a2-senses-terminal",
      type: "terminal",
      title: "ATLAS: sensory routing",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Pull the routing table,\" Imani says. \"Every sense, and where its signal ends up.\"",
      ],
      prompt: "Run the routing commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "routing",
          cmd: "senses --route all",
          output: [
            "SENSORY ROUTING // 5 senses",
            "  sight  -> occipital lobe        (visual cortex)",
            "  sound  -> temporal lobe         (auditory cortex)",
            "  touch  -> parietal lobe         (somatosensory cortex)",
            "  taste  -> gustatory cortex",
            "  smell  -> olfactory bulb        [BYPASSES THALAMUS]",
            "",
            "  All except smell relay through the thalamus first.",
          ],
          required: true,
        },
        {
          id: "capacity",
          cmd: "senses --capacity",
          output: [
            "SENSORY LOAD",
            "  Vision accounts for over 80% of the information the brain",
            "  receives. It dominates the input stream.",
            "",
            "  The human nose can detect over 1 trillion different scents,",
            "  despite smell carrying far less of the total load.",
            "",
            "  Volume and importance are not the same measurement.",
          ],
          required: true,
        },
      ],
      source: SOURCES.harvard,
      xp: 30,
      next: "n1a2-integration-quiz",
    },

    /* ---------------- 5. official quiz Q5 ---------------- */
    "n1a2-integration-quiz": {
      id: "n1a2-integration-quiz",
      type: "quiz",
      title: "Knowledge check: putting the senses together",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Separate channels aren't much use on their own,\" Imani says. \"Watching someone clap and hearing it at the same moment is one event, not two. Something has to do that joining.\"",
      ],
      question: "What does sensory integration allow the brain to do?",
      options: [
        {
          label: "Increase reaction speed",
          correct: false,
          feedback:
            "Faster reactions can follow, but that isn't what integration is for. It's about combining channels into one coherent picture.",
        },
        {
          label: "Eliminate distractions",
          correct: false,
          feedback:
            "Filtering is closer to what the thalamus does as a relay. Integration is about assembling multiple senses into a single understanding.",
        },
        {
          label: "Form a complete understanding of the environment by combining multiple senses",
          correct: true,
          feedback:
            "Correct. Multisensory integration lets the brain connect sounds with images and smells with tastes. Without that coordination, perception would feel confusing and disconnected rather than like one continuous world.",
        },
        {
          label: "Suppress irrelevant stimuli",
          correct: false,
          feedback:
            "Suppressing noise is a filtering job. Integration is the opposite motion: pulling separate channels together into one picture.",
        },
      ],
      source: SOURCES.sensory101,
      xp: 25,
      next: "n1a2-vision-reveal",
    },

    /* ---------------- 6. how lopsided the input is ---------------- */
    "n1a2-vision-reveal": {
      id: "n1a2-vision-reveal",
      type: "reveal",
      title: "Which sense does the most work",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"The five senses are not equal partners,\" Theo says. \"One of them carries most of the load. Guess how much.\"",
      ],
      question: "What share of the information the brain receives comes from vision?",
      options: ["over 40%", "over 60%", "over 80%", "over 95%"],
      answerIndex: 2,
      value: "80%",
      caption: "Share of incoming information that arrives through vision.",
      explain:
        "Vision accounts for over 80% of the information the brain receives, which is why the occipital lobe is so heavily built out and why losing sight reorganises so much else. Smell carries a fraction of that load and still lets the nose detect over 1 trillion different scents.",
      source: SOURCES.harvard,
      xp: 25,
      next: "n1a2-senses-sort",
    },

    /* ---------------- 7. sort the senses ---------------- */
    "n1a2-senses-sort": {
      id: "n1a2-senses-sort",
      type: "sort",
      title: "Route each sense to its destination",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Five senses, five destinations,\" Imani says. \"One of them is the odd one out, and you already know which.\"",
      ],
      prompt: "Drag each sense to where its signal is processed.",
      buckets: [
        { id: "occipital", label: "Occipital lobe", hint: "Visual cortex" },
        { id: "temporal", label: "Temporal lobe", hint: "Auditory cortex" },
        { id: "parietal", label: "Parietal lobe", hint: "Somatosensory cortex" },
        { id: "direct", label: "Straight to the cortex", hint: "No thalamus stop" },
      ],
      items: [
        {
          id: "sight",
          label: "Sight",
          bucket: "occipital",
          explain: "The occipital lobe interprets signals from the eyes as shapes, colours and motion. It carries over 80% of all incoming information.",
        },
        {
          id: "sound",
          label: "Hearing",
          bucket: "temporal",
          explain: "Auditory information travels to the temporal lobe, which also handles language.",
        },
        {
          id: "touch",
          label: "Touch",
          bucket: "parietal",
          explain: "The somatosensory cortex, inside the parietal lobe, manages touch including pressure and pain.",
        },
        {
          id: "taste",
          label: "Taste",
          bucket: "parietal",
          explain: "Taste is interpreted by the gustatory cortex, which sits within the parietal region. Like sight, sound and touch, it relays through the thalamus first.",
        },
        {
          id: "smell",
          label: "Smell",
          bucket: "direct",
          explain: "The olfactory bulb processes smell without a thalamic relay, which is why the thalamus handles around 98% of sensory input rather than all of it.",
        },
      ],
      source: SOURCES.nidcd,
      xp: 35,
      badge: "signal-tracer",
      next: "n1a2-spd-choice",
    },

    /* ---------------- 8. when processing goes wrong ---------------- */
    "n1a2-spd-choice": {
      id: "n1a2-spd-choice",
      type: "choice",
      title: "A classroom referral",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"A school has referred a nine-year-old to us,\" Imani says. \"He covers his ears in the corridor, refuses certain fabrics, and doesn't react when someone calls his name from across the room.\"",
        "\"1 in 6 children have sensory processing challenges. What's the useful framing here?\"",
      ],
      prompt: "Pick the response that fits what the research says.",
      options: [
        {
          label: "His brain is receiving and responding to sensory input differently, and the environment can be adapted to help.",
          next: "n1a2-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Sensory Processing Disorder is a difficulty receiving and responding to sensory information. Children with it may be overly sensitive to sound or touch, or may not respond to input at all, which is why both behaviours can appear in the same child. Sensory-friendly classrooms, occupational therapy and mindfulness exercises are the standard supports.",
        },
        {
          label: "He is choosing not to pay attention and needs firmer classroom discipline.",
          next: "n1a2-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Not responding to sensory input is one of the recognised presentations of a sensory processing difficulty, alongside being oversensitive to it. Treating it as defiance misreads the mechanism and makes the environment harder, not easier.",
        },
        {
          label: "Sensory difficulties are rare, so it's more likely something else entirely.",
          next: "n1a2-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "They aren't rare. 1 in 6 children have sensory processing challenges, and touch sensitivity affects up to 95% of children with autism. Ruling it out on grounds of rarity is the wrong starting assumption.",
        },
      ],
      source: SOURCES.sensory101,
    },

    /* ---------------- 9. dossier ---------------- */
    "n1a2-dossier": {
      id: "n1a2-dossier",
      type: "dossier",
      title: "Lab card: sensory processing",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Second card,\" Imani says. \"The last term on it is the one that makes the rest of this field hopeful.\"",
      ],
      terms: [
        { term: "Sensory Processing", definition: "The way the brain interprets sensory input." },
        { term: "Multisensory Integration", definition: "Combining information from multiple senses." },
        { term: "Thalamus", definition: "The brain's sensory relay station." },
        { term: "Somatosensory Cortex", definition: "Processes touch-related signals." },
        { term: "Visual Cortex", definition: "Part of the brain that processes visual information." },
        { term: "Auditory Cortex", definition: "Interprets sounds and language." },
        {
          term: "Sensory Processing Disorder (SPD)",
          definition: "A condition where sensory input is misinterpreted.",
        },
        { term: "Neuroplasticity", definition: "The brain's ability to change and adapt over time." },
        { term: "Stimulus", definition: "Any external input that activates the senses." },
        { term: "Perception", definition: "The experience created by sensory processing." },
      ],
      source: SOURCES.sensory101,
      xp: 20,
      next: "n1a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "n1a2-handoff": {
      id: "n1a2-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:30",
      text: [
        "\"So: signal arrives, gets relayed, gets decoded, gets integrated. You'd think that would be the end of it,\" Imani says.",
        "\"It isn't. Between the finished picture and the decision you make about it, the brain takes shortcuts. Useful ones, mostly. And they go wrong in patterns regular enough to have names.\"",
      ],
      xp: 15,
      next: "n1a3-start",
    },
  },
};

export default act2;
