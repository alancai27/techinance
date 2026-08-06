// @ts-check

/**
 * Financial Literacy, Unit 1, Act 3: "Habits That Hold Up"
 *
 * Source material: "Techinance Financial Literacy: Smart Spending Habits" and
 * "Budgeting Your Income" (Dax G. Gajera, Techinance Technology Course
 * Developer). Both are transcribed in content/sources/.
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   $1.03 trillion owed in US credit card debt as of May 2025,
 *   60% of Americans had credit card debt in 2019,
 *   28% of adults had only a week's financial cushion in 2020,
 *   Warren Buffett's 1958 house at $31,500 and $116.9 billion net worth,
 *   Antoine Walker's $108 million, MC Hammer's $70 million and 1996 bankruptcy,
 *   Pete Adeney retiring at 30 on over 50% of income saved.
 *
 * The statement in the inspect scene is fictional. Every line flagged on it is
 * one of the seven "habits to avoid" listed in the source, which is what makes
 * the flags findable from the course material alone.
 *
 * Scene ids are namespaced `f1a3-*`. The last scene ends the episode.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  smartSpending: {
    label: "Smart Spending Habits (Signal Financial FCU)",
    url: "https://www.signalfinancialfcu.com/2025/smart-spending-habits",
  },
  goodBadHabits: {
    label: "Good and Bad Spending Habits (PenFed)",
    url: "https://www.penfed.org/learn/good-and-bad-spending-habits",
  },
  badHabits: {
    label: "Bad Spending Habits (Associated Bank)",
    url: "https://www.associatedbank.com/education/articles/personal-finance/budgeting/bad-spending-habits",
  },
  walker: {
    label: "NBA Star Made and Lost $100 Million (Yahoo Finance)",
    url: "https://finance.yahoo.com/news/nba-star-made-lost-100-151224212.html",
  },
  hammer: {
    label: "MC Hammer's Rise and Fall (CEO Today)",
    url: "https://www.ceotodaymagazine.com/2025/03/mc-hammers-rise-and-fall-from-70-million-to-bankruptcy/",
  },
  mustache: {
    label: "Mr Money Mustache interview (AARP)",
    url: "https://www.aarp.org/money/personal-finance/mr-money-mustache-interview/",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit1.js. This act
 * awards `fin-unit1-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "f1a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f1a3-start": {
      id: "f1a3-start",
      type: "narrative",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union, 17:55",
      text: [
        "Marcus pulls up his statement from last September, before any of this.",
        "\"A budget is a plan,\" he says. \"Habits are what happens when nobody's checking. Mine were bad and I couldn't see it, because every single line looked reasonable on its own.\"",
        "\"Have a look. See if you can find what I couldn't.\"",
      ],
      xp: 10,
      next: "f1a3-statement-inspect",
    },

    /* ---------------- 2. read the statement ---------------- */
    "f1a3-statement-inspect": {
      id: "f1a3-statement-inspect",
      type: "inspect",
      title: "Review the statement: find the habits",
      speaker: "Nia Barros",
      avatar: "file-text",
      location: "Coaching desk 2",
      text: [
        "\"Nothing here is a disaster by itself,\" Nia says. \"That's how it works. Tap the lines that show a habit worth breaking.\"",
      ],
      prompt: "Tap the lines that show one of the habits to avoid. Find at least 4.",
      artifact: {
        kind: "statement",
        fields: [
          { label: "Account", value: "Everyday Chequing", hot: "account" },
          { label: "Period", value: "1 to 30 September", hot: "period" },
          { label: "Money in", value: "$1,600 (net pay)", hot: "moneyin" },
          { label: "Money out", value: "$1,754", hot: "moneyout" },
        ],
        body: [
          "SEPTEMBER TRANSACTIONS",
          "Rent, 1 Sept ... $780",
          "Food shopping, 4 lots ... $210",
          {
            hot: "subs",
            text: "Seven streaming and app subscriptions, four unused since June ... $63",
          },
          {
            hot: "status",
            text: "Designer trainers, bought the week a friend got the same pair ... $190",
          },
          "Transport pass, 2 Sept ... $95",
          {
            hot: "card",
            text: "Credit card: minimum payment only, balance up again this month ... $35",
          },
          {
            hot: "impulse",
            text: "Grocery-aisle extras, went in for milk, no list ... $84",
          },
          {
            hot: "small",
            text: "47 transactions under $10, none recorded anywhere ... $212",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        account: {
          suspicious: false,
          explain: "The account name. It tells you nothing about the habits.",
        },
        period: {
          suspicious: false,
          explain: "One month of activity. A single month is enough to spot a habit, but not enough to judge a whole budget.",
        },
        moneyin: {
          suspicious: false,
          explain: "Net pay, which is the right figure to budget from. Nothing wrong with this line.",
        },
        moneyout: {
          suspicious: true,
          explain: "Money out is $1,754 against $1,600 in. That's spending more than you earn, and negative cash flow. Every other habit on this statement feeds it.",
        },
        subs: {
          suspicious: true,
          explain: "Too many non-essential subscriptions. Four of the seven have gone unused since June, so this is $63 a month buying nothing.",
        },
        status: {
          suspicious: true,
          explain: "Shopping for status. The trigger was someone else's purchase rather than a need, and status spending doesn't stop once it starts.",
        },
        card: {
          suspicious: true,
          explain: "Overusing credit cards. Paying only the minimum while the balance rises means the debt grows faster than the payments shrink it.",
        },
        impulse: {
          suspicious: true,
          explain: "Impulse buying, and shopping without a list. Going in for milk and leaving with $84 of extras is exactly what a list prevents.",
        },
        small: {
          suspicious: true,
          explain: "Not tracking small expenses. Individually invisible, $212 together, which is more than the food shop.",
        },
      },
      source: SOURCES.badHabits,
      xp: 40,
      next: "f1a3-48hour-quiz",
    },

    /* ---------------- 3. the 48-hour rule ---------------- */
    "f1a3-48hour-quiz": {
      id: "f1a3-48hour-quiz",
      type: "quiz",
      title: "Knowledge check: slowing a big purchase down",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"The trainers weren't a budgeting failure,\" Nia says. \"They were a speed failure. There's a standard fix for that.\"",
      ],
      question: "What is the 48-hour rule?",
      options: [
        {
          label: "Wait two days before making a final decision on a big purchase, so you can decide if the item is worth it.",
          correct: true,
          feedback:
            "Correct. The 48-hour rule puts two days between wanting something and buying it. Most impulse purchases don't survive the wait, and the ones that do were probably worth making.",
        },
        {
          label: "Return anything you regret within two days of buying it.",
          correct: false,
          feedback:
            "The rule works before the purchase, not after. Waiting two days to decide costs nothing; returning things depends on a shop's policy and often isn't possible.",
        },
        {
          label: "Review your budget every 48 hours.",
          correct: false,
          feedback:
            "Reviewing is recommended at the end of each week or month, not every two days. The 48-hour rule is specifically about pausing before a big purchase.",
        },
        {
          label: "Give yourself two days of spending money at a time.",
          correct: false,
          feedback:
            "That's closer to the envelope system, which caps a category until the next month. The 48-hour rule is a waiting period before deciding on a big purchase.",
        },
      ],
      source: SOURCES.smartSpending,
      xp: 25,
      next: "f1a3-list-quiz",
    },

    /* ---------------- 3b. the list ---------------- */
    "f1a3-list-quiz": {
      id: "f1a3-list-quiz",
      type: "quiz",
      title: "Knowledge check: the everyday fix",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"The 48-hour rule is for the big stuff,\" Marcus says. \"The $84 of grocery-aisle extras wasn't one big decision, it was fifteen small ones.\"",
      ],
      question: "What is the main strategy to combat impulse buying?",
      options: [
        {
          label: "Use credit cards only",
          correct: false,
          feedback:
            "That makes it worse. Overusing credit cards is its own habit to avoid, and paying with one removes the friction that might have stopped the purchase.",
        },
        {
          label: "Shop without a budget",
          correct: false,
          feedback:
            "Shopping without a plan is how impulse buying happens. A budget is what tells you the purchase doesn't fit before you're standing in the aisle.",
        },
        {
          label: "Make a shopping list before going out",
          correct: true,
          feedback:
            "Correct. Go to the store with a list and you buy what's on the list, without carelessly adding other items to your cart. It's the primary way to combat impulse buying, which is recklessly purchasing items that seem intriguing or that you like.",
        },
        {
          label: "Purchase everything on sale",
          correct: false,
          feedback:
            "A discount on something you didn't plan to buy is still money spent. Sales are one of the things that trigger impulse purchases rather than prevent them.",
        },
      ],
      source: SOURCES.smartSpending,
      xp: 25,
      next: "f1a3-dossier",
    },

    /* ---------------- 4. dossier ---------------- */
    "f1a3-dossier": {
      id: "f1a3-dossier",
      type: "dossier",
      title: "Coaching card: spending words",
      speaker: "Nia Barros",
      avatar: "wallet",
      location: "Riverbend Credit Union",
      text: [
        "\"Last card,\" Nia says. \"These are the ones that decide whether a purchase is a need or a story you're telling yourself.\"",
      ],
      terms: [
        {
          term: "Impulse buying",
          definition: "Making a purchase without planning or thinking it through.",
        },
        {
          term: "Essential Expenses",
          definition: "Costs for basic needs you must pay to live and work, such as housing, groceries, transportation, and utilities.",
        },
        {
          term: "Discretionary Expenses",
          definition: "Non-essential spending on things you want but don't need, such as eating out, entertainment, and shopping for clothes.",
        },
        {
          term: "Comparison Shopping",
          definition: "Looking at different stores or websites to find the best price and quality before buying something.",
        },
        {
          term: "Emergency Fund",
          definition: "Money set aside for unexpected expenses like medical bills, car repairs, or job loss.",
        },
        {
          term: "Smart Spending Habits",
          definition: "Strategies to maximize value from your money and make informed spending choices.",
        },
      ],
      source: SOURCES.smartSpending,
      xp: 20,
      next: "f1a3-comparison-quiz",
    },

    /* ---------------- 4b. comparison shopping ---------------- */
    "f1a3-comparison-quiz": {
      id: "f1a3-comparison-quiz",
      type: "quiz",
      title: "Knowledge check: checking before you buy",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"One of those terms is a habit rather than a definition,\" Nia says. \"It's the one that saves people the most money for the least effort.\"",
      ],
      question: "What is the purpose of comparison shopping?",
      options: [
        {
          label: "To buy the most expensive item",
          correct: false,
          feedback:
            "Price isn't a proxy for quality, and buying the most expensive option by default is closer to shopping for status than to smart spending.",
        },
        {
          label: "To find the best price and quality",
          correct: true,
          feedback:
            "Correct. Comparison shopping means looking at different stores or websites to find the best price and quality before buying something. Both halves matter: the cheapest option isn't a saving if it doesn't last.",
        },
        {
          label: "To shop at only one store",
          correct: false,
          feedback:
            "That's the opposite. Comparing means looking across different stores or websites, which is the only way to know whether one price is good.",
        },
        {
          label: "To avoid using coupons",
          correct: false,
          feedback:
            "Using coupons and promotions is on the list of good habits, so there's no reason to avoid them. Comparison shopping is about finding the best price and quality before you buy.",
        },
      ],
      source: SOURCES.smartSpending,
      xp: 25,
      next: "f1a3-emergency-quiz",
    },

    /* ---------------- 4c. the emergency fund ---------------- */
    "f1a3-emergency-quiz": {
      id: "f1a3-emergency-quiz",
      type: "quiz",
      title: "Knowledge check: the fund that isn't for spending",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"In 2020, 28% of adults reported having only a week's worth of financial cushion if they lost their main source of income,\" Nia says. \"This is the thing that fixes that.\"",
      ],
      question: "What is an emergency fund?",
      options: [
        {
          label: "Money for vacation expenses",
          correct: false,
          feedback:
            "A holiday is a planned want, so it belongs in the 30% slice. An emergency fund is for things you didn't plan and can't postpone.",
        },
        {
          label: "Money set aside for unexpected expenses",
          correct: true,
          feedback:
            "Correct. An emergency fund is money set aside for unexpected expenses like medical bills, car repairs, or job loss. It's what stops a surprise turning into credit card debt.",
        },
        {
          label: "Money for regular monthly bills",
          correct: false,
          feedback:
            "Regular bills are necessities and belong in the 50% slice of a normal month's budget. The emergency fund sits outside the monthly plan, untouched until something goes wrong.",
        },
        {
          label: "Money for entertainment",
          correct: false,
          feedback:
            "Entertainment is a want, funded from the 30%. An emergency fund covers unexpected costs like medical bills, car repairs, or losing your job.",
        },
      ],
      source: SOURCES.smartSpending,
      xp: 25,
      next: "f1a3-cases-terminal",
    },

    /* ---------------- 5. case files ---------------- */
    "f1a3-cases-terminal": {
      id: "f1a3-cases-terminal",
      type: "terminal",
      title: "LEDGER: case files",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "\"Income doesn't decide this,\" Nia says. \"Habits do. Pull the files and watch how little the size of the paycheque matters.\"",
      ],
      prompt: "Run the case file commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "good",
          cmd: "cases --list good",
          output: [
            "GOOD HABITS // 2 files",
            "  Warren Buffett",
            "    Still lives in the house he bought in 1958 for $31,500.",
            "    Eats simple meals instead of dining at fancy restaurants.",
            "    Invested conservatively, avoided unnecessary purchases.",
            "    Net worth: $116.9 billion.",
            "  Pete Adeney (FIRE movement)",
            "    Software engineer. Retired at 30.",
            "    Saved over 50% of his income, tracked spending, lived simply.",
            "    Focused on cutting recurring costs: housing, food, transport.",
          ],
          required: true,
        },
        {
          id: "bad",
          cmd: "cases --list bad",
          output: [
            "BAD HABITS // 2 files",
            "  Antoine Walker (NBA)",
            "    Earned over $108 million across his career.",
            "    Overspent on luxury cars, mansions, and entourages.",
            "    Bad real estate investments. No financial discipline or",
            "    long-term goals.",
            "    Filed for bankruptcy two years after retiring.",
            "  MC Hammer",
            "    Net worth $70 million at his peak in the 90s.",
            "    Staff of over 200 people. Mansions, cars, and horses.",
            "    Massive cash outflow, no budgeting.",
            "    Filed for bankruptcy in 1996.",
          ],
          required: true,
        },
        {
          id: "everyday",
          cmd: "cases --list everyday",
          output: [
            "THE ONE THAT ACTUALLY HAPPENS TO PEOPLE",
            "  College students and credit card debt",
            "    Offered credit cards without any financial education.",
            "    Overspend on food, clothes, and entertainment.",
            "    No spending plan, no tracking.",
            "    Rely on future income to pay the debt.",
            "    Result: thousands in debt before graduating.",
          ],
          required: true,
        },
      ],
      source: SOURCES.goodBadHabits,
      xp: 30,
      next: "f1a3-debt-reveal",
    },

    /* ---------------- 6. the national number ---------------- */
    "f1a3-debt-reveal": {
      id: "f1a3-debt-reveal",
      type: "reveal",
      title: "What that last file adds up to",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"The students aren't unusual, and that's the point,\" Nia says. \"Guess what Americans owed in credit card debt as of May 2025.\"",
      ],
      question: "How much did Americans owe in credit card debt as of May 2025?",
      options: ["$103 million", "$103 billion", "$1.03 trillion", "$10.3 trillion"],
      answerIndex: 2,
      value: "$1.03 trillion",
      caption: "Total US credit card debt owed as of May 2025.",
      explain:
        "Americans owe over $1.03 trillion in credit card debt as of May 2025, and in 2019, 60% of Americans had credit card debt at all. In 2020, 28% of adults reported having only a week's worth of financial cushion if they lost their main source of income. That last figure is what an emergency fund is for.",
      source: SOURCES.smartSpending,
      xp: 30,
      next: "f1a3-walker-quiz",
    },

    /* ---------------- 7. what income cannot fix ---------------- */
    "f1a3-walker-quiz": {
      id: "f1a3-walker-quiz",
      type: "quiz",
      title: "Knowledge check: what went wrong for Antoine Walker",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"$108 million,\" Marcus says. \"Bankrupt two years after he stopped playing. I want to know what the actual mistake was, because it clearly wasn't earning too little.\"",
      ],
      question: "What went wrong for Antoine Walker?",
      options: [
        {
          label: "He overspent, invested badly, and had no financial discipline or long-term goals.",
          correct: true,
          feedback:
            "Correct. He overspent on luxury cars, mansions, and entourages, made real estate investments that backfired, and had no financial discipline or long-term goals. Earning over $108 million didn't protect him from any of that.",
        },
        {
          label: "He didn't earn enough to build wealth.",
          correct: false,
          feedback:
            "He earned over $108 million. Warren Buffett and Pete Adeney show the same principle from the other direction: habits, not income, decided where all three ended up.",
        },
        {
          label: "He saved too much and missed his chance to invest.",
          correct: false,
          feedback:
            "The opposite. Instead of making smart purchases and investing to generate wealth, he overspent. Pete Adeney is the saver in these files, and he retired at 30.",
        },
        {
          label: "He had bad luck with one investment.",
          correct: false,
          feedback:
            "The real estate investments did backfire, but they sat on top of heavy overspending and an absence of long-term goals. A single bad investment rarely bankrupts someone with discipline elsewhere.",
        },
      ],
      source: SOURCES.walker,
      xp: 25,
      next: "f1a3-final-choice",
    },

    /* ---------------- 8. your own first month ---------------- */
    "f1a3-final-choice": {
      id: "f1a3-final-choice",
      type: "choice",
      title: "Your own first month",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 18:20",
      text: [
        "\"Paycheque lands Friday,\" Nia says. \"You've seen what works and what doesn't. What's the plan?\"",
      ],
      prompt: "Pick the plan that matches what this unit taught.",
      options: [
        {
          label: "Track everything for a month, pick a method that fits the real numbers, and start an emergency fund with the savings slice.",
          next: "f1a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Track first, choose the method that fits what you actually earn and spend, and give the savings slice a job. An emergency fund is what stops one unexpected bill turning into credit card debt.",
        },
        {
          label: "Set a strict budget with zero for wants, so more goes to savings.",
          next: "f1a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Every method here gives wants a real allocation: 30% in both 50/30/20 and 60/30/10, and a named purpose in a zero-based budget. A budget with no room in it is one people abandon in week three.",
        },
        {
          label: "Wait until you're earning more, then start budgeting properly.",
          next: "f1a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "Antoine Walker earned over $108 million and MC Hammer $70 million, and both went bankrupt. Even if you're just starting out with a small income, learning to budget now is what leads to long-term financial success.",
        },
      ],
      source: SOURCES.mustache,
    },

    /* ---------------- 9. ending ---------------- */
    "f1a3-ending": {
      id: "f1a3-ending",
      type: "ending",
      title: "Unit 1 complete",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 18:30",
      text: [
        "\"That's the whole thing,\" Nia says. \"Count what comes in, know what shape your expenses are, pick a method you'll stick to, and check on it.\"",
        "\"Budgeting lets you control your money instead of your money controlling you. It's not about spending less for the sake of it. It's about deciding where it goes before it's gone.\"",
        "Marcus is already writing out his September numbers again, properly this time. \"Come back next month,\" he says. \"Bring your statement.\"",
      ],
      xp: 20,
      badge: "fin-unit1-certified",
      next: null,
    },
  },
};

export default act3;
