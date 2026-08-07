// @ts-check

/**
 * Startup, Module 6, Act 3: "The Shape of the Company"
 *
 * Source material: the Module 6 deck, "Wrap-Up & Founder Portfolio", slides 8 to
 * 11. See content/sources/startup-modules/README.md.
 *
 * The five myths, the six company shapes, and the five things a founder profile
 * needs are quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s6a3-*`. The last scene ends the episode, and the
 * course.
 */

const SOURCES = {
  module6: {
    label: "Module 6 / Wrap-Up & Founder Portfolio (Techinance)",
    url: "http://start-ups-module-6-dfb3n0g76k3g.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "s6a3-start",
  scenes: {
    "s6a3-start": {
      id: "s6a3-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:00",
      text: [
        "\"Five myths,\" Sofia says. \"These are the ones that tank good products, which is what makes them worse than the ones about raising.\"",
      ],
      source: SOURCES.module6,
      xp: 10,
      next: "s6a3-myths-terminal",
    },

    "s6a3-myths-terminal": {
      id: "s6a3-myths-terminal",
      type: "terminal",
      title: "RUNWAY: myths about launching",
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
          cmd: "launch --myths",
          output: [
            "01 \"IF THE PRODUCT IS GOOD, IT WILL SPREAD ON ITS OWN.\"",
            "   It usually will not. Distribution is its own discipline, and",
            "   great products without it lose to mediocre ones that have it.",
            "",
            "02 \"YOU ONLY GET ONE LAUNCH.\"",
            "   You can launch the same product five times: at each new",
            "   platform, at each milestone, at each big feature. Founders who",
            "   launch often tend to pull ahead.",
            "",
            "03 \"GOING VIRAL IS THE GOAL.\"",
            "   A flat, steady graph beats a spike followed by zero.",
            "   Compounding beats fireworks for almost every company that lasts",
            "   more than a year.",
            "",
            "04 \"PAID ADS WILL FIX THE DISTRIBUTION PROBLEM.\"",
            "   Paid usually only works once organic is working. If organic is",
            "   zero, paid is a tax on confusion. Get one channel working for",
            "   free before you spend a dollar.",
            "",
            "05 \"I NEED A MARKETING PERSON BEFORE I LAUNCH.\"",
            "   The founder is the marketer at this stage. Hire someone once a",
            "   channel is already working, not before. Your voice is what",
            "   people are buying first.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a3-viral-quiz",
    },

    "s6a3-viral-quiz": {
      id: "s6a3-viral-quiz",
      type: "quiz",
      title: "Knowledge check: spikes and floors",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Everyone in this room wants the spike,\" Devin says. \"I had one. It was the worst thing that happened to that company.\"",
      ],
      question: "Why does the deck prefer a flat, steady graph to a viral spike?",
      options: [
        {
          label: "Compounding beats fireworks for almost every company that lasts more than a year",
          correct: true,
          feedback:
            "Correct. A spike followed by zero leaves you exactly where you started, with a screenshot. A steady floor that rises slowly is what turns into a business, and it is the same reason day two matters more than launch day.",
        },
        {
          label: "Viral traffic is usually low-intent and rarely converts",
          correct: false,
          feedback:
            "Intent quality is a real issue but not the argument made here. The point is that a spike does not compound and a floor does.",
        },
        {
          label: "Going viral makes it harder to raise, since investors distrust the numbers",
          correct: false,
          feedback:
            "Investors are not the concern. The comparison is about which shape of graph actually builds a company.",
        },
        {
          label: "Servers and support cannot absorb a sudden spike",
          correct: false,
          feedback:
            "Having no plan for the inbound is one of the six traps, and it is a separate point. This myth is about which graph you should want in the first place.",
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a3-paid-quiz",
    },

    "s6a3-paid-quiz": {
      id: "s6a3-paid-quiz",
      type: "quiz",
      title: "Knowledge check: paid before organic",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Somebody every cohort takes their grant money and spends it on ads,\" Sofia says. \"It has never once worked.\"",
      ],
      question: "What does the deck say about running paid ads before organic distribution works?",
      options: [
        {
          label: "If organic is zero, paid is a tax on confusion. Get one channel working for free first",
          correct: true,
          feedback:
            "Correct. Paid amplifies whatever you already have, so amplifying nothing is expensive silence. Once one free channel works, ads are a lever on something real.",
        },
        {
          label: "Paid ads are always a poor use of early-stage money",
          correct: false,
          feedback:
            "Too absolute. Paid usually works once organic is working, so the guidance is about sequence rather than a ban.",
        },
        {
          label: "Ads only work for consumer products, not software sold to businesses",
          correct: false,
          feedback:
            "Category is not the distinction being drawn. The condition is whether an organic channel is already working.",
        },
        {
          label: "You need a marketing hire before ad spend is worth it",
          correct: false,
          feedback:
            "The deck says the founder is the marketer at this stage, and to hire once a channel is already working rather than before.",
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a3-shapes-terminal",
    },

    "s6a3-shapes-terminal": {
      id: "s6a3-shapes-terminal",
      type: "terminal",
      title: "RUNWAY: the shape of the company",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Some founders want a thousand-person company. Others want a six-person team forever,\" Sofia says. \"Both are real answers, and six modules in, you know enough to pick deliberately.\"",
      ],
      prompt: "Run the shapes command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "shapes",
          cmd: "company --shapes",
          output: [
            "The funding ladder is built for one of these answers and not the",
            "others, so pick deliberately. There is no prize for raising money",
            "you do not need, and no shame in a bootstrapped business that",
            "quietly throws off cash for ten years.",
            "",
            "  Venture-scale, 1,000+ people : raise, hire fast, target a giant",
            "                                 outcome",
            "  Lifestyle company, 2 to 20   : profitable year one, never raise,",
            "                                 own 100% forever",
            "  Studio and portfolio         : a few small things in parallel,",
            "                                 sell or keep each",
            "  Solo founder for life        : one person, a few customers, the",
            "                                 calmest cap table",
            "  Mission-led and co-op        : ownership shared with team or",
            "                                 users, slower upside",
            "  Acquihire path               : build to be bought by a larger",
            "                                 company in 2 to 3 years",
          ],
          required: true,
        },
      ],
      source: SOURCES.module6,
      xp: 25,
      next: "s6a3-profile-choice",
    },

    "s6a3-profile-choice": {
      id: "s6a3-profile-choice",
      type: "choice",
      title: "The page that travels with you",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"The final activity is one public URL,\" Devin says. \"Every artifact from modules one to five, in one place. What decides whether it works?\"",
      ],
      prompt: "Pick the test the deck sets for the founder profile.",
      options: [
        {
          label: "Could a stranger read this page in three minutes and know what to ask you about?",
          next: "s6a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. A short intro, a one-page pitch written fresh, one section per artifact with a working link including the live v0, and three concrete next steps with real dates. The three-minute stranger test is what stops it becoming a scrapbook.",
        },
        {
          label: "Does it look as polished as a company website?",
          next: "s6a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Polish is not the bar, which is why Notion, Carrd, Framer and Google Sites are all listed as fine. What matters is whether a stranger can read it quickly and know what to ask you about.",
        },
        {
          label: "Does it contain everything you did in the programme, in full?",
          next: "s6a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Completeness works against you here. It is one section per artifact with a brief description and a link, sized so a stranger gets through it in three minutes.",
        },
      ],
      source: SOURCES.module6,
    },

    "s6a3-ending": {
      id: "s6a3-ending",
      type: "ending",
      title: "Module 6 complete",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:20",
      text: [
        "\"Six modules,\" Sofia says. \"A problem you validated by talking to strangers, a v0 you shipped in ten days, three applications, a funding plan with a floor under it, and a launch with a day two.\"",
        "\"One public URL, kept updated. Link it from your CV under the line about developing a structured early-stage venture plan, and from every cold email you send an investor. This is your CV from now on.\"",
        "Devin stands up and switches the projector off. \"That is the programme,\" he says. \"Go and pick your date.\"",
      ],
      xp: 20,
      badge: "startup-unit6-certified",
      next: null,
    },
  },
};

export default act3;
