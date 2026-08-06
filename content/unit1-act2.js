// @ts-check

/**
 * Cybersecurity, Unit 1, Act 2: "How Recent Breaches Happened"
 *
 * Source material: SECTION B, Recent Cybersecurity Breaches
 * (Darren Chen, Techinance Technology Course Developer).
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   $4.4 million Colonial Pipeline ransom · $11 million paid by JBS USA ·
 *   533 million Facebook users · 50 million T-Mobile customers ·
 *   30,000+ organisations hit through Microsoft Exchange Server ·
 *   75% of ransomware victims are in critical infrastructure sectors ·
 *   90% of companies have experienced a phishing attack ·
 *   20% increase in supply chain attacks between 2020 and 2021.
 *
 * Four scenes here carry official Unit 1 quiz questions, worded and optioned
 * exactly as content/sources/unit1-quiz-questions.md has them:
 *   a2-supply-quiz · a2-colonial-quiz · a2-ransom-amount-quiz · a2-facebook-quiz.
 * Their wrong answers quote figures from elsewhere in the course ($4.35 million
 * average breach cost, $575 million Equifax settlement, 147 million Equifax
 * records, 3 billion Yahoo accounts, 1.35 Tbps GitHub DDoS) so learners can tell
 * the incidents apart. Those figures must stay exact too.
 *
 * Scene ids are namespaced `a2-*`. The last scene hands off to `a3-start`.
 */

/** Citations used by the case-file scenes in this act (Section B works cited). */
const SOURCES = {
  solarwinds: {
    label: "GAO: SolarWinds cyberattack demands significant federal and private sector response",
    url: "https://www.gao.gov/blog/solarwinds-cyberattack-demands-significant-federal-and-private-sector-response-infographic",
  },
  supplyChain: {
    label: "ENISA: Threat Landscape for Supply Chain Attacks",
    url: "https://www.enisa.europa.eu/publications/threat-landscape-for-supply-chain-attacks",
  },
  exchange: {
    label: "Microsoft Security Blog: HAFNIUM targeting Exchange Servers",
    url: "https://www.microsoft.com/en-us/security/blog/2021/03/02/hafnium-targeting-exchange-servers/",
  },
  colonial: {
    label: "The attack on Colonial Pipeline: what we've learned (CISA)",
    url: "https://www.cisa.gov/news-events/news/attack-colonial-pipeline-what-weve-learned-what-weve-done-over-past-two-years",
  },
  jbs: {
    label: "BBC News: JBS ransomware attack",
    url: "https://www.bbc.com/news/world-us-canada-57325702",
  },
  tmobile: {
    label: "Reuters: US reaches $315 million settlement with T-Mobile over data breaches",
    url: "https://www.reuters.com/business/media-telecom/us-reaches-315-million-settlement-with-t-mobile-over-data-breaches-2024-09-30/",
  },
  facebook: {
    label: "BBC News: Facebook data leak",
    url: "https://www.bbc.com/news/technology-56745734",
  },
};

/**
 * Badge metadata for the awards handed out in this act. The integrator
 * registers these on the episode; the ids match the `badge` field below.
 */
/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [];

