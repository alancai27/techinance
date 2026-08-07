// @ts-check

/**
 * Startup, Module 3, Act 3: "Myths, Toolkit, and Shipping a v0"
 *
 * Source material: the Module 3 deck, "Building Your First Prototype", slides 8
 * to 11. See content/sources/startup-modules/README.md.
 *
 * The five myths, the cross-border toolkit, and the five things a v0 needs are
 * quoted from the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s3a3-*`. The last scene ends the episode.
 */

const SOURCES = {
  module3: {
    label: "Module 3 / Building Your First Prototype (Techinance)",
    url: "http://start-ups-module-3-u6k898lt800z.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "s3a3-start",
  scenes: {
    "s3a3-start": {
      id: "s3a3-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:00",
      text: [
        "\"Five myths that keep founders stuck in build mode,\" Sofia says. \"Each one sounds like professionalism and functions as procrastination.\"",
      ],
      source: SOURCES.module3,
      xp: 10,
      next: "s3a3-myths-terminal",
    },

    "s3a3-myths-terminal": {
      id: "s3a3-myths-terminal",
      type: "terminal",
      title: "RUNWAY: things people say about MVPs",
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
          cmd: "mvp --myths",
          output: [
            "01 \"I need a technical co-founder before I can build anything.\"",
            "   For most first prototypes, you do not. A Tally form and a",
            "   Google Sheet handle a surprising amount.",
            "",
            "02 \"A real MVP needs a real backend.\"",
            "   A real MVP needs a real user. Backends come later, once you",
            "   know what they would even store.",
            "",
            "03 \"If it looks unfinished, people will not take it seriously.\"",
            "   People who actually have the problem will use a Notion doc if",
            "   it solves it. Pretty does not equal trustworthy.",
            "",
            "04 \"I should build it private and launch when it is ready.\"",
            "   Six months in private gets you the same answer as one weekend",
            "   in public, with five months more debt.",
            "",
            "05 \"Charging this early is awkward. I will figure out money",
            "   later.\"",
            "   A request for ten dollars is the only honest signal. Free",
            "   trials are popular for a reason.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a3-backend-quiz",
    },

    "s3a3-backend-quiz": {
      id: "s3a3-backend-quiz",
      type: "quiz",
      title: "Knowledge check: what a real MVP needs",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"There's a one-word swap in this myth that reframes the whole module,\" Devin says.",
      ],
      question: "The deck says a real MVP doesn't need a real backend. What does it need?",
      options: [
        {
          label: "A real user",
          correct: true,
          feedback:
            "Correct. Backends come later, once you know what they would even store. Building storage for data nobody has generated yet is the clearest example of work that feels productive and tests nothing.",
        },
        {
          label: "A real design system",
          correct: false,
          feedback:
            "Pretty does not equal trustworthy. People who actually have the problem will use a Notion doc if it solves it.",
        },
        {
          label: "A real business model",
          correct: false,
          feedback:
            "Charging early is recommended, and a request for ten dollars is called the only honest signal. But the swap in this specific myth is user for backend.",
        },
        {
          label: "A real technical co-founder",
          correct: false,
          feedback:
            "That's myth one, and the answer there is no: a Tally form and a Google Sheet handle a surprising amount.",
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a3-charging-quiz",
    },

    "s3a3-charging-quiz": {
      id: "s3a3-charging-quiz",
      type: "quiz",
      title: "Knowledge check: asking for money early",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Nobody likes this one,\" Sofia says. \"Asking a friend for ten pounds is genuinely uncomfortable. Do it anyway.\"",
      ],
      question: "Why does the deck call a request for ten dollars the only honest signal?",
      options: [
        {
          label: "Paying is a behaviour, and every other response is an opinion",
          correct: true,
          feedback:
            "Correct, and it runs through the whole course: what people did predicts what they'll do, what they said doesn't. Free trials are popular precisely because nobody has to decide anything.",
        },
        {
          label: "Because you need the revenue to keep building",
          correct: false,
          feedback:
            "Ten dollars from five people isn't revenue in any meaningful sense. Its value is entirely as evidence.",
        },
        {
          label: "Because investors want to see revenue from day one",
          correct: false,
          feedback:
            "Module 4 will show accelerators care far more about what you built and who used it. The charging advice is about learning, not fundraising.",
        },
        {
          label: "Because it filters out users who aren't serious",
          correct: false,
          feedback:
            "It does filter, but the point is the information in the filtering. A yes that costs nothing tells you nothing.",
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a3-toolkit-terminal",
    },

    "s3a3-toolkit-terminal": {
      id: "s3a3-toolkit-terminal",
      type: "terminal",
      title: "RUNWAY: a toolkit that works everywhere",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Most prototypes don't need a company, a bank account or a legal entity to start collecting signal,\" Sofia says.",
      ],
      prompt: "Run the toolkit command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "toolkit",
          cmd: "mvp --toolkit",
          output: [
            "A Tally form takes a Stripe payment from anywhere on earth. A",
            "Notion doc loads in any country. Worry about incorporation and",
            "merchant accounts when you have ten paying users, not before. The",
            "first version of almost everything can live on a free plan.",
            "",
            "  Forms and intake        : Tally, Typeform, Google Forms",
            "  Light apps, dashboards  : Glide, Softr, Notion, Airtable",
            "  Payment pre-incorporation : Stripe Atlas, Lemon Squeezy, Gumroad",
            "  Talking to users        : DeepL, voice notes, Loom with subtitles",
            "  Async scheduling        : Cal.com, Calendly with two zones on",
          ],
          required: true,
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a3-signal-choice",
    },

    "s3a3-signal-choice": {
      id: "s3a3-signal-choice",
      type: "choice",
      title: "Reading the result",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Day ten. Five people tried it. Three said they loved it, one asked when the next version lands, and one came back twice without you messaging them,\" Devin says.",
        "\"Which of those is the signal?\"",
      ],
      prompt: "Pick the one that actually tells you something.",
      options: [
        {
          label: "The one who came back twice without being prompted",
          next: "s3a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. What did they do, not what they said. Patterns over compliments, and someone returning unprompted is the only one of the three that's behaviour rather than politeness.",
        },
        {
          label: "The three who said they loved it, since that's a majority",
          next: "s3a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Three compliments are three opinions, and you're the wrong audience for them. Module 2 already covered this: \"I would totally use that\" is a vitamin.",
        },
        {
          label: "The one asking about the next version, since they're engaged with the roadmap",
          next: "s3a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Interest, not intent. Asking about a future version costs nothing; using the current one twice costs their time, which is why it counts.",
        },
      ],
      source: SOURCES.module3,
    },

    "s3a3-ending": {
      id: "s3a3-ending",
      type: "ending",
      title: "Module 3 complete",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 18:20",
      text: [
        "\"One assumption on a sticky note. The cheapest flavour that tests it. Ten days on the calendar before you start. Five users onboarded by hand,\" Sofia says.",
        "\"And a success bar you set before launch, not after. Three of five finishing the task on their own, or whatever the equivalent is for your thing. Deciding afterwards is how people talk themselves into a result.\"",
        "Devin is packing up. \"Then Module 4 you write it all down as an application,\" he says. \"Turns out the hardest question on the YC form is what have you built. You'll have an answer.\"",
      ],
      xp: 20,
      badge: "startup-unit3-certified",
      next: null,
    },
  },
};

export default act3;
