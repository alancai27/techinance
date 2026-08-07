// @ts-check

/**
 * Financial Literacy, Unit 2, Act 2: "Debt Management Strategies: Snowball vs Avalanche"
 *
 * Source material: "Debt Management" (transcribed in
 * content/sources/finance-unit2-debt-management.md) and
 * "Techinance Financial Literacy Course Final Quiz" (finance-final-quiz.md).
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   $100 trillion projected total global public debt in 2025,
 *   Debt snowball: smallest balance first (psychological motivation),
 *   Debt avalanche: highest interest rate first (saves most money on interest),
 *   Debt consolidation: combines multiple debts into one loan/payment at lower interest.
 *
 * Scene ids are namespaced `f2a2-*`. The last scene hands off to `f2a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  debtManagement: {
    label: "What Is Debt Management? (Bankrate)",
    url: "https://www.bankrate.com/personal-finance/debt/what-is-debt-management/",
  },
  snowballVsAvalanche: {
    label: "Snowballs and Avalanches: 2 Popular Ways to Pay Off Debt (Take Charge America)",
    url: "https://www.takechargeamerica.org/snowballs-and-avalanches-2-popular-ways-to-pay-off-credit-card-debt/",
  },
  globalDebt: {
    label: "A World of Debt 2024 (UNCTAD)",
    url: "https://unctad.org/publication/world-of-debt",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit2.js.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "f2a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f2a2-start": {
      id: "f2a2-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 16:30",
      text: [
        "Nia pulls up a scenario board. \"Managing debt isn't just about paying bills: it's about having a deliberate strategy to eliminate balances while minimizing interest costs.\"",
        'Marcus looks at a sample list of debts: "If someone has three balances, say a $500 store card at 24%, a $2,500 car repair loan at 12%, and a $5,000 student loan at 6%, where do they start?"',
        '"That depends on their strategy," Nia explains. "There are two main paydown frameworks: the Debt Snowball and the Debt Avalanche. Both work, but they target different goals."',
      ],
      source: SOURCES.snowballVsAvalanche,
      xp: 10,
      badge: "avalanche-strategist",
      next: "f2a2-snowball-quiz",
    },

    /* ---------------- 2. snowball quiz (Final Quiz Q3) ---------------- */
    "f2a2-snowball-quiz": {
      id: "f2a2-snowball-quiz",
      type: "quiz",
      title: "Knowledge check: The Debt Snowball method",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"The first strategy is designed to build momentum by giving the borrower quick emotional wins," Nia says.',
      ],
      question: "Which debt repayment method focuses on paying smallest balances first?",
      options: [
        {
          label: "Debt avalanche method",
          correct: false,
          feedback:
            "The debt avalanche method focuses on highest interest rates first, not smallest balances.",
        },
        {
          label: "Debt snowball method",
          correct: true,
          feedback:
            "Correct. The debt snowball method focuses on paying off debts from smallest to largest balance first, regardless of interest rates, to build momentum.",
        },
        {
          label: "Debt consolidation method",
          correct: false,
          feedback:
            "Debt consolidation combines multiple debts into one loan rather than ordering individual balance payoffs.",
        },
        {
          label: "Minimum payment method",
          correct: false,
          feedback:
            "Paying only minimums prolongs debt and does not focus payoff on smallest balances.",
        },
      ],
      source: SOURCES.snowballVsAvalanche,
      xp: 25,
      next: "f2a2-global-reveal",
    },

    /* ---------------- 3. global public debt reveal ---------------- */
    "f2a2-global-reveal": {
      id: "f2a2-global-reveal",
      type: "reveal",
      title: "Global Public Debt Projection",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"To put debt in a global perspective," Nia notes, "international economic reports track government and public debt across all nations."',
        '"What is the estimated total global public debt projected for 2025?"',
      ],
      question: "What is the estimated total public debt across the world in 2025?",
      options: ["$10 trillion", "$25 trillion", "$50 trillion", "$100 trillion"],
      answerIndex: 3,
      value: "$100 trillion",
      caption: "Estimated total global public debt across all countries in 2025.",
      explain:
        "The United Nations (UNCTAD) and financial institutions project total global public debt to surpass $100 trillion in 2025. Unmanaged debt is a challenge for governments and individuals alike.",
      source: SOURCES.globalDebt,
      xp: 30,
      next: "f2a2-avalanche-quiz",
    },

    /* ---------------- 4. avalanche quiz (Final Quiz Q12) ---------------- */
    "f2a2-avalanche-quiz": {
      id: "f2a2-avalanche-quiz",
      type: "quiz",
      title: "Knowledge check: The Debt Avalanche method",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"Now let\'s look at the mathematically optimal strategy," Nia continues. "The debt avalanche method targets high-interest debt first."',
      ],
      question: "Which method saves the most money on interest payments?",
      options: [
        {
          label: "Debt snowball method",
          correct: false,
          feedback:
            "The snowball method prioritizes small balances and can cost more total interest over time.",
        },
        {
          label: "Debt avalanche method",
          correct: true,
          feedback:
            "Correct. The debt avalanche method targets highest-interest debt first, which saves the most money on interest and results in the fastest mathematical payoff.",
        },
        {
          label: "Making only minimum payments",
          correct: false,
          feedback:
            "Making minimum payments maximizes interest charges and extends debt duration.",
        },
        {
          label: "Debt consolidation always",
          correct: false,
          feedback:
            "While consolidation lowers rates, avalanche is the specific paydown method that mathematically minimizes interest.",
        },
      ],
      source: SOURCES.snowballVsAvalanche,
      xp: 25,
      next: "f2a2-payoff-terminal",
    },

    /* ---------------- 5. terminal simulation ---------------- */
    "f2a2-payoff-terminal": {
      id: "f2a2-payoff-terminal",
      type: "terminal",
      title: "LEDGER: paydown strategy simulator",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        'Nia opens the LEDGER simulator. "Test the payoff algorithms on Marcus\'s sample portfolio ($500 card at 24%, $2,500 auto repair at 12%, $5,000 student loan at 6%)."',
      ],
      prompt: "Execute the strategy comparison commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "snowball",
          cmd: "payoff --strategy snowball",
          output: [
            "DEBT SNOWBALL SIMULATION",
            "  Payoff Order: 1. $500 Store Card (Smallest) -> 2. $2,500 Auto Loan -> 3. $5,000 Student Loan",
            "  First Balance Zero: 3 months (quick win)",
            "  Total Time        : 22 months",
            "  Total Interest    : $1,120",
          ],
          required: true,
        },
        {
          id: "avalanche",
          cmd: "payoff --strategy avalanche",
          output: [
            "DEBT AVALANCHE SIMULATION",
            "  Payoff Order: 1. $500 Store Card (24% APR) -> 2. $2,500 Auto Loan (12%) -> 3. $5,000 Student Loan (6%)",
            "  First Balance Zero: 3 months (same here, 24% is also the smallest)",
            "  Total Time        : 20 months",
            "  Total Interest    : $890 (saves $230 in interest)",
          ],
          required: true,
        },
        {
          id: "consolidation",
          cmd: "payoff --strategy consolidation",
          output: [
            "DEBT CONSOLIDATION PLAN",
            "  Combined Debt: $8,000 into single loan at 8.5% fixed APR",
            "  Single Monthly Payment: $364",
            "  Note: Restructures debt into one payment; requires discipline to avoid new card debt.",
          ],
          required: false,
        },
      ],
      source: SOURCES.debtManagement,
      xp: 30,
      next: "f2a2-strategy-choice",
    },

    /* ---------------- 6. strategy choice ---------------- */
    "f2a2-strategy-choice": {
      id: "f2a2-strategy-choice",
      type: "choice",
      title: "Selecting the right debt management plan",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        'Marcus reviews the LEDGER comparison. "So snowball gives quick motivation, avalanche saves the most money, and consolidation simplifies multiple bills into one."',
        '"If a member has trouble staying motivated and needs to see accounts close quickly, which method do you recommend?"',
      ],
      prompt: "Select the best advice for a motivation-focused borrower:",
      options: [
        {
          label: "Recommend the Debt Avalanche method because math always comes first.",
          next: "f2a2-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "While avalanche saves the most interest, a borrower who quits before seeing progress gets no benefit. Snowball provides the early wins needed for motivation.",
        },
        {
          label:
            "Recommend the Debt Snowball method to eliminate small balances first and build psychological momentum.",
          next: "f2a2-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. For borrowers who need psychological encouragement to stay committed, paying off smallest balances first creates rapid momentum that keeps them on track.",
        },
        {
          label: "Recommend paying only the minimum balance on all debts indefinitely.",
          next: "f2a2-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Paying only minimums prolongs debt for years and maximizes total interest paid.",
        },
      ],
      source: SOURCES.debtManagement,
    },

    /* ---------------- 7. dossier ---------------- */
    "f2a2-dossier": {
      id: "f2a2-dossier",
      type: "dossier",
      title: "Analyst dossier: Debt management frameworks",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Nia hands Marcus a reference summary of key debt management terms.',
      ],
      terms: [
        {
          term: "Debt Management",
          definition:
            "Applying structured strategies to pay down balances while minimizing interest costs and avoiding missed payments.",
        },
        {
          term: "Debt-Free",
          definition:
            "The state of having zero debt obligations.",
        },
        {
          term: "Debt Snowball Method",
          definition:
            "Focuses on paying off debts from smallest to largest balance first, regardless of interest rate, to build psychological momentum.",
        },
        {
          term: "Debt Avalanche Method",
          definition:
            "Focuses on paying off debts with the highest interest rates first, saving the most money on interest and yielding the fastest mathematical payoff.",
        },
        {
          term: "Highest-Interest Debt",
          definition:
            "The debt balance charging the highest annual percentage rate (APR) or monthly interest rate.",
        },
        {
          term: "Debt Consolidation Plans",
          definition:
            "Combining multiple existing debts into a single new loan or payment, often with a lower interest rate, to simplify repayment.",
        },
        {
          term: "Collateral",
          definition:
            "An asset (such as a house or car) pledged by a borrower to secure a loan, which the lender may seize if the loan defaults.",
        },
      ],
      xp: 20,
      next: "f2a2-sort",
    },

    /* ---------------- 8. sort strategy priorities ---------------- */
    "f2a2-sort": {
      id: "f2a2-sort",
      type: "sort",
      title: "Match borrower profiles to payoff strategies",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Nia presents three borrower profiles. "Match each financial goal to the strategy that serves it best."',
      ],
      prompt: "Drag each goal to Debt Snowball, Debt Avalanche, or Debt Consolidation.",
      buckets: [
        {
          id: "snowball_b",
          label: "Debt Snowball Method",
          hint: "Smallest balance first for quick wins and motivation",
        },
        {
          id: "avalanche_b",
          label: "Debt Avalanche Method",
          hint: "Highest interest rate first to minimize total interest",
        },
        {
          id: "consolidation_b",
          label: "Debt Consolidation Plan",
          hint: "Combine multiple debts into one lower-rate payment",
        },
      ],
      items: [
        {
          id: "quick_wins",
          label: "Borrower needs quick psychological wins by clearing small accounts",
          bucket: "snowball_b",
          explain:
            "Debt Snowball: Knocking out smallest balances first builds early momentum.",
        },
        {
          id: "max_savings",
          label: "Borrower wants to save the absolute most money on total interest",
          bucket: "avalanche_b",
          explain:
            "Debt Avalanche: Targeting high-interest rates first minimizes total interest paid.",
        },
        {
          id: "simplify_bills",
          label: "Borrower has 5 separate bills and wants one simplified monthly payment",
          bucket: "consolidation_b",
          explain:
            "Debt Consolidation: Bundling accounts into one payment simplifies monthly management.",
        },
        {
          id: "high_apr_target",
          label: "Borrower prioritizes clearing a 28% APR credit card balance first",
          bucket: "avalanche_b",
          explain:
            "Debt Avalanche: Directly attacks the highest APR debt to stop interest compounding.",
        },
      ],
      source: SOURCES.debtManagement,
      xp: 35,
      next: "f2a2-handoff",
    },

    /* ---------------- 9. handoff to act 3 ---------------- */
    "f2a2-handoff": {
      id: "f2a2-handoff",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:15",
      text: [
        'Nia signs off on your strategy analysis. "You\'ve mastered the snowball, avalanche, and consolidation frameworks."',
        '"In Act 3, we look at long-term credit health, avoiding debt cycles, and completing Unit 2 certification."',
      ],
      xp: 15,
      next: "f2a3-start",
    },
  },
};

export default act2;
