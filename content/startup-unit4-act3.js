// @ts-check

/**
 * Startup, Module 4, Act 3: "Myths, and Applying From Anywhere"
 *
 * Source material: the Module 4 deck, "Y Combinator & Accelerators", slides 8
 * to 11. See content/sources/startup-modules/README.md.
 *
 * The five myths, the regional and student programme lists, and the five things
 * a v1 application needs are quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s4a3-*`. The last scene ends the episode.
 */

const SOURCES = {
  module4: {
    label: "Module 4 / Y Combinator & Accelerators (Techinance)",
    url: "http://start-ups-module-4-j75s12eckq33.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "s4a3-start",
  scenes: {
    "s4a3-start": {
      id: "s4a3-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:00",
      text: [
        "\"Five things people believe that stop them submitting,\" Sofia says. \"The cost of believing them is that you don't apply, and the application is free.\"",
      ],
      source: SOURCES.module4,
      xp: 10,
      next: "s4a3-myths-terminal",
    },

    "s4a3-myths-terminal": {
      id: "s4a3-myths-terminal",
      type: "terminal",
      title: "RUNWAY: myths about accelerators",
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
          cmd: "accelerators --myths",
          output: [
            "01 \"YC only takes AI / deep-tech / B2B SaaS right now.\"",
            "   Every batch ships marketplaces, consumer, dev tools, fintech,",
            "   hardware, and the occasional pizza oven. The thesis is people,",
            "   not category.",
            "",
            "02 \"You need to live in San Francisco to even apply.\"",
            "   Applicants come from any country. You move during the batch,",
            "   not before.",
            "",
            "03 \"You need a finished product to apply.\"",
            "   Many batch companies enter with a v0, a Figma, or a clear",
            "   sketch and a record of shipping things. Evidence of motion",
            "   beats evidence of polish.",
            "",
            "04 \"If you do not get into YC, the idea is dead.\"",
            "   Many of the loudest companies were rejected, reapplied, or",
            "   never applied. A no is a data point, not a verdict.",
            "",
            "05 \"Accelerators are for people who cannot raise on their own.\"",
            "   They are for people who want a deadline, a network, and a",
            "   stamp. The cohort effect is hard to buy any other way.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a3-motion-quiz",
    },

    "s4a3-motion-quiz": {
      id: "s4a3-motion-quiz",
      type: "quiz",
      title: "Knowledge check: how finished you need to be",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"This is the myth that costs this room the most,\" Devin says. \"Everyone thinks they're a version away from being ready.\"",
      ],
      question: "How finished does a product need to be to apply?",
      options: [
        {
          label: "Not finished. Many batch companies enter with a v0 or a sketch, because evidence of motion beats evidence of polish",
          correct: true,
          feedback:
            "Correct. A v0, a Figma, or a clear sketch plus a record of shipping things is enough. Which means the prototype from Module 3 already clears the bar, and waiting to polish it makes the application weaker, not stronger.",
        },
        {
          label: "Fully finished, with paying customers",
          correct: false,
          feedback:
            "That would exclude most of any batch. What partners weight is evidence that you ship, not evidence that you finished.",
        },
        {
          label: "Enough that it doesn't look unfinished on the video",
          correct: false,
          feedback:
            "The video guidance runs the other way: phone, one take, no edits. Polish is consistently the thing that hurts rather than helps here.",
        },
        {
          label: "It depends on the category you're in",
          correct: false,
          feedback:
            "The thesis is people, not category. Every batch ships marketplaces, consumer, dev tools, fintech, hardware and the occasional pizza oven.",
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a3-rejection-quiz",
    },

    "s4a3-rejection-quiz": {
      id: "s4a3-rejection-quiz",
      type: "quiz",
      title: "Knowledge check: what a rejection means",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Half of you will get a no, and it's worth knowing in advance what it does and doesn't mean,\" Sofia says.",
      ],
      question: "What does not getting into YC tell you about your idea?",
      options: [
        {
          label: "It's a data point, not a verdict. Many of the loudest companies were rejected, reapplied, or never applied",
          correct: true,
          feedback:
            "Correct. Ten minutes with three partners is a narrow window, and a no in that window says very little about a company. The journey slide makes the same point: a no is not a verdict on the idea.",
        },
        {
          label: "The idea isn't viable and should be shelved",
          correct: false,
          feedback:
            "That's the myth this slide exists to drop. Plenty of well-known companies were rejected and carried on.",
        },
        {
          label: "You applied too early and should wait a year",
          correct: false,
          feedback:
            "Reapplying is normal and explicitly mentioned, but a rejection isn't a timing verdict either. It's one data point from one short conversation.",
        },
        {
          label: "You need a technical co-founder before reapplying",
          correct: false,
          feedback:
            "There's no such rule. What the application weights is what you've built and your history of building together.",
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a3-anywhere-terminal",
    },

    "s4a3-anywhere-terminal": {
      id: "s4a3-anywhere-terminal",
      type: "terminal",
      title: "RUNWAY: applying from anywhere",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Most US accelerators take applicants from anywhere on earth,\" Sofia says. \"Visa logistics start mattering only after they say yes.\"",
      ],
      prompt: "Run the regional command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "regional",
          cmd: "accelerators --regional",
          output: [
            "YC, Techstars and 500 Global accept teams from any country and",
            "usually help with B-1 visas for the in-person stretch. If a Bay",
            "Area batch is not the move yet, a regional program almost",
            "certainly funds at a similar stage from your city.",
            "",
            "  Global, remote-friendly : Y Combinator, 500 Global, On Deck",
            "  India & South Asia      : Sequoia Surge, Antler India",
            "  Latin America           : Platzi Ventures, YC LatAm cohorts",
            "  Africa                  : MEST, a16z TxO Fund",
            "  Southeast Asia          : Iterative, Antler SEA",
            "  Solo founders, pre-team : Antler, Entrepreneur First,",
            "                            South Park Commons",
            "  Student & early-career  : Z Fellows, Pear Garage, Soma Capital,",
            "                            Neo Scholars",
          ],
          required: true,
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a3-apply-choice",
    },

    "s4a3-apply-choice": {
      id: "s4a3-apply-choice",
      type: "choice",
      title: "Where to send it",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"The activity asks for three programmes you'll actually apply to,\" Devin says. \"YC plus two. How should you pick the other two?\"",
      ],
      prompt: "Pick the approach the deck recommends.",
      options: [
        {
          label: "Two that match your stage, geography and situation, from the regional or student lists.",
          next: "s4a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. The activity asks for YC plus two regional or stage-specific options, with deadlines written next to each. If you're solo, Antler or Entrepreneur First. If you're still in school, Z Fellows, Pear Garage, Soma Capital or Neo Scholars exist specifically for you.",
        },
        {
          label: "The two with the largest cheques, regardless of fit.",
          next: "s4a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Cheque size is the least useful sorting criterion here. Antler's smaller cheque comes with eight weeks of co-founder matching, which is worth more than money to a solo founder and worth nothing to a team of two.",
        },
        {
          label: "Only YC, since applying elsewhere signals you're not confident.",
          next: "s4a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Nobody sees where else you applied, and a no from a ten-minute interview is a data point rather than a verdict. Three applications is the brief precisely because one is a lottery ticket.",
        },
      ],
      source: SOURCES.module4,
    },

    "s4a3-ending": {
      id: "s4a3-ending",
      type: "ending",
      title: "Module 4 complete",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:20",
      text: [
        "\"Write the way you talk. Lead with what you built. Show the user, not the market. Be specific where everyone else is vague,\" Sofia says.",
        "\"Ninety honest minutes, a phone video in one take, and three programmes with the deadlines written next to them. That's the week.\"",
        "Devin closes the laptop. \"Module 5 is money,\" he says. \"Where the first cheque actually comes from, and how to read a term sheet without panicking.\"",
      ],
      xp: 20,
      badge: "startup-unit4-certified",
      next: null,
    },
  },
};

export default act3;
