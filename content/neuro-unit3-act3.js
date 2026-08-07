// @ts-check

/**
 * Neuroscience, Unit 3, Act 3: "Unwinding the Loop"
 *
 * Source material: "Unit 3: Hacking Reward Systems to Overcome Dopamine
 * Addictions", section 3, transcribed at content/sources/neuro-unit3-dopamine.md.
 *
 * Figures quoted here come from that document and must stay exact:
 *   2-6 weeks of reduced screen time can restore dopamine receptor sensitivity,
 *   10-20 minutes of daily mindfulness can increase prefrontal cortex activity,
 *   habit replacement using alternative rewards has a 40-60% success rate,
 *   plasticity is strongest in childhood and adolescence but present at any age.
 *
 * Four of Unit 3's ten official quiz questions live in this act (5, 6, 8, 10).
 *
 * Scene ids are namespaced `n3a3-*`. The last scene ends the episode.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  brainFacts: {
    label: "Brain Facts",
    url: "https://www.brainfacts.org/",
  },
  harvard: {
    label: "Harvard Medical School: Neuroscience Reports",
    url: "https://neuro.hms.harvard.edu/",
  },
  apa: {
    label: "American Psychological Association",
    url: "https://www.apa.org/",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit3.js. This act
 * awards `neuro-unit3-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "n3a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n3a3-start": {
      id: "n3a3-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:25",
      text: [
        "\"Have you ever tried to break a habit and found it brutal at first, then easier?\" Imani says. \"That's not willpower improving. That's the circuit physically changing.\"",
        "\"Neuroplasticity is what makes recovery from digital addiction possible. The brain forms new connections, strengthens existing ones, and can compensate for lost function. Repeated exposure built those habit loops; reduced exposure and alternative behaviour weaken them.\"",
      ],
      source: SOURCES.brainFacts,
      xp: 10,
      next: "n3a3-plasticity-quiz",
    },

    /* ---------------- 2. official quiz Q5 ---------------- */
    "n3a3-plasticity-quiz": {
      id: "n3a3-plasticity-quiz",
      type: "quiz",
      title: "Knowledge check: what makes recovery possible",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"You met this word in Unit 1 and again in Unit 2,\" Imani says. \"Here's where it pays off.\"",
      ],
      question: "What does neuroplasticity allow the brain to do?",
      options: [
        {
          label: "Store unlimited information permanently",
          correct: false,
          feedback:
            "Plasticity is about restructuring, not capacity. It changes which connections exist rather than how much can be stored.",
        },
        {
          label: "Reorganize and form new neural connections",
          correct: true,
          feedback:
            "Correct. Neuroplasticity is the brain's ability to change, adapt and reorganise in response to experience, learning or injury. It can form new connections, strengthen existing ones and compensate for lost function, and the brain can do this at any age, though plasticity is strongest in childhood and adolescence.",
        },
        {
          label: "Avoid all digital stimulation automatically",
          correct: false,
          feedback:
            "Nothing about plasticity is automatic avoidance. It's the mechanism that lets deliberate change stick.",
        },
        {
          label: "Repair broken bones faster",
          correct: false,
          feedback:
            "Neuroplasticity is about neural connections, not tissue elsewhere in the body.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 25,
      next: "n3a3-strategies-terminal",
    },

    /* ---------------- 3. the strategies ---------------- */
    "n3a3-strategies-terminal": {
      id: "n3a3-strategies-terminal",
      type: "terminal",
      title: "ATLAS: recovery strategies",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Five practical strategies, and the mechanism each one works through,\" Imani says.",
      ],
      prompt: "Run the recovery commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "methods",
          cmd: "recovery --strategies",
          output: [
            "DIGITAL DETOX",
            "  Temporarily reduce or eliminate addictive platforms to reset",
            "  dopamine pathways.",
            "SCHEDULED USE",
            "  Fixed times for checking devices, avoiding constant stimulation.",
            "MINDFULNESS PRACTICES",
            "  Meditation and awareness exercises strengthen prefrontal cortex",
            "  control.",
            "ALTERNATIVE REWARDS",
            "  Physical activity, hobbies, social interaction. Dopamine from",
            "  healthier sources.",
            "GRADUAL REDUCTION",
            "  Slowly decreasing screen time prevents withdrawal while new",
            "  habits form.",
          ],
          required: true,
        },
        {
          id: "timelines",
          cmd: "recovery --evidence",
          output: [
            "WHAT THE NUMBERS SAY",
            "  2-6 weeks of reduced screen time can restore dopamine receptor",
            "  sensitivity and improve reward responsiveness.",
            "  10-20 minutes of daily mindfulness can increase prefrontal",
            "  cortex activity and improve self-control.",
            "  Habit replacement using alternative rewards has a 40-60%",
            "  success rate for reducing compulsive digital behaviour.",
            "  Physical activity increases dopamine release naturally,",
            "  reducing cravings for digital stimulation.",
            "",
            "  New connections form at any age. Plasticity is strongest in",
            "  childhood and adolescence.",
          ],
          required: true,
        },
      ],
      source: SOURCES.harvard,
      xp: 30,
      next: "n3a3-alternative-quiz",
    },

    /* ---------------- 4. official quiz Q6 ---------------- */
    "n3a3-alternative-quiz": {
      id: "n3a3-alternative-quiz",
      type: "quiz",
      title: "Knowledge check: restoring sensitivity",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Downregulation made ordinary things feel dull,\" Theo says. \"What actually reverses that?\"",
      ],
      question: "Which strategy helps restore dopamine sensitivity after digital overstimulation?",
      options: [
        {
          label: "Increasing screen time gradually",
          correct: false,
          feedback:
            "More stimulation drives further downregulation. Gradual reduction is the strategy; gradual increase is the problem.",
        },
        {
          label: "Engaging in alternative rewards like exercise or hobbies",
          correct: true,
          feedback:
            "Correct. Alternative rewards supply dopamine from healthier sources while the addictive circuits weaken. Physical activity increases dopamine release naturally and reduces cravings, and habit replacement this way has a 40 to 60% success rate.",
        },
        {
          label: "Avoiding all forms of social interaction",
          correct: false,
          feedback:
            "Backwards. Social interaction is one of the recommended alternative rewards, and isolation removes a healthy dopamine source rather than an unhealthy one.",
        },
        {
          label: "Watching more variable-reward content",
          correct: false,
          feedback:
            "Variable rewards are the mechanism that caused the downregulation. More of them deepens the problem.",
        },
      ],
      source: SOURCES.harvard,
      xp: 25,
      next: "n3a3-pfc-quiz",
    },

    /* ---------------- 5. official quiz Q8 ---------------- */
    "n3a3-pfc-quiz": {
      id: "n3a3-pfc-quiz",
      type: "quiz",
      title: "Knowledge check: which region to train",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Excessive screen time is linked to reduced activity in one particular region,\" Imani says. \"Strengthening it back up is most of the work.\"",
      ],
      question: "Strengthening which brain region can improve self-control and decision-making in overcoming digital addiction?",
      options: [
        {
          label: "Amygdala",
          correct: false,
          feedback:
            "The amygdala handles fear and threat. Strengthening it wouldn't improve impulse control, and might well do the opposite.",
        },
        {
          label: "Prefrontal Cortex (PFC)",
          correct: true,
          feedback:
            "Correct. Neuroplastic changes in the prefrontal cortex enhance impulse control and decision-making. Mindfulness, setting limits and challenging tasks all rewire it to resist short-term digital rewards, and 10 to 20 minutes of daily mindfulness is enough to increase its activity.",
        },
        {
          label: "Cerebellum",
          correct: false,
          feedback:
            "The cerebellum handles balance and coordination. Self-control is a frontal job.",
        },
        {
          label: "Nucleus Accumbens",
          correct: false,
          feedback:
            "The nucleus accumbens is the reinforcement hub, the part being over-triggered. The region to strengthen is the one that can override it.",
        },
      ],
      source: SOURCES.apa,
      xp: 25,
      next: "n3a3-timeline-quiz",
    },

    /* ---------------- 6. official quiz Q10 ---------------- */
    "n3a3-timeline-quiz": {
      id: "n3a3-timeline-quiz",
      type: "quiz",
      title: "Knowledge check: how long it takes",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Participants always ask this one first,\" Theo says. \"And the honest answer is more encouraging than they expect.\"",
      ],
      question: "How long of a consistent reduction in screen time can measurably restore dopamine receptor sensitivity?",
      options: [
        {
          label: "1–2 days",
          correct: false,
          feedback:
            "Too short for receptor density to change measurably. A couple of days is enough to feel restless, not enough to rebuild anything.",
        },
        {
          label: "2–6 weeks",
          correct: true,
          feedback:
            "Correct. Studies show 2 to 6 weeks of reduced screen time can restore dopamine receptor sensitivity and improve reward responsiveness. Weeks, not years, which is the fact worth telling anyone who thinks it's hopeless.",
        },
        {
          label: "6 months",
          correct: false,
          feedback:
            "Longer than the evidence requires. Measurable restoration happens inside 2 to 6 weeks of consistent reduction.",
        },
        {
          label: "1 year",
          correct: false,
          feedback:
            "Far longer than needed, and a discouraging thing to tell someone. The research points at 2 to 6 weeks.",
        },
      ],
      source: SOURCES.harvard,
      xp: 25,
      next: "n3a3-loops-sort",
    },

    /* ---------------- 7. sort strategy to mechanism ---------------- */
    "n3a3-loops-sort": {
      id: "n3a3-loops-sort",
      type: "sort",
      title: "Which part of the loop does each strategy attack?",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Cue, behaviour, reward,\" Imani says. \"Every strategy breaks the loop at one of those three points. Work out which.\"",
      ],
      prompt: "Drag each strategy to the part of the loop it targets.",
      buckets: [
        { id: "cue", label: "Removes the cue", hint: "Nothing triggers the behaviour" },
        { id: "behaviour", label: "Changes the behaviour", hint: "A different action runs instead" },
        { id: "reward", label: "Rebuilds the reward system", hint: "Sensitivity comes back" },
      ],
      items: [
        {
          id: "notifications",
          label: "Turning off notifications",
          bucket: "cue",
          explain: "Removes the cue. A notification is the trigger that starts the loop; without it the behaviour has nothing to fire on.",
        },
        {
          id: "scheduled",
          label: "Scheduled use, at fixed times only",
          bucket: "cue",
          explain: "Also cue-side. Setting specific times for checking devices avoids the constant stimulation that keeps re-triggering the loop.",
        },
        {
          id: "swap",
          label: "Replacing scrolling with reading or sport",
          bucket: "behaviour",
          explain: "Habit replacement. Neuroplasticity allows new habit loops to form, and alternative rewards give the new behaviour something to reinforce it. 40 to 60% success rate.",
        },
        {
          id: "mindfulness",
          label: "Ten to twenty minutes of daily mindfulness",
          bucket: "behaviour",
          explain: "Strengthens prefrontal cortex control, which is what lets you interrupt the behaviour once the cue has already fired.",
        },
        {
          id: "detox",
          label: "A digital detox for a few weeks",
          bucket: "reward",
          explain: "Resets the pathway. 2 to 6 weeks of reduced screen time restores dopamine receptor sensitivity, so ordinary rewards start registering again.",
        },
        {
          id: "gradual",
          label: "Cutting screen time slowly rather than all at once",
          bucket: "reward",
          explain: "Also reward-side, and gentler. Gradual reduction prevents withdrawal while receptors recover and new habits establish.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 35,
      badge: "loop-breaker",
      next: "n3a3-dossier",
    },

    /* ---------------- 8. dossier ---------------- */
    "n3a3-dossier": {
      id: "n3a3-dossier",
      type: "dossier",
      title: "Lab card: recovery",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Last card of the unit,\" Imani says.",
      ],
      terms: [
        {
          term: "Neuroplasticity",
          definition: "The brain's ability to change, adapt, and reorganize neural connections.",
        },
        {
          term: "Downregulation",
          definition: "Reduction of dopamine receptors after overstimulation.",
        },
        {
          term: "Prefrontal Cortex (PFC)",
          definition: "Brain region responsible for planning, impulse control, and decision-making; can be strengthened through neuroplasticity.",
        },
        {
          term: "Habit Loop",
          definition: "Cue → behavior → reward cycle; can be rewired through new habits.",
        },
        {
          term: "Digital Detox",
          definition: "Temporary reduction or elimination of digital stimuli to reset neural pathways.",
        },
        {
          term: "Mindfulness",
          definition: "Awareness practice that improves focus and self-control.",
        },
        {
          term: "Alternative Rewards",
          definition: "Healthy activities that provide dopamine without addictive risks.",
        },
      ],
      source: SOURCES.brainFacts,
      xp: 20,
      next: "n3a3-plan-choice",
    },

    /* ---------------- 9. applying it ---------------- */
    "n3a3-plan-choice": {
      id: "n3a3-plan-choice",
      type: "choice",
      title: "Advice for a fifteen-year-old",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab, 12:10",
      text: [
        "\"A participant says she's on her phone six hours a day, hates it, and has tried quitting cold turkey twice and failed both times,\" Theo says.",
        "\"What does the evidence actually recommend?\"",
      ],
      prompt: "Pick the plan the research supports.",
      options: [
        {
          label: "Cut screen time gradually, turn off notifications, and replace the time with something rewarding like sport or a hobby.",
          next: "n3a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Gradual reduction prevents the withdrawal that made cold turkey fail twice, removing notifications kills the cue, and alternative rewards give the new behaviour something to reinforce it. Habit replacement this way has a 40 to 60% success rate, and 2 to 6 weeks is enough to restore receptor sensitivity.",
        },
        {
          label: "Delete every app immediately and rely on willpower.",
          next: "n3a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "She's already tried that twice. Slowly decreasing screen time prevents withdrawal while new habits form, and leaving the freed-up time empty means nothing reinforces the change.",
        },
        {
          label: "Accept it as permanent, since the receptors have already downregulated.",
          next: "n3a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Downregulation reverses. 2 to 6 weeks of consistent reduction restores receptor sensitivity, and at fifteen her plasticity is at its strongest. This is the most recoverable version of the problem there is.",
        },
      ],
      source: SOURCES.harvard,
    },

    /* ---------------- 10. ending ---------------- */
    "n3a3-ending": {
      id: "n3a3-ending",
      type: "ending",
      title: "Unit 3 complete",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 12:25",
      text: [
        "\"Dopamine rewards anticipation more than reward. Platforms are built on that. Constant stimulation downregulates the receptors until ordinary life feels flat,\" Imani says. \"That's the diagnosis.\"",
        "\"The prognosis is better. Every loop was learned, the brain rebuilds at any age, and two to six weeks of consistent reduction measurably restores sensitivity. Not willpower. Biology, running in your favour for once.\"",
        "Theo closes his laptop. \"Unit 4 is when the same systems break for reasons nobody chose,\" he says. \"Disorders. It's the serious one.\"",
      ],
      xp: 20,
      badge: "neuro-unit3-certified",
      next: null,
    },
  },
};

export default act3;
