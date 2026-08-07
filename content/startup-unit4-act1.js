// @ts-check

/**
 * Startup, Module 4, Act 1: "Three Programmes and a Bar"
 *
 * Source material: the Module 4 deck, "Y Combinator & Accelerators", slides 3
 * to 5. See content/sources/startup-modules/README.md.
 *
 * The three programmes, their terms, the application bar, and the six-step YC
 * journey are quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s4a1-*`. The last scene hands off to `s4a2-start`.
 */

const SOURCES = {
  module4: {
    label: "Module 4 / Y Combinator & Accelerators (Techinance)",
    url: "http://start-ups-module-4-j75s12eckq33.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act1Badges = [];

export const act1 = {
  entry: "s4a1-start",
  scenes: {
    "s4a1-start": {
      id: "s4a1-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:00",
      text: [
        "\"You shipped a v0 and watched five people use it,\" Sofia says. \"That single fact puts you ahead of most people who apply to accelerators.\"",
        "\"This module is about what those programmes actually are, and deciding honestly whether you need one.\"",
      ],
      source: SOURCES.module4,
      xp: 10,
      next: "s4a1-programs-terminal",
    },

    "s4a1-programs-terminal": {
      id: "s4a1-programs-terminal",
      type: "terminal",
      title: "RUNWAY: three programmes",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Pick the programme before the programme picks you,\" Sofia says. \"They are not interchangeable, and one of them exists specifically for people without a team.\"",
      ],
      prompt: "Run the programmes command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "programs",
          cmd: "accelerators --compare",
          output: [
            "PROGRAM A // Y COMBINATOR",
            "  What it is : a three-month batch in the Bay Area, twice a year",
            "  The deal   : $500K for ~7% on a standard SAFE",
            "  Best for   : most stages, most fields, most geographies",
            "  Long tail  : a 4,000-strong alumni network and a permanent line",
            "               on your CV",
            "",
            "PROGRAM B // TECHSTARS",
            "  What it is : a three-month program across 50+ city- and",
            "               theme-specific tracks",
            "  The deal   : ~$120K for ~6% equity",
            "  Best for   : founders who want a regional or vertical partner",
            "               network",
            "  Long tail  : deep mentor pool per city, useful corporate intros",
            "",
            "PROGRAM C // ANTLER",
            "  What it is : eight pre-team weeks to find a co-founder, then six",
            "               months to build",
            "  The deal   : ~$100K for ~10% equity",
            "  Best for   : solo founders who do not have a team yet",
            "  Long tail  : 100+ cities, especially strong across Europe and",
            "               APAC",
          ],
          required: true,
        },
      ],
      source: SOURCES.module4,
      xp: 30,
      next: "s4a1-programs-sort",
    },

    "s4a1-programs-sort": {
      id: "s4a1-programs-sort",
      type: "sort",
      title: "Which programme fits this founder?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Six founders, all real people from previous cohorts,\" Devin says. \"Match each to the programme that actually fits their situation.\"",
      ],
      prompt: "Drag each founder to the best-fitting programme.",
      buckets: [
        { id: "yc", label: "Y Combinator", hint: "Broad, Bay Area, twice a year" },
        { id: "techstars", label: "Techstars", hint: "City and theme-specific" },
        { id: "antler", label: "Antler", hint: "Solo, pre-team" },
      ],
      items: [
        {
          id: "solo",
          label: "Solo, no co-founder, wants to find one",
          bucket: "antler",
          explain: "Antler. Eight pre-team weeks exist precisely to find a co-founder, then six months to build. It's the one programme designed for founders without a team.",
        },
        {
          id: "solo2",
          label: "Strong technically, based in Singapore, no team",
          bucket: "antler",
          explain: "Antler again: 100+ cities, especially strong across Europe and APAC, and built for pre-team founders.",
        },
        {
          id: "broad",
          label: "Two co-founders, a working v0, aiming as high as possible",
          bucket: "yc",
          explain: "Y Combinator: most stages, most fields, most geographies, and the largest cheque of the three at $500K for around 7%.",
        },
        {
          id: "network",
          label: "Wants the biggest possible alumni network long term",
          bucket: "yc",
          explain: "YC. The long tail is a 4,000-strong alumni network and a permanent line on your CV, which is what people actually mean by the YC effect.",
        },
        {
          id: "regional",
          label: "Building health software, wants hospital introductions",
          bucket: "techstars",
          explain: "Techstars. 50+ city- and theme-specific tracks, with a deep mentor pool per city and useful corporate intros.",
        },
        {
          id: "vertical",
          label: "Wants mentors who know one industry deeply, in their own city",
          bucket: "techstars",
          explain: "Techstars, whose whole shape is regional and vertical partner networks rather than one central batch.",
        },
      ],
      source: SOURCES.module4,
      xp: 35,
      badge: "program-matcher",
      next: "s4a1-bar-quiz",
    },

    "s4a1-bar-quiz": {
      id: "s4a1-bar-quiz",
      type: "quiz",
      title: "Knowledge check: the application bar",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"One line on this slide, and it's a diagnostic rather than a writing tip,\" Sofia says.",
      ],
      question: "What does it mean if you can't explain what you do in one sentence?",
      options: [
        {
          label: "You don't yet know what you're building",
          correct: true,
          feedback:
            "Correct, and that's useful information rather than a failure. The application is a transcript of how you think. If the sentence won't come, the clarity isn't there yet, and no amount of polish will supply it.",
        },
        {
          label: "You need a better copywriter",
          correct: false,
          feedback:
            "Short clear answers beat long polished ones. Bringing in someone to make it sound better usually makes it vaguer, not clearer.",
        },
        {
          label: "The idea is too technically complex for a general audience",
          correct: false,
          feedback:
            "Complex products get explained in a sentence all the time. Difficulty summarising is nearly always a sign the thinking isn't finished.",
        },
        {
          label: "You should apply anyway and explain it in the interview",
          correct: false,
          feedback:
            "The interview is ten minutes of rapid-fire questions with three partners. If the sentence isn't clear on paper it will be worse under time pressure.",
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a1-journey-terminal",
    },

    "s4a1-journey-terminal": {
      id: "s4a1-journey-terminal",
      type: "terminal",
      title: "RUNWAY: the YC journey",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"End to end, so none of it is a surprise,\" Sofia says.",
      ],
      prompt: "Run the journey command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "journey",
          cmd: "yc --journey",
          output: [
            "01 THE APPLICATION",
            "   A standard online form. Ninety honest minutes will beat thirty",
            "   polished hours.",
            "02 THE 1-MINUTE VIDEO",
            "   Every founder on camera. Phone is fine. No slides, no edits,",
            "   no script.",
            "03 THE INTERVIEW",
            "   Ten minutes, three partners, rapid-fire. They are testing the",
            "   founder, not the deck.",
            "04 YES, OR NO",
            "   You usually hear back the same day or that week. A no is not a",
            "   verdict on the idea.",
            "05 BATCH LIFE",
            "   Three months of weekly group office hours, weekly check-ins,",
            "   and many late nights.",
            "06 DEMO DAY & AFTER",
            "   One short pitch to investors. Then the alumni network, which is",
            "   the actual long-tail value.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a1-effort-quiz",
    },

    "s4a1-effort-quiz": {
      id: "s4a1-effort-quiz",
      type: "quiz",
      title: "Knowledge check: how long to spend",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"People spend a fortnight on this form,\" Devin says. \"The deck has a specific opinion about that.\"",
      ],
      question: "How much time does the deck say a YC application deserves?",
      options: [
        {
          label: "Ninety honest minutes, which beats thirty polished hours",
          correct: true,
          feedback:
            "Correct. A reader has about ninety seconds for your application, and polish steals the time that plain answers would have used. Longer usually means vaguer.",
        },
        {
          label: "Thirty hours, since it's the most important document you'll write",
          correct: false,
          feedback:
            "That's exactly the comparison the deck makes, and it lands the other way: ninety honest minutes beats thirty polished hours.",
        },
        {
          label: "As long as it takes to get every answer perfect",
          correct: false,
          feedback:
            "Perfect isn't the target. Partners are reading for how you think, and over-editing hides that rather than showing it.",
        },
        {
          label: "One weekend with a co-founder reviewing every line",
          correct: false,
          feedback:
            "Review is fine, but the guidance is blunt about scale: ninety honest minutes. Time spent past that tends to go into adjectives.",
        },
      ],
      source: SOURCES.module4,
      xp: 25,
      next: "s4a1-handoff",
    },

    "s4a1-handoff": {
      id: "s4a1-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:25",
      text: [
        "\"You know the shape of the programmes and the shape of the process,\" Sofia says.",
        "\"Now the interesting bit: six ways founders make an application weaker by working harder on it.\"",
      ],
      xp: 15,
      next: "s4a2-start",
    },
  },
};

export default act1;
