// @ts-check

/**
 * Startup, Module 5, Act 3: "Myths, and Raising From Anywhere"
 *
 * Source material: the Module 5 deck, "Funding, Grants & Competitions", slides 8
 * to 11. See content/sources/startup-modules/README.md.
 *
 * The five myths, the non-dilutive stack, and the five things a 90-day funding
 * plan needs are quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s5a3-*`. The last scene ends the episode.
 */

const SOURCES = {
  module5: {
    label: "Module 5 / Funding, Grants & Competitions (Techinance)",
    url: "http://start-ups-module-5-5hg4czg52uz4.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "s5a3-start",
  scenes: {
    "s5a3-start": {
      id: "s5a3-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:00",
      text: [
        "\"Five myths,\" Sofia says. \"Each one has pushed somebody in a previous cohort into a round they did not need.\"",
      ],
      source: SOURCES.module5,
      xp: 10,
      next: "s5a3-myths-terminal",
    },

    "s5a3-myths-terminal": {
      id: "s5a3-myths-terminal",
      type: "terminal",
      title: "RUNWAY: myths about raising",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"What people say, and what is closer to true,\" Sofia says.",
      ],
      prompt: "Run the myths command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "myths",
          cmd: "raise --myths",
          output: [
            "01 \"YOU NEED TO RAISE TO BE A REAL STARTUP.\"",
            "   Many of the loudest companies bootstrapped for years. GitHub",
            "   raised at $100M ARR. Calendly never raised until it had revenue",
            "   in the tens of millions.",
            "",
            "02 \"GRANTS ARE FREE MONEY.\"",
            "   They are non-dilutive money. The application is the cost,",
            "   usually 20 to 80 hours. The cheapest dollar still takes",
            "   paperwork.",
            "",
            "03 \"A HIGHER VALUATION IS ALWAYS BETTER.\"",
            "   A high cap forces a higher seed price next round. Founders who",
            "   optimise for cap die at Series A. The right price is the lowest",
            "   one you would shake on.",
            "",
            "04 \"INVESTORS CARE ABOUT THE DECK.\"",
            "   Partners read slide one, the team page, and one metric. Decks",
            "   rarely close rounds. Founders close rounds.",
            "",
            "05 \"CROWDFUNDING IS FOR HARDWARE ONLY.\"",
            "   Republic and Wefunder let software, climate, and consumer",
            "   brands raise equity from anyone with a hundred dollars.",
            "   Increasingly used alongside a SAFE round.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a3-valuation-quiz",
    },

    "s5a3-valuation-quiz": {
      id: "s5a3-valuation-quiz",
      type: "quiz",
      title: "Knowledge check: the price you would shake on",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"This is the myth people are proudest of believing,\" Devin says. \"A big number is the easiest thing in the world to post about.\"",
      ],
      question: "Why is the highest valuation you can get not the right one to take?",
      options: [
        {
          label: "A high cap forces a higher seed price next round, and founders who optimise for cap die at Series A",
          correct: true,
          feedback:
            "Correct. Every number you set becomes the floor for the next round, so a cap you cannot grow into turns a good year into a down round. The right price is the lowest one you would shake on.",
        },
        {
          label: "Investors lose interest in companies that price themselves highly",
          correct: false,
          feedback:
            "Plenty of investors will sign at a generous cap. The damage shows up a year later, at the next round, not in this one.",
        },
        {
          label: "A high valuation means giving up more equity for the same cheque",
          correct: false,
          feedback:
            "This runs backwards: a higher cap means less dilution today. That is exactly why the trap is tempting, and why the cost is deferred to the next round.",
        },
        {
          label: "Tax on founder shares scales with the company valuation",
          correct: false,
          feedback:
            "Not the concern here. The stated cost is the price you have to beat at seed and Series A.",
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a3-grants-quiz",
    },

    "s5a3-grants-quiz": {
      id: "s5a3-grants-quiz",
      type: "quiz",
      title: "Knowledge check: non-dilutive is not free",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Two of the six traps and one of the five myths are all about grants,\" Sofia says. \"They pull in opposite directions, and both are right.\"",
      ],
      question: "What does the deck mean by calling grants non-dilutive rather than free?",
      options: [
        {
          label: "You keep the company, but the application still costs 20 to 80 hours",
          correct: true,
          feedback:
            "Correct, and both halves matter. The hours are why founders skip grants, and the ownership is why skipping them is a trap. Run the applications on the same calendar as the SAFE conversations rather than choosing between them.",
        },
        {
          label: "The money has to be repaid if the company is later acquired",
          correct: false,
          feedback:
            "Grant money is not repaid. Non-dilutive means you give up no equity for it.",
        },
        {
          label: "Grants come with reporting obligations that count as equity",
          correct: false,
          feedback:
            "Reporting can be real, but it is not equity and it is not the cost the deck names. The cost is the application itself.",
        },
        {
          label: "You have to spend the money on the specific project you applied with",
          correct: false,
          feedback:
            "Often true in practice, but not the distinction being drawn. Non-dilutive is about ownership, and the cost being named is the paperwork.",
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a3-anywhere-terminal",
    },

    "s5a3-anywhere-terminal": {
      id: "s5a3-anywhere-terminal",
      type: "terminal",
      title: "RUNWAY: raising from anywhere",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"You can raise from US investors from almost anywhere,\" Sofia says. \"You will need a Delaware C-corp, a US bank account, and a calm tax accountant.\"",
      ],
      prompt: "Run the anywhere command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "anywhere",
          cmd: "raise --anywhere",
          output: [
            "YC and most US funds require a Delaware C-corp before they wire",
            "money. Stripe Atlas spins one up in about a week, anywhere on",
            "earth. Your local tax authority will still want to know about it,",
            "so talk to an accountant before you sign anything. Run grants and",
            "crowdfunding alongside the SAFE, because the calendars are",
            "independent and the dollars are cheaper.",
            "",
            "  Entity, banking, cap table : Stripe Atlas, Clerky, Mercury, Carta",
            "  US gov grants             : NSF, NIH, DOE, DOD pitch days,",
            "                              SBIR/STTR",
            "  Non-US innovation grants  : Innovate UK, Horizon Europe, country",
            "                              programmes",
            "  Unconventional fellowships: Emergent Ventures, Schmidt Futures,",
            "                              Mozilla Builders",
            "  Student programmes        : Thiel, 1517, Dorm Room Fund,",
            "                              Z Fellows, MIT $100K, Rice BPC",
            "  Equity crowdfunding       : Republic, Wefunder, Kickstarter,",
            "                              Indiegogo",
          ],
          required: true,
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a3-plan-choice",
    },

    "s5a3-plan-choice": {
      id: "s5a3-plan-choice",
      type: "choice",
      title: "The line you will not cross",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"The activity is a 90-day funding plan,\" Devin says. \"Five grants, five investors, and one line that decides the rest of it. Which line?\"",
      ],
      prompt: "Pick what the plan needs alongside the two lists.",
      options: [
        {
          label: "A dilution cap you will not cross, plus your bootstrapping floor if nobody funds you.",
          next: "s5a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Something like \"no more than 20% pre-seed across all SAFEs\" written down in advance is what stops the fourth SAFE from being an easy yes. The bootstrap floor answers the question every application asks anyway: if none of these come through, what is the company on day 91?",
        },
        {
          label: "A target valuation, set as high as the strongest comparable in your sector.",
          next: "s5a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "That is optimising for valuation, which is trap four and myth three at once. A high cap forces a higher seed price next round, and the right price is the lowest one you would shake on.",
        },
        {
          label: "A deadline to close the round, so investors feel the pressure to move.",
          next: "s5a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "The deadlines in the plan belong to the grants and competitions, sorted soonest to latest. Manufactured pressure on investors is not what the activity is asking for, and the right yes beats the fastest yes.",
        },
      ],
      source: SOURCES.module5,
    },

    "s5a3-ending": {
      id: "s5a3-ending",
      type: "ending",
      title: "Module 5 complete",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:20",
      text: [
        "\"Pick the cheapest dollar that fits the work. Ask for the dollar you need, not the dollar you can get,\" Sofia says.",
        "\"Five grants and five funds in a spreadsheet, sorted by deadline, with a paragraph each on why this one rather than why money. Plus the honest runway if nobody says yes.\"",
        "Devin picks up his bag. \"Module 6 is the last one,\" he says. \"Launching the thing, and the page that carries all six modules with you afterwards.\"",
      ],
      xp: 20,
      badge: "startup-unit5-certified",
      next: null,
    },
  },
};

export default act3;
