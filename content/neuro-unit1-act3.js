// @ts-check

/**
 * Neuroscience, Unit 1, Act 3: "The Shortcuts Between Seeing and Deciding"
 *
 * Source material: "Unit 1: How Your Brain Processes Reality", section 3,
 * transcribed at content/sources/neuro-unit1-brain-processes-reality.md.
 *
 * Every figure quoted here comes from that document and must stay exact:
 *   over 180 cognitive biases have been identified,
 *   70% of people show confirmation bias in online searches,
 *   anchoring can change decision outcomes by as much as 50%,
 *   framing a mock-trial case as "loss" versus "gain" changed jury verdicts by 30%.
 *
 * The student write-up in the inspect scene is fictional. Every flagged line is
 * one of the biases named in the source, which is what makes it findable from
 * the course material alone.
 *
 * Three of Unit 1's ten official quiz questions live in this act (6, 7, 10).
 *
 * Scene ids are namespaced `n1a3-*`. The last scene ends the episode.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  kahneman: {
    label: "Thinking, Fast and Slow (Daniel Kahneman)",
    url: "https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow",
  },
  apa: {
    label: "American Psychological Association",
    url: "https://www.apa.org/",
  },
  hbr: {
    label: "Understanding Cognitive Biases in Decision-Making (Harvard Business Review)",
    url: "https://hbr.org/2021/09/understanding-cognitive-biases-in-decision-making",
  },
  verywell: {
    label: "What Is a Cognitive Bias? (Verywell Mind)",
    url: "https://www.verywellmind.com/what-is-a-cognitive-bias-2794963",
  },
};

/**
 * Badges the acts award are registered centrally in neuro-unit1.js. This act
 * awards `neuro-unit1-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "n1a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "n1a3-start": {
      id: "n1a3-start",
      type: "narrative",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 11:35",
      text: [
        "\"Cognitive biases are systematic errors in thinking,\" Imani says. \"Not random mistakes. Systematic, which means predictable, which means you can learn to catch them.\"",
        "\"They're mental shortcuts. They happen automatically and they're often genuinely useful for quick judgements. The problem is that they don't switch off when the judgement isn't quick.\"",
      ],
      source: SOURCES.verywell,
      xp: 10,
      next: "n1a3-count-reveal",
    },

    /* ---------------- 2. how many ---------------- */
    "n1a3-count-reveal": {
      id: "n1a3-count-reveal",
      type: "reveal",
      title: "How many have been catalogued",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Psychologists have been naming these for decades,\" Imani says. \"Guess how many are on the list by now.\"",
      ],
      question: "Roughly how many cognitive biases have psychologists identified?",
      options: ["over 20", "over 60", "over 180", "over 2,000"],
      answerIndex: 2,
      value: "180",
      caption: "Cognitive biases identified by psychologists.",
      explain:
        "Over 180 cognitive biases have been identified. You don't need all of them. Two do most of the damage in everyday reasoning, and they're the next two questions.",
      source: SOURCES.apa,
      xp: 25,
      next: "n1a3-availability-quiz",
    },

    /* ---------------- 3. official quiz Q6 ---------------- */
    "n1a3-availability-quiz": {
      id: "n1a3-availability-quiz",
      type: "quiz",
      title: "Knowledge check: judging by what comes to mind",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"This one is about how easily an example arrives, not how common the thing actually is,\" Theo says.",
      ],
      question: "Which of the following is an example of the availability heuristic?",
      options: [
        {
          label: "Trusting facts backed by statistics",
          correct: false,
          feedback:
            "That's the opposite: reasoning from real data rather than from whatever example springs to mind first.",
        },
        {
          label: "Judging the risk of plane crashes based on news stories",
          correct: true,
          feedback:
            "Correct. The availability heuristic makes people overestimate the likelihood of an event based on how easily examples come to mind, rather than on real data. Someone might assume shark attacks are common because they recently saw a news report, even though they're rare.",
        },
        {
          label: "Ignoring contrary evidence",
          correct: false,
          feedback:
            "Dismissing evidence that disagrees with you is confirmation bias, which is the next question. The availability heuristic is about how easily an example is recalled.",
        },
        {
          label: "Double-checking all decisions",
          correct: false,
          feedback:
            "That's a deliberate habit rather than a shortcut. Biases are automatic; checking your work is the thing that counteracts them.",
        },
      ],
      source: SOURCES.kahneman,
      xp: 25,
      next: "n1a3-confirmation-quiz",
    },

    /* ---------------- 4. official quiz Q7 ---------------- */
    "n1a3-confirmation-quiz": {
      id: "n1a3-confirmation-quiz",
      type: "quiz",
      title: "Knowledge check: the bias that feels like research",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"This is the one that shows up in student work most,\" Imani says. \"It doesn't feel like a mistake while you're making it. It feels like being thorough.\"",
      ],
      question: "What is confirmation bias?",
      options: [
        {
          label: "The tendency to overestimate rare events",
          correct: false,
          feedback:
            "Overestimating rare events is the availability heuristic, driven by how easily examples come to mind.",
        },
        {
          label: "A memory flaw in eyewitnesses",
          correct: false,
          feedback:
            "Eyewitness memory has its own problems, but confirmation bias is broader and happens during reasoning rather than recall.",
        },
        {
          label: "The tendency to favor information that supports existing beliefs",
          correct: true,
          feedback:
            "Correct. Confirmation bias means focusing on information that agrees with what you already believe while ignoring facts that challenge it. It leads to tunnel vision, especially somewhere like social media where you mostly meet similar views, and 70% of people show it in online searches.",
        },
        {
          label: "The need for peer approval",
          correct: false,
          feedback:
            "Social pressure is a different mechanism. Confirmation bias operates even alone, because it's about which evidence you accept rather than who's watching.",
        },
      ],
      source: SOURCES.hbr,
      xp: 25,
      next: "n1a3-catalogue-terminal",
    },

    /* ---------------- 5. the wider catalogue ---------------- */
    "n1a3-catalogue-terminal": {
      id: "n1a3-catalogue-terminal",
      type: "terminal",
      title: "ATLAS: bias catalogue",
      speaker: "ATLAS",
      avatar: "terminal",
      location: "Workstation 3",
      text: [
        "\"Four more worth knowing before you read the write-up I'm about to hand you,\" Imani says.",
      ],
      prompt: "Run the catalogue commands on ATLAS.",
      host: "assistant@ashgrove-lab",
      commands: [
        {
          id: "common",
          cmd: "bias --list common",
          output: [
            "FREQUENTLY OBSERVED // 4 entries",
            "  Anchoring bias",
            "    Relying too heavily on the first piece of information seen.",
            "    Can change decision outcomes by as much as 50%.",
            "  Dunning-Kruger effect",
            "    Overestimating your own knowledge. Most common in the people",
            "    with the least expertise.",
            "  Framing effect",
            "    Decisions changed by how information is presented. In mock",
            "    trials, framing a case as a loss rather than a gain changed",
            "    jury verdicts by 30%.",
            "  Implicit bias",
            "    Attitudes or stereotypes affecting understanding without",
            "    conscious awareness.",
          ],
          required: true,
        },
        {
          id: "impact",
          cmd: "bias --impact",
          output: [
            "WHERE THIS MATTERS",
            "  healthcare      : diagnosis anchored on the first symptom",
            "  law             : verdicts moved by framing",
            "  hiring          : stereotyping and implicit bias",
            "  public policy   : evidence selected to fit position",
            "",
            "  These are systematic errors, not personal failings. That is why",
            "  they can be designed against rather than simply resisted.",
          ],
          required: true,
        },
      ],
      source: SOURCES.hbr,
      xp: 30,
      next: "n1a3-report-inspect",
    },

    /* ---------------- 6. read the write-up ---------------- */
    "n1a3-report-inspect": {
      id: "n1a3-report-inspect",
      type: "inspect",
      title: "Review the write-up: where did the reasoning slip?",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Workstation 3",
      text: [
        "\"A summer student submitted this last year,\" Imani says. \"The conclusion might even be right. The reasoning that got there isn't. Tap the lines where a bias is doing the work.\"",
      ],
      prompt: "Tap the lines showing a cognitive bias. Find at least 4.",
      artifact: {
        kind: "report",
        fields: [
          { label: "Author", value: "Summer research placement", hot: "author" },
          { label: "Question", value: "Do screen-time limits improve teenage sleep?", hot: "question" },
          { label: "Sources reviewed", value: "9", hot: "count" },
        ],
        body: [
          "METHOD AND FINDINGS",
          "Searched three academic databases and one general web search.",
          {
            hot: "confirmation",
            text: "Discarded four papers that found no effect, on the grounds that they contradicted the established view.",
          },
          {
            hot: "availability",
            text: "Opened with a news story about one teenager, and treated it as evidence the effect is widespread.",
          },
          {
            hot: "anchoring",
            text: "Fixed the estimated effect size at the figure from the first paper read, then judged everything after against it.",
          },
          "Recorded sample size and study design for each paper included.",
          {
            hot: "dunning",
            text: "States the field is straightforward and that no statistical training was needed to assess the results.",
          },
          {
            hot: "framing",
            text: "Reports the result only as 'sleep lost without limits' and never as 'sleep gained with them'.",
          },
          "Concludes that the evidence is mixed and that a larger study is needed.",
        ],
      },
      requiredFinds: 4,
      hotspots: {
        author: {
          suspicious: false,
          explain: "Who wrote it doesn't tell you whether the reasoning holds. Judging the work by the author is its own bias.",
        },
        question: {
          suspicious: false,
          explain: "A clear, answerable research question. Nothing wrong here.",
        },
        count: {
          suspicious: false,
          explain: "Nine sources is a reasonable number. What matters is which nine, and why the others were dropped.",
        },
        confirmation: {
          suspicious: true,
          explain: "Confirmation bias. Discarding papers because they disagree is exactly favouring information that supports an existing belief, and it's the most common failure in student research.",
        },
        availability: {
          suspicious: true,
          explain: "The availability heuristic. One vivid news story is easy to recall, which makes the effect feel more widespread than the data shows. The same reasoning makes people overestimate plane crashes and shark attacks.",
        },
        anchoring: {
          suspicious: true,
          explain: "Anchoring bias: relying too heavily on the first piece of information. Anchoring can change decision outcomes by as much as 50%, and here it set the yardstick everything else was measured against.",
        },
        dunning: {
          suspicious: true,
          explain: "The Dunning-Kruger effect, which is most common in people with the least expertise. Confidence that a field is simple is a warning sign, not a qualification.",
        },
        framing: {
          suspicious: true,
          explain: "The framing effect. In mock trials, presenting a case as a loss rather than a gain changed jury verdicts by 30%. Reporting only one direction shapes the reader's conclusion without changing a single number.",
        },
      },
      source: SOURCES.hbr,
      xp: 40,
      next: "n1a3-dossier",
    },

    /* ---------------- 7. dossier ---------------- */
    "n1a3-dossier": {
      id: "n1a3-dossier",
      type: "dossier",
      title: "Lab card: cognitive biases",
      speaker: "Dr. Imani Reyes",
      avatar: "file-text",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Last card of the unit,\" Imani says. \"Keep it where you can see it while you write.\"",
      ],
      terms: [
        { term: "Cognitive Bias", definition: "A systematic pattern of deviation from rationality." },
        { term: "Confirmation Bias", definition: "Favoring information that confirms preexisting beliefs." },
        {
          term: "Availability Heuristic",
          definition: "Judging events based on how easily examples come to mind.",
        },
        { term: "Heuristic", definition: "A mental shortcut used to make decisions quickly." },
        { term: "Anchoring Bias", definition: "Relying too heavily on the first piece of information." },
        { term: "Dunning-Kruger Effect", definition: "When people overestimate their own knowledge." },
        { term: "Framing Effect", definition: "Decisions influenced by how information is presented." },
        { term: "Stereotyping", definition: "Assuming characteristics based on group membership." },
        {
          term: "Implicit Bias",
          definition: "Attitudes or stereotypes that affect understanding subconsciously.",
        },
        { term: "Rational Thinking", definition: "Making decisions based on logic and evidence." },
      ],
      source: SOURCES.verywell,
      xp: 20,
      next: "n1a3-why-quiz",
    },

    /* ---------------- 8. official quiz Q10 ---------------- */
    "n1a3-why-quiz": {
      id: "n1a3-why-quiz",
      type: "quiz",
      title: "Knowledge check: why any of this matters",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab",
      text: [
        "\"Last one, and it's the reason the unit exists,\" Imani says.",
      ],
      question: "Why is understanding cognitive biases important in daily decision-making?",
      options: [
        {
          label: "It helps people multitask more efficiently",
          correct: false,
          feedback:
            "Biases aren't about capacity. They're about the direction your reasoning drifts, which no amount of multitasking corrects.",
        },
        {
          label: "It reduces the time needed to process information",
          correct: false,
          feedback:
            "Biases already make thinking fast. That's what they're for. Recognising them usually makes a decision slower and better.",
        },
        {
          label: "It helps avoid systematic errors in judgment",
          correct: true,
          feedback:
            "Correct. Because these errors are systematic rather than random, they're predictable, and predictable errors can be designed against. Spotting them improves fairness, creativity and clarity in healthcare, law, hiring and public policy alike.",
        },
        {
          label: "It improves memory retention",
          correct: false,
          feedback:
            "Memory is a different system, run by the hippocampus. Bias awareness affects how you judge information, not how well you store it.",
        },
      ],
      source: SOURCES.apa,
      xp: 25,
      next: "n1a3-final-choice",
    },

    /* ---------------- 9. what to do about it ---------------- */
    "n1a3-final-choice": {
      id: "n1a3-final-choice",
      type: "choice",
      title: "Your own write-up",
      speaker: "Theo Lindqvist",
      avatar: "user",
      location: "Ashgrove Cognitive Lab, 12:15",
      text: [
        "\"You'll be writing one of those literature reviews yourself next month,\" Theo says. \"Knowing the names of the biases doesn't stop you making them.\"",
        "\"So what actually helps?\"",
      ],
      prompt: "Pick the approach that follows from the research.",
      options: [
        {
          label: "Deliberately look for evidence against your position, and record why anything gets excluded.",
          next: "n1a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Examining different perspectives and reasoning from evidence is what the research recommends, and writing down exclusions makes confirmation bias visible instead of invisible. You can't rely on noticing it in the moment.",
        },
        {
          label: "Trust your instincts, since experts develop reliable intuition.",
          next: "n1a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Expertise helps, but the Dunning-Kruger effect shows confidence and competence come apart, and it's worst in those with the least expertise. Intuition is where the shortcuts live rather than where they're caught.",
        },
        {
          label: "Read faster and cover more sources, so no single paper dominates.",
          next: "n1a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Volume alone doesn't help if the same filter applies to each one, and reading faster makes anchoring on the first result more likely. What changes the outcome is actively seeking disagreement.",
        },
      ],
      source: SOURCES.apa,
    },

    /* ---------------- 10. ending ---------------- */
    "n1a3-ending": {
      id: "n1a3-ending",
      type: "ending",
      title: "Unit 1 complete",
      speaker: "Dr. Imani Reyes",
      avatar: "brain",
      location: "Ashgrove Cognitive Lab, 12:30",
      text: [
        "\"Signal comes in, gets relayed, gets decoded by whichever region owns that job, gets integrated into one picture, and then gets interpreted by a system that takes shortcuts,\" Imani says. \"That's the whole chain, and every link can fail differently.\"",
        "\"Perception isn't a recording. It's a construction. Which is the useful thing to know before you trust one.\"",
        "Theo is already pulling files for next week. \"Unit 2 is emotions,\" he says. \"Same structures, and you'll find out why the amygdala sitting next to the hippocampus matters more than it sounds.\"",
      ],
      xp: 20,
      badge: "neuro-unit1-certified",
      next: null,
    },
  },
};

export default act3;
