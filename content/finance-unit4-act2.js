// @ts-check

/**
 * Financial Literacy, Unit 4, Act 2: "Risk, Time, and Compounding"
 *
 * Source material: "Basic Investment Concepts" and "Savings and Retirement",
 * transcribed in content/sources/.
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   long-term investing is generally anything over 5 years,
 *   $10,000 at a 7% annual return grows to approximately $76,122 in 30 years,
 *   savings accounts return typically 0.01%-0.5% annually,
 *   FDIC insurance covers up to $250,000 in the U.S.
 *
 * Scene ids are namespaced `f4a2-*`. The last scene hands off to `f4a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  stocks: {
    label: "How the Stock Market Works (Investopedia)",
    url: "https://www.investopedia.com/articles/investing/082614/how-stock-market-works.asp",
  },
  compounding: {
    label: "The Power of Compounding (Morningstar)",
    url: "https://www.morningstar.com/education/the-power-of-compounding",
  },
  savingsAccount: {
    label: "Savings Accounts (Investopedia)",
    url: "https://www.investopedia.com/terms/s/savingsaccount.asp",
  },
  cds: {
    label: "Understanding Certificates of Deposit (Bankrate)",
    url: "https://www.bankrate.com/banking/cds/",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit4.js. This act
 * awards `horizon-planner`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "f4a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f4a2-start": {
      id: "f4a2-start",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 16:45",
      text: [
        "\"Two people can look at the same stock and make opposite decisions, and both be right,\" Nia says. \"That's not a contradiction. It's risk tolerance.\"",
        "\"Risk tolerance is your comfort level with potential losses in exchange for higher returns. The more risk an asset carries, the greater the potential for both high returns and high losses.\"",
        "\"So the question isn't which investment is best. It's which one you can hold without doing something stupid when it drops.\"",
      ],
      source: SOURCES.stocks,
      xp: 10,
      next: "f4a2-tolerance-choice",
    },

    /* ---------------- 2. the sleep test ---------------- */
    "f4a2-tolerance-choice": {
      id: "f4a2-tolerance-choice",
      type: "choice",
      title: "Marcus can't sleep",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"Say I put everything into one company's stock,\" Marcus says. \"And say I'm checking the price at two in the morning. Every night.\"",
        "\"What does that tell me?\"",
      ],
      prompt: "Pick what that actually means.",
      options: [
        {
          label: "The risk is too high for his personal risk tolerance, whatever the returns look like.",
          next: "f4a2-horizon-quiz",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. The rule of thumb is that if you're losing sleep or constantly worrying about an investment, its risk is too high for your personal risk tolerance. It's a real signal, not a character flaw, and the fix is rebalancing toward assets you can hold calmly.",
        },
        {
          label: "He needs to research the company harder until he's confident.",
          next: "f4a2-horizon-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Research is what separates investing in individual stocks from gambling, so it's not wasted. But no amount of it changes how much loss you can personally sit with, and that's what the sleep test measures.",
        },
        {
          label: "Nothing. Worry is normal and everyone feels it.",
          next: "f4a2-horizon-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Constant worry is exactly the signal to act on. It's why many investors stick to safer assets like bonds and gold even though stocks offer higher potential returns, and why a balanced portfolio across several asset classes usually lands somewhere people can live with.",
        },
      ],
      source: SOURCES.stocks,
    },

    /* ---------------- 3. what counts as long term ---------------- */
    "f4a2-horizon-quiz": {
      id: "f4a2-horizon-quiz",
      type: "quiz",
      title: "Knowledge check: what counts as long term",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Time does something to risk that nothing else does,\" Nia says. \"Over the long term it's almost certain your investment rises. Over the short term, even low-risk investments are hard to predict.\"",
      ],
      question: "Why is long-term investing generally recommended?",
      options: [
        {
          label: "It guarantees profits",
          correct: false,
          feedback:
            "Nothing guarantees profits. Over the long term it's almost certain your investment rises, and bonds come closest to a guarantee at usually 2-4%, but almost certain isn't the same as guaranteed.",
        },
        {
          label: "It allows for compounding returns",
          correct: true,
          feedback:
            "Correct. Compounding is where earnings generate additional income on top of what you've already earned. Long term is generally considered anything over 5 years, and the longer you hold, the less risk there is and the higher the growth potential.",
        },
        {
          label: "It has no risk",
          correct: false,
          feedback:
            "Time reduces risk, it doesn't remove it. Holding longer makes an investment less risky than holding it briefly, but every asset here still carries some.",
        },
        {
          label: "It requires no research",
          correct: false,
          feedback:
            "Research is what separates investing from gambling, however long you hold. The reason to hold long is compounding, plus the fact that short-term movements are hard to predict for any investment.",
        },
      ],
      source: SOURCES.stocks,
      xp: 25,
      next: "f4a2-compound-reveal",
    },

    /* ---------------- 4. compounding ---------------- */
    "f4a2-compound-reveal": {
      id: "f4a2-compound-reveal",
      type: "reveal",
      title: "What $10,000 does if you leave it alone",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Compounding is when your earnings generate more earnings on top of what you've already made,\" Nia says. \"Take $10,000 at a 7% annual return. Leave it for 30 years and don't add a cent. Guess what it becomes.\"",
      ],
      question: "What does $10,000 grow to at a 7% annual return over 30 years?",
      options: ["$21,000", "$38,400", "$76,122", "$310,000"],
      answerIndex: 2,
      value: "$76,122",
      caption: "$10,000 invested at a 7% annual return, after 30 years of compounding.",
      explain:
        "Investing $10,000 at a 7% annual return grows to approximately $76,122 in 30 years. You added nothing. The extra $66,122 is returns generating their own returns, which is why starting early matters more than starting big.",
      source: SOURCES.compounding,
      xp: 30,
      next: "f4a2-safe-terminal",
    },

    /* ---------------- 5. where short-term money lives ---------------- */
    "f4a2-safe-terminal": {
      id: "f4a2-safe-terminal",
      type: "terminal",
      title: "LEDGER: places to park money",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "\"Not every dollar is a 30-year dollar,\" Nia says. \"Money you might need next month belongs somewhere different from money you won't touch for decades. Pull the three.\"",
      ],
      prompt: "Run the account commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "savings",
          cmd: "accounts --info savings",
          output: [
            "SAVINGS ACCOUNT",
            "  Basic, low-risk account at a bank or credit union.",
            "  Return   : typically 0.01% to 0.5% annually. Minimal.",
            "  Insured  : up to $250,000 by the FDIC (U.S.).",
            "  Access   : easy, any time.",
            "  Best for : short-term goals and emergency funds.",
            "  Not sufficient on its own for long-term wealth accumulation.",
          ],
          required: true,
        },
        {
          id: "cd",
          cmd: "accounts --info certificate-of-deposit",
          output: [
            "CERTIFICATE OF DEPOSIT (CD)",
            "  Deposit money for a fixed period, from months to several years,",
            "  in exchange for a guaranteed interest rate.",
            "  Return   : higher than a savings account.",
            "  Catch    : a penalty for early withdrawal.",
            "  Best for : growing savings safely when you don't need access.",
          ],
          required: true,
        },
        {
          id: "mma",
          cmd: "accounts --info money-market",
          output: [
            "MONEY MARKET ACCOUNT",
            "  Similar to a savings account, with higher interest rates in",
            "  exchange for higher minimum balance requirements.",
            "  Often includes limited check-writing privileges, combining the",
            "  benefits of a savings account and a checking account.",
            "  Best for : slightly higher returns while keeping liquidity.",
          ],
          required: true,
        },
      ],
      source: SOURCES.savingsAccount,
      xp: 30,
      next: "f4a2-savings-quiz",
    },

    /* ---------------- 6. the limits of a savings account ---------------- */
    "f4a2-savings-quiz": {
      id: "f4a2-savings-quiz",
      type: "quiz",
      title: "Knowledge check: what a savings account is for",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"My whole leftover pile is in a savings account right now,\" Marcus says. \"Is that wrong?\"",
      ],
      question: "What is a savings account best suited to?",
      options: [
        {
          label: "Short-term goals and an emergency fund, but not long-term wealth accumulation",
          correct: true,
          feedback:
            "Correct. Savings accounts return typically 0.01% to 0.5% annually, which is minimal, but they're low-risk, insured up to $250,000 by the FDIC, and easy to access. That combination is right for an emergency fund and wrong for a 30-year goal.",
        },
        {
          label: "Long-term growth, because the money is insured",
          correct: false,
          feedback:
            "Insurance protects the money, it doesn't grow it. At 0.01% to 0.5% a year, a savings account isn't sufficient for long-term wealth accumulation, which is what investing is for.",
        },
        {
          label: "Money you want locked away so you can't touch it",
          correct: false,
          feedback:
            "That's a CD, where you commit for a fixed period and pay a penalty for early withdrawal. A savings account is the opposite: easy access at any time.",
        },
        {
          label: "Nothing. The returns are too small to be worth using",
          correct: false,
          feedback:
            "The low return is the price of safety and access, and both are exactly what an emergency fund needs. The mistake isn't using one, it's using only one.",
        },
      ],
      source: SOURCES.savingsAccount,
      xp: 25,
      next: "f4a2-parking-sort",
    },

    /* ---------------- 7. match money to its home ---------------- */
    "f4a2-parking-sort": {
      id: "f4a2-parking-sort",
      type: "sort",
      title: "Give each pot the right home",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Four pots of Marcus's money,\" Nia says. \"Each one has a different date attached. Match them to where they belong.\"",
      ],
      prompt: "Drag each pot into the right home.",
      buckets: [
        { id: "now", label: "Savings account", hint: "Might need it any time" },
        { id: "locked", label: "Certificate of deposit", hint: "Safe, and untouched for a fixed term" },
        { id: "invested", label: "Invested for growth", hint: "Left alone for over 5 years" },
      ],
      items: [
        {
          id: "emergency",
          label: "Emergency fund for a job loss or car repair",
          bucket: "now",
          explain: "A savings account. Easy access at any time is the whole point of an emergency fund, and it's insured up to $250,000.",
        },
        {
          id: "rentbuffer",
          label: "Next month's rent, already set aside",
          bucket: "now",
          explain: "A savings account. Money you need within weeks can't be locked up or exposed to short-term swings.",
        },
        {
          id: "cardeposit",
          label: "Car deposit, definitely needed in two years",
          bucket: "locked",
          explain: "A CD. You know the date, you won't touch it before then, and a CD pays more than a savings account for exactly that commitment.",
        },
        {
          id: "retirement",
          label: "Money he won't touch until he's sixty",
          bucket: "invested",
          explain: "Invested. Over 5 years is long term, and thirty-odd years is where compounding does the heavy lifting: $10,000 at 7% becomes roughly $76,122 in 30 years.",
        },
      ],
      source: SOURCES.cds,
      xp: 35,
      badge: "horizon-planner",
      next: "f4a2-cd-quiz",
    },

    /* ---------------- 8. the CD catch ---------------- */
    "f4a2-cd-quiz": {
      id: "f4a2-cd-quiz",
      type: "quiz",
      title: "Knowledge check: the cost of a CD",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"A CD pays better than a savings account,\" Nia says. \"There's a reason it can afford to.\"",
      ],
      question: "What's the trade-off with a certificate of deposit?",
      options: [
        {
          label: "You commit for a fixed period, and taking the money out early means a penalty.",
          correct: true,
          feedback:
            "Correct. You deposit for a fixed period, from months to several years, in exchange for a guaranteed rate. The penalty for early withdrawal is what pays for the higher return.",
        },
        {
          label: "The interest rate can drop at any time.",
          correct: false,
          feedback:
            "A CD's rate is guaranteed for the term, which is one of its advantages. The trade-off is the early withdrawal penalty.",
        },
        {
          label: "It isn't insured like a savings account.",
          correct: false,
          feedback:
            "That isn't the trade-off here. A CD is a safe savings instrument, and what you give up for its higher rate is access to the money before the term ends.",
        },
        {
          label: "You need a high minimum balance to open one.",
          correct: false,
          feedback:
            "Higher minimum balance requirements are the money market account's trade-off, and in exchange it offers higher interest and limited check-writing. A CD's catch is the early withdrawal penalty.",
        },
      ],
      source: SOURCES.cds,
      xp: 25,
      next: "f4a2-dossier",
    },

    /* ---------------- 9. dossier ---------------- */
    "f4a2-dossier": {
      id: "f4a2-dossier",
      type: "dossier",
      title: "Coaching card: risk and time",
      speaker: "Nia Barros",
      avatar: "file-text",
      location: "Riverbend Credit Union",
      text: [
        "\"Six words that decide where every dollar goes,\" Nia says.",
      ],
      terms: [
        {
          term: "Risk Tolerance",
          definition: "The level of risk an investor is willing to accept in exchange for potential financial gains. Higher risk tolerance allows for a more growth-oriented portfolio.",
        },
        {
          term: "Growth Potential",
          definition: "The anticipated rate of return for an investment. Investments with high growth potential, like stocks, carry more risk.",
        },
        {
          term: "Compounding",
          definition: "The process where investment earnings generate additional income over time, leading to exponential growth.",
        },
        {
          term: "Savings Account",
          definition: "A low-risk, interest-earning account for short-term goals or emergency funds.",
        },
        {
          term: "Certificate of Deposit (CD)",
          definition: "A fixed-term savings account offering higher interest rates but limited liquidity.",
        },
        {
          term: "Money Market Account",
          definition: "A hybrid account offering higher interest rates and some check-writing capabilities.",
        },
      ],
      source: SOURCES.savingsAccount,
      xp: 20,
      next: "f4a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "f4a2-handoff": {
      id: "f4a2-handoff",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 17:20",
      text: [
        "\"Balancing a portfolio across several of these classes usually lands you at a risk level you can live with while still making decent returns,\" Nia says. \"That's the whole game.\"",
        "\"One piece left. There's a set of accounts built specifically for the money you won't touch for decades, and they come with tax advantages you don't get anywhere else. Skipping them costs more than picking the wrong stock ever will.\"",
      ],
      source: SOURCES.stocks,
      xp: 15,
      next: "f4a3-start",
    },
  },
};

export default act2;
