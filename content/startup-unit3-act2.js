// @ts-check

/**
 * Startup, Module 3, Act 2: "Six Ways It Eats Your Semester"
 *
 * Source material: the Module 3 deck, "Building Your First Prototype", slides 6
 * and 7. See content/sources/startup-modules/README.md.
 *
 * The six traps and four shipping habits are quoted from the deck and must stay
 * exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s3a2-*`. The last scene hands off to `s3a3-start`.
 */

const SOURCES = {
  module3: {
    label: "Module 3 / Building Your First Prototype (Techinance)",
    url: "http://start-ups-module-3-u6k898lt800z.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [];

export const act2 = {
  entry: "s3a2-start",
  scenes: {
    "s3a2-start": {
      id: "s3a2-start",
      type: "narrative",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room, 17:30",
      text: [
        "\"My v0 took eleven weeks,\" Devin says. \"It was supposed to take ten days. I can tell you exactly where the other nine weeks went, because it's on this slide.\"",
      ],
      source: SOURCES.module3,
      xp: 10,
      next: "s3a2-traps-terminal",
    },

    "s3a2-traps-terminal": {
      id: "s3a2-traps-terminal",
      type: "terminal",
      title: "RUNWAY: how prototypes eat your semester",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six traps,\" Sofia says. \"Every one of them feels like doing the work properly.\"",
      ],
      prompt: "Run the traps command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "traps",
          cmd: "mvp --traps",
          output: [
            "01 BUILDING THE WHOLE PRODUCT",
            "   You are testing one assumption, not launching a company. Cut",
            "   everything that does not test it.",
            "02 LEARNING A NEW STACK TO SHIP",
            "   If your prototype requires you to learn Next.js first, you",
            "   picked the wrong tool. Use what you already know.",
            "03 POLISHING THE LANDING PAGE",
            "   Five people who already know you do not need a hero animation.",
            "   Send them a Notion doc and a Tally form.",
            "04 DESIGNING FOR USERS YOU DO NOT HAVE",
            "   Onboarding flows, settings panels, dark mode. None of it",
            "   matters until five strangers actually use it once.",
            "05 BUILDING AUTH FIRST",
            "   Login screens, password resets, email verification. Skip it.",
            "   Use Google Sheets or a Notion link.",
            "06 WAITING UNTIL IT FEELS READY",
            "   It will never feel ready. Ship it on day ten and let the first",
            "   user tell you what is actually missing.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module3,
      xp: 30,
      next: "s3a2-backlog-inspect",
    },

    "s3a2-backlog-inspect": {
      id: "s3a2-backlog-inspect",
      type: "inspect",
      title: "Review the build plan: what should be cut?",
      speaker: "Sofia Okonkwo",
      avatar: "file-text",
      location: "Programme workspace",
      text: [
        "\"Someone's ten-day plan from last cohort,\" Sofia says. \"Their riskiest assumption is at the top. Tap everything that doesn't test it.\"",
      ],
      prompt: "Tap the tasks that don't test the assumption. Find at least 4.",
      artifact: {
        kind: "report",
        fields: [
          { label: "Riskiest assumption", value: "Students will hand over their timetable to a stranger", hot: "assumption" },
          { label: "Deadline", value: "10 days", hot: "deadline" },
        ],
        body: [
          "BUILD PLAN",
          "Tally form collecting a timetable screenshot.",
          {
            hot: "auth",
            text: "Email/password sign-up with verification and password reset.",
          },
          "A shared Google Sheet where I match people by hand.",
          {
            hot: "stack",
            text: "Learn Next.js and Postgres so the backend is production-ready.",
          },
          {
            hot: "polish",
            text: "Landing page with a hero animation and testimonials section.",
          },
          "DM the five people I interviewed and walk each of them through it.",
          {
            hot: "settings",
            text: "Settings panel with notification preferences and dark mode.",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        assumption: {
          suspicious: false,
          explain: "A genuine riskiest assumption: if students won't share their timetable, nothing downstream matters. Correctly at the top of the plan.",
        },
        deadline: {
          suspicious: false,
          explain: "Ten days, set before starting. That's exactly the habit the deck recommends: decide what good enough looks like in advance.",
        },
        auth: {
          suspicious: true,
          explain: "Building auth first. Login screens, password resets and email verification are explicitly on the skip list. Use Google Sheets or a Notion link.",
        },
        stack: {
          suspicious: true,
          explain: "Learning a new stack to ship. If the prototype requires learning Next.js first, the wrong tool was picked. Use what you already know.",
        },
        polish: {
          suspicious: true,
          explain: "Polishing the landing page. Five people who already know you do not need a hero animation, and testimonials require users you don't have yet.",
        },
        settings: {
          suspicious: true,
          explain: "Designing for users you do not have. Settings panels and dark mode don't matter until five strangers have actually used it once.",
        },
      },
      source: SOURCES.module3,
      xp: 40,
      badge: "scope-cutter",
      next: "s3a2-auth-quiz",
    },

    "s3a2-auth-quiz": {
      id: "s3a2-auth-quiz",
      type: "quiz",
      title: "Knowledge check: why skip the login screen",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"This one feels wrong to skip,\" Devin says. \"It's the first thing every tutorial builds.\"",
      ],
      question: "Why does the deck say to skip building authentication in a v0?",
      options: [
        {
          label: "It's days of work that tests nothing about whether people want the thing",
          correct: true,
          feedback:
            "Correct. Login screens, password resets and email verification are pure plumbing. With five people you already know, a Google Sheet or a Notion link does the job, and every hour saved goes into testing the assumption.",
        },
        {
          label: "Authentication isn't needed until you have paying customers",
          correct: false,
          feedback:
            "Payment isn't the trigger either. The point is narrower: at v0 you're testing one assumption with five people who already know you, so identity isn't a question yet.",
        },
        {
          label: "It's too technically difficult for a non-technical founder",
          correct: false,
          feedback:
            "It's actually one of the easier things to bolt on with modern tools. It's skipped because it's irrelevant to the test, not because it's hard.",
        },
        {
          label: "Users don't trust products that ask them to sign up",
          correct: false,
          feedback:
            "Friction is real, but the deck's reasoning is about your time rather than their trust. Anything that doesn't test the assumption gets cut.",
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a2-habits-terminal",
    },

    "s3a2-habits-terminal": {
      id: "s3a2-habits-terminal",
      type: "terminal",
      title: "RUNWAY: four habits of people who ship",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"The other side of the six traps,\" Sofia says.",
      ],
      prompt: "Run the habits command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "habits",
          cmd: "mvp --habits",
          output: [
            "PICK ONE ASSUMPTION TO TEST",
            "  Write it on a sticky note above your laptop. Anything that does",
            "  not test that assumption gets cut, even if it would be cool.",
            "",
            "USE TOOLS YOU ALREADY KNOW",
            "  A spreadsheet is a database. A group chat is a notifications",
            "  system. The fastest prototype is the one built with tools that",
            "  do not need a tutorial.",
            "",
            "DO THINGS THAT DO NOT SCALE",
            "  Onboard your first five users by hand. Send them a personal",
            "  message. The point is to learn, not to be efficient yet.",
            "",
            "SET A DEADLINE BEFORE YOU START",
            "  Ten days, twenty days, thirty days. Put the date in the calendar",
            "  and ship something that day.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a2-scale-quiz",
    },

    "s3a2-scale-quiz": {
      id: "s3a2-scale-quiz",
      type: "quiz",
      title: "Knowledge check: doing things that don't scale",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Onboarding people by hand feels like cheating,\" Sofia says. \"It isn't.\"",
      ],
      question: "Why onboard your first five users by hand rather than automating it?",
      options: [
        {
          label: "The point is to learn, not to be efficient yet",
          correct: true,
          feedback:
            "Correct. Doing it by hand is how you watch where people get stuck, which is information automation would hide from you. Efficiency matters once you know the thing works.",
        },
        {
          label: "Automation is too expensive at this stage",
          correct: false,
          feedback:
            "Cost isn't the reason. Even free automation would cost you the observation, which is the actual product of a v0.",
        },
        {
          label: "Five users is too few for automation to be worth writing",
          correct: false,
          feedback:
            "True but incidental. Even with fifty you'd want to watch the first handful yourself, because what they do is the signal you're there for.",
        },
        {
          label: "It makes users feel more valued and likely to stay",
          correct: false,
          feedback:
            "A pleasant side effect. The stated reason is learning: you're buying observation, not goodwill.",
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a2-handoff",
    },

    "s3a2-handoff": {
      id: "s3a2-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:55",
      text: [
        "\"Last stretch,\" Sofia says. \"Five things people believe about MVPs that keep them in build mode, and the toolkit that works from anywhere.\"",
      ],
      xp: 15,
      next: "s3a3-start",
    },
  },
};

export default act2;
