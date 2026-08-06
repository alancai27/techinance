// @ts-check

/**
 * Startup, Module 3, Act 1: "Three Flavours of Prototype"
 *
 * Source material: the Module 3 deck, "Building Your First Prototype", slides 3
 * to 5. See content/sources/startup-modules/README.md.
 *
 * The three flavours, the shipping bar, and the six-move path are quoted from
 * the deck and must stay exact.
 *
 * QUIZZES: written from the deck, not matched to a form. See STORY-MODE.md.
 *
 * Scene ids are namespaced `s3a1-*`. The last scene hands off to `s3a2-start`.
 */

const SOURCES = {
  module3: {
    label: "Module 3 / Building Your First Prototype (Techinance)",
    url: "http://start-ups-module-3-u6k898lt800z.netlify.app",
  },
};

/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act1Badges = [];

export const act1 = {
  entry: "s3a1-start",
  scenes: {
    "s3a1-start": {
      id: "s3a1-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:00",
      text: [
        "\"You have a problem statement and five people who told you it's real,\" Sofia says. \"This week you build the smallest thing that tests whether they'd actually use a fix.\"",
        "\"Ten days. Not ten weeks. And there are three ways to do it, only one of which involves writing much code.\"",
      ],
      source: SOURCES.module3,
      xp: 10,
      next: "s3a1-flavors-terminal",
    },

    "s3a1-flavors-terminal": {
      id: "s3a1-flavors-terminal",
      type: "terminal",
      title: "RUNWAY: three flavours",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Pick a flavour before you start,\" Sofia says. \"Match it to the test, not to your skills.\"",
      ],
      prompt: "Run the flavours command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "flavors",
          cmd: "mvp --flavors",
          output: [
            "FLAVOR A // NO-CODE",
            "  What it is  : a real, working tool stitched from existing apps",
            "  Built with  : Webflow, Airtable, Tally, Zapier, Notion, Glide",
            "  Best for    : forms, dashboards, marketplaces, simple workflows",
            "  Time        : a weekend to two weekends",
            "",
            "FLAVOR B // WIZARD-OF-OZ",
            "  What it is  : looks automated. You are running it by hand",
            "                backstage",
            "  Built with  : a form on the front, you and a spreadsheet on the",
            "                back",
            "  Best for    : anything you would otherwise need ML or hard",
            "                engineering for",
            "  Time        : one afternoon to set up",
            "",
            "FLAVOR C // CONCIERGE",
            "  What it is  : you deliver the service in person, one customer",
            "                at a time",
            "  Built with  : a DM, a calendar, and your own two hands",
            "  Best for    : services, coaching, anything where the value is",
            "                the experience",
            "  Time        : you can start tomorrow",
          ],
          required: true,
        },
      ],
      source: SOURCES.module3,
      xp: 30,
      next: "s3a1-flavors-sort",
    },

    "s3a1-flavors-sort": {
      id: "s3a1-flavors-sort",
      type: "sort",
      title: "Which flavour fits?",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Six ideas from this cohort,\" Devin says. \"Pick the cheapest flavour that would actually test each one.\"",
      ],
      prompt: "Drag each idea to the flavour that tests it fastest.",
      buckets: [
        { id: "nocode", label: "No-code", hint: "Stitched from existing apps" },
        { id: "wizard", label: "Wizard-of-Oz", hint: "Manual behind the curtain" },
        { id: "concierge", label: "Concierge", hint: "You deliver it in person" },
      ],
      items: [
        {
          id: "marketplace",
          label: "A marketplace matching tutors to students",
          bucket: "nocode",
          explain: "No-code. Marketplaces are named directly as a fit, and Airtable plus a form gets you a working version in a weekend.",
        },
        {
          id: "dashboard",
          label: "A dashboard showing societies their membership trends",
          bucket: "nocode",
          explain: "No-code. Dashboards are on the list, and a spreadsheet with a Glide front end is a real working tool.",
        },
        {
          id: "ai",
          label: "An assistant that summarises lecture recordings",
          bucket: "wizard",
          explain: "Wizard-of-Oz. Anything you'd otherwise need ML for: put a form on the front, and write the summaries yourself for the first ten users. One afternoon to set up.",
        },
        {
          id: "matching",
          label: "Smart matching of flatmates by compatibility",
          bucket: "wizard",
          explain: "Wizard-of-Oz again. The algorithm is the expensive part and the unnecessary part. Do the matching by hand and see whether anyone values the result.",
        },
        {
          id: "coaching",
          label: "Interview coaching for first-generation students",
          bucket: "concierge",
          explain: "Concierge. The value is the experience, so deliver it yourself with a DM and a calendar. You can start tomorrow.",
        },
        {
          id: "meals",
          label: "A meal-prep service for students in halls",
          bucket: "concierge",
          explain: "Concierge. A service where you do the work by hand for a handful of people tells you far more than an app would.",
        },
      ],
      source: SOURCES.module3,
      xp: 35,
      badge: "flavor-picker",
      next: "s3a1-bar-quiz",
    },

    "s3a1-bar-quiz": {
      id: "s3a1-bar-quiz",
      type: "quiz",
      title: "Knowledge check: the shipping bar",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"There's one line on this slide and people find it uncomfortable,\" Sofia says.",
      ],
      question: "According to the deck, how polished should your first version be?",
      options: [
        {
          label: "If you're not a little embarrassed by it, you shipped it too late",
          correct: true,
          feedback:
            "Correct. A clean prototype is usually a slow prototype. The embarrassment is the price of finding out early, and the people who actually have the problem will use something rough if it helps.",
        },
        {
          label: "Polished enough that a stranger would trust it at first glance",
          correct: false,
          feedback:
            "Pretty does not equal trustworthy. People who actually have the problem will use a Notion doc if it solves it.",
        },
        {
          label: "Finished, since a bad first impression is hard to undo",
          correct: false,
          feedback:
            "With five people who already know the problem, there's no first impression at stake. Waiting until it feels ready is one of the six traps: it will never feel ready.",
        },
        {
          label: "As polished as you can manage inside ten days",
          correct: false,
          feedback:
            "The ten days should go on testing the assumption, not on finish. Anything that doesn't test the assumption gets cut, even if it would be cool.",
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a1-path-terminal",
    },

    "s3a1-path-terminal": {
      id: "s3a1-path-terminal",
      type: "terminal",
      title: "RUNWAY: the 30-day path",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Six moves from a problem statement to something a stranger can try,\" Sofia says.",
      ],
      prompt: "Run the path command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "path",
          cmd: "mvp --path",
          output: [
            "01 RISKIEST ASSUMPTION",
            "   The one thing that, if false, makes the whole idea fall over.",
            "02 SMALLEST TEST",
            "   The cheapest thing you could build that would prove or kill it.",
            "03 PICK A FLAVOR",
            "   No-code, Wizard-of-Oz, or concierge. Match it to the test, not",
            "   your skills.",
            "04 BUILD IN A WEEKEND",
            "   Ugly is fine. If it takes more than two weekends, you scoped",
            "   wrong.",
            "05 SHIP TO FIVE USERS",
            "   The same five from your Module 02 interviews. They already know",
            "   the problem.",
            "06 READ THE SIGNAL",
            "   What did they do, not what they said. Patterns over compliments.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a1-assumption-quiz",
    },

    "s3a1-assumption-quiz": {
      id: "s3a1-assumption-quiz",
      type: "quiz",
      title: "Knowledge check: what a riskiest assumption is",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Everything else in the ten days hangs off getting this one right,\" Devin says.",
      ],
      question: "What makes an assumption the riskiest one?",
      options: [
        {
          label: "If it turns out to be false, the whole idea falls over",
          correct: true,
          feedback:
            "Correct. Not the hardest to build, not the most interesting: the one that would kill the idea. Write it on a sticky note above your laptop and cut anything that doesn't test it.",
        },
        {
          label: "It's the part of the product that's technically hardest",
          correct: false,
          feedback:
            "Technical difficulty is often the least risky part, because you know it can be done. Wizard-of-Oz exists precisely to skip building the hard thing while you test whether it matters.",
        },
        {
          label: "It's whatever users mentioned most often in interviews",
          correct: false,
          feedback:
            "Frequency of mention isn't the same as load-bearing. The riskiest assumption is the one whose failure ends the project.",
        },
        {
          label: "It's the assumption competitors have already validated",
          correct: false,
          feedback:
            "If a competitor validated it, it's one of your safer assumptions. Test the thing nobody has answered for your specific users.",
        },
      ],
      source: SOURCES.module3,
      xp: 25,
      next: "s3a1-handoff",
    },

    "s3a1-handoff": {
      id: "s3a1-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:25",
      text: [
        "\"That's the plan,\" Sofia says. \"Now the six ways it turns into a two-month build instead of a two-week one.\"",
        "\"I've watched every one of these happen. Twice, in one case, to the same person.\"",
      ],
      xp: 15,
      next: "s3a2-start",
    },
  },
};

export default act1;
