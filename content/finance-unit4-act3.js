// @ts-check

/**
 * Financial Literacy, Unit 4, Act 3: "Retirement Accounts and the Number You Need"
 *
 * Source material: "Savings and Retirement", transcribed at
 * content/sources/finance-unit4-savings-retirement.md.
 *
 * Every figure quoted here comes from that document and must stay exact:
 *   retirement income target of 70%-80% of pre-retirement income,
 *   inflation of 2%-3% annually, moderate growth of 5%-7%,
 *   average Social Security benefit of approximately $1,800 per month in 2024,
 *   the 4% rule ($40,000 a year needs a $1,000,000 portfolio).
 *
 * CONTRIBUTION LIMITS: the source states the 2024 limits as $22,500 for a
 * 401(k) with a $7,500 catch-up, and $6,500 for an IRA with a $1,000 catch-up.
 * Those are quoted verbatim, and the scene says out loud that limits change
 * every year and must be checked against the current IRS figure, so a learner
 * doesn't carry a stale number away as a permanent fact.
 *
 * Scene ids are namespaced `f4a3-*`. The last scene ends the episode.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  fourOhOneK: {
    label: "What Is a 401(k) Plan? (U.S. Department of Labor)",
    url: "https://www.dol.gov/general/topic/retirement/401k",
  },
  iras: {
    label: "IRAs and Roth IRAs (FINRA)",
    url: "https://www.finra.org/investors/iras-and-roth-iras",
  },
  hsa: {
    label: "Health Savings Accounts (IRS Publication 969)",
    url: "https://www.irs.gov/publications/p969",
  },
  fourPercent: {
    label: "The 4% Rule: What You Need to Know (Forbes)",
    url: "https://www.forbes.com/advisor/retirement/4-percent-rule/",
  },
  planning: {
    label: "Retirement Planning Basics (AARP)",
    url: "https://www.aarp.org/retirement/planning-for-retirement/",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit4.js. This act
 * awards `fin-unit4-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "f4a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f4a3-start": {
      id: "f4a3-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:25",
      text: [
        "\"Retirement sounds like somebody else's problem when you're twenty-four,\" Nia says. \"The reason we're doing it now is that these accounts reward time more than they reward money.\"",
        "\"Life expectancy is going up. So are living costs and healthcare. A plan matters more than it did for the generation before you, and the accounts built for it come with tax advantages you can't get any other way.\"",
      ],
      source: SOURCES.planning,
      xp: 10,
      next: "f4a3-accounts-terminal",
    },

    /* ---------------- 2. the accounts ---------------- */
    "f4a3-accounts-terminal": {
      id: "f4a3-accounts-terminal",
      type: "terminal",
      title: "LEDGER: retirement accounts",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "\"Four kinds, and the differences are all about when you pay tax,\" Nia says. \"Pull them.\"",
      ],
      prompt: "Run the account commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "employer",
          cmd: "retirement --info 401k roth-401k",
          output: [
            "401(k)",
            "  Employer-sponsored. You contribute part of your paycheck",
            "  pre-tax. Contributions grow tax-deferred, and you pay tax only",
            "  when withdrawing in retirement.",
            "  Many employers offer matching contributions.",
            "  2024 limit : $22,500, plus a $7,500 catch-up if you are 50+.",
            "",
            "ROTH 401(k)",
            "  Same idea, but contributions are made with after-tax dollars.",
            "  Qualified withdrawals in retirement are tax-free, earnings",
            "  included.",
            "  Best if you expect a higher tax bracket in retirement.",
          ],
          required: true,
        },
        {
          id: "individual",
          cmd: "retirement --info ira",
          output: [
            "IRA (INDIVIDUAL RETIREMENT ACCOUNT)",
            "  Tax-advantaged, opened by you, independent of any employer.",
            "  Traditional : contributions tax-deductible (subject to income",
            "                limits); withdrawals taxed in retirement.",
            "  Roth        : after-tax contributions; withdrawals tax-free.",
            "  2024 limit  : $6,500, plus a $1,000 catch-up if you are 50+.",
            "",
            "SEP IRA and SIMPLE IRA",
            "  For self-employed people and small business owners. Higher",
            "  contribution limits than a traditional IRA.",
            "",
            "NOTE: contribution limits are set per year and change. Check the",
            "current year's figure before you rely on it.",
          ],
          required: true,
        },
        {
          id: "hsa",
          cmd: "retirement --info hsa",
          output: [
            "HEALTH SAVINGS ACCOUNT (HSA)",
            "  Built for healthcare costs, but it doubles as a retirement tool.",
            "  Contributions are pre-tax and grow tax-deferred.",
            "  Qualified withdrawals for medical expenses are tax-free.",
            "  After age 65, funds can be used for non-medical expenses without",
            "  penalty, though they are taxed like traditional IRA withdrawals.",
          ],
          required: true,
        },
      ],
      source: SOURCES.fourOhOneK,
      xp: 30,
      next: "f4a3-match-choice",
    },

    /* ---------------- 3. the employer match ---------------- */
    "f4a3-match-choice": {
      id: "f4a3-match-choice",
      type: "choice",
      title: "Marcus has a match he isn't using",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"My employer matches 401(k) contributions,\" Marcus says. \"I've got mine set to zero because I wanted the cash in hand.\"",
        "\"How bad is that?\"",
      ],
      prompt: "Pick the answer that matches what this unit taught.",
      options: [
        {
          label: "Bad. A match is money the employer adds on top, so contributing nothing turns it down entirely.",
          next: "f4a3-limits-quiz",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Many employers offer matching contributions, which effectively increase your savings. Contributing zero means the match pays out zero. It's the one part of retirement saving where the money is genuinely free.",
        },
        {
          label: "Fine, as long as he opens an IRA instead.",
          next: "f4a3-limits-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "An IRA is a good account and it's independent of any employer, so it's worth having. But it comes with no matching contributions, so choosing it instead of a matched 401(k) still leaves the employer's money behind.",
        },
        {
          label: "Fine. Cash in hand now is worth more than money locked away.",
          next: "f4a3-limits-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "The contributions are pre-tax and grow tax-deferred, and the employer adds more on top. Between the match, the tax treatment, and decades of compounding, the money in hand is worth considerably less than the money forgone.",
        },
      ],
      source: SOURCES.fourOhOneK,
    },

    /* ---------------- 4. the limits ---------------- */
    "f4a3-limits-quiz": {
      id: "f4a3-limits-quiz",
      type: "quiz",
      title: "Knowledge check: how much you can put in",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Every one of these accounts has an annual cap, and the caps are set per year,\" Nia says. \"The course material lists the 2024 figures. Check the current year's number before you act on any of them.\"",
      ],
      question: "Which pair of 2024 contribution limits does the course list?",
      options: [
        {
          label: "$22,500 for a 401(k) and $6,500 for an IRA",
          correct: true,
          feedback:
            "Correct. The course lists $22,500 for a 401(k) and $6,500 for an IRA in 2024, each with a catch-up allowance for people aged 50 and above: $7,500 and $1,000 respectively. These change annually, so treat the pattern as the lesson and look the current figure up.",
        },
        {
          label: "$6,500 for a 401(k) and $22,500 for an IRA",
          correct: false,
          feedback:
            "The right figures, the wrong way round. The employer-sponsored 401(k) has by far the larger cap at $22,500. The IRA, which you open yourself, is capped at $6,500.",
        },
        {
          label: "The same limit applies to both",
          correct: false,
          feedback:
            "They differ a lot. A 401(k) allows $22,500, an IRA $6,500. That gap is one reason a matched 401(k) is usually the first account to fill.",
        },
        {
          label: "There's no limit on either",
          correct: false,
          feedback:
            "Both are capped, which is why the order you fill them matters. Catch-up allowances of $7,500 and $1,000 exist for people aged 50 and above, on top of the standard limits.",
        },
      ],
      source: SOURCES.iras,
      xp: 25,
      next: "f4a3-hsa-quiz",
    },

    /* ---------------- 5. the HSA after 65 ---------------- */
    "f4a3-hsa-quiz": {
      id: "f4a3-hsa-quiz",
      type: "quiz",
      title: "Knowledge check: the account that changes at 65",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"I've got an HSA through work and I thought it was strictly for doctor's bills,\" Marcus says.",
      ],
      question: "What happens to a Health Savings Account after age 65?",
      options: [
        {
          label: "Funds can be used for non-medical expenses without penalty, though they're taxed like traditional IRA withdrawals.",
          correct: true,
          feedback:
            "Correct. That's what makes an HSA a supplemental retirement tool rather than a medical-only account. Before 65 the penalty applies; after 65 it doesn't, and you're taxed as you would be on a traditional IRA withdrawal.",
        },
        {
          label: "The account closes and the balance has to be spent on healthcare.",
          correct: false,
          feedback:
            "Nothing closes. After 65 the money becomes available for any purpose without penalty, which is why it's worth treating an HSA as part of a retirement plan.",
        },
        {
          label: "All withdrawals become tax-free, medical or not.",
          correct: false,
          feedback:
            "Tax-free applies to qualified medical expenses. Non-medical withdrawals after 65 avoid the penalty but are still taxed, like traditional IRA withdrawals.",
        },
        {
          label: "Nothing changes. It stays medical-only for life.",
          correct: false,
          feedback:
            "The rule does change at 65. Contributions are pre-tax and grow tax-deferred throughout, and after 65 the penalty on non-medical withdrawals disappears.",
        },
      ],
      source: SOURCES.hsa,
      xp: 25,
      next: "f4a3-plan-inspect",
    },

    /* ---------------- 6. review the plan ---------------- */
    "f4a3-plan-inspect": {
      id: "f4a3-plan-inspect",
      type: "inspect",
      title: "Review the plan: what's costing him money?",
      speaker: "Nia Barros",
      avatar: "file-text",
      location: "Coaching desk 2",
      text: [
        "Nia puts Marcus's plan on the screen. \"He wrote this himself last week. Some of it is genuinely good. Tap the lines that are costing him.\"",
      ],
      prompt: "Tap the lines that work against the plan. Find at least 4.",
      artifact: {
        kind: "plan",
        fields: [
          { label: "Member", value: "Marcus Ellery", hot: "member" },
          { label: "Age", value: "24", hot: "age" },
          { label: "Employer plan", value: "401(k), matching offered", hot: "employer" },
          { label: "Years to target retirement", value: "41", hot: "years" },
        ],
        body: [
          "CURRENT SETUP",
          {
            hot: "match",
            text: "401(k) contribution rate set to 0%. Employer match available and unused.",
          },
          "IRA: $6,500 contributed this year, at the limit the course lists.",
          {
            hot: "parked",
            text: "All retirement money held in a savings account earning 0.4%.",
          },
          {
            hot: "emergency",
            text: "Emergency fund invested entirely in one company's stock.",
          },
          "Holds an S&P 500 ETF in a separate long-term account.",
          "TARGET",
          "Retirement income target: 75% of pre-retirement income.",
          {
            hot: "inflation",
            text: "Future costs entered at today's prices. No inflation assumption.",
          },
          {
            hot: "withdraw",
            text: "Planned withdrawal: 10% of the portfolio per year.",
          },
        ],
      },
      requiredFinds: 4,
      hotspots: {
        member: {
          suspicious: false,
          explain: "A name on a plan. Nothing to read into it.",
        },
        age: {
          suspicious: false,
          explain: "24 is an advantage, not a problem. Starting early is what lets compounding do the work.",
        },
        employer: {
          suspicious: false,
          explain: "Having a 401(k) with matching offered is good news. What he does with it is the next line down.",
        },
        years: {
          suspicious: false,
          explain: "41 years is far beyond the 5-year threshold for long term, so this money can take real growth risk.",
        },
        match: {
          suspicious: true,
          explain: "Contributing 0% to a matched 401(k) turns down the employer's contribution entirely. Matching effectively increases your savings, and at 0% the match pays nothing.",
        },
        parked: {
          suspicious: true,
          explain: "Savings accounts return typically 0.01% to 0.5% annually and aren't sufficient for long-term wealth accumulation. Money 41 years from retirement is in the wrong place.",
        },
        emergency: {
          suspicious: true,
          explain: "Backwards on both counts. An emergency fund belongs in a savings account with easy access, and a single company's stock is the highest-risk asset on the list.",
        },
        inflation: {
          suspicious: true,
          explain: "Inflation erodes purchasing power over time, and a plan should factor in an average of 2% to 3% annually. Costing a retirement 41 years out at today's prices understates it badly.",
        },
        withdraw: {
          suspicious: true,
          explain: "The 4% rule is the guideline for withdrawing without depleting your savings. Taking 10% a year runs the portfolio down far faster than it can recover.",
        },
      },
      source: SOURCES.planning,
      xp: 40,
      next: "f4a3-fourpercent-reveal",
    },

    /* ---------------- 7. the 4% rule ---------------- */
    "f4a3-fourpercent-reveal": {
      id: "f4a3-fourpercent-reveal",
      type: "reveal",
      title: "The number behind the number",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"The 4% rule works backwards from the life you want,\" Nia says. \"Say you want $40,000 a year to live on. Guess the portfolio that supports it.\"",
      ],
      question: "Under the 4% rule, what portfolio do you need to withdraw $40,000 a year?",
      options: ["$400,000", "$650,000", "$1,000,000", "$4,000,000"],
      answerIndex: 2,
      value: "$1,000,000",
      caption: "The portfolio needed to withdraw $40,000 annually under the 4% rule.",
      explain:
        "The 4% rule says you can withdraw 4% of your retirement savings annually without depleting them, so $40,000 a year needs $1,000,000 behind it. That's the number the whole plan works toward, and it's why the other five steps matter: target 70% to 80% of your pre-retirement income, allow 2% to 3% inflation, set a timeline, assume something like 5% to 7% annual growth for a moderate portfolio, and count in Social Security, which averaged around $1,800 a month in 2024.",
      source: SOURCES.fourPercent,
      xp: 30,
      next: "f4a3-dossier",
    },

    /* ---------------- 8. dossier ---------------- */
    "f4a3-dossier": {
      id: "f4a3-dossier",
      type: "dossier",
      title: "Coaching card: retirement words",
      speaker: "Nia Barros",
      avatar: "wallet",
      location: "Riverbend Credit Union",
      text: [
        "\"Last card of the unit,\" Nia says.",
      ],
      terms: [
        {
          term: "401(k)",
          definition: "An employer-sponsored retirement account with tax-deferred growth and potential employer matching.",
        },
        {
          term: "IRA (Individual Retirement Account)",
          definition: "A tax-advantaged account for retirement savings, available as traditional or Roth IRAs.",
        },
        {
          term: "Roth IRA",
          definition: "A retirement account with after-tax contributions and tax-free withdrawals.",
        },
        {
          term: "Health Savings Account (HSA)",
          definition: "A tax-advantaged account primarily for healthcare expenses but also usable for retirement savings.",
        },
        {
          term: "Inflation",
          definition: "The rate at which the purchasing power of money decreases over time. Plan for an average of 2% to 3% annually.",
        },
        {
          term: "4% Rule",
          definition: "A withdrawal guideline suggesting retirees withdraw 4% of their savings annually to avoid running out of funds.",
        },
        {
          term: "Compound Growth",
          definition: "The process where investment returns generate additional earnings, leading to exponential growth.",
        },
      ],
      source: SOURCES.planning,
      xp: 20,
      next: "f4a3-final-choice",
    },

    /* ---------------- 9. the first move ---------------- */
    "f4a3-final-choice": {
      id: "f4a3-final-choice",
      type: "choice",
      title: "Fix one thing first",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 18:00",
      text: [
        "\"Marcus can't fix everything on that plan this week,\" Nia says. \"If he changes one thing on Monday, what should it be?\"",
      ],
      prompt: "Pick the first move.",
      options: [
        {
          label: "Turn the 401(k) contribution up to at least the level his employer matches.",
          next: "f4a3-ending",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Every other fix on that plan improves his own money. This one adds his employer's money on top, pre-tax, growing tax-deferred for 41 years. Nothing else on the list pays as much for as little effort.",
        },
        {
          label: "Move the emergency fund out of that single stock first.",
          next: "f4a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "A genuinely good fix, and worth doing soon: an emergency fund belongs somewhere low-risk and accessible. But it protects money he already has, while the unused match is money he's turning down every single pay cycle.",
        },
        {
          label: "Redo the whole plan with a proper inflation assumption.",
          next: "f4a3-ending",
          xp: 5,
          tone: "bad",
          feedback:
            "The plan does need that, since 2% to 3% inflation changes the target substantially. But an accurate target with nothing being contributed toward it is still nothing. Start the contributions, then fix the arithmetic.",
        },
      ],
      source: SOURCES.fourOhOneK,
    },

    /* ---------------- 10. ending ---------------- */
    "f4a3-ending": {
      id: "f4a3-ending",
      type: "ending",
      title: "Unit 4 complete",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 18:10",
      text: [
        "\"Stocks, bonds, ETFs, gold. Risk you can live with, held long enough to matter. Accounts built for money you won't touch for decades,\" Nia says. \"That's the shape of it.\"",
        "\"None of this needs a big income to start. Regular contributions, even small ones, add up, and automating them takes the decision away from you every month. $10,000 left alone at 7% becomes about $76,122 in thirty years, and you're twenty-four.\"",
        "Marcus is already logging into his 401(k) on his phone. \"Zero to the match,\" he says. \"Monday.\"",
      ],
      source: SOURCES.planning,
      xp: 20,
      badge: "fin-unit4-certified",
      next: null,
    },
  },
};

export default act3;
