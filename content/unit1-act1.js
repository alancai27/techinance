// @ts-check

/**
 * Cybersecurity, Unit 1, Act 1: "What Cybercrime Costs"
 *
 * Source material: SECTION A: The Importance of Cybersecurity
 * (Ankith N. Raghavendra, Techinance Technology Course Developer).
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   $10.5 trillion by 2025 · $3 trillion in 2015 · 105% ransomware rise
 *   since 2020 · 90% of breaches begin with phishing · $4.35 million average
 *   breach cost (IBM, 2022).
 *
 * Scene ids are namespaced `a1-*`. The last scene hands off to `a2-start`.
 */

/** Citations used by the statistic-bearing scenes in this act. */
const SOURCES = {
  threatReport: {
    label: "Cybersecurity Threat Report 2023",
    url: "https://www.cybersecurity-insiders.com/wp-content/uploads/2023/01/2023_Insider_Threat_Report-16d8d8f7.pdf",
  },
  ransomware: {
    label: "Ransomware Market Report 2022, Cybersecurity Ventures",
    url: "https://cybersecurityventures.com/ransomware-market-report-2022/",
  },
  ibm: {
    label: "IBM Security, Cost of a Data Breach Report 2022",
    url: "https://community.ibm.com/community/user/security/blogs/limor-kessem1/2022/07/27/the-2022-cost-of-a-data-breach-report-is-now-publi",
  },
  phishing: {
    label: "What is phishing? (CSO Online)",
    url: "https://www.csoonline.com/article/514515/what-is-phishing-examples-types-and-techniques.html",
  },
  identity: {
    label: "FTC: Equifax to pay $575 million over the 2017 data breach",
    url: "https://www.ftc.gov/news-events/news/press-releases/2019/07/equifax-pay-575-million-part-settlement-ftc-cfpb-states-related-2017-data-breach",
  },
};

/**
 * Badge metadata for the awards handed out in this act. The integrator
 * registers these on the episode; the ids match the `badge` field below.
 */
export const act1Badges = [
  {
    id: "phish-eye",
    name: "Phish Eye",
    description: "Found five genuine warning signs in a phishing email.",
    icon: "fish",
  },
];

