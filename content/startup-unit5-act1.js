// @ts-check

/**
 * Startup, Module 5, Act 1: "The Cheapest Dollar That Fits"
 *
 * Source material: the Module 5 deck, "Funding, Grants & Competitions", slides 3
 * to 5. See content/sources/startup-modules/README.md.
 *
 * The three sources, their terms, and the six rungs of the funding ladder are
 * quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s5a1-*`. The last scene hands off to `s5a2-start`.
 */

const SOURCES = {
  module5: {
    label: "Module 5 / Funding, Grants & Competitions (Techinance)",
    url: "http://start-ups-module-5-5hg4czg52uz4.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act1Badges = [];

export const act1 = {
  entry: "s5a1-start",
  scenes: {
    "s5a1-start": {
      id: "s5a1-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:00",
      text: [
        "\"Four modules in, everyone in this room asks the same question,\" Sofia says. \"Where does the first cheque come from?\"",
        "\"The honest answer is that there are three places, they cost completely different things, and most founders reach for the expensive one first.\"",
      ],
      source: SOURCES.module5,
      xp: 10,
      next: "s5a1-sources-terminal",
    },

    "s5a1-sources-terminal": {
      id: "s5a1-sources-terminal",
      type: "terminal",
      title: "RUNWAY: three sources of money",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Pick the cheapest dollar that fits the work,\" Sofia says. \"Cheapest does not mean easiest.\"",
      ],
      prompt: "Run the compare command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "compare",
          cmd: "funding --compare",
          output: [
            "SOURCE A // BOOTSTRAPPING",
            "  What it is : funding the build from revenue or savings",
            "  The cost   : time and personal risk, no equity",
            "  Best for   : services, fast-revenue businesses",
            "  Long tail  : you own the company when it works",
            "",
            "SOURCE B // GRANTS AND COMPETITIONS",
            "  What it is : cash in exchange for a credential",
            "  The cost   : 20 to 80 hours of application work",
            "  Best for   : deep tech, climate, student teams",
            "  Long tail  : stacks on your CV, opens next doors",
            "",
            "SOURCE C // ANGELS AND PRE-SEED",
            "  What it is : outside money for a slice of the company",
            "  The cost   : 5 to 20% for $50K to $2M, plus updates",
            "  Best for   : software with a growth model",
            "  Long tail  : investors become your network",
          ],
          required: true,
        },
      ],
      source: SOURCES.module5,
      xp: 30,
      next: "s5a1-sources-sort",
    },

    "s5a1-sources-sort": {
      id: "s5a1-sources-sort",
      type: "sort",
      title: "Which source fits this founder?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Six teams from previous cohorts,\" Devin says. \"Match each to the source that actually fits what they are building.\"",
      ],
      prompt: "Drag each founder to the funding source that fits them best.",
      buckets: [
        { id: "bootstrap", label: "Bootstrapping", hint: "Revenue or savings, no equity" },
        { id: "grants", label: "Grants and competitions", hint: "Cash for a credential" },
        { id: "angels", label: "Angels and pre-seed", hint: "Equity for outside money" },
      ],
      items: [
        {
          id: "tutoring",
          label: "Tutoring agency, first paying client in week two",
          bucket: "bootstrap",
          explain: "Bootstrapping. A services business with fast revenue funds the build from the revenue itself, and the long tail is that you own the whole company when it works.",
        },
        {
          id: "savings",
          label: "Has savings and would rather not answer to anyone",
          bucket: "bootstrap",
          explain: "Bootstrapping. The cost is time and personal risk rather than equity, and nobody gets a vote on what you build next.",
        },
        {
          id: "climate",
          label: "Climate hardware, two years from revenue, needs lab time",
          bucket: "grants",
          explain: "Grants and competitions. Deep tech and climate are exactly what non-dilutive programmes exist for, and the cost is 20 to 80 hours of application work rather than a slice of the company.",
        },
        {
          id: "student",
          label: "Student team with a research prototype and no revenue",
          bucket: "grants",
          explain: "Grants and competitions. Student teams are a named fit, and the credential stacks on your CV in a way a small cheque never would.",
        },
        {
          id: "saas",
          label: "Software with early users and a clear growth model",
          bucket: "angels",
          explain: "Angels and pre-seed. Software with a growth model is the shape outside money is priced for, at roughly 5 to 20% for $50K to $2M.",
        },
        {
          id: "network",
          label: "Wants investors who will open doors as much as write cheques",
          bucket: "angels",
          explain: "Angels and pre-seed. The long tail of the source is that investors become your network, which is the part founders undervalue when they compare cheque sizes.",
        },
      ],
      source: SOURCES.module5,
      xp: 35,
      next: "s5a1-cost-quiz",
    },

    "s5a1-cost-quiz": {
      id: "s5a1-cost-quiz",
      type: "quiz",
      title: "Knowledge check: the cost of money",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"One line on this slide, and it is the whole module compressed,\" Sofia says.",
      ],
      question: "Why does the deck call early money the most expensive money you will ever take?",
      options: [
        {
          label: "The company is worth least when you have proved least, so the same dollar costs more of it",
          correct: true,
          feedback:
            "Correct. A cheque taken before there is evidence buys a larger slice than the identical cheque taken six months later. That is why the instruction is to ask for the dollar you need, not the dollar you can get.",
        },
        {
          label: "Early-stage loans carry higher interest rates than later ones",
          correct: false,
          feedback:
            "This is about equity rather than debt. Nothing on the funding ladder below Series A is priced as a loan.",
        },
        {
          label: "Investors charge higher fees on small rounds",
          correct: false,
          feedback:
            "There are no fees in the picture. The cost is the ownership you hand over at the moment you can least justify a high price.",
        },
        {
          label: "It takes longer to raise, so you burn more runway doing it",
          correct: false,
          feedback:
            "Fundraising does eat time, and that shows up as a separate trap. The expense the deck names here is dilution.",
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a1-ladder-terminal",
    },

    "s5a1-ladder-terminal": {
      id: "s5a1-ladder-terminal",
      type: "terminal",
      title: "RUNWAY: the funding ladder",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six rungs, and each one buys something different,\" Sofia says. \"Read the right-hand half of each line more carefully than the numbers.\"",
      ],
      prompt: "Run the ladder command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "ladder",
          cmd: "funding --ladder",
          output: [
            "01 BOOTSTRAP AND F&F",
            "   Your money and theirs. No paperwork. The point is to ship, not",
            "   to negotiate.",
            "02 GRANTS AND COMPS",
            "   $1K to $250K, non-dilutive. They buy a credential. You keep the",
            "   company.",
            "03 ANGELS",
            "   Individuals writing $5K to $100K cheques on SAFEs. They buy the",
            "   team.",
            "04 PRE-SEED",
            "   Institutional cheques of $250K to $1.5M, usually on SAFEs. They",
            "   buy a wedge.",
            "05 SEED",
            "   Priced rounds of $2M to $5M, board seat in play. They buy",
            "   traction.",
            "06 SERIES A+",
            "   $8M and up, with metrics. They buy growth, not vision.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a1-rung-quiz",
    },

    "s5a1-rung-quiz": {
      id: "s5a1-rung-quiz",
      type: "quiz",
      title: "Knowledge check: what angels are buying",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Every rung buys a different thing, and knowing which one you are on tells you what to put in the email,\" Devin says.",
      ],
      question: "At the angel rung, what does the deck say the money is actually buying?",
      options: [
        {
          label: "The team",
          correct: true,
          feedback:
            "Correct. Individuals writing $5K to $100K cheques on SAFEs are backing the people, because at that stage there is rarely anything else to back. Pre-seed buys a wedge, seed buys traction, and Series A buys growth rather than vision.",
        },
        {
          label: "Traction",
          correct: false,
          feedback:
            "Traction is what a priced seed round of $2M to $5M is buying. Angels usually write before there is enough of it to price.",
        },
        {
          label: "A credential",
          correct: false,
          feedback:
            "That is what grants and competitions buy, on rung two, and they are non-dilutive so you keep the company.",
        },
        {
          label: "Growth",
          correct: false,
          feedback:
            "Growth with metrics is the Series A rung at $8M and up. An angel cheque arrives long before those numbers exist.",
        },
      ],
      source: SOURCES.module5,
      xp: 25,
      next: "s5a1-handoff",
    },

    "s5a1-handoff": {
      id: "s5a1-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:25",
      text: [
        "\"You know the three sources and the six rungs,\" Sofia says.",
        "\"Now the part nobody puts on a slide deck: six ways a small round turns into a long, expensive year.\"",
      ],
      xp: 15,
      next: "s5a2-start",
    },
  },
};

export default act1;
