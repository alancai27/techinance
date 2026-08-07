// @ts-check

/**
 * Financial Literacy, Unit 1, Act 2: "Choosing a Budgeting Method"
 *
 * Source material: "Budgeting Your Income" (Dax G. Gajera, Techinance
 * Technology Course Developer) and "Techinance Financial Literacy: Smart
 * Spending Habits". Both are transcribed in content/sources/.
 *
 * The three methods, their splits, and the app names are quoted verbatim and
 * must stay exact:
 *   50/30/20 (necessities / wants / savings, debt repayment and investments),
 *   60/30/10 for people with higher costs such as housing or childcare,
 *   zero-based (income minus expenses equals zero),
 *   envelope (cash per category, empty envelope means no more spending),
 *   Mint, YNAB, PocketGuard, Quickbooks, Freshbooks, Quicken, Rocket Money.
 *
 * Scene ids are namespaced `f1a2-*`. The last scene hands off to `f1a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  creatingBudget: {
    label: "Creating a Budget (Bank of America Better Money Habits)",
    url: "https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/creating-a-budget",
  },
  howToBudget: {
    label: "How to Make a Budget (Ramsey Solutions)",
    url: "https://www.ramseysolutions.com/budgeting/how-to-make-a-budget",
  },
  smartSpending: {
    label: "Smart Spending Habits (Signal Financial FCU)",
    url: "https://www.signalfinancialfcu.com/2025/smart-spending-habits",
  },
  budgetApps: {
    label: "Best Budgeting Apps (Money)",
    url: "https://money.com/lp/best-budgeting-apps/lp/best-budgeting-apps",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit1.js. This act
 * awards `budget-builder`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "f1a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f1a2-start": {
      id: "f1a2-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:15",
      text: [
        "\"There's no single correct budget,\" Nia says. \"There are a few methods that work, and they suit different situations. Picking one you'll actually stick to beats picking the one that looks most disciplined.\"",
        "\"I'll show you three. Then you're going to choose one for somebody whose numbers you've seen.\"",
      ],
      source: SOURCES.creatingBudget,
      xp: 10,
      next: "f1a2-methods-terminal",
    },

    /* ---------------- 2. the three methods ---------------- */
    "f1a2-methods-terminal": {
      id: "f1a2-methods-terminal",
      type: "terminal",
      title: "LEDGER: budgeting methods",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "\"Pull all three before you decide,\" Nia says. \"They're not ranked. They're different tools.\"",
      ],
      prompt: "Run the method commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "fifty",
          cmd: "method --info 50-30-20",
          output: [
            "50/30/20 RULE // typical budgeting strategy",
            "  50% goes to necessities   (rent, food, transport)",
            "  30% goes to what you want (entertainment, eating out, hobbies)",
            "  20% goes to savings, debt repayment, and investments",
            "",
            "  Simple to start. Works when necessities fit inside half your income.",
          ],
          required: true,
        },
        {
          id: "zero",
          cmd: "method --info zero-based",
          output: [
            "ZERO-BASED BUDGET",
            "  Every dollar of income is assigned a purpose (needs, wants,",
            "  savings) so your income minus your expenses equals zero.",
            "",
            "  Zero left over does not mean zero saved. Savings is one of the",
            "  purposes a dollar can be assigned to.",
            "  Good for people who want full control and visibility over their spending.",
          ],
          required: true,
        },
        {
          id: "envelope",
          cmd: "method --info envelope",
          output: [
            "ENVELOPE SYSTEM",
            "  Use cash and divide it into envelopes for different categories.",
            "    groceries     : $100",
            "    entertainment :  $50",
            "",
            "  Once an envelope is empty, no more spending in that category",
            "  until the next month.",
          ],
          required: true,
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 30,
      next: "f1a2-503020-quiz",
    },

    /* ---------------- 3. what the 20% is for ---------------- */
    "f1a2-503020-quiz": {
      id: "f1a2-503020-quiz",
      type: "quiz",
      title: "Knowledge check: the 50/30/20 split",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"People remember the 50 and the 30,\" Nia says. \"The 20 is the part that decides whether you're building anything.\"",
      ],
      question: "What is the 50/30/20 budgeting rule?",
      options: [
        {
          label: "50% wants, 30% needs, 20% savings",
          correct: false,
          feedback:
            "The first two are swapped. Necessities take the larger slice at 50%, because rent, food and transport are the costs you can't skip. Wants get 30%.",
        },
        {
          label: "50% needs, 30% wants, 20% savings",
          correct: true,
          feedback:
            "Correct. 50% to necessities like rent, food and transport, 30% to what you want, and 20% to savings, debt repayment, and investments. That last slice is the only one that changes your position rather than just funding your month.",
        },
        {
          label: "50% savings, 30% needs, 20% wants",
          correct: false,
          feedback:
            "Saving half your income is more than the rule asks and more than most people can manage. Savings, debt repayment and investments share the 20%, and necessities take the 50%.",
        },
        {
          label: "50% needs, 30% savings, 20% wants",
          correct: false,
          feedback:
            "The 50% for necessities is right, but the other two are swapped. Wants get 30% and savings get 20%. Giving wants a real allocation is part of why the rule survives contact with a real month.",
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 25,
      next: "f1a2-allocate-sort",
    },

    /* ---------------- 4. run the split ---------------- */
    "f1a2-allocate-sort": {
      id: "f1a2-allocate-sort",
      type: "sort",
      title: "Split one month of spending",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "Marcus slides over a list. \"This is my actual month. Put every line in the right slice of 50/30/20.\"",
      ],
      prompt: "Drag each line into the slice it belongs to.",
      buckets: [
        { id: "needs", label: "Necessities (50%)", hint: "Rent, food, transport" },
        { id: "wants", label: "Wants (30%)", hint: "Entertainment, eating out, hobbies" },
        { id: "future", label: "Savings and debt (20%)", hint: "Savings, debt repayment, investments" },
      ],
      items: [
        {
          id: "rent",
          label: "Rent",
          bucket: "needs",
          explain: "A necessity. Rent is named directly in the 50% slice, and it's usually the largest single line in it.",
        },
        {
          id: "food",
          label: "Food shopping",
          bucket: "needs",
          explain: "A necessity. Food is in the 50% slice. Eating out is not, which is the distinction that catches people.",
        },
        {
          id: "transport",
          label: "Transport to work",
          bucket: "needs",
          explain: "A necessity. Transport sits in the 50% alongside rent and food.",
        },
        {
          id: "eatingout",
          label: "Eating out",
          bucket: "wants",
          explain: "A want. Eating out is listed in the 30% slice even though food shopping is a necessity. Same category of thing, different job.",
        },
        {
          id: "streaming",
          label: "Entertainment",
          bucket: "wants",
          explain: "A want. Entertainment is named in the 30% slice.",
        },
        {
          id: "hobby",
          label: "Hobbies",
          bucket: "wants",
          explain: "A want. Hobbies are in the 30%, and having a real allocation for them is what stops the budget collapsing.",
        },
        {
          id: "savings",
          label: "Money into savings",
          bucket: "future",
          explain: "Part of the 20%, which covers savings, debt repayment, and investments.",
        },
        {
          id: "debt",
          label: "Debt repayment",
          bucket: "future",
          explain: "Part of the 20%. Paying down debt and saving both improve your position, so they share a slice.",
        },
        {
          id: "invest",
          label: "Investments",
          bucket: "future",
          explain: "Part of the 20%, named alongside savings and debt repayment.",
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 35,
      badge: "budget-builder",
      next: "f1a2-603010-reveal",
    },

    /* ---------------- 5. when 50/30/20 doesn't fit ---------------- */
    "f1a2-603010-reveal": {
      id: "f1a2-603010-reveal",
      type: "reveal",
      title: "When necessities won't fit in half",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Half of the members I see can't fit their necessities into 50%,\" Nia says. \"Housing costs what it costs. There's a second version of the rule for that. Guess what the necessities share becomes.\"",
      ],
      question: "In the variant for people with higher costs such as housing or childcare, what share goes to necessities?",
      options: ["55%", "60%", "70%", "80%"],
      answerIndex: 1,
      value: "60%",
      caption: "The 60/30/10 rule: 60% necessities, 30% wants, 10% savings or debt repayment.",
      explain:
        "The 60/30/10 rule is for those with higher costs, such as housing or childcare. Necessities take 60%, wants stay at 30%, and savings or debt repayment drops to 10%. The wants slice holds steady and the savings slice absorbs the difference, which is worth knowing before you assume you're failing at 50/30/20.",
      source: SOURCES.smartSpending,
      xp: 25,
      next: "f1a2-method-choice",
    },

    /* ---------------- 6. match the method to the person ---------------- */
    "f1a2-method-choice": {
      id: "f1a2-method-choice",
      type: "choice",
      title: "Pick a method for Marcus",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"Here's my problem,\" Marcus says. \"I know my totals. I have no idea where the money goes inside them. Every month there's a couple of hundred I genuinely cannot account for.\"",
        "\"I want to see every dollar. Which one am I using?\"",
      ],
      prompt: "Pick the method that fits what he's asking for.",
      options: [
        {
          label: "Zero-based, so every dollar gets assigned a purpose and nothing is unaccounted for.",
          next: "f1a2-tools-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. A zero-based budget assigns every dollar of income a purpose so income minus expenses equals zero, and it's specifically good for people who want full control and visibility over their spending. That's exactly the gap he described.",
        },
        {
          label: "The envelope system, because cash is stricter than any app.",
          next: "f1a2-tools-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "The envelope system does enforce limits well, since an empty envelope means no more spending in that category until next month. But it caps categories rather than explaining where money went. Marcus asked to see every dollar, which is the zero-based answer.",
        },
        {
          label: "50/30/20, because it's the standard and standards exist for a reason.",
          next: "f1a2-tools-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "50/30/20 sets three targets and stops there. It would tell Marcus whether his wants slice is too big, but not which purchases inside it he can't account for. Zero-based is the one built for visibility.",
        },
      ],
      source: SOURCES.creatingBudget,
    },

    /* ---------------- 7. tools ---------------- */
    "f1a2-tools-dossier": {
      id: "f1a2-tools-dossier",
      type: "dossier",
      title: "Coaching card: tools that do the tracking",
      speaker: "Nia Barros",
      avatar: "wallet",
      location: "Riverbend Credit Union",
      text: [
        "\"You can do all of this on paper, and some people prefer to,\" Nia says. \"These do the sorting for you.\"",
      ],
      terms: [
        {
          term: "Mint",
          definition: "A tool for tracking expenses and income.",
        },
        {
          term: "YNAB (You Need A Budget)",
          definition: "A tool for tracking expenses and income.",
        },
        {
          term: "PocketGuard",
          definition: "A tool for tracking expenses and income.",
        },
        {
          term: "Quickbooks",
          definition: "A tool for tracking expenses and income.",
        },
        {
          term: "Freshbooks",
          definition: "A tool for tracking expenses and income.",
        },
        {
          term: "Quicken and Rocket Money",
          definition: "Money management apps that categorise your expenses for you automatically, sorting and tracking spending and giving you an overview of your spending patterns.",
        },
      ],
      source: SOURCES.budgetApps,
      xp: 20,
      next: "f1a2-zero-quiz",
    },

    /* ---------------- 8. what zero means ---------------- */
    "f1a2-zero-quiz": {
      id: "f1a2-zero-quiz",
      type: "quiz",
      title: "Knowledge check: what the zero means",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"This one gets misread constantly,\" Nia says. \"People hear zero-based and assume it means spend everything.\"",
      ],
      question: "In a zero-based budget, what does it mean for income minus expenses to equal zero?",
      options: [
        {
          label: "Every dollar has been assigned a purpose, including savings.",
          correct: true,
          feedback:
            "Correct. Every dollar of income is assigned a purpose across needs, wants, and savings, so nothing is left unlabelled. Money assigned to savings still counts as assigned.",
        },
        {
          label: "You've spent your entire income and have nothing saved.",
          correct: false,
          feedback:
            "Savings is one of the purposes a dollar gets assigned to, alongside needs and wants. Reaching zero means nothing is unallocated, not that nothing is saved.",
        },
        {
          label: "Your bank balance is zero at the end of the month.",
          correct: false,
          feedback:
            "The zero is in the plan, not the account. It means income minus assigned expenses balances, and the money assigned to savings is still sitting there.",
        },
        {
          label: "You broke even, so you made and lost nothing.",
          correct: false,
          feedback:
            "Break-even is a different idea: total expenses and total revenue being equal, so you're neither making nor losing money. A zero-based budget is a planning method, and it can run a healthy surplus into savings.",
        },
      ],
      source: SOURCES.howToBudget,
      xp: 25,
      next: "f1a2-envelope-quiz",
    },

    /* ---------------- 9. the envelope rule ---------------- */
    "f1a2-envelope-quiz": {
      id: "f1a2-envelope-quiz",
      type: "quiz",
      title: "Knowledge check: the empty envelope",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"Say you're running envelopes,\" Marcus says. \"Groceries got $100. It's the 22nd and the grocery envelope is empty.\"",
      ],
      question: "Under the envelope system, what happens next?",
      options: [
        {
          label: "No more spending in that category until the next month.",
          correct: true,
          feedback:
            "Correct. Once an envelope is empty, no more spending in that category until the next month. The limit is the point of the method, and it's why people use cash for it.",
        },
        {
          label: "You move money over from the entertainment envelope.",
          correct: false,
          feedback:
            "That turns the envelopes back into one pot and removes the limit that makes the method work. The rule is that an empty envelope closes that category until next month.",
        },
        {
          label: "You put the rest of the month's groceries on a credit card.",
          correct: false,
          feedback:
            "That's the outcome the system exists to prevent, and overusing credit cards is one of the listed habits to avoid. An empty envelope means the category is closed until next month.",
        },
        {
          label: "You top the envelope up from savings, since groceries are a necessity.",
          correct: false,
          feedback:
            "Reaching for savings makes the shortfall invisible and it recurs. The method's answer is to stop spending in that category, then set a more realistic amount for that envelope next month.",
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 25,
      next: "f1a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "f1a2-handoff": {
      id: "f1a2-handoff",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:50",
      text: [
        "\"Two things left,\" Nia says. \"Set goals you can actually reach, split into short-term and long-term, and line the budget up behind them each month. Then review your spending at the end of each week or month to see how well you followed it.\"",
        "\"That last part is where most budgets die. Not because the plan was wrong, because nobody looked at it again.\"",
        "\"Which brings us to habits.\"",
      ],
      source: SOURCES.creatingBudget,
      xp: 15,
      next: "f1a3-start",
    },
  },
};

export default act2;
