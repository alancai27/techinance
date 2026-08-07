// @ts-check

/**
 * Startup, Module 1, Act 2: "Why They Fail, and What You Have"
 *
 * Source material: the Module 1 deck, "What Is a Startup, Really?", slides 6
 * and 7. See content/sources/startup-modules/README.md.
 *
 * The five failure patterns and four student advantages are quoted from the
 * deck and must stay exact.
 *
 * Scene ids are namespaced `s1a2-*`. The last scene hands off to `s1a3-start`.
 */

/** The deck itself is the citation: this course's material is its slides. */
const SOURCES = {
  module1: {
    label: "Module 1 / What Is a Startup, Really? (Techinance)",
    url: "https://start-ups-module-1-zs9j1u749v3f.netlify.app/",
  },
};

/**
 * Badges the acts award are registered centrally in startup-unit1.js. This act
 * awards `failure-reader`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "s1a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "s1a2-start": {
      id: "s1a2-start",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:30",
      text: [
        "\"Five patterns sit behind most early-stage failures,\" Sofia says. \"They're not exotic. That's the point.\"",
        "\"And the last of the five isn't really a cause at all, which is the part most people get wrong when they tell the story afterwards.\"",
      ],
      source: SOURCES.module1,
      xp: 10,
      next: "s1a2-failures-terminal",
    },

    /* ---------------- 2. the five patterns ---------------- */
    "s1a2-failures-terminal": {
      id: "s1a2-failures-terminal",
      type: "terminal",
      title: "RUNWAY: failure patterns",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Pull it,\" Sofia says. \"Read the fifth one twice.\"",
      ],
      prompt: "Run the failure command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "patterns",
          cmd: "failures --patterns",
          output: [
            "WHY MOST STARTUPS FAIL // 5 patterns",
            "  01 NO REAL PROBLEM",
            "     A clever idea that nobody wanted solved. The most common",
            "     cause, by a wide margin.",
            "  02 NO USERS",
            "     A product built behind closed doors, launched to silence.",
            "     Distribution was an afterthought.",
            "  03 NO DISTRIBUTION",
            "     Even good products die if there is no repeatable way to get",
            "     them in front of the next 100 users.",
            "  04 CO-FOUNDER CONFLICT",
            "     Misaligned values, unclear ownership, or one person stops",
            "     showing up. Hard to recover from.",
            "  05 RUNNING OUT OF MONEY",
            "     Usually a symptom of the four above, not a cause in itself.",
            "     The clock just runs out first.",
            "",
            "  Each of these can be avoided by choices made over the next",
            "  five modules.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a2-cause-quiz",
    },

    /* ---------------- 3. the most common cause ---------------- */
    "s1a2-cause-quiz": {
      id: "s1a2-cause-quiz",
      type: "quiz",
      title: "Knowledge check: the most common cause",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"One of the five is described as the most common, by a wide margin,\" Sofia says.",
      ],
      question: "What is the most common cause of early-stage startup failure?",
      options: [
        {
          label: "No real problem: a clever idea nobody wanted solved",
          correct: true,
          feedback:
            "Correct, and by a wide margin. Which is why Module 2 is entirely about finding a problem someone actually has before you build anything for it.",
        },
        {
          label: "Running out of money",
          correct: false,
          feedback:
            "Running out of money is usually a symptom of the other four, not a cause in itself. The clock just runs out first, so it's what gets written on the headstone.",
        },
        {
          label: "Co-founder conflict",
          correct: false,
          feedback:
            "It's on the list and it's hard to recover from, but it isn't the most common. The biggest one happens before there's a team at all.",
        },
        {
          label: "Competition from bigger companies",
          correct: false,
          feedback:
            "Not one of the five patterns. Most early-stage companies die from a lack of anyone wanting the thing, long before a competitor notices them.",
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a2-money-quiz",
    },

    /* ---------------- 4. money as symptom ---------------- */
    "s1a2-money-quiz": {
      id: "s1a2-money-quiz",
      type: "quiz",
      title: "Knowledge check: what running out of money means",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"Every post-mortem blog post says they ran out of money,\" Devin says. \"That's true and it's rarely the actual story.\"",
      ],
      question: "Why is running out of money described as a symptom rather than a cause?",
      options: [
        {
          label: "It's usually the result of the other four patterns, with the clock running out first",
          correct: true,
          feedback:
            "Correct. No real problem, no users, no distribution or co-founder conflict all burn time, and money runs out while those go unsolved. Fixing the funding without fixing the cause buys a longer version of the same ending.",
        },
        {
          label: "Because money is never actually needed to build a startup",
          correct: false,
          feedback:
            "Money matters, and Module 5 covers where it comes from. The point is narrower: it's rarely the root cause of a failure.",
        },
        {
          label: "Because investors always provide more if you ask",
          correct: false,
          feedback:
            "They don't, and a company that hasn't solved the four underlying problems is exactly the one that struggles to raise again.",
        },
        {
          label: "Because early-stage companies have no expenses",
          correct: false,
          feedback:
            "They have some, though a student founder's are unusually low, which is one of the advantages coming up next.",
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a2-edge-terminal",
    },

    /* ---------------- 5. student advantages ---------------- */
    "s1a2-edge-terminal": {
      id: "s1a2-edge-terminal",
      type: "terminal",
      title: "RUNWAY: the student edge",
      speaker: "RUNWAY",
      avatar: "terminal",
      location: "Programme workspace",
      text: [
        "\"Now the other side,\" Sofia says. \"Four advantages you have right now that most full-time founders would pay for. Two of them expire.\"",
      ],
      prompt: "Run the advantages command on RUNWAY.",
      host: "founder@techinance",
      commands: [
        {
          id: "edge",
          cmd: "advantages --student",
          output: [
            "WHAT STUDENT FOUNDERS DO WELL // 4 advantages",
            "  DEEP KNOWLEDGE OF YOUNG-PERSON PROBLEMS",
            "    You live inside the customer segment most consumer companies",
            "    are trying to understand from the outside. That perspective",
            "    is rare, and it has an expiry date.",
            "  TIME TO ITERATE, PERMISSION TO BE WRONG",
            "    A semester is long enough to build, launch and rebuild three",
            "    times. Few other points in life give you this much room.",
            "  A LOW BURN RATE",
            "    Your runway is measured in months a working founder cannot",
            "    match. More experiments for less money.",
            "  A BUILT-IN NETWORK OF EARLY USERS",
            "    Hundreds of peers within walking distance, sorted into clubs,",
            "    chats and dorms. The distribution other founders spend years",
            "    building is already around you.",
          ],
          required: true,
        },
      ],
      source: SOURCES.module1,
      xp: 25,
      next: "s1a2-edge-sort",
    },

    /* ---------------- 6. match advantage to failure ---------------- */
    "s1a2-edge-sort": {
      id: "s1a2-edge-sort",
      type: "sort",
      title: "Which advantage answers which failure?",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room",
      text: [
        "\"Here's the thing worth noticing,\" Sofia says. \"The four advantages line up almost exactly against the failure patterns. Match them.\"",
      ],
      prompt: "Drag each advantage to the failure it works against.",
      buckets: [
        { id: "problem", label: "No real problem", hint: "Nobody wanted it solved" },
        { id: "users", label: "No users or distribution", hint: "Launched to silence" },
        { id: "time", label: "Running out of time and money", hint: "The clock wins" },
      ],
      items: [
        {
          id: "livedin",
          label: "You live inside the customer segment",
          bucket: "problem",
          explain: "Against the most common failure. You already know which young-person problems are real, from the inside, which is the perspective consumer companies try to buy.",
        },
        {
          id: "network",
          label: "Hundreds of peers within walking distance",
          bucket: "users",
          explain: "Against no users and no distribution. The repeatable way to reach the next hundred people is already sorted into clubs, chats and dorms around you.",
        },
        {
          id: "burn",
          label: "A low burn rate",
          bucket: "time",
          explain: "Against running out of money. Your runway is measured in months a working founder can't match, so you get more experiments per pound.",
        },
        {
          id: "semester",
          label: "A semester long enough to rebuild three times",
          bucket: "time",
          explain: "Also against the clock. Time to iterate and permission to be wrong is the thing that lets a first attempt fail without ending the project.",
        },
      ],
      source: SOURCES.module1,
      xp: 35,
      badge: "failure-reader",
      next: "s1a2-expiry-choice",
    },

    /* ---------------- 7. the expiring advantage ---------------- */
    "s1a2-expiry-choice": {
      id: "s1a2-expiry-choice",
      type: "choice",
      title: "The advantage with a deadline",
      speaker: "Devin Cho",
      avatar: "user",
      location: "Founders room",
      text: [
        "\"One line in that list is easy to skim past,\" Devin says. \"The deck says your perspective on young-person problems is rare, and that it has an expiry date.\"",
        "\"What should you do about that?\"",
      ],
      prompt: "Pick the response that follows from it.",
      options: [
        {
          label: "Build for problems you currently live inside, while you still do.",
          next: "s1a2-handoff",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. The advantage is being inside the segment, and you stop being inside it the moment you graduate out of it. The problems you can see clearly right now are the ones worth starting with.",
        },
        {
          label: "Wait until you have more industry experience before starting anything.",
          next: "s1a2-handoff",
          xp: 5,
          tone: "bad",
          feedback:
            "Waiting spends the exact advantage the deck is describing. You'd gain experience and lose the perspective, the low burn rate, the semester of slack, and the network within walking distance.",
        },
        {
          label: "Pick the largest possible market, regardless of whether you understand it.",
          next: "s1a2-handoff",
          xp: 5,
          tone: "bad",
          feedback:
            "Market size doesn't help if you can't tell a real problem from a clever idea, and no real problem is the most common failure by a wide margin. Your edge is knowing a specific segment from the inside.",
        },
      ],
      source: SOURCES.module1,
    },

    /* ---------------- 8. handoff to act 3 ---------------- */
    "s1a2-handoff": {
      id: "s1a2-handoff",
      type: "narrative",
      speaker: "Sofia Okonkwo",
      avatar: "rocket",
      location: "Founders room, 17:50",
      text: [
        "\"Five ways it goes wrong, four things you've got,\" Sofia says. \"Last stretch is clearing out the beliefs that stop people starting at all.\"",
        "\"Most of them are things you've heard repeated confidently by someone who has never done it.\"",
      ],
      xp: 15,
      next: "s1a3-start",
    },
  },
};

export default act2;