export const act2 = {
  entry: "a2-start",
  scenes: {
    /* ---------------- 1. into the war room ---------------- */
    "a2-start": {
      id: "a2-start",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre, 09:38",
      text: [
        "Dana takes you into a side room off the SOC floor to work the alert.",
        '"Here\'s what we have," she says. "Our own monitoring agent, software we bought and installed ourselves, is sending traffic to an address we can\'t account for."',
        'Ravi joins you. "Attackers reuse methods that have already worked. If Nightjar is following an existing pattern, that pattern is documented in public breach reports."',
        '"ORACLE holds those reports. We start there."',
      ],
      xp: 10,
      next: "a2-archive",
    },

    /* ---------------- 2. the archive ---------------- */
    "a2-archive": {
      id: "a2-archive",
      type: "terminal",
      title: "ORACLE: breach archive",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Security Operations Centre",
      text: [
        'Ravi points at the console. "ORACLE stores every major public breach since 2020 as a case file. Open them and read how each attack worked, not just what it cost."',
        '"Three of the files are directly relevant to our alert. The rest are worth knowing anyway."',
      ],
      prompt: "Open the case files. The required ones are the ones that match our alert.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "list",
          cmd: "archive --list --since 2020",
          output: [
            "BREACH ARCHIVE // 6 case files",
            "  solarwinds-orion .... late 2020   supply chain",
            "  exchange-server ..... early 2021  zero-day, backdoors",
            "  facebook-leak ....... Apr 2021    mass data leak",
            "  colonial-pipeline ... May 2021    ransomware, energy",
            "  jbs-usa ............. 2021        ransomware, food supply",
            "  t-mobile ............ Aug 2021    mass data leak",
            "open one with `case --open <id>`",
          ],
          required: false,
        },
        {
          id: "solarwinds",
          cmd: "case --open solarwinds-orion",
          output: [
            "CASE // solarwinds-orion · discovered late 2020",
            "SolarWinds Orion is network monitoring software. Attackers",
            "compromised it, so the malicious code arrived inside an update",
            "customers installed themselves.",
            "reach ......... thousands of organisations, incl. US government agencies",
            "taken ......... sensitive communications and proprietary data",
            "outcome ....... treated as a national security crisis",
            "lesson ........ the attackers entered through software the victims",
            "                already trusted and installed on purpose.",
          ],
          required: true,
        },
        {
          id: "exchange",
          cmd: "case --open exchange-server",
          output: [
            "CASE // exchange-server · early 2021",
            "Attackers exploited vulnerabilities in Microsoft's email server",
            "software to reach communications and install backdoors for",
            "future breaches.",
            "reach ......... over 30,000 organisations globally",
            "victims ....... every size, from small enterprises to large corporations",
            "lesson ........ patch management is a security control, not routine",
            "                admin work.",
          ],
          required: true,
        },
        {
          id: "colonial",
          cmd: "case --open colonial-pipeline",
          output: [
            "CASE // colonial-pipeline · May 2021",
            "Ransomware halted operations at the largest fuel pipeline in the US.",
            "public impact .. widespread fuel shortages and panic buying,",
            "                 East Coast",
            "ransom paid ... $4,400,000 to regain control of its systems",
            "lesson ........ an attack on critical infrastructure reaches the",
            "                public within days.",
          ],
          required: true,
        },
        {
          id: "tmobile",
          cmd: "case --open t-mobile",
          output: [
            "CASE // t-mobile · August 2021",
            "affected ...... over 50,000,000 customers",
            "exposed ....... names, social security numbers, driver's licence details",
            "ransom ........ none. no encryption, no shutdown.",
            "lesson ........ the cost falls on customers for years afterwards,",
            "                as identity theft and financial fraud.",
          ],
          required: false,
        },
        {
          id: "facebook",
          cmd: "case --open facebook-leak",
          output: [
            "CASE // facebook-leak · April 2021",
            "affected ...... over 533,000,000 users worldwide",
            "exposed ....... phone numbers and email addresses",
            "response ...... initially downplayed by the company",
            "afterlife ..... data reused in phishing attacks, scams and other",
            "                forms of cybercrime",
          ],
          required: false,
        },
        {
          id: "jbs",
          cmd: "case --open jbs-usa",
          output: [
            "CASE // jbs-usa · 2021",
            "sector ........ food supply",
            "impact ........ disrupted global food supply operations",
            "payment ....... $11,000,000",
            "lesson ........ food supply is critical infrastructure, the same",
            "                category as energy.",
          ],
          required: false,
        },
        {
          id: "compare",
          cmd: "case --compare --actor nightjar",
          output: [
            "COMPARE // live alert vs archive",
            "shared indicators:",
            "  [x] entry through trusted, already-installed software",
            "  [x] no signature match. nothing in the archive fires on it",
            "  [x] quiet outbound traffic, long intervals",
            "  [ ] files encrypted on disk .................... not observed",
            "  [ ] customer records staged for export ......... not observed",
            "verdict: insufficient for automated attribution. analyst decision required.",
          ],
          required: true,
        },
      ],
      source: SOURCES.solarwinds,
      xp: 40,
      next: "a2-supply-quiz",
    },

    /* ---------------- 3. what a supply chain attack is ---------------- */
    "a2-supply-quiz": {
      id: "a2-supply-quiz",
      type: "quiz",
      title: "Knowledge check: identifying a supply chain attack",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana lines up four well-known incidents next to the SolarWinds file. "All four are real. Only one of them is a supply chain attack."',
        '"Supply chain attacks rose 20% between 2020 and 2021, so learning to recognise the shape of one matters."',
      ],
      question: "Which of the following is an example of a supply chain attack?",
      options: [
        {
          label: "2016 Democratic National Committee email leak",
          correct: false,
          feedback:
            "That one started with phishing. Staff were tricked into handing over their email passwords, and the stolen messages were published. Nobody's software supplier was touched, so the attackers only reached the one organisation they fooled.",
        },
        {
          label: "SolarWinds Orion breach",
          correct: true,
          feedback:
            "Correct. Orion is network monitoring software. The attackers compromised that trusted third-party product, then rode it into every organisation that installed it. The malicious code arrived inside a normal, signed update that IT teams applied on purpose, so nobody had to be fooled and security tools treated it as legitimate. No files were encrypted and no ransom was demanded: the attackers stayed quiet, taking sensitive communications and proprietary data from thousands of organisations, including US government agencies. That's the pattern: break in once at the supplier, reach all of the supplier's customers. Supply chain attacks rose 20% between 2020 and 2021 for exactly that reason.",
        },
        {
          label: "GitHub DDoS attack",
          correct: false,
          feedback:
            "That was a denial-of-service attack. In 2018 GitHub was flooded with 1.35 terabits per second of traffic, the largest recorded at the time, until the site couldn't serve users. Nothing was stolen and no software was tampered with. The goal was to knock a service offline, not to hide inside a trusted product.",
        },
        {
          label: "WannaCry ransomware attack",
          correct: false,
          feedback:
            "WannaCry encrypted victims' files and demanded payment to unlock them. It spread by exploiting a known flaw in unpatched Windows systems, so the failure was missing patches rather than a compromised supplier. Ransomware also announces itself immediately, while a supply chain intrusion is built to stay hidden.",
        },
      ],
      source: SOURCES.supplyChain,
      xp: 25,
      next: "a2-exchange-log",
    },

    /* ---------------- 4. reading a real victim log ---------------- */
    "a2-exchange-log": {
      id: "a2-exchange-log",
      type: "inspect",
      title: "Archive replay: Exchange Server, early 2021",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Security Operations Centre",
      text: [
        'Ravi opens a second file. "Early 2021. Attackers exploited vulnerabilities in Microsoft Exchange Server and reached over 30,000 organisations globally."',
        "ORACLE replays a redacted log from one victim's mail server, covering a single morning.",
        '"Look for the points where the attacker went from getting in to staying in," Ravi says.',
      ],
      prompt: "Tap anything that should have started an incident. Find at least 4 genuine warning signs.",
      artifact: {
        kind: "log",
        fields: [
          {
            label: "Host",
            value: "MAIL-EX01 · Microsoft Exchange Server · archived victim, name redacted",
            hot: "host",
          },
          {
            label: "Exposure",
            value: "Webmail published to the public internet",
            hot: "exposure",
          },
          {
            label: "Patch level",
            value: "Last security update applied 214 days ago",
            hot: "patch",
          },
          {
            label: "Detection",
            value: "0 signature matches. No rule existed for this yet",
            hot: "signature",
          },
        ],
        body: [
          "08:02:11  GET /owa/auth/logon.aspx        200   normal staff sign-in",
          "08:47:56  GET /owa/#path=/mail            200   normal mailbox read",
          {
            hot: "unauth",
            text: "09:14:03  POST /ecp/DDI/DDIService.svc    200   request carried no valid session, server answered anyway",
          },
          {
            hot: "webshell",
            text: "09:14:40  FILE WRITTEN  \\aspnet_client\\system_web\\error_page.aspx  (4 KB)  new script in a web-reachable folder",
          },
          "09:15:02  SERVICE RESTART  MSExchangeServiceHost  (scheduled maintenance window)",
          {
            hot: "export",
            text: "09:31:55  MAILBOX EXPORT  47 mailboxes → 6.1 GB archive, written to a public web folder",
          },
          {
            hot: "account",
            text: "09:44:20  NEW ACCOUNT  svc_exch_backup  added to Organization Management (created by: SYSTEM)",
          },
          {
            hot: "beacon",
            text: "09:48:12  OUTBOUND HTTPS  185.x.x.x  1.2 KB, repeating every 300 seconds, still running at shift end",
          },
          "17:00:00  Shift ended. No ticket was raised on this host for 61 days.",
        ],
      },
      hotspots: {
        host: {
          suspicious: false,
          explain:
            "A mail server isn't suspicious. Almost every organisation in the archive ran one, which is why a flaw in it was valuable to an attacker.",
        },
        exposure: {
          suspicious: false,
          explain:
            "Webmail has to be reachable from the internet so staff can read email from home. Being exposed is normal. Being exposed and unpatched is the problem.",
        },
        patch: {
          suspicious: true,
          explain:
            "214 days without a security update. Patch management is the process of applying software updates that fix known security holes. Skipping it leaves a fixable flaw open for seven months.",
        },
        signature: {
          suspicious: true,
          explain:
            "Zero signature matches, because this was a zero-day vulnerability: a flaw attackers exploit before the software provider can issue a fix. Detection tools can't alert on an attack that hasn't been identified yet, so you have to judge the behaviour instead.",
        },
        unauth: {
          suspicious: true,
          explain:
            "A request with no valid session, answered with 200 OK. Authentication was bypassed rather than passed. Every legitimate line above it belongs to a signed-in user.",
        },
        webshell: {
          suspicious: true,
          explain:
            "A new script appears in a folder reachable from the internet. That's a backdoor: a way to bypass normal authentication and keep long-term access. It's the point where a single break-in becomes ongoing access.",
        },
        account: {
          suspicious: true,
          explain:
            'A new administrator account named to look like a backup service, created by "SYSTEM" during an intrusion. Attackers add a second way in, so fixing the first one doesn\'t remove them.',
        },
        export: {
          suspicious: true,
          explain:
            "47 mailboxes packed into one 6.1 GB archive and left in a web folder. That isn't something a user does by accident. It's stolen data being staged for collection.",
        },
        beacon: {
          suspicious: true,
          explain:
            "Small outbound transfers on a fixed 300-second interval. A regular machine-timed pattern like that is installed software reporting to an external server, which is the same behaviour our own monitoring agent is showing.",
        },
      },
      requiredFinds: 4,
      source: SOURCES.exchange,
      xp: 40,
      next: "a2-sort",
    },

    /* ---------------- 5. classify the archive ---------------- */
    "a2-sort": {
      id: "a2-sort",
      type: "sort",
      title: "Sort the archive",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana lists the six incidents and three attack patterns on the whiteboard. "Group them. Naming the pattern is how you work out what an attacker is likely to do next."',
        '"Sort by what the attacker actually did, not by how well known the case is."',
      ],
      prompt: "Drop each incident into the attack pattern it belongs to.",
      buckets: [
        {
          id: "supply",
          label: "Supply Chain and Vendor Software",
          hint: "One weakness inside software thousands of organisations already trust and run.",
        },
        {
          id: "extortion",
          label: "Ransomware on Critical Infrastructure",
          hint: "Shut down a service the public depends on, then demand payment to restore it.",
        },
        {
          id: "leak",
          label: "Mass Personal Data Leak",
          hint: "No encryption and no shutdown. Millions of people's private details are exposed.",
        },
      ],
      items: [
        {
          id: "solarwinds",
          label: "SolarWinds Orion (late 2020)",
          bucket: "supply",
          explain:
            "The textbook case. Network monitoring software was compromised, so the attack arrived inside an update thousands of organisations installed themselves, including US government agencies. Attackers reached sensitive communications and proprietary data, and it became a national security crisis.",
        },
        {
          id: "exchange",
          label: "Microsoft Exchange Server (early 2021)",
          bucket: "supply",
          explain:
            "Over 30,000 organisations globally, through vulnerabilities in one email product, and the attackers installed backdoors for future breaches. The break-in method differs from SolarWinds, but the pattern is the same: one flaw in widely used software, thousands of victims at once, from small enterprises to large corporations.",
        },
        {
          id: "colonial",
          label: "Colonial Pipeline (May 2021)",
          bucket: "extortion",
          explain:
            "Ransomware halted the largest fuel pipeline in the US, causing widespread fuel shortages and panic buying along the East Coast. Colonial Pipeline paid a $4.4 million ransom to regain control of its systems.",
        },
        {
          id: "jbs",
          label: "JBS USA (2021)",
          bucket: "extortion",
          explain:
            "The JBS USA ransomware attack disrupted global food supply operations and ended in an $11 million payment. Energy and food are both critical infrastructure: essential services a country can't go without.",
        },
        {
          id: "tmobile",
          label: "T-Mobile (August 2021)",
          bucket: "leak",
          explain:
            "Over 50 million customers had personal information exposed, including names, social security numbers and driver's licence details. Nothing was encrypted and nothing was shut down. The harm arrives later, as identity theft and financial fraud affecting customers for years.",
        },
        {
          id: "facebook",
          label: "Facebook (April 2021)",
          bucket: "leak",
          explain:
            "Over 533 million users' personal information, including phone numbers and email addresses, was exposed. Facebook initially downplayed it, and the data has since been used in phishing attacks, scams and other forms of cybercrime.",
        },
      ],
      source: SOURCES.supplyChain,
      xp: 40,
      badge: "case-historian",
      next: "a2-critical",
    },

    /* ---------------- 6. why critical infrastructure ---------------- */
    "a2-critical": {
      id: "a2-critical",
      type: "quiz",
      title: "Knowledge check: ransomware and critical infrastructure",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        '"Colonial Pipeline in May 2021, fuel. JBS USA the same year, food supply, $11 million paid." Ravi has both files open. "Two ransomware attacks, both on essential services."',
        '"75% of ransomware victims are in critical infrastructure sectors. Explain why attackers choose those targets."',
      ],
      question:
        "Why do ransomware operators disproportionately target critical infrastructure like energy, healthcare and food supply?",
      options: [
        {
          label: "Those organisations have the weakest computer security of any sector.",
          correct: false,
          feedback:
            "It isn't mainly about weak security. Many of these organisations have strong defences. What makes them valuable targets is that they can't stay offline while they decide what to do.",
        },
        {
          label:
            "They provide essential services, so downtime is unbearable, which makes them far more likely to pay quickly.",
          correct: true,
          feedback:
            "Correct. Critical infrastructure means essential services: energy, healthcare, food supply. When Colonial Pipeline stopped, fuel shortages and panic buying spread along the East Coast within days. That pressure is what the attacker is selling, and it's why 75% of ransomware victims are in critical infrastructure sectors.",
        },
        {
          label: "Their data is worth more on the black market than customer records.",
          correct: false,
          feedback:
            "Ransomware operators usually aren't selling this data at all. Compare it with T-Mobile: 50 million customer records exposed and no ransom demanded. In a ransomware attack the leverage is the outage, not the data.",
        },
        {
          label: "They're legally required to pay ransoms to restore service.",
          correct: false,
          feedback:
            "No such law exists. Paying is a decision, not an obligation. Colonial Pipeline chose to pay $4.4 million and JBS USA paid $11 million, but both were decisions made under heavy pressure.",
        },
      ],
      source: SOURCES.jbs,
      xp: 25,
      next: "a2-colonial-quiz",
    },

    /* ---------------- 7. naming the Colonial Pipeline attack ---------------- */
    "a2-colonial-quiz": {
      id: "a2-colonial-quiz",
      type: "quiz",
      title: "Knowledge check: the 2021 fuel shortages",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi pulls up four 2021 headlines. "You\'ve read all of these case files now. Only one of them ended with people queuing for petrol."',
        '"Match the incident to what it actually did, not to how often you\'ve heard the name."',
      ],
      question: "Which high-profile 2021 attack led to fuel shortages on the U.S. East Coast?",
      options: [
        {
          label: "SolarWinds breach",
          correct: false,
          feedback:
            "The SolarWinds breach was discovered in late 2020 and it was a supply chain attack, not a shutdown. Compromised network monitoring software let attackers quietly take sensitive communications and proprietary data from thousands of organisations, including US government agencies. Nothing stopped running, so the public never felt it directly.",
        },
        {
          label: "Microsoft Exchange Server attack",
          correct: false,
          feedback:
            "The Exchange Server attack was early 2021, and it hit over 30,000 organisations globally through vulnerabilities in email server software. The attackers read communications and installed backdoors for future breaches. That's a mass intrusion into mailboxes, not an interruption to fuel supply.",
        },
        {
          label: "Colonial Pipeline ransomware attack",
          correct: true,
          feedback:
            "Correct. In May 2021 ransomware halted operations at the largest fuel pipeline in the US, and widespread fuel shortages and panic buying followed along the East Coast within days. That's what makes critical infrastructure such a valuable target: the disruption reaches the public almost immediately, which is pressure the attacker can charge for.",
        },
        {
          label: "T-Mobile data breach",
          correct: false,
          feedback:
            "The T-Mobile breach of August 2021 exposed the personal information of over 50 million customers, including names, social security numbers and driver's licence details. Nothing was encrypted and no service was shut down. The damage lands later, as identity theft and financial fraud, rather than as an outage anyone can see.",
        },
      ],
      source: SOURCES.colonial,
      xp: 25,
      next: "a2-ransom-amount-quiz",
    },

    /* ---------------- 8. what Colonial paid ---------------- */
    "a2-ransom-amount-quiz": {
      id: "a2-ransom-amount-quiz",
      type: "quiz",
      title: "Knowledge check: the Colonial Pipeline ransom",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana writes four figures on the whiteboard. "Every one of these is a real number from a real incident. Only one of them is what Colonial Pipeline handed over."',
        '"Keeping these apart matters. A ransom, an average cost and a legal settlement are three different things."',
      ],
      question: "How much did Colonial Pipeline pay in ransom to regain control of its systems?",
      options: [
        {
          label: "$4.35 million",
          correct: false,
          feedback:
            "That's the average cost of a data breach for organisations in 2022, across every breach of every kind. It's an average, not a payment anyone made, and it covers investigation, recovery, legal work and lost business rather than money handed to an attacker. The two figures are close enough to confuse, so read the question carefully.",
        },
        {
          label: "$4.4 million",
          correct: true,
          feedback:
            "Correct. Colonial Pipeline paid $4.4 million to regain control of its systems. Note that this is only the ransom. It doesn't include the shutdown, the recovery work or the public disruption, so the true cost of the incident is far higher than the number the attackers named.",
        },
        {
          label: "$11 million",
          correct: false,
          feedback:
            "That's what JBS USA paid after ransomware disrupted its global food supply operations, also in 2021. Two ransomware attacks on critical infrastructure in the same year, two different payments. Energy and food are both essential services, which is why both companies were under so much pressure to pay.",
        },
        {
          label: "$575 million",
          correct: false,
          feedback:
            "That's the Equifax settlement, money paid to regulators and affected people after a breach, not to an attacker. It shows how the two kinds of cost separate: a ransom is what you pay the criminals, and a settlement is what you pay afterwards for failing to protect the data.",
        },
      ],
      source: SOURCES.colonial,
      xp: 25,
      next: "a2-dossier",
    },

    /* ---------------- 9. key terms ---------------- */
    "a2-dossier": {
      id: "a2-dossier",
      type: "dossier",
      title: "Analyst dossier: how modern breaches work",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana hands you the key terms from these cases. "Eight words. They get used on an incident call without anybody stopping to define them."',
      ],
      terms: [
        {
          term: "Supply Chain Attack",
          definition:
            "A cyberattack that targets third-party suppliers to get into bigger systems, as seen in the SolarWinds breach. Compromising one supplier gives access to that supplier's customers.",
        },
        {
          term: "Backdoor Access",
          definition:
            "A method that lets attackers bypass regular authentication and keep long-term access to a compromised system. The Exchange Server attackers installed backdoors for future breaches.",
        },
        {
          term: "Critical Infrastructure",
          definition:
            "Essential services such as energy, healthcare and food supply. They're often targeted in cyberattacks, as the Colonial Pipeline and JBS incidents showed.",
        },
        {
          term: "Ransomware-as-a-Service (RaaS)",
          definition:
            "A business model where cybercriminals lease ransomware tools to other criminals, making ransomware attacks far more accessible. An attacker no longer needs the skill to build the tools.",
        },
        {
          term: "Zero-Day Vulnerability",
          definition:
            "A software flaw attackers exploit before the software provider can issue a fix. It's the kind of flaw behind widespread breaches like the Microsoft Exchange Server attack.",
        },
        {
          term: "Digital Privacy",
          definition:
            "The protection of your personal information online. It's what gets compromised in breaches like Facebook's and T-Mobile's, where nothing was encrypted and nobody was locked out.",
        },
        {
          term: "Cyber Extortion",
          definition:
            "Demanding payment in exchange for not exploiting stolen data, or for restoring access to encrypted systems. Ransomware is one form of it. Threatening to publish stolen data is another.",
        },
        {
          term: "Patch Management",
          definition:
            "The process of applying software updates that fix security vulnerabilities. It's routine work, and it's the control that would have prevented most of the cases in this archive.",
        },
      ],
      xp: 25,
      next: "a2-privacy",
    },

    /* ---------------- 10. the human ledger ---------------- */
    "a2-privacy": {
      id: "a2-privacy",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana leaves the T-Mobile file on screen. "August 2021. Over 50 million customers. Names, social security numbers, driver\'s licence details."',
        '"Nothing was encrypted and no service stopped, so there was no visible disruption on the day. It\'s still one of the most damaging cases in the archive."',
        '"A social security number isn\'t a password. You can\'t change it and move on. That data can be used for years: identity theft, financial fraud, loans taken out in someone else\'s name."',
        'Ravi: "Digital privacy is what we\'re paid to protect. The servers are just where the information is stored."',
      ],
      source: SOURCES.tmobile,
      xp: 15,
      next: "a2-reveal",
    },

    /* ---------------- 11. the 533 million reveal ---------------- */
    "a2-reveal": {
      id: "a2-reveal",
      type: "reveal",
      title: "The scale of the Facebook leak",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana hides one figure on the Facebook file. "Estimate this before I show you. Most people guess too low."',
        '"April 2021. Personal information from a social media platform, phone numbers and email addresses, exposed publicly."',
      ],
      question: "How many Facebook users had their personal information exposed in the April 2021 leak?",
      options: ["1.2 million users", "26 million users", "119 million users", "533 million users"],
      answerIndex: 3,
      value: "533 million",
      caption: "Facebook users worldwide whose personal information was exposed in April 2021.",
      explain:
        "Over 533 million users, including phone numbers and email addresses. Facebook initially downplayed the severity of the breach. The data has been used in phishing attacks, scams and other forms of cybercrime ever since. Dana: \"A platform people use casually is still a cybersecurity risk. The leak happens once. The phishing built on top of it continues for years.\"",
      source: SOURCES.facebook,
      xp: 35,
      next: "a2-bulletin",
    },

    /* ---------------- 12. what you do about leaked data ---------------- */
    "a2-bulletin": {
      id: "a2-bulletin",
      type: "choice",
      title: "Warning staff about a phishing wave",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "ORACLE flags eleven staff mailboxes. Same template, sent overnight: the sender quotes the recipient's mobile number and personal email address to sound legitimate.",
        'Ravi reads one. "Leaked data being reused in a new attack. That\'s why an old breach keeps causing problems."',
        '"90% of companies have experienced a phishing attack. Decide what we send to the rest of the building. Staff start reading email in about ten minutes."',
      ],
      prompt: "What do you push out to the organisation?",
      options: [
        {
          label: "Force an immediate password reset for every employee, no explanation attached.",
          next: "a2-facebook-quiz",
          xp: 8,
          tone: "bad",
          feedback:
            "This doesn't address the problem. No passwords leaked. Phone numbers and email addresses did. You've also put the whole organisation in the habit of typing new passwords into whatever prompt appears next, which is exactly what a convincing phishing page needs.",
        },
        {
          label:
            "Send a specific bulletin: here's the exact message, here's why the sender knows your number, here's where to report it.",
          next: "a2-facebook-quiz",
          xp: 25,
          tone: "good",
          feedback:
            "This is the strongest option. People struggle to spot phishing in the abstract, but they can recognise a specific message once it's been shown to them. Explaining that the personal details came from an old public leak, not from inside the company, also prevents unnecessary panic. Dana: \"With 90% of companies already hit, staff awareness is a security control in its own right.\"",
        },
        {
          label: "Say nothing yet. Quietly block the sender and avoid alarming anyone.",
          next: "a2-facebook-quiz",
          xp: 8,
          tone: "neutral",
          feedback:
            "Blocking the sender is worth doing, so this isn't wasted effort. But it only stops one address, and the attacker can register a new domain in minutes. Staying silent also discourages staff from reporting, and unreported clicks are how an incident stays hidden. The Exchange victim in the archive went 61 days without a ticket being raised.",
        },
      ],
      source: SOURCES.facebook,
    },

    /* ---------------- 13. whose leak was it ---------------- */
    "a2-facebook-quiz": {
      id: "a2-facebook-quiz",
      type: "quiz",
      title: "Knowledge check: the 533 million user leak",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana points at the phishing bulletin. "Those personal details came from a leak of 533 million users in 2021. You already know the number."',
        '"Now name the company it belonged to. Four large breaches, four very different scales."',
      ],
      question: "Which breach exposed the personal data of 533 million users in 2021?",
      options: [
        {
          label: "Equifax breach",
          correct: false,
          feedback:
            "The Equifax breach exposed the data of about 147 million people, and it was credit data held by a credit reporting agency rather than social media contact details. Serious, but a different company and a different scale.",
        },
        {
          label: "Facebook data leak",
          correct: true,
          feedback:
            "Correct. In April 2021 the personal information of over 533 million Facebook users worldwide was exposed, including phone numbers and email addresses. Facebook initially downplayed it. The data has been reused in phishing attacks, scams and other cybercrime ever since, which is why it's still turning up in mailboxes here.",
        },
        {
          label: "T-Mobile breach",
          correct: false,
          feedback:
            "The T-Mobile breach of August 2021 affected over 50 million customers, roughly a tenth of the Facebook figure. What it exposed was more dangerous per person though: names, social security numbers and driver's licence details. Scale and severity aren't the same measure.",
        },
        {
          label: "Yahoo breach",
          correct: false,
          feedback:
            "The Yahoo breaches were larger still, around 3 billion accounts, but they happened in 2013 and 2014 and weren't disclosed until years later. The date in the question rules this one out.",
        },
      ],
      source: SOURCES.facebook,
      xp: 25,
      next: "a2-pattern",
    },

    /* ---------------- 14. name the playbook ---------------- */
    "a2-pattern": {
      id: "a2-pattern",
      type: "quiz",
      title: "Matching the alert to a case file",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 10:26",
      text: [
        'Ravi puts the live alert next to the archive. "Nightjar is reusing one of these patterns. Your call on which."',
        '"The facts: our own network monitoring agent, installed and updated by us, is beaconing outbound. Nothing is encrypted. There\'s no ransom note. No customer records are staged for export. Nothing matches a known signature."',
      ],
      question: "Which historical attack pattern is Nightjar reusing?",
      options: [
        {
          label:
            "SolarWinds Orion: a supply chain attack delivered through trusted monitoring software.",
          correct: true,
          feedback:
            "Correct, and the evidence supports it point by point. Compromised network monitoring software, arriving through an update the victim installed themselves, then staying quiet and beaconing rather than encrypting. That matches SolarWinds. Supply chain attacks rose 20% between 2020 and 2021, so this method is well established. Ravi: \"Now we know what to look for next, because we know what those attackers did next.\"",
        },
        {
          label: "Colonial Pipeline: ransomware on critical infrastructure.",
          correct: false,
          feedback:
            "The evidence doesn't support it. Ransomware is visible: files encrypted, systems halted, a demand delivered. Colonial Pipeline lost the largest fuel pipeline in the US and paid $4.4 million. Here nothing is encrypted and nothing has stopped.",
        },
        {
          label: "T-Mobile: a mass data leak of customer records.",
          correct: false,
          feedback:
            "A mass leak leaves large volumes of customer data pulled and staged for export, as in the T-Mobile breach affecting over 50 million customers. ORACLE found no records staged. Small, regular beacons indicate a foothold being maintained, not data being taken.",
        },
        {
          label: "Microsoft Exchange Server: a zero-day exploited on our mail server.",
          correct: false,
          feedback:
            "Right type of attack, wrong machine. The Exchange wave hit over 30,000 organisations through email server software and left web shells on the mail server. Our alert is on a monitoring agent on the finance network, and our mail server is clean. Match the evidence to the case file rather than to the case you read most recently.",
        },
      ],
      source: SOURCES.solarwinds,
      xp: 40,
      badge: "chain-breaker",
      next: "a2-ransom",
    },

    /* ---------------- 15. the ransom ---------------- */
    "a2-ransom": {
      id: "a2-ransom",
      type: "choice",
      title: "The ransom demand",
      speaker: "Nightjar",
      avatar: "bird",
      location: "Security Operations Centre, 10:41",
      text: [
        "A message arrives on a support address that hasn't been used in two years.",
        '"We\'ve been inside your monitoring agent since March. We have your finance mailboxes. In 48 hours we publish them. 30 bitcoin. Reply here."',
        'Ravi: "That\'s cyber extortion: pay, or they exploit what they already took. It\'s run as a business. Ransomware-as-a-Service means they leased these tools from another group and owe them a share."',
        'Dana opens the backup console. "Our finance backups are offline copies and they were tested last month. That gives us a real option."',
      ],
      prompt: "Nightjar's clock is running. What do you recommend to Ravi?",
      options: [
        {
          label: "Pay. Forty-eight hours isn't enough time to gamble with the finance mailboxes.",
          next: "a2-handoff",
          xp: 10,
          tone: "neutral",
          feedback:
            "This is a real decision organisations make. Colonial Pipeline paid $4.4 million to regain control of its systems, and JBS USA paid $11 million. Both were under severe operational pressure. The trade-off: paying buys a promise from people who have already broken into your systems, it doesn't un-copy data that's already been taken, and it funds the Ransomware-as-a-Service economy that supplied Nightjar's tools. Ravi: \"Sometimes it's the least bad option available. It's never a good one.\"",
        },
        {
          label: "Refuse outright and announce it publicly. Never negotiate.",
          next: "a2-handoff",
          xp: 15,
          tone: "neutral",
          feedback:
            "Law enforcement argues for refusal, because payments keep the business model working. But refusing only works if you can recover on your own. Without offline, tested backups, refusing means an outage you can't end, and 75% of ransomware victims are in critical infrastructure, where an outage looks like the fuel shortages that followed Colonial Pipeline. Your backups make refusal possible today. Announcing it in the first hour is the weak part: it tells Nightjar how you plan to recover.",
        },
        {
          label:
            "Stall. Keep them talking while you restore from the offline backups, preserve evidence and bring in law enforcement.",
          next: "a2-handoff",
          xp: 30,
          tone: "good",
          feedback:
            "Best answer. Time pressure is the attacker's main advantage, and stalling takes some of it back. Every hour the conversation stays open is an hour spent restoring from backups Nightjar can't reach, imaging the compromised agent so the evidence survives, and involving law enforcement early rather than after the fact. It has a cost: someone has to manage that conversation carefully while the rest of the team works. Dana: \"Note what made this possible. Not the reply we send. The backups we already had.\"",
        },
      ],
      source: SOURCES.jbs,
    },

    /* ---------------- 16. handoff to act 3 ---------------- */
    "a2-handoff": {
      id: "a2-handoff",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 11:05",
      text: [
        "The compromised agent is isolated. The finance mailboxes are restoring from a copy Nightjar never had access to.",
        'Ravi clears the whiteboard. "You identified the pattern from the evidence. That\'s the core of the job."',
        'Dana adds to it. "And note how we did it. We matched Nightjar\'s activity against known attack patterns: supply chain, ransomware, mass data leak."',
        '"Those are three patterns out of many. Hacking, phishing, ransomware, identity theft, denial-of-service. Nightjar used one of them today. Next we cover the rest, because they can use those too."',
      ],
      xp: 15,
      next: "a3-start",
    },
  },
};

export default act2;
