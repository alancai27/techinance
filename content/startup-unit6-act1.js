// @ts-check

/**
 * Startup, Module 6, Act 1: "Pick the Shape of the Moment"
 *
 * Source material: the Module 6 deck, "Wrap-Up & Founder Portfolio", slides 3 to
 * 5. See content/sources/startup-modules/README.md.
 *
 * The three launch flavours, the day-two question, and the six moves of a 30-day
 * launch are quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s6a1-*`. The last scene hands off to `s6a2-start`.
 */

const SOURCES = {
  module6: {
    label: "Module 6 / Wrap-Up & Founder Portfolio (Techinance)",
    url: "http://start-ups-module-6-dfb3n0g76k3g.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act1Badges = [];

export const act1 = {
  entry: "s6a1-start",
  scenes: {
    "s6a1-start": {
      id: "s6a1-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:00",
      text: [
        "\"Last module,\" Sofia says. \"You have a problem worth solving, a v0 that five people used, three accelerator applications and a funding plan.\"",
        "\"Tonight is about the moment you tell the world, and the page that carries all of it with you afterwards.\"",
      ],
      source: SOURCES.module6,
      xp: 10,
      next: "s6a1-flavours-terminal",
    },

    "s6a1-flavours-terminal": {
      id: "s6a1-flavours-terminal",
      type: "terminal",
      title: "RUNWAY: three ways to launch",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Pick the shape of the moment before you pick the date,\" Sofia says. \"The prep time on the third one is six times the first.\"",
      ],
      prompt: "Run the compare command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "compare",
          cmd: "launch --compare",
          output: [
            "FLAVOUR A // SOFT LAUNCH",
            "  What it is : a link you share one person at a time",
            "  Audience   : 10 to 50 known users, hand-onboarded",
            "  Best for   : early shapes where the value is still unclear",
            "  Time       : you can start today",
            "",
            "FLAVOUR B // PUBLIC LAUNCH",
            "  What it is : a single announced day with one post, demo, and ask",
            "  Audience   : 1,000 to 50,000 strangers in one window",
            "  Best for   : products with a clear hook and a working v1",
            "  Time       : 2 to 4 weeks of prep",
            "",
            "FLAVOUR C // LAUNCH EVENT",
            "  What it is : a live moment, a demo, party, conference, or stream",
            "  Audience   : 50 to 500 in the room, plus replay video",
            "  Best for   : hardware, founder brands, anything with stakes",
            "  Time       : 6 to 12 weeks of prep",
          ],
          required: true,
        },
      ],
      source: SOURCES.module6,
      xp: 30,
      next: "s6a1-flavours-sort",
    },

    "s6a1-flavours-sort": {
      id: "s6a1-flavours-sort",
      type: "sort",
      title: "Which launch fits this team?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Six teams, all from cohorts before yours,\" Devin says. \"Match each to the launch that fits what they actually have.\"",
      ],
      prompt: "Drag each team to the launch shape that fits them best.",
      buckets: [
        { id: "soft", label: "Soft launch", hint: "A link, one person at a time" },
        { id: "public", label: "Public launch", hint: "One announced day" },
        { id: "event", label: "Launch event", hint: "A live moment" },
      ],
      items: [
        {
          id: "unclear",
          label: "Shipped a v0 last week, still unsure what the value is",
          bucket: "soft",
          explain: "Soft launch. It is built for early shapes where the value is still unclear, and you can start today with 10 to 50 known users onboarded by hand.",
        },
        {
          id: "today",
          label: "Wants to be in front of real users by Friday",
          bucket: "soft",
          explain: "Soft launch, which is the only one of the three with no prep window. A public launch needs 2 to 4 weeks and an event needs 6 to 12.",
        },
        {
          id: "hook",
          label: "Working v1 with a hook you can explain in one line",
          bucket: "public",
          explain: "Public launch. A clear hook and a working v1 are exactly what it is for, and one announced day can put you in front of 1,000 to 50,000 strangers.",
        },
        {
          id: "channels",
          label: "Has a 50-person list and wants one big coordinated day",
          bucket: "public",
          explain: "Public launch: one post, one demo, one ask, in a single window. The 50-person list is move three of the 30-day plan, so they are already halfway prepared.",
        },
        {
          id: "hardware",
          label: "Hardware product people need to hold to understand",
          bucket: "event",
          explain: "Launch event. Hardware is a named fit, because 50 to 500 people in a room beats any number of screenshots for something physical.",
        },
        {
          id: "brand",
          label: "Founder with an audience, wants a moment with stakes and a replay",
          bucket: "event",
          explain: "Launch event. Founder brands and anything with stakes are what the live moment is for, and the replay video keeps earning after the room empties.",
        },
      ],
      source: SOURCES.module6,
      xp: 35,
      badge: "launch-matcher",
      next: "s6a1-daytwo-quiz",
    },

    "s6a1-daytwo-quiz": {
      id: "s6a1-daytwo-quiz",
      type: "quiz",
      title: "Knowledge check: the day-two question",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"One question on one slide,\" Sofia says. \"Most founders in this room have not thought about it once.\"",
      ],
      question: "What does the deck mean by asking what your plan is for day two?",
      options: [
        {
          label: "Launch day is the first day of the work, and the morning after is the new floor",
          correct: true,
          feedback:
            "Correct. The graph spikes the day you publish and then falls to nothing unless something is waiting to catch it. Real distribution starts the morning after launch day, which is why day two is a move in the 30-day plan rather than an afterthought.",
        },
        {
          label: "You should schedule a second launch post 24 hours later",
          correct: false,
          feedback:
            "Relaunching is a real tactic and turns up in the myths, but day two is about having an ongoing distribution loop rather than one more post.",
        },
        {
          label: "You need a bug-fix window booked for the day after launch",
          correct: false,
          feedback:
            "Shipping a small fix every hour is part of launch day itself. Day two is about where the next users come from once the announcement stops working.",
        },
        {
          label: "Investors will ask about your metrics the day after you launch",
          correct: false,
          feedback:
            "Investors are not the audience for this question. It is about your own distribution, and whether anything exists after the spike.",
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a1-plan-terminal",
    },

    "s6a1-plan-terminal": {
      id: "s6a1-plan-terminal",
      type: "terminal",
      title: "RUNWAY: a 30-day public launch",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six moves, from a private link to a day-two distribution loop,\" Sofia says.",
      ],
      prompt: "Run the plan command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "plan",
          cmd: "launch --plan",
          output: [
            "01 PICK THE DAY",
            "   Put one date on the calendar in writing, and let every other",
            "   decision move toward it.",
            "02 WRITE THE ASSET",
            "   Write the post you would want to share. One paragraph, three",
            "   screenshots, one clear ask.",
            "03 BUILD THE LIST",
            "   Make a list of 50 people who will share it before any algorithm",
            "   decides to.",
            "04 SOFT LAUNCH FIRST",
            "   A week early, send the link to 20 friends-of-friends and fix",
            "   whatever breaks.",
            "05 LAUNCH DAY",
            "   Publish in the morning, reply to every comment, ship a small fix",
            "   every hour, and stay at your desk.",
            "06 DAY TWO",
            "   This is the new floor. Real distribution starts the morning",
            "   after launch day, not the day of.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a1-list-quiz",
    },

    "s6a1-list-quiz": {
      id: "s6a1-list-quiz",
      type: "quiz",
      title: "Knowledge check: the 50 people",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Move three is the one people skip, and it is the one that decides the day,\" Devin says.",
      ],
      question: "Why build a list of 50 people before launch day?",
      options: [
        {
          label: "They will share it before any algorithm decides to",
          correct: true,
          feedback:
            "Correct. Every platform's distribution is downstream of early engagement, so a launch with no list is a launch nobody sees. The 50 people are the reason the algorithm shows it to the fifty-first.",
        },
        {
          label: "Fifty users is the minimum for a product to look credible on launch day",
          correct: false,
          feedback:
            "The list is people who will share, not people who have signed up. Their job is distribution rather than social proof.",
        },
        {
          label: "It gives you enough feedback to fix the product before launching",
          correct: false,
          feedback:
            "That is move four, the soft launch to 20 friends-of-friends a week early. The list of 50 exists to move the post.",
        },
        {
          label: "Fifty is the number of accounts most platforms need to avoid flagging a new post",
          correct: false,
          feedback:
            "No platform rule is in play here. The reasoning is that early sharing is what makes any algorithm pay attention.",
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a1-handoff",
    },

    "s6a1-handoff": {
      id: "s6a1-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:25",
      text: [
        "\"You have the three shapes and the six moves,\" Sofia says.",
        "\"Now six ways a launch day becomes a launch graveyard, and every one of them has happened in this programme.\"",
      ],
      xp: 15,
      next: "s6a2-start",
    },
  },
};

export default act1;
