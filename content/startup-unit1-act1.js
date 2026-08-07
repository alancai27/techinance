// @ts-check

/**
 * Startup, Module 1, Act 1: "Three Things People Confuse"
 *
 * Source material: the Module 1 deck, "What Is a Startup, Really?", slides 3 to
 * 5. See content/sources/startup-modules/README.md for the deck URLs and how to
 * pull them.
 *
 * The three models, the working definition, and the six-stage spectrum are
 * quoted from the deck and must stay exact.
 *
 * Scene ids are namespaced `s1a1-*`. The last scene hands off to `s1a2-start`.
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
 * awards `model-mapper`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "s1a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "s1a1-start": {
      id: "s1a1-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:00",
      text: [
        "Sofia Okonkwo runs the student founder programme, and she opens every cohort the same way.",
        "\"Six modules. By the end you'll have real materials you can put on an application. But we start with a definition, because most people use the word startup to mean four different things and then argue past each other.\"",
        "\"You don't need a business background, a co-founder, or any prior experience. Curiosity and a few hours.\"",
      ],
      source: SOURCES.module1,
      xp: 10,
      next: "s1a1-models-terminal",
    },

    /* ---------------- 2. three models ---------------- */
    "s1a1-models-terminal": {
      id: "s1a1-models-terminal",
      type: "terminal",
      title: "RUNWAY: three models",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"RUNWAY has the comparison,\" Sofia says. \"Read all three properly. Most of the confusion in this room is between the first two.\"",
      ],
      prompt: "Run the comparison commands on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "compare",
          cmd: "models --compare",
          output: [
            "MODEL A // STARTUP",
            "  Goal     : find a repeatable, fast-growing market",
            "  Funding  : often equity from angels, accelerators, or VCs",
            "  Growth   : exponential is the bet, not a bonus",
            "  End game : acquisition, IPO, or a category-defining company",
            "",
            "MODEL B // SMALL BUSINESS",
            "  Goal     : a profitable operation that pays the owner",
            "  Funding  : savings, loans, customer revenue",
            "  Growth   : linear, capped by local market",
            "  End game : sustained income, sometimes passed on or sold",
            "",
            "MODEL C // SIDE PROJECT",
            "  Goal     : learning, fun, or a small extra income",
            "  Funding  : your evenings and weekends",
            "  Growth   : whatever you have energy for",
            "  End game : could stay a hobby, or grow into A or B later",
          ],
          required: true,
        },
        {
          id: "definition",
          cmd: "models --definition",
          output: [
            "THE WORKING DEFINITION FOR THE REST OF THE COURSE",
            "",
            "  A startup is a company designed to grow fast, built around an",
            "  idea that makes that growth possible.",
            "",
            "  Note what is absent: technology, an office, an age, a city.",
            "  The growth question is the whole distinction.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module1,
      xp: 30,
      next: "s1a1-definition-quiz",
    },

    /* ---------------- 3. the growth question ---------------- */
    "s1a1-definition-quiz": {
      id: "s1a1-definition-quiz",
      type: "quiz",
      title: "Knowledge check: what makes it a startup",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"If you take one sentence out of this module, take this one,\" Sofia says.",
      ],
      question: "What separates a startup from a small business?",
      options: [
        {
          label: "It's designed to grow fast, built around an idea that makes that growth possible",
          correct: true,
          feedback:
            "Correct. That's the working definition for the whole course. A small business aims at a profitable operation that pays the owner, with growth that's linear and capped by its local market. The startup's bet is exponential growth, and the idea has to be one that allows it.",
        },
        {
          label: "It uses technology",
          correct: false,
          feedback:
            "Plenty of small businesses are technical and plenty of startups aren't. The definition is about growth design, not tooling.",
        },
        {
          label: "It has raised outside investment",
          correct: false,
          feedback:
            "Funding often follows, but it isn't what makes something a startup. Money buys time; it doesn't change what the company is designed to do.",
        },
        {
          label: "It's based in a major city like San Francisco",
          correct: false,
          feedback:
            "Geography matters at fundraising stage, not at problem-finding stage. That's one of the myths this module exists to drop.",
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a1-models-sort",
    },

    /* ---------------- 4. sort the models ---------------- */
    "s1a1-models-sort": {
      id: "s1a1-models-sort",
      type: "sort",
      title: "Which model is this?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "Devin Cho went through the programme last year and now helps run it.",
        "\"Six real things people in this room are building,\" he says. \"None of them is wrong. They're just different models, and knowing which one you're in changes every decision after.\"",
      ],
      prompt: "Drag each one to the model it fits.",
      buckets: [
        { id: "startup", label: "Startup", hint: "Designed to grow fast" },
        { id: "small", label: "Small business", hint: "Profitable, linear" },
        { id: "side", label: "Side project", hint: "Evenings and weekends" },
      ],
      items: [
        {
          id: "marketplace",
          label: "A marketplace aiming to reach every campus in the country",
          bucket: "startup",
          explain: "A startup. The goal is a repeatable, fast-growing market, and the design assumes exponential growth rather than hoping for it.",
        },
        {
          id: "saas",
          label: "A tool built to be acquired or grow into a category leader",
          bucket: "startup",
          explain: "A startup by end game: acquisition, IPO, or a category-defining company.",
        },
        {
          id: "tutoring",
          label: "A tutoring service that comfortably pays its founder",
          bucket: "small",
          explain: "A small business. The goal is a profitable operation that pays the owner, funded by savings, loans and customer revenue.",
        },
        {
          id: "bakery",
          label: "A bakery serving one neighbourhood well",
          bucket: "small",
          explain: "A small business, with growth that's linear and capped by the local market. Nothing lesser about it, just a different model.",
        },
        {
          id: "app",
          label: "A weekend app built to learn a new framework",
          bucket: "side",
          explain: "A side project: learning or fun, funded by your evenings and weekends.",
        },
        {
          id: "newsletter",
          label: "A newsletter that earns a little and might become more",
          bucket: "side",
          explain: "A side project for now. It could grow into a startup or a small business later, which is exactly what the deck means by the end game being open.",
        },
      ],
      source: SOURCES.module1,
      xp: 35,
      badge: "model-mapper",
      next: "s1a1-spectrum-terminal",
    },

    /* ---------------- 5. the spectrum ---------------- */
    "s1a1-spectrum-terminal": {
      id: "s1a1-spectrum-terminal",
      type: "terminal",
      title: "RUNWAY: the early-stage spectrum",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six stages,\" Sofia says. \"Every company moves through them, usually slower than expected. Notice where funding sits.\"",
      ],
      prompt: "Run the stage command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "stages",
          cmd: "stages --list",
          output: [
            "THE REALISTIC EARLY-STAGE SPECTRUM // 6 stages",
            "  01 IDEA",
            "     A hunch about a problem worth solving. The cheapest and",
            "     easiest part.",
            "  02 PROBLEM VALIDATION",
            "     Real conversations with real people who already feel the pain.",
            "  03 PROTOTYPE",
            "     The smallest possible thing that tests your core assumption.",
            "  04 FIRST USERS",
            "     10 humans you onboarded by hand. Patterns start to appear.",
            "  05 REVENUE",
            "     Someone pays, even a little. The first real signal that this",
            "     is a business.",
            "  06 FUNDING",
            "     Outside money buys you time and a network. It is not the",
            "     prize.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a1-stage-quiz",
    },

    /* ---------------- 6. where funding sits ---------------- */
    "s1a1-stage-quiz": {
      id: "s1a1-stage-quiz",
      type: "quiz",
      title: "Knowledge check: the cheapest stage",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"People arrive here convinced the idea is the hard part,\" Sofia says. \"Where does the deck put it?\"",
      ],
      question: "According to the early-stage spectrum, which stage is the cheapest and easiest?",
      options: [
        {
          label: "The idea",
          correct: true,
          feedback:
            "Correct. The deck calls the idea stage the cheapest and easiest part. A hunch about a problem worth solving costs nothing; everything after it, starting with real conversations with real people, is where the work is.",
        },
        {
          label: "Problem validation",
          correct: false,
          feedback:
            "Validation means real conversations with people who already feel the pain. That's the first stage that costs you something, which is why so many founders skip it.",
        },
        {
          label: "Building the prototype",
          correct: false,
          feedback:
            "The prototype is the smallest thing that tests your core assumption, and Module 3 is entirely about doing it cheaply. Still not the free stage.",
        },
        {
          label: "Getting funding",
          correct: false,
          feedback:
            "Funding is the last of the six stages, and the deck is blunt about it: outside money buys you time and a network, it is not the prize.",
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a1-funding-choice",
    },

    /* ---------------- 7. what funding is for ---------------- */
    "s1a1-funding-choice": {
      id: "s1a1-funding-choice",
      type: "choice",
      title: "Someone in the cohort asks about raising",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Every year somebody asks in week one how soon they can raise,\" Devin says. \"It's a reasonable question with a slightly annoying answer.\"",
        "\"What is funding actually for?\"",
      ],
      prompt: "Pick the answer the course takes.",
      options: [
        {
          label: "It buys time and a network. It isn't the milestone that proves anything.",
          next: "s1a1-handoff",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. The deck puts funding last on the spectrum and says plainly that outside money buys you time and a network, and is not the prize. Users coming back is the milestone that matters.",
        },
        {
          label: "It's the point at which you've made it, and the goal of the first year.",
          next: "s1a1-handoff",
          xp: 5,
          tone: "bad",
          feedback:
            "That's one of the five myths the module drops. Money buys time, not validation. Plenty of funded companies had nothing anyone wanted.",
        },
        {
          label: "It replaces the need to find users, since you can pay for them.",
          next: "s1a1-handoff",
          xp: 5,
          tone: "bad",
          feedback:
            "Buying attention isn't the same as building distribution, and no distribution is one of the five failure patterns coming up in the next act. Money makes the runway longer; it doesn't answer whether anyone wants it.",
        },
      ],
      source: SOURCES.module1,
    },

    /* ---------------- 8. handoff to act 2 ---------------- */
    "s1a1-handoff": {
      id: "s1a1-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:25",
      text: [
        "\"You know which model you're in and roughly where on the spectrum you're standing,\" Sofia says.",
        "\"Next is the uncomfortable bit. Most of these don't work, and the reasons are boringly consistent. Which is good news, because a consistent failure is one you can design around.\"",
      ],
      xp: 15,
      next: "s1a2-start",
    },
  },
};

export default act1;
