// @ts-check

/**
 * Financial Literacy, Unit 4, Act 1: "What You Can Put Money Into"
 *
 * Source material: "Basic Investment Concepts", transcribed at
 * content/sources/finance-unit4-investment-concepts.md.
 *
 * Every figure quoted here comes from that document and must stay exact:
 *   bonds returning usually 2-4%,
 *   gold averaging 6.3% annually since 2000, adjusted for inflation,
 *   80% of mutual fund managers can't beat the market,
 *   the S&P 500 being the 500 largest public companies in the U.S.
 *
 * Scene ids are namespaced `f4a1-*`. The last scene hands off to `f4a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  stocks: {
    label: "How the Stock Market Works (Investopedia)",
    url: "https://www.investopedia.com/articles/investing/082614/how-stock-market-works.asp",
  },
  bonds: {
    label: "Understanding Bonds (FINRA)",
    url: "https://www.finra.org/investors/investing/bonds",
  },
  etf: {
    label: "What Is an ETF? (Investopedia)",
    url: "https://www.investopedia.com/terms/e/etf.asp",
  },
  etfVsFund: {
    label: "ETFs vs. Mutual Funds: Which Is Better? (Forbes)",
    url: "https://www.forbes.com/advisor/investing/etf-vs-mutual-fund/",
  },
  gold: {
    label: "Why Invest in Gold? (World Gold Council)",
    url: "https://www.gold.org/investment",
  },
};

/**
 * Badges the acts award are registered centrally in finance-unit4.js. This act
 * awards `asset-mapper`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act1Badges = [];

export const act1 = {
  entry: "f4a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "f4a1-start": {
      id: "f4a1-start",
      type: "narrative",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union, 16:00",
      text: [
        "Marcus is back, and this time he's brought a printout.",
        "\"I've been budgeting for eight months. There's money left over now, which is new. It's sitting in my chequing account doing nothing.\"",
        "Nia Barros pulls up a chair. \"Then this is the right question at the right time. Money you don't need this year shouldn't sit still. But before you put it anywhere, you need to know what the options actually are, because they're not interchangeable.\"",
      ],
      xp: 10,
      next: "f4a1-options-terminal",
    },

    /* ---------------- 2. the five options ---------------- */
    "f4a1-options-terminal": {
      id: "f4a1-options-terminal",
      type: "terminal",
      title: "LEDGER: investment options",
      speaker: "LEDGER",
      avatar: "terminal",
      location: "Coaching desk 2",
      text: [
        "\"Five things people actually buy,\" Nia says. \"Pull all three briefings. You'll need the risk levels in a minute.\"",
      ],
      prompt: "Run the briefing commands on LEDGER.",
      host: "member@riverbend-cu",
      commands: [
        {
          id: "equity",
          cmd: "assets --info stocks",
          output: [
            "STOCKS",
            "  A share in the ownership of a company. Buy Apple stock and you",
            "  become a partial owner, entitled to a portion of its profits and",
            "  exposed to its losses.",
            "  Risk   : tends to be high. Prices move on market conditions, the",
            "           economy, and a company's own financials.",
            "  Growth : very high, especially over a long-term horizon.",
            "  Returns come two ways:",
            "    capital gains - the stock price rising over time",
            "    dividends     - a share of company profit paid to shareholders",
          ],
          required: true,
        },
        {
          id: "debt",
          cmd: "assets --info bonds gold",
          output: [
            "BONDS",
            "  A debt security issued by corporations, municipalities, or",
            "  governments. You lend the issuer money. They repay the face value",
            "  on a set date, plus periodic interest payments, usually twice a year.",
            "  Risk   : much safer than stocks.",
            "  Return : usually 2-4%, close to guaranteed.",
            "",
            "GOLD",
            "  Risk   : incredibly low, comparable to bonds.",
            "  Return : 6.3% average annually since 2000, adjusted for inflation.",
            "  Also acts as a hedge against inflation and currency devaluation,",
            "  because it's sought after in times of economic uncertainty.",
          ],
          required: true,
        },
        {
          id: "funds",
          cmd: "assets --info etf mutual-fund",
          output: [
            "ETF (EXCHANGE-TRADED FUND)",
            "  A basket of different investments, typically stocks. The SPDR S&P",
            "  500 Trust ETF holds all companies in the S&P 500, the index of the",
            "  500 largest public companies in the U.S.",
            "  Risk   : higher than bonds, lower than individual stocks.",
            "  Return : moderate to high.",
            "  Diversifies a portfolio at a fraction of the cost.",
            "",
            "MUTUAL FUND",
            "  Pools money from many investors into stocks, bonds, and short-term",
            "  debt. Actively managed.",
            "  Drawbacks: 80% of managers can't beat the market, fees are higher,",
            "  and there's less flexibility than an ETF.",
          ],
          required: true,
        },
      ],
      source: SOURCES.etf,
      xp: 30,
      next: "f4a1-stock-quiz",
    },

    /* ---------------- 3. how a stock pays you ---------------- */
    "f4a1-stock-quiz": {
      id: "f4a1-stock-quiz",
      type: "quiz",
      title: "Knowledge check: how a stock pays you",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Most people know stocks can go up,\" Nia says. \"Fewer know there are two separate ways they put money in your pocket.\"",
      ],
      question: "When you buy a stock, you become a:",
      options: [
        {
          label: "Company employee",
          correct: false,
          feedback:
            "Owning a share doesn't put you on the payroll. It makes you a partial owner, entitled to a portion of the company's profits and exposed to its losses.",
        },
        {
          label: "Partial owner of the company",
          correct: true,
          feedback:
            "Correct. A stock is a share in the ownership of a company. Buy Apple stock and you're a partial owner alongside everyone else who holds it, entitled to a portion of the profits and exposed to the losses.",
        },
        {
          label: "Company manager",
          correct: false,
          feedback:
            "Ownership isn't management. Shareholders own a slice of the company, but the people running it day to day are employed to do that.",
        },
        {
          label: "Financial Deputy Chief",
          correct: false,
          feedback:
            "Not a real position, and not what a share buys. Owning stock makes you a partial owner of the company, nothing more and nothing less.",
        },
      ],
      source: SOURCES.stocks,
      xp: 25,
      next: "f4a1-dividends-quiz",
    },

    /* ---------------- 3b. what a stock pays out ---------------- */
    "f4a1-dividends-quiz": {
      id: "f4a1-dividends-quiz",
      type: "quiz",
      title: "Knowledge check: getting paid without selling",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Being a partial owner has a practical consequence,\" Nia says. \"Some companies hand a slice of their profits straight back to the people who own them.\"",
      ],
      question: "What are dividends?",
      options: [
        {
          label: "Taxes you pay on investments",
          correct: false,
          feedback:
            "Dividends are money coming to you, not going out. They're a portion of the company's profits distributed to shareholders, typically on a regular schedule.",
        },
        {
          label: "Fees charged by brokers",
          correct: false,
          feedback:
            "Fees are a cost. Dividends are a payment to you, taken from the company's profits because you own part of it.",
        },
        {
          label: "Portions of company profits paid to shareholders",
          correct: true,
          feedback:
            "Correct. Dividends are portions of a company's profits distributed to shareholders, typically regularly. They're one of the two ways a stock pays you; the other is capital gains, the stock price rising over time.",
        },
        {
          label: "Interest paid on bonds",
          correct: false,
          feedback:
            "Bonds pay interest payments, as compensation for lending the issuer money. Dividends come from stocks and are a share of company profit.",
        },
      ],
      source: SOURCES.stocks,
      xp: 25,
      next: "f4a1-risk-sort",
    },

    /* ---------------- 4. rank the risk ---------------- */
    "f4a1-risk-sort": {
      id: "f4a1-risk-sort",
      type: "sort",
      title: "Sort the assets by risk level",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Risk isn't a rating somebody assigns,\" Nia says. \"It's how much the value can swing. Put each of these where it belongs.\"",
      ],
      prompt: "Drag each asset into the right band.",
      buckets: [
        { id: "low", label: "Lower risk", hint: "Value moves slowly" },
        { id: "mid", label: "Middle", hint: "Above bonds, below single stocks" },
        { id: "high", label: "Higher risk", hint: "Value can swing hard" },
      ],
      items: [
        {
          id: "bonds",
          label: "Bonds",
          bucket: "low",
          explain: "Lower risk. Bonds are much safer than stocks, with a return usually in the 2-4% range that's close to guaranteed.",
        },
        {
          id: "gold",
          label: "Gold",
          bucket: "low",
          explain: "Lower risk, described as comparable to bonds, but with a stronger record: 6.3% average annually since 2000, adjusted for inflation.",
        },
        {
          id: "etf",
          label: "An S&P 500 ETF",
          bucket: "mid",
          explain: "In the middle. An ETF's risk is higher than bonds but lower than individual stocks, because it spreads your money across many companies at once.",
        },
        {
          id: "fund",
          label: "A mutual fund",
          bucket: "mid",
          explain: "Also in the middle, since it pools money across many holdings. Its problem isn't risk, it's that 80% of managers can't beat the market while charging higher fees.",
        },
        {
          id: "stock",
          label: "One company's stock",
          bucket: "high",
          explain: "Higher risk. A single company's value moves on market conditions, the economy, and that company's own financials, with nothing else to cushion it.",
        },
      ],
      source: SOURCES.etf,
      xp: 35,
      badge: "asset-mapper",
      next: "f4a1-bond-quiz",
    },

    /* ---------------- 5. what a bond actually is ---------------- */
    "f4a1-bond-quiz": {
      id: "f4a1-bond-quiz",
      type: "quiz",
      title: "Knowledge check: what you own when you own a bond",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"I always assumed a bond was a slower kind of stock,\" Marcus says. \"It isn't, is it.\"",
      ],
      question: "What is a bond?",
      options: [
        {
          label: "A type of stock",
          correct: false,
          feedback:
            "The two are opposites in structure. A stock makes you an owner; a bond makes you a lender, which is why bonds are much safer and return less.",
        },
        {
          label: "An ownership share in a company/corporation",
          correct: false,
          feedback:
            "That's a stock. Owning a bond makes you a lender rather than an owner: you get paid on a schedule instead of sharing in profits and losses.",
        },
        {
          label: "A loan you give to a company/government",
          correct: true,
          feedback:
            "Correct. A bond is a debt security issued by corporations, municipalities, or governments. You lend them money, they pay you interest along the way, usually twice a year, and return the face value on a specific date.",
        },
        {
          label: "A type of mutual fund",
          correct: false,
          feedback:
            "A mutual fund pools money from many investors into stocks, bonds and short-term debt. A bond is a single loan to a single issuer with a repayment date attached.",
        },
      ],
      source: SOURCES.bonds,
      xp: 25,
      next: "f4a1-managers-reveal",
    },

    /* ---------------- 6. the case against mutual funds ---------------- */
    "f4a1-managers-reveal": {
      id: "f4a1-managers-reveal",
      type: "reveal",
      title: "How often the professionals win",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"A mutual fund is actively managed, which sounds like an advantage,\" Nia says. \"Someone's paid to pick the winners. Guess what share of those managers fail to beat the market anyway.\"",
      ],
      question: "What share of mutual fund managers can't beat the market?",
      options: ["20%", "45%", "80%", "99%"],
      answerIndex: 2,
      value: "80%",
      caption: "Share of actively managed mutual fund managers who can't beat the market.",
      explain:
        "80% of managers can't beat the market, and mutual funds charge higher fees and offer less flexibility than ETFs. You're paying more for a worse result four times out of five, which is what makes the ETF the better tool.",
      source: SOURCES.etfVsFund,
      xp: 25,
      next: "f4a1-etf-quiz",
    },

    /* ---------------- 7. why the basket helps ---------------- */
    "f4a1-etf-quiz": {
      id: "f4a1-etf-quiz",
      type: "quiz",
      title: "Knowledge check: what an ETF buys you",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"Say you buy the SPDR S&P 500 Trust ETF with one payment,\" Nia says. \"What have you got?\"",
      ],
      question: "What does ETF stand for?",
      options: [
        {
          label: "Electronic Trading Fund",
          correct: false,
          feedback:
            "The E is for exchange, not electronic. An ETF is an Exchange-Traded Fund: a basket of investments, typically stocks, that trades on an exchange.",
        },
        {
          label: "Exchange-Traded Fund",
          correct: true,
          feedback:
            "Correct. An Exchange-Traded Fund is a basket of different investments, typically stocks. Buy the SPDR S&P 500 Trust ETF and you hold all 500 of the largest public companies in the U.S. at once, diversified at a fraction of the cost of buying them separately.",
        },
        {
          label: "European Trading Fund",
          correct: false,
          feedback:
            "Nothing regional about it. ETF stands for Exchange-Traded Fund, and they hold assets from anywhere, including the S&P 500 index of the largest U.S. companies.",
        },
        {
          label: "Enhanced Tax Fund",
          correct: false,
          feedback:
            "ETFs do have lower fees than mutual funds, but the name isn't about tax. It stands for Exchange-Traded Fund.",
        },
      ],
      source: SOURCES.etf,
      xp: 25,
      next: "f4a1-safest-quiz",
    },

    /* ---------------- 7b. the low-risk end ---------------- */
    "f4a1-safest-quiz": {
      id: "f4a1-safest-quiz",
      type: "quiz",
      title: "Knowledge check: the low-risk end of the list",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union",
      text: [
        "\"You've sorted these by risk already,\" Nia says. \"So this one should be quick.\"",
      ],
      question: "Which investment is considered one of the safest with low risk?",
      options: [
        {
          label: "Individual stocks",
          correct: false,
          feedback:
            "The highest-risk option on the list. A single company's value swings on market conditions, the economy, and its own financials, with nothing to cushion it.",
        },
        {
          label: "Cryptocurrency",
          correct: false,
          feedback:
            "Not one of the five options this course covers, and not a low-risk asset. The safe end of the list is bonds and gold.",
        },
        {
          label: "Gold",
          correct: true,
          feedback:
            "Correct. Gold is considered one of the safest investments you can make, with incredibly low risk comparable to bonds, and it has still returned 6.3% annually on average since 2000, adjusted for inflation.",
        },
        {
          label: "Startup companies",
          correct: false,
          feedback:
            "A single young company is riskier than a single established one, and individual stocks were already the high-risk end. Gold sits at the low-risk end alongside bonds.",
        },
      ],
      source: SOURCES.gold,
      xp: 25,
      next: "f4a1-gold-reveal",
    },

    /* ---------------- 8. gold's record ---------------- */
    "f4a1-gold-reveal": {
      id: "f4a1-gold-reveal",
      type: "reveal",
      title: "What gold has actually returned",
      speaker: "Marcus Ellery",
      avatar: "user",
      location: "Riverbend Credit Union",
      text: [
        "\"Gold gets talked about like it's either a doomsday thing or a scam,\" Marcus says. \"What does it actually do? Guess the average since 2000, after inflation.\"",
      ],
      question: "What has gold returned on average annually since 2000, adjusted for inflation?",
      options: ["1.2%", "3.5%", "6.3%", "14%"],
      answerIndex: 2,
      value: "6.3%",
      caption: "Gold's average annual return since 2000, adjusted for inflation.",
      explain:
        "Since 2000 gold has returned an average of 6.3% annually adjusted for inflation, at a risk level comparable to bonds. A bond-like risk with a better-than-bond return is why it holds up as a long-term investment, and it hedges against inflation and currency devaluation on top.",
      source: SOURCES.gold,
      xp: 25,
      next: "f4a1-dossier",
    },

    /* ---------------- 9. dossier ---------------- */
    "f4a1-dossier": {
      id: "f4a1-dossier",
      type: "dossier",
      title: "Coaching card: investment words",
      speaker: "Nia Barros",
      avatar: "file-text",
      location: "Riverbend Credit Union",
      text: [
        "\"These are the words on every account screen you'll ever open,\" Nia says. \"Learn them now and nobody gets to talk over your head later.\"",
      ],
      terms: [
        {
          term: "Stock",
          definition: "A security representing partial ownership in a company, with potential for capital gains and dividends.",
        },
        {
          term: "Bond",
          definition: "A debt security where the investor lends money to an issuer, a corporation, municipality, or government, in exchange for periodic interest payments and repayment of the loan's face value at maturity.",
        },
        {
          term: "ETF (Exchange-Traded Fund)",
          definition: "A type of fund composed of multiple assets, typically stocks, that offers diversified exposure with lower fees and more flexibility compared to mutual funds.",
        },
        {
          term: "Mutual Fund",
          definition: "A pooled investment that is actively managed, generally has higher fees and may underperform the market, unlike many ETFs.",
        },
        {
          term: "Gold",
          definition: "A precious metal valued for its intrinsic worth and used as a hedge against inflation and currency fluctuations.",
        },
        {
          term: "Capital Gains",
          definition: "The profit earned from the sale of an asset, such as a stock, when its selling price exceeds its purchase price.",
        },
        {
          term: "Dividends",
          definition: "Portions of a company's profits distributed to shareholders, typically regularly.",
        },
        {
          term: "Interest Payments",
          definition: "Payments made to bondholders as compensation for lending funds to the bond issuer.",
        },
        {
          term: "Hedge Against Inflation",
          definition: "An investment strategy, often involving assets like gold, used to protect against the loss of purchasing power due to inflation.",
        },
      ],
      source: SOURCES.stocks,
      xp: 20,
      next: "f4a1-handoff",
    },

    /* ---------------- 10. handoff to act 2 ---------------- */
    "f4a1-handoff": {
      id: "f4a1-handoff",
      type: "narrative",
      speaker: "Nia Barros",
      avatar: "compass",
      location: "Riverbend Credit Union, 16:40",
      text: [
        "\"You know what the options are and roughly how risky each one is,\" Nia says. \"That's half the decision.\"",
        "\"The other half is you. How much risk you can actually live with, and how long you're leaving the money alone. Those two change the answer more than the assets do.\"",
      ],
      xp: 15,
      next: "f4a2-start",
    },
  },
};

export default act1;
