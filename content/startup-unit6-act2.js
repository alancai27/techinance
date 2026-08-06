// @ts-check

/**
 * Startup, Module 6, Act 2: "How Launches Quietly Disappear"
 *
 * Source material: the Module 6 deck, "Wrap-Up & Founder Portfolio", slides 6
 * and 7. See content/sources/startup-modules/README.md.
 *
 * The six traps and four distribution habits are quoted from the deck and must
 * stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s6a2-*`. The last scene hands off to `s6a3-start`.
 */

const SOURCES = {
  module6: {
    label: "Module 6 / Wrap-Up & Founder Portfolio (Techinance)",
    url: "http://start-ups-module-6-dfb3n0g76k3g.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [];

export const act2 = {
  entry: "s6a2-start",
  scenes: {
    "s6a2-start": {
      id: "s6a2-start",
      type: "narrative",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room, 17:30",
      text: [
        "\"I rewrote my launch post for eleven days,\" Devin says. \"Then I posted it to an account with forty followers and refreshed the page for six hours.\"",
        "\"Two of the six traps, in one afternoon, and I could have avoided both by reading this slide.\"",
      ],
      source: SOURCES.module6,
      xp: 10,
      next: "s6a2-traps-terminal",
    },

    "s6a2-traps-terminal": {
      id: "s6a2-traps-terminal",
      type: "terminal",
      title: "RUNWAY: how launches quietly disappear",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six traps that turn a launch day into a launch graveyard,\" Sofia says.",
      ],
      prompt: "Run the traps command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "traps",
          cmd: "launch --traps",
          output: [
            "01 LAUNCHING TO NO ONE",
            "   A launch with no list is a launch nobody sees. Build a",
            "   50-person audience for a month before you press publish.",
            "02 ONE CHANNEL, ONE POST",
            "   The same launch should hit X, LinkedIn, Product Hunt, Hacker",
            "   News, and a few newsletters. Once on one platform is not a",
            "   launch.",
            "03 TREATING LAUNCH AS THE FINISH",
            "   The graph spikes the day you publish and then falls to nothing.",
            "   Real distribution starts the morning after, not the morning of.",
            "04 POLISHING THE POST FOR TEN DAYS",
            "   A weekend is plenty. The post is not the product, and every",
            "   extra day rewriting it is a day the product does not get",
            "   better.",
            "05 BURYING THE ASK",
            "   If you want signups, ask for signups. If you want shares, ask",
            "   for shares. Most people do what you politely and clearly ask of",
            "   them.",
            "06 NO PLAN FOR THE INBOUND",
            "   A surprise hit with no onboarding can be worse than a quiet",
            "   launch. Have a Notion doc, a calendar link, and an autoresponder",
            "   ready.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module6,
      xp: 30,
      next: "s6a2-runsheet-inspect",
    },

    "s6a2-runsheet-inspect": {
      id: "s6a2-runsheet-inspect",
      type: "inspect",
      title: "Review the launch plan: what will sink it?",
      speaker: "Sofia Okonkwo",
      avatar: "file-text",
      location: "Programme workspace",
      text: [
        "\"A run sheet from last cohort, filed four days before their launch,\" Sofia says. \"It went out and nothing happened. Tap the lines that explain why.\"",
      ],
      prompt: "Tap the lines that hit one of the six traps. Find at least 4.",
      artifact: {
        kind: "assessment",
        fields: [
          { label: "Product", value: "Timetable-matching app, v1 working", hot: "product" },
          { label: "Launch date", value: "Thursday 14th, in writing since week one", hot: "date" },
        ],
        body: [
          "RUN SHEET",
          {
            hot: "post",
            text: "Post: on draft 31. Two of us have been rewriting it since the 2nd and it still is not right.",
          },
          {
            hot: "list",
            text: "Share list: we will build it on launch morning once the post is finally locked.",
          },
          {
            hot: "channel",
            text: "Channels: one post on X. Product Hunt and Hacker News feel like overkill for a v1.",
          },
          "Screenshots: three, showing a real match being made end to end.",
          {
            hot: "ask",
            text: "Closing line: \"Anyway, that is what we have been up to. Thanks for reading.\"",
          },
          "Launch day: both of us at our desks from 08:00, replying to every comment.",
          {
            hot: "inbound",
            text: "If it goes big: we will work out onboarding then. No point building it for traffic we might not get.",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        product: {
          suspicious: false,
          explain: "A working v1 with a clear hook is exactly the fit for a public launch. Nothing wrong here.",
        },
        date: {
          suspicious: false,
          explain: "One date on the calendar in writing, set early, with everything moving toward it. That is move one of the 30-day plan done properly.",
        },
        post: {
          suspicious: true,
          explain: "Polishing the post for ten days. A weekend is plenty. The post is not the product, and twelve days of rewriting is twelve days the product did not get better.",
        },
        list: {
          suspicious: true,
          explain: "Launching to no one. The list is supposed to exist a month before publish, not be assembled on launch morning. A launch with no list is a launch nobody sees.",
        },
        channel: {
          suspicious: true,
          explain: "One channel, one post. The same launch should hit X, LinkedIn, Product Hunt, Hacker News and a few newsletters. Once on one platform is not a launch.",
        },
        ask: {
          suspicious: true,
          explain: "Burying the ask. There is no ask at all. If you want signups, ask for signups, because most people do what you politely and clearly ask of them.",
        },
        inbound: {
          suspicious: true,
          explain: "No plan for the inbound. A surprise hit with no onboarding can be worse than a quiet launch. A Notion doc, a calendar link and an autoresponder take an afternoon.",
        },
      },
      source: SOURCES.module6,
      xp: 40,
      badge: "launch-reader",
      next: "s6a2-ask-quiz",
    },

    "s6a2-ask-quiz": {
      id: "s6a2-ask-quiz",
      type: "quiz",
      title: "Knowledge check: the ask",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"The cheapest fix on the whole list,\" Devin says. \"It is one sentence.\"",
      ],
      question: "What does the deck say about ending a launch post without a clear ask?",
      options: [
        {
          label: "Most people do what you politely and clearly ask of them, so name the one action you want",
          correct: true,
          feedback:
            "Correct. If you want signups, ask for signups. If you want shares, ask for shares. A post that stops at describing the product wastes the only moment when a stranger's attention is already yours.",
        },
        {
          label: "Asking directly reads as pushy and costs you shares",
          correct: false,
          feedback:
            "The deck's view is the opposite: burying the ask is the trap, and a polite clear one is what converts.",
        },
        {
          label: "The product should be good enough that the ask is unnecessary",
          correct: false,
          feedback:
            "That is the myth about good products spreading on their own, which the deck also rejects. Distribution is its own discipline.",
        },
        {
          label: "One ask per channel is too few, so include three or four",
          correct: false,
          feedback:
            "Multiple asks split the attention. The guidance is one clear ask, matched to the one action you actually want.",
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a2-distribution-terminal",
    },

    "s6a2-distribution-terminal": {
      id: "s6a2-distribution-terminal",
      type: "terminal",
      title: "RUNWAY: four distribution habits",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Distribution is product-market fit's quieter, harder twin,\" Sofia says. \"These four are what separate a graph that keeps climbing from a graph that spiked once.\"",
      ],
      prompt: "Run the distribution command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "distribution",
          cmd: "launch --distribution",
          output: [
            "BUILD THE AUDIENCE FIRST",
            "  A small newsletter and a steady presence compound over time.",
            "  Start the channel the same week you start the product, not the",
            "  week of the launch.",
            "",
            "MAKE THE USER THE MARKETER",
            "  A shareable artifact is the lowest-cost distribution there is.",
            "  Build something a user would post on their own, like a result, a",
            "  number, or a thing they made with you.",
            "",
            "COMPETE FOR A SLOT, NOT NOISE",
            "  A weekly slot in someone else's newsletter beats one viral post.",
            "  Trade content, intros, or a guest post for the placement.",
            "",
            "TRACK ONE NUMBER",
            "  Daily active users, paying customers, signups per day. Pick one",
            "  and look at it every morning. Everything else can wait until that",
            "  number starts to move.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a2-artifact-quiz",
    },

    "s6a2-artifact-quiz": {
      id: "s6a2-artifact-quiz",
      type: "quiz",
      title: "Knowledge check: making the user the marketer",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"The habit with the best return, and it is a product decision rather than a marketing one,\" Sofia says.",
      ],
      question: "What makes a user become the marketer, according to the deck?",
      options: [
        {
          label: "A shareable artifact: a result, a number, or a thing they made with you",
          correct: true,
          feedback:
            "Correct, and it is the lowest-cost distribution there is because the user posts it for their own reasons. That makes it something you build into the product rather than something you buy afterwards.",
        },
        {
          label: "A referral bonus paid out per invited friend",
          correct: false,
          feedback:
            "Incentives are not what the deck describes. The mechanism is giving users something they would want to post anyway.",
        },
        {
          label: "A public leaderboard ranking your most active users",
          correct: false,
          feedback:
            "A leaderboard could be one shareable artifact among many, but the general principle is broader: a result, a number, or a thing they made.",
        },
        {
          label: "Asking every new signup to post about you within their first week",
          correct: false,
          feedback:
            "Asking clearly matters at launch, but this habit is about building something worth sharing rather than requesting the share.",
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a2-handoff",
    },

    "s6a2-handoff": {
      id: "s6a2-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:55",
      text: [
        "\"Two things left,\" Sofia says. \"Five myths that quietly tank good products.\"",
        "\"And then a question you have earned the right to answer: what shape do you actually want this company to be?\"",
      ],
      xp: 15,
      next: "s6a3-start",
    },
  },
};

export default act2;
