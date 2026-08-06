// @ts-check

/**
 * Financial Literacy, Unit 2, Act 1: "Types of Debt and How Loans Work"
 *
 * Source material: "Different Types of Debt" (transcribed in
 * content/sources/finance-unit2-types-of-debt.md) and
 * "Techinance Financial Literacy Course Final Quiz" (finance-final-quiz.md).
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   $17.57 trillion total U.S. consumer debt in Q3 2024,
 *   $12.11 trillion total U.S. mortgage debt in Q3 2024,
 *   $253 billion in American personal loan debt as of Q1 2025 across 24.6 million borrowers,
 *   $11,631 average personal loan debt per borrower.
 *
 * Scene ids are namespaced `f2a1-*`. The last scene hands off to `f2a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  typesOfDebt: {
    label: "Understanding Types of Debt (InCharge Debt Solutions)",
    url: "https://www.incharge.org/understanding-debt/types-of-debt/",
  },
  federalLoans: {
    label: "Federal vs. Private Student Loans (Federal Student Aid)",
    url: "https://studentaid.gov/understand-aid/types/loans/federal-vs-private",
  },
  personalLoans: {
    label: "Personal Loan Statistics 2025 (LendingTree)",
    url: "https://www.lendingtree.com/personal/personal-loans-statistics/",
  },
  securedVsUnsecured: {
    label: "Secured vs. Unsecured Loans (Investopedia)",
    url: "https://www.investopedia.com/secured-vs-unsecured-loans-7558592",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit2.js.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "f2a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f2a1-start": {
      id: "f2a1-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 15:30",
      text: [
        "Marcus Ellery is back at Riverbend Credit Union, sitting with financial coach Nia Barros.",
        '"Now that your budget is tracking," Nia says, "we need to talk about debt. Most people think of debt as a single thing, but a credit card balance, a student loan, and a mortgage work completely differently."',
        'Marcus nods: "I received a credit card offer in the mail, and my cousin is taking out student loans for college. I want to know what I\'m actually looking at before signing anything."',
        '"Good," Nia replies. "Debt is a common tool in personal finance, but using it safely requires knowing the benefits, risks, and structures of each debt type."',
      ],
      source: SOURCES.typesOfDebt,
      xp: 10,
      badge: "debt-class-master",
      next: "f2a1-revolving-quiz",
    },

    /* ---------------- 2. revolving debt quiz (Final Quiz Q11) ---------------- */
    "f2a1-revolving-quiz": {
      id: "f2a1-revolving-quiz",
      type: "quiz",
      title: "Knowledge check: Revolving debt",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"Let\'s start with credit cards," Nia says. "Credit card debt belongs to a specific category known as revolving debt. How does revolving debt work?"',
      ],
      question: "What is revolving debt?",
      options: [
        {
          label: "Debt that disappears after one year",
          correct: false,
          feedback:
            "Debt does not disappear on a timer. It remains owed until paid back with interest.",
        },
        {
          label: "Debt you can borrow repeatedly up to a limit",
          correct: true,
          feedback:
            "Correct. Revolving debt allows individuals to borrow up to a credit limit, repay part or all of the balance, and borrow again repeatedly.",
        },
        {
          label: "Debt that only applies to mortgages",
          correct: false,
          feedback:
            "Mortgages are long-term installment loans, not revolving credit lines.",
        },
        {
          label: "Debt that has no interest",
          correct: false,
          feedback:
            "Revolving debt (especially credit cards) typically carries high interest rates if balances are carried month to month.",
        },
      ],
      source: SOURCES.typesOfDebt,
      xp: 25,
      next: "f2a1-consumer-reveal",
    },

    /* ---------------- 3. total debt reveal ---------------- */
    "f2a1-consumer-reveal": {
      id: "f2a1-consumer-reveal",
      type: "reveal",
      title: "U.S. Consumer Mortgage Debt Scale",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"To see how large these numbers get," Nia says, "look at U.S. consumer debt statistics reported in late 2024. Total consumer debt reached $17.57 trillion by Q3 2024."',
        '"Out of that total, how much was made up of mortgage debt alone?"',
      ],
      question: "How much did U.S. consumers owe in total mortgage debt as of Q3 2024?",
      options: ["$1.21 trillion", "$5.50 trillion", "$8.90 trillion", "$12.11 trillion"],
      answerIndex: 3,
      value: "$12.11 trillion",
      caption: "Total U.S. consumer mortgage debt in Q3 2024 out of $17.57 trillion in total debt.",
      explain:
        "As of Q3 2024, U.S. consumers owed $12.11 trillion in mortgage debt out of $17.57 trillion in total consumer debt. Mortgages represent the largest single category of consumer debt.",
      source: SOURCES.securedVsUnsecured,
      xp: 30,
      next: "f2a1-mortgage-quiz",
    },

    /* ---------------- 4. mortgage quiz (Final Quiz Q4) ---------------- */
    "f2a1-mortgage-quiz": {
      id: "f2a1-mortgage-quiz",
      type: "quiz",
      title: "Knowledge check: Mortgage loan classification",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        '"A mortgage is a long-term loan used to purchase property, usually repaid over 15 to 30 years," Nia explains. "What type of loan is a mortgage?"',
      ],
      question: "What type of loan is a mortgage?",
      options: [
        {
          label: "Unsecured loan",
          correct: false,
          feedback:
            "Unsecured loans rely solely on creditworthiness without collateral backing.",
        },
        {
          label: "Revolving debt",
          correct: false,
          feedback:
            "Revolving debt refers to open credit lines like credit cards.",
        },
        {
          label: "Secured loan",
          correct: true,
          feedback:
            "Correct. A mortgage is a secured loan backed by collateral, the property itself, which can be repossessed if payments are not made.",
        },
        {
          label: "Personal loan",
          correct: false,
          feedback:
            "Personal loans are general-purpose loans, usually unsecured, distinct from property mortgages.",
        },
      ],
      source: SOURCES.securedVsUnsecured,
      xp: 25,
      next: "f2a1-types-terminal",
    },

    /* ---------------- 5. terminal inspection ---------------- */
    "f2a1-types-terminal": {
      id: "f2a1-types-terminal",
      type: "terminal",
      title: "LEDGER: loan structures and risks",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        'Nia turns the screen to LEDGER. "Query the loan database to review the four major debt types and their risks."',
      ],
      prompt: "Execute the debt profile commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "student",
          cmd: "loans --type student",
          output: [
            "STUDENT LOANS",
            "  Purpose: Higher education expenses (college/university).",
            "  Types  : Federal (offered by government) vs Private (offered by banks/lenders).",
            "  Risks  : High cumulative interest over time, non-completion risk.",
          ],
          required: true,
        },
        {
          id: "creditcard",
          cmd: "loans --type creditcard",
          output: [
            "CREDIT CARD DEBT (REVOLVING)",
            "  Structure: Open line of credit up to a borrowing limit.",
            "  Interest : Highest interest rates among major debt categories.",
            "  Risk     : Carrying month-to-month balances triggers a debt cycle.",
          ],
          required: true,
        },
        {
          id: "auto",
          cmd: "loans --type auto",
          output: [
            "AUTO LOANS (SECURED)",
            "  Structure: Shorter term than mortgages, secured by the vehicle.",
            "  Risk     : Rapid vehicle depreciation can leave borrowers oweing more than the car is worth.",
          ],
          required: false,
        },
        {
          id: "personal",
          cmd: "loans --stats personal",
          output: [
            "PERSONAL LOAN STATISTICS (Q1 2025)",
            "  Total U.S. Personal Loan Debt: $253 billion (up $94 billion over 5 years)",
            "  Active Borrowers             : 24.6 million Americans",
            "  Average Balance per Borrower : $11,631",
          ],
          required: false,
        },
      ],
      source: SOURCES.personalLoans,
      xp: 30,
      next: "f2a1-credit-card-quiz",
    },

    /* ---------------- 6. credit card risk quiz (Final Quiz Q17) ---------------- */
    "f2a1-credit-card-quiz": {
      id: "f2a1-credit-card-quiz",
      type: "quiz",
      title: "Knowledge check: Main risk of credit card debt",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        'Marcus looks over the credit card output. "Credit cards seem convenient, but what makes them dangerous if mishandled?"',
      ],
      question: "What is the main risk of credit card debt?",
      options: [
        {
          label: "Low interest rates",
          correct: false,
          feedback:
            "Credit cards carry some of the highest interest rates among major debt types.",
        },
        {
          label: "Too much available credit",
          correct: false,
          feedback:
            "Available credit itself is not the risk; carrying an unpaid balance is where interest accumulates.",
        },
        {
          label: "Monthly statements",
          correct: false,
          feedback:
            "Monthly statements are record-keeping notices, not a risk factor.",
        },
        {
          label: "High interest rates that can create debt cycles",
          correct: true,
          feedback:
            "Correct. If credit card debt is not paid in full each month, high interest rates quickly compound, creating a debt cycle where minimum payments barely cover interest.",
        },
      ],
      source: SOURCES.typesOfDebt,
      xp: 25,
      next: "f2a1-dossier",
    },

    /* ---------------- 7. dossier ---------------- */
    "f2a1-dossier": {
      id: "f2a1-dossier",
      type: "dossier",
      title: "Analyst dossier: Debt and loan classifications",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Nia hands Marcus and you a reference card summarizing key debt terms.',
      ],
      terms: [
        {
          term: "Student Loans",
          definition:
            "Loans used to pay for higher education. Can be federal (government-offered) or private (bank-offered).",
        },
        {
          term: "Credit Card Debt",
          definition:
            "A form of revolving debt with a high interest rate, allowing repeated borrowing up to a credit limit.",
        },
        {
          term: "Mortgages",
          definition:
            "Long-term secured loans (typically 15 to 30 years) used to purchase property, backed by the home as collateral.",
        },
        {
          term: "Auto Loans",
          definition:
            "Shorter-term secured loans used to buy vehicles. Subject to car value depreciation.",
        },
        {
          term: "Secured Loans",
          definition:
            "Loans backed by collateral (such as a house or car) that the lender can repossess if unpaid.",
        },
        {
          term: "Unsecured Loans",
          definition:
            "Loans not backed by collateral, granted based on creditworthiness and credit scores (300–850 range).",
        },
        {
          term: "Depreciation",
          definition:
            "The decrease in an asset's value over time, such as a vehicle losing market value.",
        },
        {
          term: "Debt Cycle",
          definition:
            "A continuous cycle of borrowing where high interest rates and minimum payments prevent full debt payoff.",
        },
      ],
      xp: 20,
      next: "f2a1-sort",
    },

    /* ---------------- 8. sort secured vs unsecured ---------------- */
    "f2a1-sort": {
      id: "f2a1-sort",
      type: "sort",
      title: "Classify debt types: Secured vs Unsecured",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        'Nia sets up the sorting board. "Group these four debt examples into Secured Loans (backed by collateral) or Unsecured Loans (backed by credit score)."',
      ],
      prompt: "Drag each debt type into Secured Loans or Unsecured Loans.",
      buckets: [
        {
          id: "secured",
          label: "Secured Loans",
          hint: "Backed by collateral (property or vehicle) that can be repossessed",
        },
        {
          id: "unsecured",
          label: "Unsecured Loans",
          hint: "Based on credit score (300-850) without physical collateral",
        },
      ],
      items: [
        {
          id: "mortgage_item",
          label: "Home Mortgage (15–30 year loan)",
          bucket: "secured",
          explain:
            "Secured loan: Backed by the home as collateral. If unpaid, the lender can repossess the property.",
        },
        {
          id: "auto_item",
          label: "Auto Loan for a vehicle purchase",
          bucket: "secured",
          explain:
            "Secured loan: Backed by the vehicle. If payments lapse, the car can be repossessed.",
        },
        {
          id: "creditcard_item",
          label: "Credit Card revolving balance",
          bucket: "unsecured",
          explain:
            "Unsecured loan: Granted based on creditworthiness without physical collateral attached.",
        },
        {
          id: "personal_item",
          label: "Personal signature loan from a bank",
          bucket: "unsecured",
          explain:
            "Unsecured loan: Relies on credit score and income proof rather than pledged property.",
        },
      ],
      source: SOURCES.securedVsUnsecured,
      xp: 35,
      next: "f2a1-handoff",
    },

    /* ---------------- 9. handoff to act 2 ---------------- */
    "f2a1-handoff": {
      id: "f2a1-handoff",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 16:15",
      text: [
        'Nia approves your classification notes. "Now that you understand secured vs unsecured debt, revolving credit, and loan risks, we move to debt repayment."',
        '"In Act 2, we compare the two main debt repayment strategies: the Debt Snowball and the Debt Avalanche."',
      ],
      xp: 15,
      next: "f2a2-start",
    },
  },
};

export default act1;
