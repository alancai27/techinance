// @ts-check

/**
 * Startup, Module 1, Act 3: "Myths, Borders, and an Honest Page"
 *
 * Source material: the Module 1 deck, "What Is a Startup, Really?", slides 8 to
 * 11. See content/sources/startup-modules/README.md.
 *
 * The five myths, the international founder details, and the five sections of
 * the self-assessment are quoted from the deck and must stay exact.
 *
 * The founder self-assessment in the inspect scene is fictional, but every
 * flagged line fails one of the deck's own instructions for the activity.
 *
 * Scene ids are namespaced `s1a3-*`. The last scene ends the episode.
 */

/** The deck itself is the citation: this course's material is its slides. */
const SOURCES = {
  module1: {
    label: "Module 1 / What Is a Startup, Really? (Techinance)",
    url: "https://start-ups-module-1-zs9j1u749v3f.netlify.app/",
  },
};

/**
 * Badges the acts award are registered centrally in startup-unit1.js. This act
 * awards `startup-unit1-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "s1a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "s1a3-start": {
      id: "s1a3-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:55",
      text: [
        "\"Five things people repeat that aren't true,\" Sofia says. \"Each one of them stops somebody starting, every single cohort.\"",
      ],
      source: SOURCES.module1,
      xp: 10,
      next: "s1a3-myths-terminal",
    },

    /* ---------------- 2. the myths ---------------- */
    "s1a3-myths-terminal": {
      id: "s1a3-myths-terminal",
      type: "terminal",
      title: "RUNWAY: myths to drop",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"What people say, and what's closer to true,\" Sofia says.",
      ],
      prompt: "Run the myths command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "myths",
          cmd: "myths --list",
          output: [
            "01 \"You have to drop out of school to start something serious.\"",
            "   Most strong student founders stay enrolled and use school as",
            "   cover, network, and infrastructure.",
            "",
            "02 \"You have to live in San Francisco for it to count.\"",
            "   Geography matters at fundraising stage, not at problem-finding",
            "   stage. Build where your users are.",
            "",
            "03 \"You need a technical co-founder before you can start.\"",
            "   No-code tools and manual-first MVPs let non-technical founders",
            "   test most ideas in a weekend.",
            "",
            "04 \"You need a brilliant, original idea nobody has had.\"",
            "   Execution on a known problem beats novelty almost every time.",
            "   The idea is the easy part.",
            "",
            "05 \"Raising money is the milestone that means you've made it.\"",
            "   Money buys time, not validation. Users coming back is the",
            "   milestone that matters.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a3-idea-quiz",
    },

    /* ---------------- 3. the idea myth ---------------- */
    "s1a3-idea-quiz": {
      id: "s1a3-idea-quiz",
      type: "quiz",
      title: "Knowledge check: does the idea have to be original?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"This is the one that keeps people sitting on their hands for a year,\" Devin says.",
      ],
      question: "Do you need a brilliant, original idea nobody has had before?",
      options: [
        {
          label: "No. Execution on a known problem beats novelty almost every time",
          correct: true,
          feedback:
            "Correct. The deck is blunt about it: the idea is the easy part. It's also the cheapest stage on the spectrum. What's scarce is doing the validation, the prototype and the first ten users well.",
        },
        {
          label: "Yes, otherwise a competitor with more money will copy it",
          correct: false,
          feedback:
            "Most early-stage companies fail because nobody wanted the thing, not because somebody copied it. Execution on a known problem is the recommended route.",
        },
        {
          label: "Yes, investors only fund genuinely novel ideas",
          correct: false,
          feedback:
            "That isn't what the deck says, and Module 4 will show that accelerators weight what you've built far above how novel the concept is.",
        },
        {
          label: "Only if you're a student, since you have less credibility",
          correct: false,
          feedback:
            "Being a student is framed here as an advantage rather than a deficit: you live inside a customer segment, with time, low costs and a network already around you.",
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a3-geography-quiz",
    },

    /* ---------------- 4. the geography myth ---------------- */
    "s1a3-geography-quiz": {
      id: "s1a3-geography-quiz",
      type: "quiz",
      title: "Knowledge check: does location matter?",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"This one's more nuanced than the internet suggests,\" Sofia says. \"The honest answer has a 'when' in it.\"",
      ],
      question: "When does geography actually matter for a startup?",
      options: [
        {
          label: "At fundraising stage, not at problem-finding stage. Build where your users are",
          correct: true,
          feedback:
            "Correct. You can find a problem, talk to people and ship a prototype from anywhere with a laptop. Where you are starts to matter later, and even then it's about access to capital rather than about the work.",
        },
        {
          label: "Always. You have to be in San Francisco for it to count",
          correct: false,
          feedback:
            "That's the myth as stated. Geography matters at fundraising stage; at problem-finding stage you should build where your users are, which is wherever you already are.",
        },
        {
          label: "Never. Location is irrelevant at every stage",
          correct: false,
          feedback:
            "Overcorrecting. It genuinely matters at fundraising stage, and there are visa and incorporation questions if you're an international founder. It just doesn't matter yet.",
        },
        {
          label: "Only for hardware companies",
          correct: false,
          feedback:
            "The distinction the deck draws is by stage rather than by category: fundraising versus problem-finding.",
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a3-international-terminal",
    },

    /* ---------------- 5. international founders ---------------- */
    "s1a3-international-terminal": {
      id: "s1a3-international-terminal",
      type: "terminal",
      title: "RUNWAY: the international founder reality",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Half this cohort is studying outside the country they grew up in,\" Sofia says. \"The questions worth thinking about early aren't about where to live. They're operational.\"",
      ],
      prompt: "Run the international command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "intl",
          cmd: "international --checklist",
          output: [
            "You can build, launch and find your first users from almost",
            "anywhere with a laptop and a connection. Five operational details",
            "are worth handling early:",
            "",
            "  VISA AND SCHOOL STATUS",
            "    Talk to your DSO before incorporating.",
            "  WHERE TO INCORPORATE",
            "    Delaware C-corp if you plan to raise in the US.",
            "  RECEIVING PAYMENTS",
            "    Stripe Atlas, Mercury, or Wise. Not your home bank.",
            "  IN-PERSON PROGRAMS",
            "    Plan visa logistics 3+ months out.",
            "  CREDIBILITY ONLINE",
            "    Build in public; replace local network with reputation.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a3-assessment-inspect",
    },

    /* ---------------- 6. review a self-assessment ---------------- */
    "s1a3-assessment-inspect": {
      id: "s1a3-assessment-inspect",
      type: "inspect",
      title: "Review the self-assessment: which lines aren't useful yet?",
      speaker: "Sofia Okonkwo",
      avatar: "file-text",
      location: "Programme workspace",
      text: [
        "\"Last year's cohort, first submission,\" Sofia says. \"The activity asks for honesty and specifics. Tap the lines that give neither.\"",
      ],
      prompt: "Tap the lines that fail the activity's own instructions. Find at least 4.",
      artifact: {
        kind: "assessment",
        fields: [
          { label: "Document", value: "Founder self-assessment, one page", hot: "doc" },
          { label: "Module", value: "01 activity submission", hot: "module" },
        ],
        body: [
          "UNFAIR ADVANTAGES",
          "Ran the 400-member robotics society for two years, including recruitment.",
          {
            hot: "vague-adv",
            text: "\"Hard working and passionate about technology.\"",
          },
          "TIME COMMITMENT",
          {
            hot: "aspirational",
            text: "\"40 hours a week\" (currently taking five courses and working weekends).",
          },
          "RUNWAY",
          "Can cover costs for eleven months without income.",
          "CONSTRAINTS",
          {
            hot: "noconstraints",
            text: "\"None really.\" (Author is on a student visa and graduates in June.)",
          },
          "PROBLEM AREAS",
          {
            hot: "broad",
            text: "\"Education\" and \"sustainability\".",
          },
          "Struggles finding lab partners for group coursework, which they've watched happen every term.",
        ],
      },
      requiredFinds: 4,
      hotspots: {
        doc: {
          suspicious: false,
          explain: "The document type. One page in one Google Doc is exactly what the activity asks for.",
        },
        module: {
          suspicious: false,
          explain: "A label, not content.",
        },
        "vague-adv": {
          suspicious: true,
          explain: "The activity asks for specific skills, communities and problems you have lived. \"Hard working and passionate\" is true of everyone in the room and tells a reader nothing.",
        },
        aspirational: {
          suspicious: true,
          explain: "The instruction is honest hours per week, not aspirational. Forty hours alongside five courses and weekend work isn't a plan, and every later module builds on this number.",
        },
        noconstraints: {
          suspicious: true,
          explain: "Constraints explicitly include visa, school, family and geography. A student visa and a June graduation are two of the most consequential constraints there are, and the module's international section exists precisely for them.",
        },
        broad: {
          suspicious: true,
          explain: "The instruction says be specific, and names \"education\" as the exact example of what not to write. A problem area you can't describe as one person's bad Tuesday is still a category, not a problem.",
        },
      },
      source: SOURCES.module1,
      xp: 40,
      next: "s1a3-activity-choice",
    },

    /* ---------------- 7. what makes it reusable ---------------- */
    "s1a3-activity-choice": {
      id: "s1a3-activity-choice",
      type: "choice",
      title: "Why one page, kept open",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"People treat week one's document as a warm-up exercise and rewrite it from scratch in module four,\" Devin says.",
        "\"What's it actually for?\"",
      ],
      prompt: "Pick the reason the course gives.",
      options: [
        {
          label: "It's the working draft of your founder profile, and a version of it appears in most accelerator and grant applications.",
          next: "s1a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. You come back to it in every later module, and the deck even gives you the sentence to reuse on a CV: a structured founder self-assessment identifying unfair advantages and viable problem spaces. Keep the doc open as you work.",
        },
        {
          label: "It's a graded assignment, so it matters mainly for the certificate.",
          next: "s1a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "The point isn't the mark. It's that a version of this document shows up in most accelerator and grant applications, and every later module adds a section to it.",
        },
        {
          label: "It should be polished and designed, since it'll be shown to investors.",
          next: "s1a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "The instruction is explicit: no need to design it, clarity beats polish, and you'll be editing it throughout the course. Headers for each of the five sections is the whole formatting brief.",
        },
      ],
      source: SOURCES.module1,
    },

    /* ---------------- 8. ending ---------------- */
    "s1a3-ending": {
      id: "s1a3-ending",
      type: "ending",
      title: "Module 1 complete",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:15",
      text: [
        "\"A startup is a company designed to grow fast, built around an idea that makes that growth possible,\" Sofia says. \"Not a small business, not a side project, and not a synonym for having an app.\"",
        "\"Most fail because nobody wanted the thing solved. You have four advantages against that, and two of them expire. So the honest page you write this week is the most useful hour of the module.\"",
        "Devin is already setting out chairs for next week. \"Module 2,\" he says. \"You go and talk to five people who actually have the problem. That's where it stops being theoretical.\"",
      ],
      xp: 20,
      badge: "startup-unit1-certified",
      next: null,
    },
  },
};

export default act3;
