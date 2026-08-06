// @ts-check

/**
 * Financial Literacy, Unit 2, Act 3: "Staying Debt-Free and Avoiding Debt Cycles"
 *
 * Source material: "Different Types of Debt" and "Debt Management", transcribed in
 * content/sources/finance-unit2-*.md, and finance-final-quiz.md.
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   $94 billion increase in U.S. personal loan debt over 5 years,
 *   Credit scores range from 300 to 850,
 *   Debt cycle: continuously borrowing and paying only minimums.
 *
 * Scene ids are namespaced `f2a3-*`. This act closes the episode: `f2a3-end` is the
 * ending scene in Unit 2, and its `next` is null.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  debtCycle: {
    label: "Understanding Debt Cycles (InCharge Debt Solutions)",
    url: "https://www.incharge.org/understanding-debt/types-of-debt/",
  },
  creditScores: {
    label: "How Credit Scores Work (Experian)",
    url: "https://www.experian.com/blogs/ask-experian/research/consumer-debt-study/",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit2.js.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "f2a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f2a3-start": {
      id: "f2a3-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:30",
      text: [
        "Nia brings up the final section of the coaching module.",
        '"Understanding loan structures and paydown methods is vital," she says, "but the ultimate goal of debt management is reaching and staying debt-free."',
        'Marcus reviews his notes: "So debt isn\'t inherently evil—it can buy a house or finance education—but if it\'s unmanaged, it creates a debt cycle that lasts for years."',
        '"Exactly," Nia nods. "Let\'s look at credit scores, statement auditing, and how to keep debt as a temporary tool rather than a permanent burden."',
      ],
      source: SOURCES.debtCycle,
      xp: 10,
      next: "f2a3-growth-reveal",
    },

    /* ---------------- 2. 5-year debt growth reveal ---------------- */
    "f2a3-growth-reveal": {
      id: "f2a3-growth-reveal",
      type: "reveal",
      title: "5-Year Personal Loan Debt Expansion",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"To show how fast consumer debt grows when unmanaged," Nia says, "look at American personal loan data over the past 5 years."',
        '"By how much did total U.S. personal loan debt increase over the 5-year period leading to 2025?"',
      ],
      question: "By how much did U.S. personal loan debt increase over the past 5 years?",
      options: ["$12 billion", "$45 billion", "$94 billion", "$180 billion"],
      answerIndex: 2,
      value: "$94 billion",
      caption: "Total 5-year increase in American personal loan debt leading to 2025.",
      explain:
        "American personal loan debt grew by $94 billion over 5 years, reaching $253 billion in 2025 across 24.6 million borrowers. Unchecked borrowing can expand rapidly across an economy.",
      source: SOURCES.creditScores,
      xp: 30,
      next: "f2a3-audit-inspect",
    },

    /* ---------------- 3. statement inspection ---------------- */
    "f2a3-audit-inspect": {
      id: "f2a3-audit-inspect",
      type: "inspect",
      title: "Statement Audit: Credit Card & Loan Warnings",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "LEDGER loads a sample monthly credit statement.",
        "Inspect the statement line items to spot high interest rates, debt cycle traps, and credit score indicators.",
      ],
      prompt: "Tap the items that indicate financial risk or key credit metrics. Find at least 4.",
      artifact: {
        kind: "log",
        fields: [
          {
            label: "Account",
            value: "Revolving Rewards Visa · Balance $4,200",
            hot: "account",
          },
          {
            label: "Credit Limit",
            value: "$5,000 (84% utilization rate)",
            hot: "limit",
          },
          {
            label: "Minimum Due",
            value: "$84.00 (Due in 15 days)",
            hot: "min_due",
          },
          {
            label: "Credit Score",
            value: "710 (Scale: 300 to 850)",
            hot: "score_label",
          },
        ],
        body: [
          "05/01  STATEMENT BALANCE: $4,200.00",
          {
            hot: "apr",
            text: "ANNUAL PERCENTAGE RATE (APR): 26.99% Variable Interest (High interest risk!)",
          },
          {
            hot: "minimum_trap",
            text: "MINIMUM PAYMENT WARNING: Paying only $84/mo takes 18 years and adds $5,400 in total interest",
          },
          {
            hot: "score",
            text: "CREDIT SCORE IMPACT: Credit score ranges 300 to 850. High balance utilization (>30%) lowers score",
          },
          {
            hot: "collateral_note",
            text: "ACCOUNT TYPE: Unsecured revolving credit (No physical collateral required, relies on credit score)",
          },
          "05/10  PAYMENT RECEIVED: $84.00 (Minimum payment processed)",
          {
            hot: "debt_cycle",
            text: "NEW INTEREST CHARGE: +$94.46 added to balance (Interest exceeds minimum payment -> Debt Cycle!)",
          },
        ],
      },
      hotspots: {
        account: {
          suspicious: false,
          explain: "Header label for account balance.",
        },
        limit: {
          suspicious: false,
          explain: "Header label for credit limit.",
        },
        min_due: {
          suspicious: false,
          explain: "Header label for minimum payment due date.",
        },
        score_label: {
          suspicious: false,
          explain: "Metadata label for credit score scale.",
        },
        apr: {
          suspicious: true,
          explain:
            "A 26.99% APR is a high interest rate typical of revolving credit card debt, which rapidly compounds if unpaid.",
        },
        minimum_trap: {
          suspicious: true,
          explain:
            "Paying only minimum payments on high-interest credit card debt extends repayment over decades and dramatically increases interest paid.",
        },
        score: {
          suspicious: true,
          explain:
            "Credit scores range from 300 to 850. Carrying high balances above 30% of your credit limit damages your credit score.",
        },
        collateral_note: {
          suspicious: true,
          explain:
            "Unsecured debt relies on your credit score (300-850) rather than physical collateral, but high APR makes it volatile.",
        },
        debt_cycle: {
          suspicious: true,
          explain:
            "When interest added ($94.46) exceeds the minimum payment ($84.00), the balance increases despite paying every month—the hallmark of a debt cycle.",
        },
      },
      requiredFinds: 4,
      source: SOURCES.debtCycle,
      xp: 40,
      next: "f2a3-cycle-choice",
    },

    /* ---------------- 4. cycle choice ---------------- */
    "f2a3-cycle-choice": {
      id: "f2a3-cycle-choice",
      type: "choice",
      title: "Breaking out of a debt cycle",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Marcus looks at the warning line where interest exceeds the minimum payment. "That\'s a trap. If someone is stuck paying minimums while interest grows, what is the best corrective action?"',
      ],
      prompt: "Select the recommended action to break out of a debt cycle:",
      options: [
        {
          label: "Open three new credit cards to pay off the minimum payment on the first card.",
          next: "f2a3-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Incorrect. Borrowing new high-interest debt to pay old debt expands the debt cycle and leads to severe financial distress.",
        },
        {
          label:
            "Stop new credit spending, pay more than the minimum using a paydown method (avalanche or snowball), or explore debt consolidation.",
          next: "f2a3-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct! Halting new card spending, allocating extra funds above the minimum toward principal, and using structured paydown methods stops interest compounding and breaks the debt cycle.",
        },
        {
          label: "Ignore the monthly statements and wait for the debt to clear on its own.",
          next: "f2a3-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Incorrect. Ignoring debt damages your credit score, triggers late fees, and can result in collections or legal action.",
        },
      ],
      source: SOURCES.debtCycle,
    },

    /* ---------------- 5. dossier ---------------- */
    "f2a3-dossier": {
      id: "f2a3-dossier",
      type: "dossier",
      title: "Analyst dossier: Long-term credit health & debt prevention",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Nia hands Marcus and you the final reference card for Unit 2.',
      ],
      terms: [
        {
          term: "Credit Score",
          definition:
            "A numerical score ranging from 300 to 850 that evaluates an individual's creditworthiness and borrowing history.",
        },
        {
          term: "Debt Cycle",
          definition:
            "A situation where continuous borrowing and minimum payments cause interest to accumulate faster than debt is repaid.",
        },
        {
          term: "Economic Downturn",
          definition:
            "A period of economic decline (such as a recession or job loss wave) that increases default risks on high debt loads.",
        },
        {
          term: "Minimum Payment",
          definition:
            "The smallest dollar amount a borrower must pay monthly to keep a credit account in good standing, often barely covering interest.",
        },
        {
          term: "Debt-Free",
          definition:
            "Having zero debt balances, freeing monthly income for savings and wealth-building investments.",
        },
      ],
      xp: 25,
      next: "f2a3-sort-habits",
    },

    /* ---------------- 6. sort habits ---------------- */
    "f2a3-sort-habits": {
      id: "f2a3-sort-habits",
      type: "sort",
      title: "Sort financial behaviors: Healthy Credit vs Debt Traps",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Nia sets up the habits evaluation board. "Sort these six financial habits into Healthy Credit Management or Debt Cycle Traps."',
      ],
      prompt: "Drag each habit into Healthy Credit Management or Debt Cycle Traps.",
      buckets: [
        {
          id: "healthy",
          label: "Healthy Credit Management",
          hint: "Keeps debt manageable, builds credit score, and minimizes interest",
        },
        {
          id: "trap",
          label: "Debt Cycle Traps",
          hint: "Compounds interest, lowers credit score, and prolongs debt",
        },
      ],
      items: [
        {
          id: "full_pay",
          label: "Paying credit card statements in full every month before interest accrues",
          bucket: "healthy",
          explain:
            "Healthy habit: Eliminates interest charges completely while building credit history.",
        },
        {
          id: "utilization",
          label: "Keeping total credit utilization below 30% of credit limits",
          bucket: "healthy",
          explain:
            "Healthy habit: Protects and improves your credit score (300-850 range).",
        },
        {
          id: "emergency_res",
          label: "Maintaining an emergency fund so unexpected costs do not require loans",
          bucket: "healthy",
          explain:
            "Healthy habit: Prevents needing high-interest debt when unexpected expenses arise.",
        },
        {
          id: "min_only",
          label: "Paying only the minimum balance while continuing to charge new purchases",
          bucket: "trap",
          explain:
            "Debt trap: Causes interest to compound rapidly, trapping the borrower in debt.",
        },
        {
          id: "max_cards",
          label: "Maxing out credit limits across multiple cards simultaneously",
          bucket: "trap",
          explain:
            "Debt trap: Harms credit score and creates high monthly interest obligations.",
        },
        {
          id: "ignore_apr",
          label: "Ignoring loan interest rates (APR) when borrowing money",
          bucket: "trap",
          explain:
            "Debt trap: Leads to unexpectedly high interest costs over the life of the loan.",
        },
      ],
      source: SOURCES.debtCycle,
      xp: 40,
      next: "f2a3-cert-quiz",
    },

    /* ---------------- 7. final certification quiz ---------------- */
    "f2a3-cert-quiz": {
      id: "f2a3-cert-quiz",
      type: "quiz",
      title: "Final Assessment: Unit 2 Certification",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 18:15",
      text: [
        'Nia prepares your final evaluation for Unit 2.',
        '"A member wants to compare borrowing structures and payoff methods. Which statement accurately reflects sound debt management principles?"',
      ],
      question:
        "Which statement correctly summarizes debt types and repayment strategies?",
      options: [
        {
          label: "Credit card debt has low interest rates and is secured by collateral.",
          correct: false,
          feedback:
            "Incorrect. Credit card debt is unsecured revolving debt with high interest rates.",
        },
        {
          label:
            "Mortgages are secured loans backed by collateral, credit cards are revolving debt, the debt avalanche saves the most interest, and snowball builds momentum.",
          correct: true,
          feedback:
            "Correct! Mortgages are long-term secured loans, credit cards are high-interest revolving debt, debt avalanche minimizes total interest, and debt snowball provides psychological quick wins.",
        },
        {
          label: "The debt snowball method saves more interest than the debt avalanche method.",
          correct: false,
          feedback:
            "Incorrect. Debt avalanche focuses on highest interest rates first and saves more interest than snowball.",
        },
        {
          label: "Personal loan debt has declined steadily over the past 5 years.",
          correct: false,
          feedback:
            "Incorrect. Personal loan debt grew by $94 billion over the past 5 years.",
        },
      ],
      source: SOURCES.debtCycle,
      xp: 40,
      badge: "fin-unit2-certified",
      next: "f2a3-end",
    },

    /* ---------------- 8. ending scene ---------------- */
    "f2a3-end": {
      id: "f2a3-end",
      type: "ending",
      title: "Unit 2 complete: Debt and Credit Management",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 18:30",
      text: [
        "Nia signs your Unit 2 completion certificate. \"Unit 2, certified.\"",
        "Here is what you mastered in Unit 2:",
        "1. Types of Debt & Loan Structures: You analyzed student loans (federal vs private), credit card revolving debt, mortgages (15-30 year secured loans backed by property collateral), auto loans (subject to vehicle depreciation), and personal loans ($253 billion U.S. total in 2025 across 24.6 million borrowers averaging $11,631).",
        "2. Secured vs Unsecured Credit: You separated secured loans (backed by collateral) from unsecured loans (based on credit scores in the 300–850 range).",
        "3. Debt Management Frameworks: You mastered the Debt Snowball method (paying smallest balances first for psychological momentum), the Debt Avalanche method (targeting highest interest rates first to save maximum interest), and Debt Consolidation plans.",
        "4. Avoiding Debt Cycles: You audited statements to spot interest compounding traps, evaluated global public debt trends ($100 trillion projected in 2025), and identified healthy credit habits to achieve and maintain a debt-free life.",
        "Marcus smiles: \"Now I know exactly how to evaluate that credit card offer and manage loans responsibility.\"",
      ],
      teaser:
        "Unit 3: Taxes and Income Filing. In Unit 1 you mastered budgeting. In Unit 2 you mastered debt and credit. In Unit 3, you will learn how tax brackets work, marginal tax rates, W-2 forms, tax deductions, and filing deadlines.",
      xp: 60,
      badge: "fin-unit2-certified",
      next: null,
    },
  },
};

export default act3;
