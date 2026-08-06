// @ts-check

/**
 * Startup, Module 2, Act 2: "How to Ask Without Leading"
 *
 * Source material: the Module 2 deck, "Finding a Real Problem", slides 6 and 7.
 * See content/sources/startup-modules/README.md.
 *
 * The six common mistakes and four interview techniques are quoted from the
 * deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s2a2-*`. The last scene hands off to `s2a3-start`.
 */

const SOURCES = {
  module2: {
    label: "Module 2 / Finding a Real Problem (Techinance)",
    url: "http://start-ups-module-2-yx9jh65lmo6g.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [];

export const act2 = {
  entry: "s2a2-start",
  scenes: {
    "s2a2-start": {
      id: "s2a2-start",
      type: "narrative",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room, 17:30",
      text: [
        "\"My first five interviews were useless and I didn't know it for a month,\" Devin says. \"Everyone was lovely. Everyone said it sounded great. Nobody used the thing.\"",
        "\"Six traps send founders building the wrong thing for months. I managed four of them in one afternoon.\"",
      ],
      source: SOURCES.module2,
      xp: 10,
      next: "s2a2-traps-terminal",
    },

    "s2a2-traps-terminal": {
      id: "s2a2-traps-terminal",
      type: "terminal",
      title: "RUNWAY: where problem-finding goes wrong",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Read all six,\" Sofia says. \"You will recognise at least two from your own last conversation.\"",
      ],
      prompt: "Run the traps command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "traps",
          cmd: "interviews --traps",
          output: [
            "01 STARTING WITH THE SOLUTION",
            "   You fell in love with an app idea and went looking for a",
            "   problem it might fit. The order matters.",
            "02 ASKING LEADING QUESTIONS",
            "   \"Would you use a thing that does X?\" gets a polite yes from",
            "   almost everyone. It tells you nothing.",
            "03 TALKING TO FRIENDS ONLY",
            "   People who like you will not tell you the idea is weak. You",
            "   need at least a few strangers in the mix.",
            "04 VAGUE TARGET CUSTOMER",
            "   \"Students\" or \"small businesses\" is not a person. Pick",
            "   someone specific enough to text by Friday.",
            "05 CONFUSING INTEREST WITH INTENT",
            "   \"That sounds cool\" is interest. \"I tried to build that in a",
            "   spreadsheet last month\" is intent.",
            "06 STOPPING AT THREE CONVERSATIONS",
            "   Three is not a pattern. Five gets you a hint. Ten gets you",
            "   confidence to commit a semester.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module2,
      xp: 30,
      next: "s2a2-leading-quiz",
    },

    "s2a2-leading-quiz": {
      id: "s2a2-leading-quiz",
      type: "quiz",
      title: "Knowledge check: the question that tells you nothing",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"One of the six traps is the single most common thing founders do in a first interview,\" Sofia says.",
      ],
      question: "Why is \"Would you use a thing that does X?\" a useless question?",
      options: [
        {
          label: "It gets a polite yes from almost everyone, so it carries no information",
          correct: true,
          feedback:
            "Correct. People are agreeable, especially to someone visibly hoping for a yes. A question that everyone answers the same way can't distinguish a real problem from an imaginary one.",
        },
        {
          label: "It's too specific, so it narrows the conversation too early",
          correct: false,
          feedback:
            "The opposite problem. It's hypothetical, which is what makes it weak. A more specific question about something that actually happened would be better.",
        },
        {
          label: "It reveals your idea to a potential competitor",
          correct: false,
          feedback:
            "That's not the concern the deck raises. The reason to hold your idea back is that describing it turns the conversation into people being polite about your baby.",
        },
        {
          label: "It takes too long to answer properly",
          correct: false,
          feedback:
            "It's answered instantly, which is part of the trouble. The useful questions are about specific past events and take a while to answer.",
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a2-craft-terminal",
    },

    "s2a2-craft-terminal": {
      id: "s2a2-craft-terminal",
      type: "terminal",
      title: "RUNWAY: interview craft",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Four techniques,\" Sofia says. \"The whole method is one idea: ask about the past, not the future.\"",
      ],
      prompt: "Run the craft command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "craft",
          cmd: "interviews --craft",
          output: [
            "ANCHOR IN A RECENT MOMENT",
            "  \"Tell me about the last time you tried to do X.\" A specific",
            "  story gives you facts. A hypothetical gives you opinions,",
            "  which are usually wrong.",
            "",
            "ASK WHAT THEY DID, NOT WHAT THEY WANT",
            "  What people did last week predicts what they will do next",
            "  week. What they say they want is shaped by who they are",
            "  talking to. You are the wrong audience for that.",
            "",
            "SIT WITH THE SILENCE",
            "  After an answer, wait three seconds before the next question.",
            "  People keep going, and the second sentence is usually more",
            "  honest than the first.",
            "",
            "NEVER PITCH YOUR IDEA",
            "  The second you describe your solution, the conversation turns",
            "  into them being polite about your baby. Hold the idea back",
            "  until the very end, if at all.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a2-transcript-inspect",
    },

    "s2a2-transcript-inspect": {
      id: "s2a2-transcript-inspect",
      type: "inspect",
      title: "Review the transcript: where did the interview go wrong?",
      speaker: "Sofia Okonkwo",
      avatar: "file-text",
      location: "Programme workspace",
      text: [
        "\"A real transcript from a previous cohort, lightly anonymised,\" Sofia says. \"The founder came out convinced. Tap the lines that broke the method.\"",
      ],
      prompt: "Tap the founder's lines that break the interview rules. Find at least 4.",
      artifact: {
        kind: "report",
        fields: [
          { label: "Interview", value: "1 of 3, with a flatmate", hot: "who" },
          { label: "Topic", value: "Tracking shared household costs", hot: "topic" },
        ],
        body: [
          "FOUNDER / PARTICIPANT",
          {
            hot: "pitch",
            text: "F: \"So I'm building an app that splits bills automatically and reminds everyone. What do you think?\"",
          },
          "P: \"Oh that sounds really useful actually.\"",
          {
            hot: "leading",
            text: "F: \"Would you use something like that if it existed?\"",
          },
          "P: \"Yeah, definitely, probably.\"",
          "F: \"Tell me about the last time you split a bill with the house.\"",
          "P: \"Last month. It took about a week to sort out.\"",
          {
            hot: "interrupt",
            text: "F: \"Right, exactly, that's the problem I'm solving. So the app would handle that in one tap.\"",
          },
          {
            hot: "future",
            text: "F: \"How much would you pay for something like that in future?\"",
          },
          "P: \"Er, a few pounds a month? Maybe?\"",
        ],
      },
      requiredFinds: 4,
      hotspots: {
        who: {
          suspicious: false,
          explain: "A flatmate is a friend, which is trap 3, but the header itself is just context. The lines below are where the method actually breaks.",
        },
        topic: {
          suspicious: false,
          explain: "A reasonable, specific topic. Nothing wrong here.",
        },
        pitch: {
          suspicious: true,
          explain: "Pitching the idea, in the opening line. From this moment the conversation is the participant being polite about the founder's baby. Hold the idea back until the very end, if at all.",
        },
        leading: {
          suspicious: true,
          explain: "A textbook leading question. \"Would you use a thing that does X?\" gets a polite yes from almost everyone and tells you nothing.",
        },
        interrupt: {
          suspicious: true,
          explain: "The participant had just started giving a real story, and the founder talked over it to re-pitch. Sit with the silence: the second sentence is usually more honest than the first, and this one never arrived.",
        },
        future: {
          suspicious: true,
          explain: "Asking what they will do rather than what they did. What people did last week predicts next week; a hypothetical price is an opinion shaped by not wanting to disappoint you.",
        },
      },
      source: SOURCES.module2,
      xp: 40,
      badge: "interview-reader",
      next: "s2a2-silence-quiz",
    },

    "s2a2-silence-quiz": {
      id: "s2a2-silence-quiz",
      type: "quiz",
      title: "Knowledge check: the three seconds",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"The technique that feels worst and works best,\" Devin says.",
      ],
      question: "Why wait three seconds after someone finishes answering?",
      options: [
        {
          label: "People keep going, and the second sentence is usually more honest than the first",
          correct: true,
          feedback:
            "Correct. The first answer is the tidy, socially acceptable one. The thing they add into the silence is the part they weren't sure they should say, and it's usually where the real problem is.",
        },
        {
          label: "It gives you time to write down what they said",
          correct: false,
          feedback:
            "Useful side effect, not the reason. The pause is for them, not you: it's what pulls out the more honest second sentence.",
        },
        {
          label: "It makes you seem more thoughtful and builds rapport",
          correct: false,
          feedback:
            "Rapport isn't the goal. The goal is information you wouldn't otherwise get, and the silence is a technique for extracting it.",
        },
        {
          label: "It stops you interrupting with your own idea",
          correct: false,
          feedback:
            "Not pitching is a separate rule, and a good one. The silence is specifically about what the other person adds when you don't fill it.",
        },
      ],
      source: SOURCES.module2,
      xp: 25,
      next: "s2a2-handoff",
    },

    "s2a2-handoff": {
      id: "s2a2-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:55",
      text: [
        "\"You can run the conversation now,\" Sofia says. \"Last piece is knowing what you heard.\"",
        "\"Because people describe things as problems constantly, and most of what they describe isn't one.\"",
      ],
      xp: 15,
      next: "s2a3-start",
    },
  },
};

export default act2;
