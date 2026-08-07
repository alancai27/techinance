// @ts-check

/**
 * Startup, Module 5, Act 2: "How Fundraising Eats Founders"
 *
 * Source material: the Module 5 deck, "Funding, Grants & Competitions", slides 6
 * and 7. See content/sources/startup-modules/README.md.
 *
 * The six traps and four investor-finding habits are quoted from the deck and
 * must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s5a2-*`. The last scene hands off to `s5a3-start`.
 */

const SOURCES = {
  module5: {
    label: "Module 5 / Funding, Grants & Competitions (Techinance)",
    url: "http://start-ups-module-5-5hg4czg52uz4.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [];

export const act2 = {
  entry: "s5a2-start",
  scenes: {
    "s5a2-start": {
      id: "s5a2-start",
      type: "narrative",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room, 17:30",
      text: [
        "\"I spent nine months raising a round I did not need,\" Devin says. \"The product did not move once in those nine months. The deck did.\"",
      ],
      source: SOURCES.module5,
      xp: 10,
      next: "s5a2-traps-terminal",
    },

    "s5a2-traps-terminal": {
      id: "s5a2-traps-terminal",
      type: "terminal",
      title: "RUNWAY: how fundraising eats founders",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six traps that turn a small round into a long, expensive year,\" Sofia says.",
      ],
      prompt: "Run the traps command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "traps",
          cmd: "raise --traps",
          output: [
            "01 RAISING TOO EARLY",
            "   Money before product means you optimise for slides instead of",
            "   users. The pitch gets better. The product does not.",
            "02 RAISING TOO MUCH",
            "   Big rounds set big milestones. A small round is permission to",
            "   keep figuring it out. Take what you need plus six months.",
            "03 TREATING SAFES LIKE FREE MONEY",
            "   Caps stack. Three uncapped or generously-capped SAFEs can",
            "   quietly hand away half the company before your first priced",
            "   round.",
            "04 OPTIMISING FOR VALUATION",
            "   A higher cap now is a tougher seed later. The number that",
            "   flatters you today punishes you in twelve months.",
            "05 SKIPPING GRANTS BECAUSE THEY ARE SLOW",
            "   A $50K grant is $50K you never dilute for. Apply while a",
            "   partner reads your SAFE, because the calendars run in parallel.",
            "06 CONFUSING COMPETITIONS WITH CUSTOMERS",
            "   A pitch competition is a credential, not validation. One user",
            "   paying ten real dollars is worth a hundred trophies.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module5,
      xp: 30,
      next: "s5a2-plan-inspect",
    },

    "s5a2-plan-inspect": {
      id: "s5a2-plan-inspect",
      type: "inspect",
      title: "Review the funding plan: what is costing them?",
      speaker: "Sofia Okonkwo",
      avatar: "file-text",
      location: "Programme workspace",
      text: [
        "\"A plan from last cohort, written the week before they started raising,\" Sofia says. \"Tap the lines that work against them.\"",
      ],
      prompt: "Tap the lines that hit one of the six traps. Find at least 4.",
      artifact: {
        kind: "assessment",
        fields: [
          { label: "Company", value: "Two founders, timetable-matching app", hot: "team" },
          { label: "Stage", value: "v0 shipped, 40 weekly users", hot: "stage" },
        ],
        body: [
          "90-DAY FUNDING PLAN",
          {
            hot: "amount",
            text: "Target raise: $2M pre-seed. We need about $300K for the year, but we may as well ask for the bigger number while people are listening.",
          },
          {
            hot: "cap",
            text: "Instrument: four uncapped SAFEs, since uncapped means we are not committing to a valuation yet.",
          },
          {
            hot: "valuation",
            text: "Goal: push the cap as high as anyone will sign, so the seed round next year starts from a strong number.",
          },
          {
            hot: "grants",
            text: "Grants: skipping the two student grants. The applications take 40 hours each and the money lands in four months.",
          },
          "Bootstrap floor: with no raise, savings and the tutoring contract cover 11 months.",
          "Traction to show: 40 weekly users, 12 of them paying, retention over six weeks.",
          {
            hot: "comps",
            text: "Validation: we won a campus pitch competition in March, which proves there is demand.",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        team: {
          suspicious: false,
          explain: "Two founders with a shipped v0. Nothing to read into the header itself.",
        },
        stage: {
          suspicious: false,
          explain: "A shipped v0 with 40 weekly users is a real stage to raise from. This is not the raising-too-early trap.",
        },
        amount: {
          suspicious: true,
          explain: "Raising too much. Big rounds set big milestones, and $2M against a $300K need buys a year of pressure they cannot yet meet. Take what you need plus six months.",
        },
        cap: {
          suspicious: true,
          explain: "Treating SAFEs like free money. Caps stack, and three or four uncapped SAFEs can quietly hand away half the company before the first priced round. Uncapped is not a way to postpone the question.",
        },
        valuation: {
          suspicious: true,
          explain: "Optimising for valuation. A higher cap now is a tougher seed later, and the number that flatters you today punishes you in twelve months. The right price is the lowest one you would shake on.",
        },
        grants: {
          suspicious: true,
          explain: "Skipping grants because they are slow. A $50K grant is $50K you never dilute for, and the calendars run in parallel: apply while a partner reads your SAFE.",
        },
        comps: {
          suspicious: true,
          explain: "Confusing competitions with customers. A pitch competition is a credential rather than validation, and the twelve paying users two lines above are the stronger evidence they already have.",
        },
      },
      source: SOURCES.module5,
      xp: 40,
      badge: "raise-reader",
      next: "s5a2-safe-quiz",
    },

    "s5a2-safe-quiz": {
      id: "s5a2-safe-quiz",
      type: "quiz",
      title: "Knowledge check: why SAFEs are not free",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"A SAFE feels like nothing happens when you sign it,\" Devin says. \"Something does.\"",
      ],
      question: "What is the danger in signing several generously-capped or uncapped SAFEs?",
      options: [
        {
          label: "Caps stack, so three of them can quietly hand away half the company before the first priced round",
          correct: true,
          feedback:
            "Correct. Nothing converts on the day you sign, which is exactly why the dilution is invisible until the priced round arrives and every SAFE converts at once. Write a dilution line you will not cross before you sign the first one.",
        },
        {
          label: "They convert to debt if you do not raise a priced round within two years",
          correct: false,
          feedback:
            "A SAFE is not debt and has no maturity date. The risk is dilution rather than repayment.",
        },
        {
          label: "Investors can demand a board seat once several are outstanding",
          correct: false,
          feedback:
            "Board seats come into play at a priced seed round of $2M to $5M. SAFE holders do not get one by stacking.",
        },
        {
          label: "Each one has to be disclosed to every later investor, which slows the round",
          correct: false,
          feedback:
            "Disclosure is routine and not the problem. The problem is what the stacked caps do to your ownership when they all convert.",
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a2-investors-terminal",
    },

    "s5a2-investors-terminal": {
      id: "s5a2-investors-terminal",
      type: "terminal",
      title: "RUNWAY: how investors actually find deals",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Four habits that put you in front of the people writing cheques,\" Sofia says. \"Notice how little of it is about the deck.\"",
      ],
      prompt: "Run the investors command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "investors",
          cmd: "raise --investors",
          output: [
            "LEAD WITH TRACTION, NOT VISION",
            "  Partners skim slide one. \"Users do X, here is what they did last",
            "  week\" gets the deck read. \"Our mission is to\" does not.",
            "",
            "USE THE WARM INTRO, EVERY TIME",
            "  A cold email to a partner converts at maybe 2%. A warm intro",
            "  from a portfolio founder converts at 30% or better. Spend the",
            "  pre-raise week building intros, not slides.",
            "",
            "BUILD IN PUBLIC",
            "  Posts about what you ship pull inbound from investors who lurk.",
            "  The best ones meet you long before they hear you are raising.",
            "",
            "LIST FIRST, TALK SECOND",
            "  Fifty investors on a list before any meeting. Run them in waves",
            "  of five so the pitch sharpens with each wave. The right yes beats",
            "  the fastest yes.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a2-waves-quiz",
    },

    "s5a2-waves-quiz": {
      id: "s5a2-waves-quiz",
      type: "quiz",
      title: "Knowledge check: waves of five",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Everyone wants to email all fifty on Monday,\" Sofia says. \"Do not.\"",
      ],
      question: "Why run a list of fifty investors in waves of five rather than all at once?",
      options: [
        {
          label: "The pitch sharpens with each wave, so the later ones hear a better version",
          correct: true,
          feedback:
            "Correct. The first five conversations tell you which parts of the story land and which ones need rewriting, and the founders you most want to impress should be in wave nine rather than wave one. The right yes beats the fastest yes.",
        },
        {
          label: "Contacting too many investors at once is considered bad etiquette",
          correct: false,
          feedback:
            "Running a broad process is normal and expected. The reason for waves is that your pitch is still improving.",
        },
        {
          label: "It creates scarcity, which pushes investors to decide faster",
          correct: false,
          feedback:
            "Manufactured urgency is not the stated reason, and the deck explicitly prefers the right yes over the fastest one.",
        },
        {
          label: "Five is the most meetings you can hold in a week alongside building",
          correct: false,
          feedback:
            "Calendar load is real but incidental. The stated purpose is iteration: each wave makes the next pitch better.",
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a2-handoff",
    },

    "s5a2-handoff": {
      id: "s5a2-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:55",
      text: [
        "\"Last stretch,\" Sofia says. \"Five things people say about raising that push founders into the wrong round.\"",
        "\"Then the part that matters most to this room: how you do all of it from a country that is not America.\"",
      ],
      xp: 15,
      next: "s5a3-start",
    },
  },
};

export default act2;
