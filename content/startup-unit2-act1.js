// @ts-check

/**
 * Startup, Module 2, Act 1: "Problem, Solution, Feature"
 *
 * Source material: the Module 2 deck, "Finding a Real Problem", slides 3 to 5.
 * See content/sources/startup-modules/README.md.
 *
 * The three types, the mindset shift, and the six discovery stages are quoted
 * from the deck and must stay exact.
 *
 * QUIZZES: this course's own Google Form quizzes are not transcribed, so the
 * knowledge checks here are written from the deck rather than matched to a
 * form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s2a1-*`. The last scene hands off to `s2a2-start`.
 */

const SOURCES = {
  module2: {
    label: "Module 2 / Finding a Real Problem (Techinance)",
    url: "http://start-ups-module-2-yx9jh65lmo6g.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act1Badges = [];

export const act1 = {
  entry: "s2a1-start",
  scenes: {
    "s2a1-start": {
      id: "s2a1-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:00",
      text: [
        "\"You've got your founder doc and two or three problem areas you're drawn to,\" Sofia says. \"This week you turn one of them into something specific enough to interview people about.\"",
        "\"Last module said the most common way to fail is building something nobody wanted solved. This module is the fix.\"",
      ],
      source: SOURCES.module2,
      xp: 10,
      next: "s2a1-types-terminal",
    },

    "s2a1-types-terminal": {
      id: "s2a1-types-terminal",
      type: "terminal",
      title: "RUNWAY: problem, solution, feature",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Three words people use interchangeably,\" Sofia says. \"They aren't interchangeable, and mixing them up is where months go.\"",
      ],
      prompt: "Run the comparison command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "types",
          cmd: "discovery --types",
          output: [
            "TYPE A // PROBLEM",
            "  What it is  : a situation someone wants to escape",
            "  Sounds like : \"I keep losing track of which apartments I",
            "                already toured\"",
            "  Test        : has the person tried to fix it on their own",
            "  Lives       : in someone's head before you arrive",
            "",
            "TYPE B // SOLUTION",
            "  What it is  : your guess at how to make the problem go away",
            "  Sounds like : \"An app that tracks apartment tours\"",
            "  Test        : there are usually several plausible ones",
            "  Lives       : on your whiteboard, until you ship",
            "",
            "TYPE C // FEATURE",
            "  What it is  : a piece of the solution",
            "  Sounds like : \"Photo upload, with notes per visit\"",
            "  Test        : easy to argue about, easy to over-build",
            "  Lives       : in your roadmap, often before it earns its place",
          ],
          required: true,
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a1-types-sort",
    },

    "s2a1-types-sort": {
      id: "s2a1-types-sort",
      type: "sort",
      title: "Which is this?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Six things people said out loud in this room last year,\" Devin says. \"Sort them.\"",
      ],
      prompt: "Drag each statement to what it actually is.",
      buckets: [
        { id: "problem", label: "Problem", hint: "A situation to escape" },
        { id: "solution", label: "Solution", hint: "Your guess at a fix" },
        { id: "feature", label: "Feature", hint: "A piece of the fix" },
      ],
      items: [
        {
          id: "p1",
          label: "\"I miss deadlines because reminders arrive when I'm asleep\"",
          bucket: "problem",
          explain: "A problem: a situation someone wants to escape, described in their own words, and it lived in their head before you arrived.",
        },
        {
          id: "p2",
          label: "\"I've rewritten the same lab notes into three different apps\"",
          bucket: "problem",
          explain: "A problem, and a strong one: they've already tried to fix it themselves, which is the test the deck gives.",
        },
        {
          id: "s1",
          label: "\"A scheduling app for students in different time zones\"",
          bucket: "solution",
          explain: "A solution: your guess at how to make a problem go away. There are usually several plausible ones, which is why committing early is expensive.",
        },
        {
          id: "s2",
          label: "\"A shared notes tool with automatic sync\"",
          bucket: "solution",
          explain: "Also a solution. Notice you can't tell from it which problem it's for, which is the tell.",
        },
        {
          id: "f1",
          label: "\"Dark mode and a weekly digest email\"",
          bucket: "feature",
          explain: "Features: pieces of a solution. Easy to argue about, easy to over-build, and usually in the roadmap before they've earned a place.",
        },
        {
          id: "f2",
          label: "\"Tagging, with colours per subject\"",
          bucket: "feature",
          explain: "Also a feature. Nothing wrong with it eventually; it just can't tell you whether anyone needs the product.",
        },
      ],
      source: SOURCES.module2,
      xp: 35,
      badge: "problem-spotter",
      next: "s2a1-mindset-quiz",
    },

    "s2a1-mindset-quiz": {
      id: "s2a1-mindset-quiz",
      type: "quiz",
      title: "Knowledge check: the mindset shift",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"There's one sentence on this slide and it's the whole module,\" Sofia says.",
      ],
      question: "What should you fall in love with?",
      options: [
        {
          label: "The problem, not your first idea of how to solve it",
          correct: true,
          feedback:
            "Correct. Most early-stage time is wasted defending the wrong solution. The problem is the durable thing; your first guess at a fix almost certainly isn't.",
        },
        {
          label: "Your solution, so you have the conviction to see it through",
          correct: false,
          feedback:
            "Conviction about a solution is exactly what makes founders defend it past the point of evidence. Hold the problem tightly and the solution loosely.",
        },
        {
          label: "The feature set, since that's what users actually touch",
          correct: false,
          feedback:
            "Features are pieces of a solution, and they're the easiest thing to over-build. They can't tell you whether the underlying problem is real.",
        },
        {
          label: "The market size, since that determines the ceiling",
          correct: false,
          feedback:
            "Market size is a fundraising conversation, and Module 4 will show partners care far less about it than about one specific user.",
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a1-stages-terminal",
    },

    "s2a1-stages-terminal": {
      id: "s2a1-stages-terminal",
      type: "terminal",
      title: "RUNWAY: how problems get found",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six stages from a hunch to something worth building for,\" Sofia says. \"You'll be somewhere around stage two by Friday.\"",
      ],
      prompt: "Run the stages command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "stages",
          cmd: "discovery --stages",
          output: [
            "01 HUNCH",
            "   You notice something annoying. Often something you live with.",
            "02 STORY",
            "   You can describe one real person it happens to, by name, in",
            "   detail.",
            "03 PATTERN",
            "   You hear the same story from five different people without",
            "   prompting them.",
            "04 WORKAROUNDS",
            "   People already try to fix it themselves. Spreadsheets, group",
            "   chats, sticky notes.",
            "05 MONEY OR TIME",
            "   People spend either to make the problem smaller. Now it is a",
            "   market.",
            "06 STATEMENT",
            "   One sentence: who has the problem, when it shows up, and what",
            "   it costs them.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a1-workaround-quiz",
    },

    "s2a1-workaround-quiz": {
      id: "s2a1-workaround-quiz",
      type: "quiz",
      title: "Knowledge check: the strongest signal",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Somewhere in those six stages is the moment you stop guessing,\" Devin says. \"Someone's spreadsheet tells you more than any survey will.\"",
      ],
      question: "Why does finding people's existing workarounds matter so much?",
      options: [
        {
          label: "They've already tried to fix it themselves, which proves the problem is real without you asking",
          correct: true,
          feedback:
            "Correct. A spreadsheet, a group chat or a wall of sticky notes is behaviour rather than opinion. The deck's test for a real problem is whether the person has tried to fix it on their own, and a workaround is that test already passed.",
        },
        {
          label: "They show you exactly which features to build first",
          correct: false,
          feedback:
            "They hint at it, but that's not the point. A workaround is evidence the problem is worth solving at all, which comes before any feature decision.",
        },
        {
          label: "They prove nobody else has built a solution yet",
          correct: false,
          feedback:
            "Often somebody has, and people are using it badly or not at all. What a workaround proves is that the pain is real enough to spend effort on.",
        },
        {
          label: "They mean you can charge more",
          correct: false,
          feedback:
            "Pricing comes later. The next stage after workarounds is money or time, where people already spend one of the two to shrink the problem. That's when it becomes a market.",
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a1-handoff",
    },

    "s2a1-handoff": {
      id: "s2a1-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:25",
      text: [
        "\"You can tell a problem from a solution, and you know what the ladder looks like,\" Sofia says.",
        "\"Now the part everyone gets wrong. Talking to people is a skill, and almost every instinct you have about it is going to mislead you.\"",
      ],
      xp: 15,
      next: "s2a2-start",
    },
  },
};

export default act1;