export const act1 = {
  entry: "a1-start",
  scenes: {
    /* ---------------- 1. arrival ---------------- */
    "a1-start": {
      id: "a1-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance HQ, 07:52",
      text: [
        "It's your first shift at the Techinance Security Operations Centre, or SOC. That's the team that watches the company's systems and responds to attacks.",
        "Ravi Mehta runs the floor. He hands you your badge and starts your induction.",
        '"You\'re the new junior analyst. You\'ll be working real tickets from today, with me checking your notes."',
        '"One thing before we go in. Nothing on that floor is theoretical. Every incident on those screens affects real people and real money."',
      ],
      xp: 10,
      next: "a1-floor",
    },

    /* ---------------- 2. the SOC floor ---------------- */
    "a1-floor": {
      id: "a1-floor",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "The SOC is one long room facing a wall of screens showing maps, graphs and a counter that keeps climbing.",
        'Dana Okoye works on threat intelligence, which means tracking who is attacking and how. "That counter is live attack traffic."',
        '"Two terms first, because people mix them up. Cybercrime is the illegal activity: hacking, phishing, ransomware. Cybersecurity is the work of protecting systems, networks and programs from digital attacks."',
        '"Cybercrime is the problem. Cybersecurity is the response to it."',
      ],
      next: "a1-scale",
    },

    /* ---------------- 3. the showstopper number ---------------- */
    "a1-scale": {
      id: "a1-scale",
      type: "reveal",
      title: "The global cost of cybercrime",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi opens a slide with the figure hidden. "Have a guess first. Most people guess low."',
        '"The 2023 Cybersecurity Threat Report projects what cybercrime will cost the global economy by 2025. That\'s the total for every attack worldwide, per year."',
      ],
      question: "What is the projected global cost of cybercrime by 2025?",
      options: ["$3 trillion", "$4.35 trillion", "$10.5 trillion", "$265 trillion"],
      answerIndex: 2,
      value: "$10.5 trillion",
      caption: "Projected annual global cost of cybercrime by 2025.",
      explain:
        "The other figures are real numbers from this course, measuring different things. $3 trillion is what cybercrime cost the world in 2015, so it's the starting point rather than the projection: the cost has more than tripled in a decade. $4.35 trillion borrows its digits from $4.35 million, which is what a single data breach costs one organisation on average. That's a per-incident cost, not a global total, and the two differ by a factor of a million. The reason the world figure keeps climbing is that far more of what we own, owe and say is now stored on a network, so there's far more for attackers to reach.",
      source: SOURCES.threatReport,
      xp: 30,
      next: "a1-oracle",
    },

    /* ---------------- 4. meeting ORACLE ---------------- */
    "a1-oracle": {
      id: "a1-oracle",
      type: "terminal",
      title: "Using the ORACLE terminal",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        'Ravi takes you to an empty desk. "This is ORACLE, the SOC assistant terminal. You query it for data."',
        '"Start with the ransomware trend, then pull your own queue. You already have a ticket waiting."',
      ],
      prompt: "Run the required commands to get up to speed.",
      host: "analyst@techinance-soc",
      commands: [
      ],
      source: SOURCES.ransomware,
      xp: 25,
      next: "a1-ransomware-quiz",
    },

    /* ---------------- 5. the 105% quiz ---------------- */
    "a1-ransomware-quiz": {
      id: "a1-ransomware-quiz",
      type: "quiz",
      title: "Knowledge check: the 105% rise",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Analyst station 7",
      text: [
        'Ravi reads the trend output over your shoulder. "You pulled that one yourself. Tell me what it says."',
      ],
      question: "Which type of cyberattack increased by 105% since 2020?",
      options: [
        {
          label: "Phishing attacks",
          correct: false,
          feedback:
            "Phishing has a big number attached to it, but it's a different measurement: the share of data breaches it's linked to, not a rate of growth. Watch what a statistic is counting before you match it to a figure.",
        },
        {
          label: "Ransomware attacks",
          correct: true,
          feedback:
            "Correct. Ransomware attacks have increased by 105% since 2020. Ransomware encrypts a victim's data and demands payment to release it. ORACLE flagged the rise as steady, not a one-off spike, which is why it changes how the SOC plans its year.",
        },
        {
          label: "Identity Theft",
          correct: false,
          feedback:
            "Identity theft is the fraudulent use of someone else's personal information, usually for financial gain. It's normally what an attacker does with stolen data afterwards, so it isn't the attack method the trend feed tracks.",
        },
        {
          label: "DDoS attacks",
          correct: false,
          feedback:
            "A DDoS attack floods a service with traffic until it stops responding. It disrupts, but it doesn't encrypt files or demand a payment, and it isn't the trend ORACLE just printed.",
        },
      ],
      source: SOURCES.ransomware,
      xp: 25,
      next: "a1-budget",
    },

    /* ---------------- 6. the tempting wrong answer ---------------- */
    "a1-budget": {
      id: "a1-budget",
      type: "choice",
      title: "Spending the security budget",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi sets you a practice question. "Finance has just given us next year\'s security budget."',
        '"For scale: IBM put the average cost of a single data breach at $4.35 million in 2022. That figure is the direct cost only. It doesn\'t include lost reputation or the legal action that follows."',
      ],
      prompt: "How do you argue the budget should be spent?",
      options: [
        {
          label: "All of it on the strongest firewalls and intrusion detection money can buy.",
          next: "a1-breachcost-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "This looks like the serious answer, because it's equipment you can point at. But 90% of data breaches begin with a phishing attack, where someone is tricked into handing over a password. A firewall can't stop a person who gives away the password voluntarily, so this plan leaves the main route in untouched.",
        },
        {
          label:
            "Split it: technical controls, plus awareness training for everyone who touches a keyboard.",
          next: "a1-breachcost-quiz",
          xp: 20,
          tone: "good",
          feedback:
            "Correct. Technology stops the attacks that arrive over the network. Awareness training stops the ones that arrive in the inbox. Ravi: \"Nine out of ten breaches start with phishing, so training people matters as much as the equipment.\"",
        },
        {
          label: "Buy a large cyber-insurance policy and accept the risk.",
          next: "a1-breachcost-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Insurance might refund part of that $4.35 million. It doesn't recover the leaked data, the customers' trust or a stolen identity. Dana: \"Insurance covers some of the loss. It doesn't prevent the attack.\"",
        },
      ],
      source: SOURCES.ibm,
    },

    /* ---------------- 7. the breach cost quiz ---------------- */
    "a1-breachcost-quiz": {
      id: "a1-breachcost-quiz",
      type: "quiz",
      title: "Knowledge check: what one breach costs",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        '"Before you write that up, check you kept the figure straight," Ravi says. "Half of security work is arguing about money, and the wrong number loses the argument."',
      ],
      question: "What was the average cost of a data breach for organizations in 2022?",
      options: [
        {
          label: "$4.4 million",
          correct: false,
          feedback:
            "That's the ransom Colonial Pipeline paid in 2021 to get its own systems back, which you'll work through in act 2. It's one payment by one company in one incident, not an average across organisations, and the two figures sit close enough together that people mix them up. Check which one a source is describing before you quote it.",
        },
        {
          label: "$4.35 million",
          correct: true,
          feedback:
            "Correct. IBM put the average cost of a data breach at $4.35 million in 2022. That's the direct cost only, so it leaves out the lost reputation and the legal action that follow.",
        },
        {
          label: "$10.5 trillion",
          correct: false,
          feedback:
            "That's the projected cost of cybercrime to the whole global economy by 2025, every attack everywhere added together for a year. No single organisation's breach costs the size of the world total. Global figures run in trillions, one breach runs in millions.",
        },
        {
          label: "$3 trillion",
          correct: false,
          feedback:
            "That's what cybercrime cost the global economy in 2015, so it's a worldwide annual total from a different year rather than one organisation's loss. Read both the unit and the year on a statistic before you use it.",
        },
      ],
      source: SOURCES.ibm,
      xp: 25,
      next: "a1-dossier",
    },

    /* ---------------- 8. key terms ---------------- */
    "a1-dossier": {
      id: "a1-dossier",
      type: "dossier",
      title: "Key terms",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana gives you a reference card. "Everyone on this floor uses these words the same way. Learn them now and the rest of the shift makes sense."',
      ],
      terms: [
        {
          term: "Cybersecurity",
          definition:
            "Protecting systems, networks and programs from digital attacks. This is the job you're doing.",
        },
        {
          term: "Cybercrime",
          definition:
            "Illegal activity carried out through digital means, such as hacking, phishing and ransomware attacks.",
        },
        {
          term: "Cyber-attack",
          definition:
            "Any attempt to exploit or damage a computer system, network or data through unauthorised access.",
        },
        {
          term: "Digital world",
          definition:
            "The ever-expanding online and technological environment we live in. As it grows, so does the amount that can be attacked.",
        },
        {
          term: "Phishing attack",
          definition:
            "Attackers disguise themselves as a legitimate person or organisation to trick someone into handing over sensitive information, like passwords.",
        },
        {
          term: "Ransomware attack",
          definition:
            "A cyberattack where attackers encrypt a victim's data and demand payment to release it.",
        },
        {
          term: "Data breach",
          definition:
            "An incident where confidential, sensitive or protected data is accessed or disclosed without authorisation.",
        },
        {
          term: "Identity theft",
          definition:
            "The fraudulent use of someone else's personal information, usually to gain financial benefits.",
        },
        {
          term: "Cybersecurity awareness",
          definition:
            "Knowing what the threats look like and how to prevent them. It's the cheapest control available.",
        },
        {
          term: "Students",
          definition:
            "In this course: people who are especially exposed to cybercrime, because they're online constantly and rarely get warned about it.",
        },
      ],
      xp: 20,
      next: "a1-phish-quiz",
    },

    /* ---------------- 9. the 90% quiz ---------------- */
    "a1-phish-quiz": {
      id: "a1-phish-quiz",
      type: "quiz",
      title: "Knowledge check: phishing and breaches",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        '"One number worth remembering," Ravi says, "because it decides how we spend our time."',
      ],
      question: "What percentage of data breaches are linked to phishing attacks?",
      options: [
        {
          label: "50%",
          correct: false,
          feedback:
            "Half would mean the inbox is one route in among several, and that splitting your attention evenly between email and everything else is reasonable. The real share is higher, so email deserves more than half your attention, not half.",
        },
        {
          label: "75%",
          correct: false,
          feedback:
            "Closer, but it still understates it. Three quarters leaves a quarter of breaches coming from somewhere else, which makes the technical routes in look far more important than they are. The gap between three in four and the real figure is what decides where the training budget goes.",
        },
        {
          label: "90%",
          correct: true,
          feedback:
            "Correct. 90% of data breaches are linked to phishing attacks: attackers tricking people into handing over sensitive information. That's why your first task today is an email, not a firewall.",
        },
        {
          label: "20%",
          correct: false,
          feedback:
            "One in five would put phishing behind unpatched software and stolen hardware as a cause of breaches, and you'd spend your budget on equipment. It's the other way round: phishing leads by a long way, and the technical causes trail it.",
        },
      ],
      source: SOURCES.phishing,
      xp: 25,
      next: "a1-ticket",
    },

    /* ---------------- 10. the ticket ---------------- */
    "a1-ticket": {
      id: "a1-ticket",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Analyst station 7",
      text: [
        'Ravi opens the ticket ORACLE listed. "Priya Raman, a second-year student. She forwarded this email at 02:40 last night and asked whether it was real."',
        '"Students are a common target. They\'re online constantly, they\'re usually in a hurry, and most have never been shown what a scam looks like. Attackers know that."',
        '"Don\'t just tell me it\'s fake. Write down each thing in the message that shows it, so Priya can see the reasoning."',
      ],
      next: "a1-inspect",
    },

    /* ---------------- 11. inspect the phish ---------------- */
    "a1-inspect": {
      id: "a1-inspect",
      type: "inspect",
      title: "Ticket #1: forwarded email",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "The message opens in the sandbox viewer, an isolated environment where nothing in the email can run or do harm.",
        "Check each part of the message: who sent it, where a reply would go, the subject, the greeting, the links, and the spelling.",
      ],
      prompt:
        "Tap anything that looks wrong. Find at least 5 genuine warning signs to close the ticket.",
      artifact: {
        kind: "email",
        fields: [
          {
            label: "From",
            value: "Techinance Scholarship Office <awards@techinance-grants.com>",
            hot: "sender",
          },
          {
            label: "Reply-To",
            value: "claim.desk@secure-student-verify.net",
            hot: "replyto",
          },
          {
            label: "To",
            value: "p.raman@student.techinance.org",
            hot: "recipient",
          },
          {
            label: "Date",
            value: "Tue, 02:14 (local)",
            hot: "timestamp",
          },
          {
            label: "Subject",
            value: "ACTION REQUIRED: your $5,000 Merit Award expires in 24 hours",
            hot: "subject",
          },
        ],
        body: [
          { hot: "greeting", text: "Dear Student," },
          "Congratulations. Your name has been put forward for this year's Techinance Merit Award.",
          {
            hot: "spelling",
            text: "To recieve the funds we must verify your enrolment for the current acedemic year.",
          },
          {
            hot: "deadline",
            text: "You have 24 hours. If you do not confirm, the award will be released to another applicant and cannot be restored.",
          },
          {
            hot: "link",
            text: "Confirm your place here: techinance.org/scholarships/confirm  ->  http://tech1nance-awards.secure-student-verify.net/claim",
          },
          "Please have your student portal username, password and date of birth ready before you begin.",
          "Kind regards,",
          { hot: "signature", text: "Techinance Scholarship Office" },
        ],
      },
      hotspots: {
        sender: {
          suspicious: true,
          explain:
            "Check the domain first. Our mail comes from techinance.org. This came from techinance-grants.com, a different domain chosen because it reads like ours. Anyone can register a name that sits close to a real one.",
        },
        replyto: {
          suspicious: true,
          explain:
            "Now check where a reply would go. The message claims to come from techinance-grants.com, but a reply is addressed to secure-student-verify.net. Legitimate mail almost never splits those two.",
        },
        recipient: {
          suspicious: false,
          explain:
            "That's Priya's real student address, spelled correctly. It isn't a warning sign. Attackers buy and scrape address lists, so getting her address right proves nothing either way.",
        },
        timestamp: {
          suspicious: false,
          explain:
            "02:14 looks odd, but on its own it's weak evidence. Real systems send mail overnight, and senders work in other time zones. Don't build a case on the send time alone.",
        },
        subject: {
          suspicious: true,
          explain:
            "Capital letters, a countdown and a cash figure in a single line. That combination is designed to make you act before you check anything. Genuine award offices don't write subject lines like this.",
        },
        greeting: {
          suspicious: true,
          explain:
            'An office that had genuinely selected Priya would write "Dear Priya". "Dear Student" is what you write when you\'re sending the same message to thousands of people.',
        },
        spelling: {
          suspicious: true,
          explain:
            '"recieve" and "acedemic": two spelling errors in one sentence. Official communications are proofread. Errors like these also put off careful readers, which leaves the attacker with the people least likely to check details.',
        },
        deadline: {
          suspicious: true,
          explain:
            "24 hours, and the money is gone for good if she misses it. The aim is to make her panic. Pressure to act immediately is one of the most reliable signs of a phishing attack.",
        },
        link: {
          suspicious: true,
          explain:
            "Compare the link text with the address it points to. The text says techinance.org. The real destination is tech1nance-awards.secure-student-verify.net, which uses the number 1 in place of the letter i and sits on a domain we don't own. Always check where a link actually goes, not what it says.",
        },
        signature: {
          suspicious: false,
          explain:
            "The department name is real, but attackers copy it from the public website. A correct-looking signature isn't evidence that the message is genuine.",
        },
      },
      requiredFinds: 5,
      source: SOURCES.phishing,
      xp: 40,
      badge: "phish-eye",
      next: "a1-aftermath",
    },

    /* ---------------- 12. the human cost ---------------- */
    "a1-aftermath": {
      id: "a1-aftermath",
      type: "choice",
      title: "Priya has already entered her details",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Analyst station 7",
      text: [
        'Priya replies to the ticket while you\'re writing your notes: "I already put my details in. It was 2am. It\'s only my student login, right?"',
        'Dana reads the reply. "It\'s not only a login. That portal holds her date of birth, her home address and the bank account her fee refunds go to."',
        '"That\'s the material needed for identity theft, which is the fraudulent use of someone else\'s personal information, usually for financial gain. It can mean fraudulent loans and accounts in her name, and months of work to prove they aren\'t hers."',
      ],
      prompt: "What do you send back to Priya?",
      options: [
        {
          label: "Reassure her. It's only a student account, the risk is low.",
          next: "a1-career",
          xp: 5,
          tone: "bad",
          feedback:
            "Kind, but wrong. A student portal holds exactly the details identity thieves want: name, date of birth, address and bank details. If she's told the risk is low, she won't change her password tonight, and the attacker keeps the access.",
        },
        {
          label:
            "Walk her through it now: change the password, turn on two-factor, watch the bank account, report it here.",
          next: "a1-career",
          xp: 25,
          tone: "good",
          feedback:
            "Correct, and quickly. Once credentials are stolen, speed is the defender's main advantage. Dana: \"Also tell her she did the right thing by reporting it. People who feel stupid stop reporting, and then we find out months later.\"",
        },
        {
          label: "Tell her to delete the email quietly so she doesn't get in trouble.",
          next: "a1-career",
          xp: 5,
          tone: "bad",
          feedback:
            "This is how a small incident becomes a large one. Deleting the email doesn't cancel the stolen password. It also makes her feel she did something wrong. Victims report financial loss and real emotional distress, and staying silent makes both worse.",
        },
      ],
      source: SOURCES.identity,
    },

    /* ---------------- 13. the career hook ---------------- */
    "a1-career": {
      id: "a1-career",
      type: "quiz",
      title: "Careers in cybersecurity",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi reads your notes and closes the ticket. "Good. You showed the evidence, not just the conclusion."',
        '"Last question of your induction. This industry has a staffing problem that works in your favour. What is it?"',
      ],
      question: "What's the workforce problem that makes cybersecurity such a strong career field?",
      options: [
        {
          label: "There are far more trained analysts than there are jobs.",
          correct: false,
          feedback:
            "It's the other way round. If there were a surplus of analysts, Ravi wouldn't be handing live tickets to someone on their first day.",
        },
        {
          label:
            "There's a global shortage of people trained in cybersecurity, so demand outruns supply.",
          correct: true,
          feedback:
            "Correct. Cybersecurity is facing manpower shortages on a global scale. Learning these principles at school or university protects you, and it's also a direct route into the work.",
        },
        {
          label: "Automated tools have almost replaced human analysts.",
          correct: false,
          feedback:
            "Tools handle the repetitive work. They don't read a scholarship email and notice that the letter i has been replaced with a number 1. Human judgement is still scarce, which is why the shortage exists.",
        },
        {
          label: "Attack numbers are falling, so the field is shrinking.",
          correct: false,
          feedback:
            "Attacks are rising, not falling: $3 trillion in 2015 to a projected $10.5 trillion by 2025, with ransomware up 105% since 2020. The field is growing faster than people can be trained for it.",
        },
      ],
      xp: 20,
      next: "a1-alert",
    },

    /* ---------------- 14. handoff to act 2 ---------------- */
    "a1-alert": {
      id: "a1-alert",
      type: "narrative",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Security Operations Centre, 09:31",
      text: [
        "Near the end of your shift, a priority alert comes in.",
        'ORACLE: "Priority one. Anomalous outbound traffic from a monitoring agent on the finance network. Signature doesn\'t match any known update."',
        'Dana starts typing. "That isn\'t someone clicking a link. That\'s software we installed ourselves, sending data somewhere it shouldn\'t."',
        'Ravi: "This is what those numbers are made of. Let\'s work it."',
      ],
      xp: 10,
      next: "a2-start",
    },
  },
};

export default act1;
