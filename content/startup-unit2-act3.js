// @ts-check

/**
 * Startup, Module 2, Act 3: "Painkillers, Vitamins, and One Sentence"
 *
 * Source material: the Module 2 deck, "Finding a Real Problem", slides 8 to 11.
 * See content/sources/startup-modules/README.md.
 *
 * The five myths, the five cross-border problem areas, the five things to
 * capture per interview, and the problem-statement shape are quoted from the
 * deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s2a3-*`. The last scene ends the episode.
 */

const SOURCES = {
  module2: {
    label: "Module 2 / Finding a Real Problem (Techinance)",
    url: "http://start-ups-module-2-yx9jh65lmo6g.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "s2a3-start",
  scenes: {
    "s2a3-start": {
      id: "s2a3-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:00",
      text: [
        "\"A painkiller is something people are already spending money or effort to escape,\" Sofia says. \"A vitamin is something they agree would be nice.\"",
        "\"Almost everything you hear in a first interview is a vitamin, described enthusiastically.\"",
      ],
      source: SOURCES.module2,
      xp: 10,
      next: "s2a3-myths-terminal",
    },

    "s2a3-myths-terminal": {
      id: "s2a3-myths-terminal",
      type: "terminal",
      title: "RUNWAY: painkillers vs vitamins",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Five things people call problems that aren't really problems,\" Sofia says.",
      ],
      prompt: "Run the myths command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "myths",
          cmd: "problems --myths",
          output: [
            "01 \"It would be cool if there was an app for this.\"",
            "   Cool ideas have not been tried for a real reason. Ask if they",
            "   would pay, switch, or change a habit.",
            "",
            "02 \"Everyone hates how this works.\"",
            "   If everyone hated it, someone would have fixed it. Find out",
            "   who specifically, and what they have already tried.",
            "",
            "03 \"I would totally use that.\"",
            "   A vitamin nice-to-have. Painkillers sound like \"I am already",
            "   paying for a worse version of this.\"",
            "",
            "04 \"This industry is so behind the times.\"",
            "   Sometimes true. Often there are regulations, contracts, or",
            "   buying patterns you do not yet see.",
            "",
            "05 \"My friends say they love the idea.\"",
            "   Friends are bad customers. Watch what they do when you stop",
            "   talking, not what they say while you are.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a3-painkiller-quiz",
    },

    "s2a3-painkiller-quiz": {
      id: "s2a3-painkiller-quiz",
      type: "quiz",
      title: "Knowledge check: what a painkiller sounds like",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Four sentences from four interviews,\" Devin says. \"Only one of them is a painkiller.\"",
      ],
      question: "Which of these signals a painkiller rather than a vitamin?",
      options: [
        {
          label: "\"I'm already paying for a worse version of this\"",
          correct: true,
          feedback:
            "Correct. Money already leaving their account for an inferior fix is the strongest signal there is. It clears both tests at once: they've tried to solve it themselves, and they're spending to shrink the problem.",
        },
        {
          label: "\"I would totally use that\"",
          correct: false,
          feedback:
            "The deck names this exact phrase as a vitamin. It costs nothing to say and predicts nothing about behaviour.",
        },
        {
          label: "\"It would be cool if there was an app for this\"",
          correct: false,
          feedback:
            "Cool ideas have not been tried for a real reason. The follow-up worth asking is whether they'd pay, switch, or change a habit.",
        },
        {
          label: "\"Everyone hates how this works\"",
          correct: false,
          feedback:
            "If everyone hated it, someone would have fixed it. Find out who specifically, and what they've already tried.",
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a3-friends-quiz",
    },

    "s2a3-friends-quiz": {
      id: "s2a3-friends-quiz",
      type: "quiz",
      title: "Knowledge check: why friends mislead you",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Everyone's first five interviews are with people who like them,\" Sofia says. \"Mine were.\"",
      ],
      question: "What's the problem with validating an idea on friends?",
      options: [
        {
          label: "People who like you won't tell you the idea is weak, so you need strangers in the mix",
          correct: true,
          feedback:
            "Correct. Friends are bad customers: watch what they do when you stop talking, not what they say while you are. At least a few strangers is what turns a warm reception into evidence.",
        },
        {
          label: "Friends aren't in your target market",
          correct: false,
          feedback:
            "Sometimes they are, and if they genuinely have the problem their story still counts. The issue is that their feedback is filtered through wanting to be kind to you.",
        },
        {
          label: "They'll tell other people about your idea",
          correct: false,
          feedback:
            "Secrecy isn't the concern anywhere in this course. Execution on a known problem beats novelty, so the idea leaking matters far less than people assume.",
        },
        {
          label: "There aren't enough of them to make a pattern",
          correct: false,
          feedback:
            "Numbers matter separately: three isn't a pattern, five is a hint, ten is confidence. But ten friends would still be ten polite answers.",
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a3-crossborder-terminal",
    },

    "s2a3-crossborder-terminal": {
      id: "s2a3-crossborder-terminal",
      type: "terminal",
      title: "RUNWAY: problems you can already see",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"If you've lived in two countries, you have a list of broken things in your head that people who've lived in one don't even register,\" Sofia says.",
      ],
      prompt: "Run the cross-border command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "crossborder",
          cmd: "problems --cross-border",
          output: [
            "The problems you have lived in two countries are often invisible",
            "to people who have only lived in one. Sending money home. Opening",
            "a bank account with no credit history. Finding the right tax",
            "document in a language that is not your first. Each of these is a",
            "problem someone is paying for, badly.",
            "",
            "FIVE PLACES TO LOOK",
            "  Money across borders    : sending, receiving, currency, fees",
            "  Documents & credentials : visas, degrees, work history, licenses",
            "  Health and insurance    : coverage gaps when you arrive or leave",
            "  Family at a distance    : care, transfers, presence across zones",
            "  Local trust             : starting from zero in a new country",
          ],
          required: true,
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a3-statement-choice",
    },

    "s2a3-statement-choice": {
      id: "s2a3-statement-choice",
      type: "choice",
      title: "Write the sentence",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"The activity ends in one sentence, in this shape,\" Sofia says. \"Specific person, doing X, in a situation, and what it costs them.\"",
        "\"Which of these is finished?\"",
      ],
      prompt: "Pick the problem statement that meets the bar.",
      options: [
        {
          label: "\"International first-years have trouble opening a bank account in their first fortnight, which costs them two weeks of not being paid.\"",
          next: "s2a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Specific person, specific action, specific situation, and a cost you could measure. It also happens to sit in one of the five cross-border areas, where the problems are real and badly served.",
        },
        {
          label: "\"Students find personal finance difficult and stressful.\"",
          next: "s2a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "\"Students\" is not a person, which is trap 4, and there's no situation and no cost. You couldn't text anyone about this by Friday, which is the test the deck gives.",
        },
        {
          label: "\"People want a better app for managing their money across countries.\"",
          next: "s2a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "That's a solution wearing a problem's clothes: it starts from the app. A problem statement describes a situation someone wants to escape, without naming your fix.",
        },
      ],
      source: SOURCES.module2,
    },

    "s2a3-ending": {
      id: "s2a3-ending",
      type: "ending",
      title: "Module 2 complete",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:20",
      text: [
        "\"Fall in love with the problem. Ask about the past, not the future. Three isn't a pattern, five is a hint, ten is confidence,\" Sofia says.",
        "\"Your job this week is five conversations and one sentence. Take notes by hand and look for patterns after, not during. And for each one, capture who they are, the last time it happened, what they tried, what it cost them, and one direct quote in their exact words.\"",
        "Devin taps the whiteboard on the way out. \"Then Module 3 you build the smallest possible thing that tests it. Ten days.\"",
      ],
      xp: 20,
      badge: "startup-unit2-certified",
      next: null,
    },
  },
};

export default act3;
