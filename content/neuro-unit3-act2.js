// @ts-check

/**
 * Neuroscience, Unit 3, Act 2: "How Platforms Pull the Lever"
 *
 * Source material: "Unit 3: Hacking Reward Systems to Overcome Dopamine
 * Addictions", section 2, transcribed at content/sources/neuro-unit3-dopamine.md.
 *
 * Figures quoted here come from that document and must stay exact:
 *   the average smartphone user checks their device 96 times per day,
 *   variable rewards are 3-5 times more effective at reinforcing behaviour
 *   than predictable rewards,
 *   social media likes activate the same brain reward circuits as food, money
 *   and drugs,
 *   excessive screen time is linked to reduced prefrontal cortex activity,
 *   up to 10-15% of adolescents show behaviours consistent with digital
 *   addiction.
 *
 * Three of Unit 3's ten official quiz questions live in this act (3, 4, 9).
 *
 * The app teardown in the inspect scene is fictional. Every flagged line is one
 * of the four mechanisms the source names, which is what makes it findable.
 *
 * Scene ids are namespaced `n3a2-*`. The last scene hands off to `n3a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  harvard: {
    label: "Harvard Medical School: Neuroscience Reports",
    url: "https://neuro.hms.harvard.edu/",
  },
  brainFacts: {
    label: "Brain Facts",
    url: "https://www.brainfacts.org/",
  },
  apa: {
    label: "American Psychological Association",
    url: "https://www.apa.org/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit3.js. This act
 * awards `loop-breaker`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "n3a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n3a2-start": {
      id: "n3a2-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 10:15",
      text: [
        "\"Digital addiction is what happens when technology overstimulates dopamine pathways,\" Imani says. \"The same system that motivates eating and social bonding, triggered instead by likes, notifications, game rewards and streaming.\"",
        "\"And it isn't accidental. Platforms are designed to exploit dopamine-driven motivation. Four mechanisms do most of the work, and once you can name them you'll see all four before lunch.\"",
      ],
      source: SOURCES.apa,
      xp: 10,
      next: "n3a2-checks-reveal",
    },

    /* ---------------- 2. how often ---------------- */
    "n3a2-checks-reveal": {
      id: "n3a2-checks-reveal",
      type: "reveal",
      title: "How often a phone gets checked",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Before the mechanisms, the scale,\" Theo says. \"Average smartphone user. Guess how many times a day.\"",
      ],
      question: "How many times per day does the average smartphone user check their device?",
      options: ["16 times", "42 times", "96 times", "310 times"],
      answerIndex: 2,
      value: "96",
      caption: "Average number of times per day a smartphone user checks their device.",
      explain:
        "Studies put the average smartphone user at 96 checks per day, roughly once every ten waking minutes. Each one is a chance for an anticipation spike, which is exactly what the design is aiming for.",
      source: SOURCES.apa,
      xp: 25,
      next: "n3a2-mechanisms-terminal",
    },

    /* ---------------- 3. the four mechanisms ---------------- */
    "n3a2-mechanisms-terminal": {
      id: "n3a2-mechanisms-terminal",
      type: "terminal",
      title: "ATLAS: platform mechanisms",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Four mechanisms,\" Imani says. \"Pull both files, because you're going to identify them in the wild in a minute.\"",
      ],
      prompt: "Run the mechanism commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "hooks",
          cmd: "platform --mechanisms",
          output: [
            "1. VARIABLE REWARDS",
            "   Unpredictable payoff: a like, a random drop, a trending post.",
            "   Unpredictability spikes dopamine more than predictable reward.",
            "   3-5x more effective at reinforcing behaviour than predictable.",
            "   Same principle as a slot machine.",
            "",
            "2. SOCIAL VALIDATION",
            "   Notifications, comments and likes trigger social reward",
            "   pathways. Dopamine response can be as motivating as food or",
            "   money.",
            "",
            "3. ENDLESS SCROLLING AND AUTO-PLAY",
            "   Removes natural stopping cues, so engagement continues and",
            "   habit loops keep being reinforced.",
            "",
            "4. MICRO-GOALS AND ACHIEVEMENTS",
            "   Tasks split into small wins. Each completion releases dopamine",
            "   and restarts the cycle.",
          ],
          required: true,
        },
        {
          id: "effects",
          cmd: "platform --effects",
          output: [
            "WHAT CONSTANT STIMULATION DOES",
            "  Downregulation      : fewer dopamine receptors, so everyday",
            "                        activities feel less rewarding.",
            "  Increased tolerance : more stimulation needed for the same hit.",
            "  Attention disruption: brain wired for short-term rewards,",
            "                        sustained attention becomes harder.",
            "  Compulsion          : stimuli sought at the expense of sleep,",
            "                        work and social interaction.",
            "",
            "  Excessive screen time is linked to reduced prefrontal cortex",
            "  activity, impairing impulse control.",
            "  Up to 10-15% of adolescents show behaviours consistent with",
            "  digital addiction.",
          ],
          required: true,
        },
      ],
      source: SOURCES.harvard,
      xp: 30,
      next: "n3a2-variable-quiz",
    },

    /* ---------------- 4. official quiz Q4 ---------------- */
    "n3a2-variable-quiz": {
      id: "n3a2-variable-quiz",
      type: "quiz",
      title: "Knowledge check: the slot machine principle",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"The strongest of the four, and the one people find hardest to spot in their own habits,\" Imani says.",
      ],
      question: "Which is an example of a “variable reward” in digital platforms?",
      options: [
        {
          label: "Completing a daily exercise",
          correct: false,
          feedback:
            "Predictable, and chosen by you. A variable reward is one you can't schedule, which is what keeps you checking.",
        },
        {
          label: "Receiving a random “like” on social media",
          correct: true,
          feedback:
            "Correct. You don't know when a post will get likes, so you keep checking. That unpredictability spikes dopamine more than a predictable reward would, and variable rewards are 3 to 5 times more effective at reinforcing behaviour. It's the slot machine principle.",
        },
        {
          label: "Eating breakfast every day",
          correct: false,
          feedback:
            "A fixed routine with a known outcome. Predictable rewards reinforce far more weakly than unpredictable ones.",
        },
        {
          label: "Getting a paycheck on the same day each month",
          correct: false,
          feedback:
            "Same date, known amount. The reliability is exactly what makes it a weak reinforcer compared with a random payoff.",
        },
      ],
      source: SOURCES.apa,
      xp: 25,
      next: "n3a2-variable-reveal",
    },

    /* ---------------- 5. how much stronger ---------------- */
    "n3a2-variable-reveal": {
      id: "n3a2-variable-reveal",
      type: "reveal",
      title: "How much stronger unpredictable is",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Both reinforce,\" Theo says. \"Guess the multiplier on the unpredictable one.\"",
      ],
      question: "How much more effective are variable rewards than predictable ones at reinforcing behaviour?",
      options: ["about the same", "1-2 times", "3-5 times", "50 times"],
      answerIndex: 2,
      value: "3-5x",
      caption: "How much more effective variable rewards are than predictable rewards.",
      explain:
        "Variable rewards are 3 to 5 times more effective at reinforcing behaviour than predictable rewards. Social media likes also activate the same brain reward circuits as food, money and drugs, which is why the pull feels disproportionate to what's actually being received.",
      source: SOURCES.harvard,
      xp: 25,
      next: "n3a2-teardown-inspect",
    },

    /* ---------------- 6. spot the mechanisms ---------------- */
    "n3a2-teardown-inspect": {
      id: "n3a2-teardown-inspect",
      type: "inspect",
      title: "Review the teardown: which features are pulling the lever?",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Workstation 3",
      text: [
        "\"A design review of an app aimed at teenagers,\" Imani says. \"Some of this is just software. Tap the features that are exploiting the reward pathway.\"",
      ],
      prompt: "Tap the features that use one of the four mechanisms. Find at least 4.",
      artifact: {
        kind: "report",
        fields: [
          { label: "Product", value: "Social video app, ages 13+", hot: "product" },
          { label: "Review", value: "Feature teardown", hot: "review" },
        ],
        body: [
          "FEATURES",
          "Account settings with a clear privacy panel.",
          {
            hot: "variable",
            text: "Likes and comments arrive on no fixed schedule, so the counter is only knowable by opening the app.",
          },
          {
            hot: "scroll",
            text: "The feed loads the next video automatically with no end and no natural stopping point.",
          },
          "A text search box for finding a specific creator.",
          {
            hot: "micro",
            text: "A daily streak counter, plus small badges for posting three days running.",
          },
          {
            hot: "social",
            text: "Push notification each time somebody you follow reacts to your post.",
          },
          "An export button for downloading your own uploads.",
          {
            hot: "autoplay",
            text: "Videos begin playing on hover, before you have chosen to watch one.",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        product: {
          suspicious: false,
          explain: "The product description. Nothing here is a mechanism on its own.",
        },
        review: {
          suspicious: false,
          explain: "A label on the document, not a feature.",
        },
        variable: {
          suspicious: true,
          explain: "Variable rewards. You can't know the count without opening the app, and that unpredictability spikes dopamine 3 to 5 times more effectively than a predictable reward.",
        },
        scroll: {
          suspicious: true,
          explain: "Endless scrolling. Removing natural stopping cues keeps engagement continuous and keeps the habit loop being reinforced.",
        },
        micro: {
          suspicious: true,
          explain: "Micro-goals and achievements. Each small completion releases dopamine and restarts the cycle, which is why streaks are so hard to break deliberately.",
        },
        social: {
          suspicious: true,
          explain: "Social validation. Notifications and reactions trigger social reward pathways, and that dopamine response can be as motivating as food or money.",
        },
        autoplay: {
          suspicious: true,
          explain: "Auto-play, the other half of the stopping-cue problem. Playback starts before a decision is made, so there's no moment where you could choose not to.",
        },
      },
      source: SOURCES.harvard,
      xp: 40,
      next: "n3a2-loop-quiz",
    },

    /* ---------------- 7. official quiz Q9 ---------------- */
    "n3a2-loop-quiz": {
      id: "n3a2-loop-quiz",
      type: "quiz",
      title: "Knowledge check: the shape of a habit",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Every one of those features is running the same three-step cycle,\" Imani says.",
      ],
      question: "What is the “habit loop” in digital addiction?",
      options: [
        {
          label: "Stimulus → diet → exercise",
          correct: false,
          feedback:
            "Not a loop, and not about behaviour reinforcement. The habit loop describes how a behaviour gets locked in by its reward.",
        },
        {
          label: "Cue → behavior → reward",
          correct: true,
          feedback:
            "Correct. A cue triggers the behaviour, the behaviour produces a reward, and dopamine reinforces the link so the cue works harder next time. Every mechanism in that teardown is engineering one part of this cycle.",
        },
        {
          label: "Thought → memory → sleep",
          correct: false,
          feedback:
            "Memory consolidation is a different process. The habit loop is cue, behaviour, reward, reinforced by dopamine.",
        },
        {
          label: "Impulse → reflex → reaction",
          correct: false,
          feedback:
            "Reflexes are automatic and unlearned. A habit is learned, which is precisely why it can be unlearned, and that's Act 3.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 25,
      next: "n3a2-downregulation-quiz",
    },

    /* ---------------- 8. official quiz Q3 ---------------- */
    "n3a2-downregulation-quiz": {
      id: "n3a2-downregulation-quiz",
      type: "quiz",
      title: "Knowledge check: what the brain does about it",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"The brain doesn't just absorb constant overstimulation,\" Theo says. \"It adapts, and the adaptation is the problem.\"",
      ],
      question: "What happens to dopamine receptors after chronic overstimulation from digital activities?",
      options: [
        {
          label: "They increase in number",
          correct: false,
          feedback:
            "The opposite. Facing a flood of signal, the brain reduces receptors to maintain balance, which is why the flood stops working.",
        },
        {
          label: "They decrease in sensitivity (downregulation)",
          correct: true,
          feedback:
            "Correct. Overstimulation triggers downregulation: the brain reduces dopamine receptors to keep balance. Everyday activities start to feel dull, stronger or more frequent stimulation is needed for the same effect, and compulsive behaviour follows.",
        },
        {
          label: "They start producing serotonin instead",
          correct: false,
          feedback:
            "Receptors don't switch transmitters. Serotonin is a separate system, covered in Unit 2.",
        },
        {
          label: "They migrate to other brain regions",
          correct: false,
          feedback:
            "Receptors don't relocate. What changes is their number and sensitivity, and it changes downward.",
        },
      ],
      source: SOURCES.harvard,
      xp: 25,
      next: "n3a2-dossier",
    },

    /* ---------------- 9. dossier ---------------- */
    "n3a2-dossier": {
      id: "n3a2-dossier",
      type: "dossier",
      title: "Lab card: digital addiction",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Second card,\" Imani says. \"Naming a mechanism is most of the defence against it.\"",
      ],
      terms: [
        {
          term: "Digital Addiction",
          definition: "Compulsive engagement with digital devices, often driven by reward-system hijacking.",
        },
        {
          term: "Variable Reward",
          definition: "Unpredictable or random rewards that spike dopamine and reinforce behavior.",
        },
        {
          term: "Social Validation",
          definition: "Dopamine-driven motivation from likes, comments, or recognition.",
        },
        {
          term: "Infinite Scroll / Autoplay",
          definition: "Platform design features that remove stopping cues and prolong engagement.",
        },
        {
          term: "Micro-Goals",
          definition: "Small achievable tasks that trigger dopamine release and reinforce repeated behavior.",
        },
        {
          term: "Tolerance",
          definition: "The need for increasing stimulation to achieve the same dopamine response.",
        },
        {
          term: "Compulsive Behavior",
          definition: "Repetitive actions driven by dopamine signaling, often resistant to conscious control.",
        },
        {
          term: "Habit Loop",
          definition: "Cue → behavior → reward cycle reinforced by dopamine.",
        },
      ],
      source: SOURCES.apa,
      xp: 20,
      next: "n3a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "n3a2-handoff": {
      id: "n3a2-handoff",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:20",
      text: [
        "\"That's a fairly bleak hour,\" Imani says. \"So here's the part that isn't.\"",
        "\"Every one of those loops was learned, and the same property of the brain that let them form lets them be unwound. You met it in Unit 1 and it's the whole of Act 3.\"",
      ],
      xp: 15,
      next: "n3a3-start",
    },
  },
};

export default act2;
