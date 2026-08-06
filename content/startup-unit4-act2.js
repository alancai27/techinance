// @ts-check

/**
 * Startup, Module 4, Act 2: "Working Harder, Scoring Worse"
 *
 * Source material: the Module 4 deck, "Y Combinator & Accelerators", slides 6
 * and 7. See content/sources/startup-modules/README.md.
 *
 * The six traps and four principles are quoted from the deck and must stay
 * exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s4a2-*`. The last scene hands off to `s4a3-start`.
 */

const SOURCES = {
  module4: {
    label: "Module 4 / Y Combinator & Accelerators (Techinance)",
    url: "http://start-ups-module-4-j75s12eckq33.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [];

export const act2 = {
  entry: "s4a2-start",
  scenes: {
    "s4a2-start": {
      id: "s4a2-start",
      type: "narrative",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room, 17:30",
      text: [
        "\"My first application was beautiful,\" Devin says. \"Every sentence rewritten four times. It was also completely uninformative, and I couldn't see that until someone showed me the six traps.\"",
      ],
      source: SOURCES.module4,
      xp: 10,
      next: "s4a2-traps-terminal",
    },

    "s4a2-traps-terminal": {
      id: "s4a2-traps-terminal",
      type: "terminal",
      title: "RUNWAY: how applicants torpedo themselves",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six ways to make an application worse by putting more effort into it,\" Sofia says.",
      ],
      prompt: "Run the traps command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "traps",
          cmd: "application --traps",
          output: [
            "01 POLISHING INSTEAD OF ANSWERING",
            "   A reader has ninety seconds for your application. Adjectives",
            "   steal that time. Plain words use it.",
            "02 VAGUE \"WE\"",
            "   \"We are building\" reads as a committee. Say who does what:",
            "   who writes the code, who finds the users.",
            "03 AN IDEA WITH NOTHING BUILT",
            "   The \"What have you built?\" field is the single highest-signal",
            "   question. Empty means empty.",
            "04 CO-FOUNDERS WHO ARE ROOMMATES, NOT CO-BUILDERS",
            "   YC reads team history closely. Years of building together beats",
            "   a clever cap table.",
            "05 MARKET-SIZE THEATRE",
            "   Nobody cares about a TAM slide at this stage. One real user and",
            "   what they did beats a $50B chart.",
            "06 PRODUCTION-VALUE VIDEO",
            "   A green screen and a soundtrack make partners trust you less,",
            "   not more. A phone in a kitchen is the bar.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module4,
      xp: 30,
      next: "s4a2-application-inspect",
    },

    "s4a2-application-inspect": {
      id: "s4a2-application-inspect",
      type: "inspect",
      title: "Review the application: what's costing them?",
      speaker: "Sofia Okonkwo",
      avatar: "file-text",
      location: "Programme workspace",
      text: [
        "\"A draft from last cohort, before I got to it,\" Sofia says. \"Tap the answers that work against them.\"",
      ],
      prompt: "Tap the answers that hit one of the six traps. Find at least 4.",
      artifact: {
        kind: "assessment",
        fields: [
          { label: "Programme", value: "Y Combinator, standard form", hot: "programme" },
          { label: "Team", value: "Two co-founders", hot: "team" },
        ],
        body: [
          "ANSWERS",
          {
            hot: "polish",
            text: "What do you do? \"We are pioneering a revolutionary, AI-powered ecosystem that seamlessly empowers modern learners.\"",
          },
          {
            hot: "vague",
            text: "Who does what? \"We both do a bit of everything, depending on the week.\"",
          },
          {
            hot: "built",
            text: "What have you built? \"Nothing yet, but we have detailed designs and a full technical spec.\"",
          },
          "Who is the user? \"Priya, a second-year who currently tracks lab slots in a paper notebook.\"",
          {
            hot: "tam",
            text: "Why now? \"The global edtech market will reach $404B by 2025, and we plan to capture 1%.\"",
          },
          "How did you meet? \"We built two projects together over three years before this one.\"",
          "Video: one take on a phone, both founders, no slides.",
        ],
      },
      requiredFinds: 4,
      hotspots: {
        programme: {
          suspicious: false,
          explain: "The standard online form. Nothing to read into it.",
        },
        team: {
          suspicious: false,
          explain: "Two co-founders is fine. What matters is their history together, which the how-did-you-meet answer covers well.",
        },
        polish: {
          suspicious: true,
          explain: "Polishing instead of answering. Pioneering, revolutionary, seamlessly, empowers: five adjectives and no information. A reader has ninety seconds and this spends all of it.",
        },
        vague: {
          suspicious: true,
          explain: "Vague \"we\". Say who writes the code and who finds the users. A bit of everything reads as nobody owning anything.",
        },
        built: {
          suspicious: true,
          explain: "An idea with nothing built, on the single highest-signal question on the form. Designs and a spec are plans; empty means empty. This founder shipped a v0 in Module 3 and should have linked it.",
        },
        tam: {
          suspicious: true,
          explain: "Market-size theatre. Nobody cares about a TAM slide at this stage, and one real user and what they did beats a $404B chart. Notice the Priya answer directly above does the job properly.",
        },
      },
      source: SOURCES.module4,
      xp: 40,
      badge: "application-reader",
      next: "s4a2-built-quiz",
    },

    "s4a2-built-quiz": {
      id: "s4a2-built-quiz",
      type: "quiz",
      title: "Knowledge check: the highest-signal question",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"One field on that form carries more weight than the rest combined,\" Devin says.",
      ],
      question: "Which application question does the deck call the single highest-signal one?",
      options: [
        {
          label: "\"What have you built?\"",
          correct: true,
          feedback:
            "Correct, and partners weight built over planned by about a factor of ten. A weekend project, a side hustle, a club that grew to 500 people, or the v0 from Module 3 all count. Empty means empty.",
        },
        {
          label: "\"How big is the market?\"",
          correct: false,
          feedback:
            "Market-size theatre is one of the six traps. Nobody cares about a TAM slide at this stage.",
        },
        {
          label: "\"Why is now the right time?\"",
          correct: false,
          feedback:
            "Worth answering well, but it's a story rather than evidence. Evidence of motion beats evidence of reasoning.",
        },
        {
          label: "\"Who are your competitors?\"",
          correct: false,
          feedback:
            "Not the field the deck singles out. What you've built is the one that carries the signal.",
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a2-principles-terminal",
    },

    "s4a2-principles-terminal": {
      id: "s4a2-principles-terminal",
      type: "terminal",
      title: "RUNWAY: what gets callbacks",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Four habits, and they're what partners are actually reading for behind the questions on the form,\" Sofia says.",
      ],
      prompt: "Run the principles command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "principles",
          cmd: "application --principles",
          output: [
            "WRITE THE WAY YOU TALK",
            "  If you would not say it out loud, do not write it down. The",
            "  application is a transcript of how you think, not an admissions",
            "  essay. Short sentences. One idea per line.",
            "",
            "LEAD WITH WHAT YOU HAVE BUILT",
            "  Specifics, with links. Partners weight built > planned by a",
            "  factor of about ten.",
            "",
            "SHOW THE USER, NOT THE MARKET",
            "  One sentence about who they are, one about what they currently",
            "  do instead. Anyone can describe a market. Almost nobody",
            "  describes a specific person.",
            "",
            "BE SPECIFIC WHERE OTHERS ARE VAGUE",
            "  \"It is hard\" is not a problem. \"Last Tuesday, Maya spent two",
            "  hours on...\" is. The application that survives has numbers,",
            "  names, and screenshots.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a2-video-quiz",
    },

    "s4a2-video-quiz": {
      id: "s4a2-video-quiz",
      type: "quiz",
      title: "Knowledge check: the one-minute video",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Every year somebody books a studio,\" Sofia says. \"Every year it hurts them.\"",
      ],
      question: "What does the deck say about production value in the application video?",
      options: [
        {
          label: "A green screen and a soundtrack make partners trust you less. A phone in a kitchen is the bar",
          correct: true,
          feedback:
            "Correct. Phone is fine, no slides, no edits, no script, every founder on camera. High production suggests effort spent on the wrong thing, and partners are watching to see how you think rather than how you present.",
        },
        {
          label: "Higher production shows you take the application seriously",
          correct: false,
          feedback:
            "It reads as the opposite: effort in the wrong place. Ninety honest minutes on the answers beats a polished video every time.",
        },
        {
          label: "Slides help partners follow a complex product",
          correct: false,
          feedback:
            "The instruction is explicit: no slides, no edits, no script. One take, every founder on camera.",
        },
        {
          label: "It doesn't matter, since partners rarely watch the video",
          correct: false,
          feedback:
            "They do watch it, which is why the guidance is specific. It just has to be plain rather than produced.",
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a2-handoff",
    },

    "s4a2-handoff": {
      id: "s4a2-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:55",
      text: [
        "\"Last stretch,\" Sofia says. \"Five myths that stop people applying at all, and the programmes that exist specifically for founders who aren't in California.\"",
        "\"Which, in this room, is most of you.\"",
      ],
      xp: 15,
      next: "s4a3-start",
    },
  },
};

export default act2;
