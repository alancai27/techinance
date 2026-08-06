// @ts-check

/**
 * Financial Literacy, Unit 1, Act 1: "Where Your Money Actually Goes"
 *
 * Source material: "Budgeting Your Income" (Dax G. Gajera, Techinance
 * Technology Course Developer) and "Techinance Financial Literacy: Smart
 * Spending Habits". Both are transcribed in content/sources/.
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   25% of Americans say they don't have anyone to ask for financial guidance,
 *   $1,389 average reported loss in 2021 from a lack of personal finance knowledge.
 *   The fixed / variable / occasional expense examples are quoted verbatim.
 *
 * Scene ids are namespaced `f1a1-*`. The last scene hands off to `f1a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  smartSpending: {
    label: "Smart Spending Habits (Signal Financial FCU)",
    url: "https://www.signalfinancialfcu.com/2025/smart-spending-habits",
  },
  creatingBudget: {
    label: "Creating a Budget (Bank of America Better Money Habits)",
    url: "https://bettermoneyhabits.bankofamerica.com/en/saving-budgeting/creating-a-budget",
  },
  budgetTerms: {
    label: "10 Must-Know Terms for Budgeting (Skift Meetings)",
    url: "https://meetings.skift.com/2025/03/10/10-must-know-terms-for-budgeting/",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit1.js. This act
 * awards `cash-flow-reader`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "f1a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f1a1-start": {
      id: "f1a1-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 16:30",
      text: [
        "You've got a first paycheque coming and no idea what to do with it. Nia Barros runs the free financial coaching desk at Riverbend Credit Union, and she takes walk-ins.",
        "\"Most people your age don't get taught this, and they don't have anyone to ask either,\" she says. \"25% of Americans say they don't have anyone to ask for financial guidance. So you're not behind. You just haven't been shown yet.\"",
        "\"We'll start with the boring part, because the boring part is the part that works. Where your money actually goes.\"",
      ],
      source: SOURCES.smartSpending,
      xp: 10,
      next: "f1a1-guidance-reveal",
    },

    /* ---------------- 2. what not knowing costs ---------------- */
    "f1a1-guidance-reveal": {
      id: "f1a1-guidance-reveal",
      type: "reveal",
      title: "What not knowing this costs",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"People assume the cost of not understanding money is abstract,\" Nia says. \"It isn't. In 2021 Americans were asked to put a number on what a lack of personal finance knowledge had cost them that year. Guess the average.\"",
      ],
      question: "On average, how much did Americans report losing in 2021 because of a lack of personal finance knowledge?",
      options: ["$139", "$489", "$1,389", "$13,890"],
      answerIndex: 2,
      value: "$1,389",
      caption: "Average reported loss per person in 2021 from a lack of personal finance knowledge.",
      explain:
        "In 2021, Americans reported losing an average of $1,389 because of a lack of personal finance knowledge. That's money lost to fees, interest, and decisions made without the information to make them differently.",
      source: SOURCES.smartSpending,
      xp: 25,
      next: "f1a1-income-terminal",
    },

    /* ---------------- 3. what counts as income ---------------- */
    "f1a1-income-terminal": {
      id: "f1a1-income-terminal",
      type: "terminal",
      title: "LEDGER: income breakdown",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "Nia turns her screen around. \"LEDGER is the tool we use with members. Pull your income apart before you plan a single dollar of it.\"",
      ],
      prompt: "Run the income commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "sources",
          cmd: "income --list-sources",
          output: [
            "MONTHLY INCOME SOURCES // 3 categories",
            "  Paychecks from jobs",
            "  Allowances",
            "  Side gigs or freelance work",
            "",
            "  Total monthly income = the sum of all three.",
            "  Start here. You cannot plan money you have not counted.",
          ],
          required: true,
        },
        {
          id: "net",
          cmd: "income --explain net-vs-gross",
          output: [
            "GROSS INCOME",
            "  What you earn before anything is taken out.",
            "NET INCOME",
            "  What you take home after taxes.",
            "",
            "  Budget from NET income, not gross.",
            "  Budgeting from gross plans money that never arrives.",
          ],
          required: true,
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 25,
      next: "f1a1-net-quiz",
    },

    /* ---------------- 4. which number to budget from ---------------- */
    "f1a1-net-quiz": {
      id: "f1a1-net-quiz",
      type: "quiz",
      title: "Knowledge check: which number do you budget from?",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "Marcus Ellery is at the next desk. He's a year ahead of you and started this a year late.",
        "\"I built my whole first budget off the number on the job offer,\" he says. \"Ask me how that went.\"",
      ],
      question: "Which figure should you build a budget from?",
      options: [
        {
          label: "Net income, what you take home after taxes",
          correct: true,
          feedback:
            "Correct. Use your net income, not your gross income. Gross is what you earn before anything comes out, so a budget built on it is planning money that never reaches you.",
        },
        {
          label: "Gross income, what you earn before deductions",
          correct: false,
          feedback:
            "Gross income is what you earn before anything is taken out. Budget from net income, what you take home after taxes, or every category ends up short.",
        },
        {
          label: "Whichever is higher, so the budget has more room",
          correct: false,
          feedback:
            "The higher number is gross, and the extra room is imaginary. Net income is the money that actually arrives, so that's the one you plan against.",
        },
        {
          label: "Only your paycheque, ignoring allowances and side gigs",
          correct: false,
          feedback:
            "Total monthly income includes paychecks from jobs, allowances, and side gigs or freelance work. Leaving parts out understates what you have. The gross-versus-net question is separate: use net.",
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 25,
      next: "f1a1-expenses-sort",
    },

    /* ---------------- 5. three kinds of expense ---------------- */
    "f1a1-expenses-sort": {
      id: "f1a1-expenses-sort",
      type: "sort",
      title: "Sort the expenses",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Expenses come in three shapes, and people only ever plan for two,\" Nia says. \"Fixed costs stay the same. Variable costs move. Occasional costs show up a few times a year and wreck budgets that forgot about them.\"",
      ],
      prompt: "Drag each expense into the right column.",
      buckets: [
        { id: "fixed", label: "Fixed", hint: "Same amount every month" },
        { id: "variable", label: "Variable", hint: "Changes month to month" },
        { id: "occasional", label: "Occasional", hint: "A few times a year" },
      ],
      items: [
        {
          id: "rent",
          label: "Rent",
          bucket: "fixed",
          explain: "A fixed expense. It's the same figure every month, so you can plan it once and forget it.",
        },
        {
          id: "phone",
          label: "Phone bill",
          bucket: "fixed",
          explain: "A fixed expense. Same amount on the same date each month.",
        },
        {
          id: "groceries",
          label: "Groceries",
          bucket: "variable",
          explain: "A variable expense. The amount changes month to month, so budget an estimate and track the real figure.",
        },
        {
          id: "entertainment",
          label: "Entertainment",
          bucket: "variable",
          explain: "A variable expense. It moves with what you choose to do, which also makes it the easiest one to adjust.",
        },
        {
          id: "gifts",
          label: "Birthday gifts",
          bucket: "occasional",
          explain: "An occasional cost. It isn't monthly, so it gets left out of budgets and then shows up as a surprise.",
        },
        {
          id: "supplies",
          label: "School supplies",
          bucket: "occasional",
          explain: "An occasional or seasonal cost. Predictable if you look ahead, painful if you don't.",
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 35,
      next: "f1a1-occasional-quiz",
    },

    /* ---------------- 6. why occasional costs break budgets ---------------- */
    "f1a1-occasional-quiz": {
      id: "f1a1-occasional-quiz",
      type: "quiz",
      title: "Knowledge check: the costs people forget",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"A budget that only covers the monthly stuff looks fine for about eleven weeks,\" Nia says.",
      ],
      question: "Why do occasional and seasonal costs cause problems?",
      options: [
        {
          label: "They don't appear every month, so budgets leave them out and they arrive unplanned.",
          correct: true,
          feedback:
            "Correct. Birthday gifts and school supplies don't show up in a normal month, so they get left off the list. They're predictable if you look at the whole year rather than one month at a time.",
        },
        {
          label: "They're always larger than fixed costs.",
          correct: false,
          feedback:
            "Size isn't the issue. Rent is usually the biggest cost of all and it causes nobody any surprise, because it's the same every month and gets planned for.",
        },
        {
          label: "They can't be predicted at all.",
          correct: false,
          feedback:
            "Most of them can. Birthdays and the start of a school year are on the calendar. What makes them a problem is that a month-by-month budget never looks that far ahead.",
        },
        {
          label: "They're the same as variable costs.",
          correct: false,
          feedback:
            "Variable costs like groceries and entertainment happen every month at different amounts. Occasional costs don't happen most months at all, which is exactly why they get missed.",
        },
      ],
      source: SOURCES.creatingBudget,
      xp: 25,
      next: "f1a1-dossier",
    },

    /* ---------------- 7. dossier ---------------- */
    "f1a1-dossier": {
      id: "f1a1-dossier",
      type: "dossier",
      title: "Coaching card: the money words",
      speaker: "Nia Barros",
      avatar: "file-text",
      location: "Riverbend Credit Union",
      text: [
        "\"Take this,\" Nia says. \"Every one of these turns up in a bank app, a payslip, or a conversation with someone trying to sell you something.\"",
      ],
      terms: [
        {
          term: "Budgeting",
          definition: "Methods for managing income, differentiating between needs and wants, and creating a budget to ensure financial stability.",
        },
        {
          term: "Finances",
          definition: "All the money you earn, spend, save, and invest, including income, expenses, savings, debts, and investments.",
        },
        {
          term: "Cash Flow",
          definition: "The movement of money in and out of your finances. Positive cash flow means you're earning more than you spend; negative means the opposite.",
        },
        {
          term: "Surplus",
          definition: "What is left over after accounting for requirements, demand, or expenses.",
        },
        {
          term: "Deficit",
          definition: "The amount by which something is too small, especially a sum of money.",
        },
        {
          term: "Break-even point",
          definition: "Where total expenses and total revenue are equal. Not making or losing money.",
        },
        {
          term: "Gross Budget",
          definition: "Total revenue that is expected before expenses are deducted.",
        },
        {
          term: "Net Budget",
          definition: "Resulting money after expenses are deducted from revenue.",
        },
        {
          term: "Fixed Costs",
          definition: "Costs that are not dependent on headcount or some other variable, such as a room set-up fee or a flat rental fee.",
        },
        {
          term: "Variable Costs",
          definition: "Expenses that fluctuate based on headcount, such as catering.",
        },
      ],
      source: SOURCES.budgetTerms,
      xp: 20,
      next: "f1a1-cashflow-quiz",
    },

    /* ---------------- 8. reading cash flow ---------------- */
    "f1a1-cashflow-quiz": {
      id: "f1a1-cashflow-quiz",
      type: "quiz",
      title: "Knowledge check: reading your cash flow",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"This is the one number that tells you whether anything else you do matters,\" Marcus says. \"Say someone takes home $1,600 a month and spends $1,750.\"",
      ],
      question: "That person's cash flow is:",
      options: [
        {
          label: "Negative, because they're spending more than they earn",
          correct: true,
          feedback:
            "Correct. Cash flow is the movement of money in and out of your finances. Positive means you're earning more than you spend; negative means the opposite. Spending more than you earn is one of the habits to avoid, and it's the one every other bad habit feeds.",
        },
        {
          label: "Positive, because they still have money coming in",
          correct: false,
          feedback:
            "Money coming in isn't enough on its own. Positive cash flow means earning more than you spend. Here the spending is larger, so the flow is negative and the gap has to come from savings or debt.",
        },
        {
          label: "At break-even, because the two figures are close",
          correct: false,
          feedback:
            "Break-even is where total expenses and total revenue are equal, so you're neither making nor losing money. $1,600 against $1,750 isn't equal, it's a $150 monthly deficit.",
        },
        {
          label: "A surplus, because there's money left at the end",
          correct: false,
          feedback:
            "A surplus is what's left over after expenses. Here expenses are the larger figure, so there's nothing left over. That's a deficit, the amount by which something is too small.",
        },
      ],
      source: SOURCES.budgetTerms,
      xp: 25,
      badge: "cash-flow-reader",
      next: "f1a1-tracking-choice",
    },

    /* ---------------- 9. what to do first ---------------- */
    "f1a1-tracking-choice": {
      id: "f1a1-tracking-choice",
      type: "choice",
      title: "The first month",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"You've got your income figure and you know what shape your expenses come in,\" Nia says. \"First paycheque lands Friday. What do you do with month one?\"",
      ],
      prompt: "Pick what you'd actually do.",
      options: [
        {
          label: "Track every bit of income and spending for the month, then build the budget from what's really happening.",
          next: "f1a1-handoff",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Tracking both your income and expenses is what lets you work out where to prioritise your money. A budget built on guesses is a guess.",
        },
        {
          label: "Write the ideal budget now and make the month fit it.",
          next: "f1a1-handoff",
          xp: 5,
          tone: "bad",
          feedback:
            "An ideal budget written before you know your real spending is a wish list. Track first, then set the numbers against what actually happens, and adjust from there.",
        },
        {
          label: "Skip tracking. You already know roughly where your money goes.",
          next: "f1a1-handoff",
          xp: 5,
          tone: "bad",
          feedback:
            "Almost nobody does, and small expenses are the ones people miss. Not tracking small expenses is on the list of habits to avoid for exactly this reason.",
        },
      ],
      source: SOURCES.smartSpending,
    },

    /* ---------------- 10. handoff to act 2 ---------------- */
    "f1a1-handoff": {
      id: "f1a1-handoff",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:10",
      text: [
        "\"Good. You know what's coming in and what's going out,\" Nia says. \"That's the raw material.\"",
        "\"Next is what to do with it. There's more than one way to split an income, and the right one depends on what your month looks like.\"",
      ],
      xp: 15,
      next: "f1a2-start",
    },
  },
};

export default act1;
