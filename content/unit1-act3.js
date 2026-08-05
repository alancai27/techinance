// @ts-check

/**
 * Cybersecurity, Unit 1, Act 3: "The World of Cybercrime"
 *
 * Source material: SECTION C, The World of Cybercrime
 * (Ankith N. Raghavendra, Techinance Technology Course Developer).
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   147 million Americans (Equifax, 2017) · 1.35 terabits per second
 *   (GitHub DDoS, 2018) · 200,000+ computers in 150 countries (WannaCry, 2017)
 *   · 3 billion accounts (Yahoo, 2013–2014) · $4.4 million ransom
 *   (Colonial Pipeline, 2021) · $10.5 trillion by 2025.
 *
 * Scene ids are namespaced `a3-*`. This act closes the episode: `a3-end` is the
 * only scene of type "ending" in Unit 1, and its `next` is null.
 */

/** Citations used by the statistic-bearing scenes in this act. */
const SOURCES = {
  anonymous: {
    label: "Anonymous (BBC News)",
    url: "https://www.bbc.com/news/technology-60784526",
  },
  dnc: {
    label: "The perfect weapon: how the DNC was hacked (The New York Times)",
    url: "https://www.nytimes.com/2016/08/11/us/politics/democratic-party-russia-hack-cyberattack.html",
  },
  equifax: {
    label: "Equifax data breach settlement (FTC)",
    url: "https://www.ftc.gov/enforcement/cases-proceedings/refunds/equifax-data-breach-settlement",
  },
  github: {
    label: "GitHub survived the biggest DDoS attack ever recorded (WIRED)",
    url: "https://www.wired.com/story/github-ddos-memcached/",
  },
  colonial: {
    label: "The attack on Colonial Pipeline: what we've learned (CISA)",
    url: "https://www.cisa.gov/news-events/news/attack-colonial-pipeline-what-weve-learned-what-weve-done-over-past-two-years",
  },
  ibm: {
    label: "Cost of a Data Breach Report 2022 (IBM)",
    url: "https://in.newsroom.ibm.com/IBM-Report-Cost-of-Data-Breach-2022",
  },
};

/**
 * Badge metadata for the awards handed out in this act. The integrator
 * registers these on the episode; the ids match the `badge` field below.
 */
export const act3Badges = [
  {
    id: "threat-taxonomist",
    name: "Threat Taxonomist",
    description: "Sorted eight real incidents into the five categories of cybercrime.",
    icon: "dna",
  },
  {
    id: "traffic-reader",
    name: "Traffic Reader",
    description: "Used log evidence to tell a DDoS from a DoS.",
    icon: "waves",
  },
  {
    id: "nightjar-hunter",
    name: "Nightjar Hunter",
    description: "Decided what to do about Nightjar's export while it was still running.",
    icon: "bird",
  },
  {
    id: "unit1-certified",
    name: "Unit 1 Certified",
    description: "Completed Unit 1 of the Techinance Cybersecurity course.",
    icon: "medal",
  },
];

export const act3 = {
  entry: "a3-start",
  scenes: {
    /* ---------------- 1. the shift turns ---------------- */
    "a3-start": {
      id: "a3-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 12:06",
      text: [
        "The monitoring agent is quarantined. That closes one part of the incident, not the incident itself.",
        "Ravi: \"Nightjar staged access and then stopped. That usually means they're preparing something, not giving up.\"",
        "Dana puts the actor board on the big screen. \"Cybercrime isn't one thing. There are five working categories: hacking, phishing, ransomware, identity theft, and denial of service. Different techniques, different damage, different response.\"",
        "Ravi: \"So we'll go through the categories now. If Nightjar moves again, you need to name what you're looking at quickly.\"",
      ],
      xp: 10,
      next: "a3-catalogue",
    },

    /* ---------------- 2. the catalogue ---------------- */
    "a3-catalogue": {
      id: "a3-catalogue",
      type: "terminal",
      title: "The five categories of cybercrime",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "Dana: \"Ask ORACLE for the taxonomy. Then open one real case, so the definitions attach to something that actually happened.\"",
      ],
      prompt: "Pull the taxonomy and open the case file.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "taxonomy",
          cmd: "threat --taxonomy",
          output: [
            "CYBERCRIME // five working categories",
            "1 hacking .......... unauthorised access to computers, networks or",
            "                     systems. usually to steal customer data, trade",
            "                     secrets or financial records. sometimes political.",
            "2 phishing ......... criminals pose as a trusted body or person and",
            "                     trick people into handing over passwords, social",
            "                     security numbers or bank details.",
            "3 ransomware ....... attackers lock the victim's data and demand money",
            "                     to unlock it.",
            "4 identity theft ... stolen personal details reused to commit fraud or",
            "                     impersonation.",
            "5 dos / ddos ....... flood a system with traffic until it slows or",
            "                     crashes. availability, not secrecy, is the target.",
          ],
          required: true,
        },
        {
          id: "groups",
          cmd: "group --profile hacking",
          output: [
            "KNOWN HACKING GROUPS // public record",
            "Anonymous ...... loose collective, no membership list, no leader.",
            "                 politically motivated. has taken down websites and",
            "                 services belonging to governments and corporations.",
            "Lizard Squad ... best known for attacks on gaming networks and",
            "                 online services.",
            "note: some of the biggest attacks on websites and online services",
            "      have come from organised groups like these rather than from",
            "      individuals working alone.",
          ],
          required: false,
        },
        {
          id: "dnc",
          cmd: "case --id dnc-2016",
          output: [
            "CASE // Democratic National Committee email leak, 2016",
            "category ..... phishing",
            "method ....... attackers posed as a legitimate service and asked",
            "               high-level political figures to enter their",
            "               credentials. the figures typed them in.",
            "outcome ...... internal emails compromised and published.",
            "lesson ....... phishing isn't only about email. fake websites,",
            "               phone calls and text messages do the same job.",
            "               the target was a person, not a server.",
          ],
          required: true,
        },
        {
          id: "nightjar",
          cmd: "actor --profile nightjar",
          output: [
            'ACTOR // "Nightjar"',
            "observed techniques: phishing, supply chain compromise.",
            "observed today ...: staged access, then stopped.",
            "assessment .......: a pause is not a withdrawal. treat as active.",
          ],
          required: false,
        },
      ],
      source: SOURCES.anonymous,
      xp: 25,
      next: "a3-equifax",
    },

    /* ---------------- 3. identity theft ---------------- */
    "a3-equifax": {
      id: "a3-equifax",
      type: "quiz",
      title: "Identity theft and the Equifax breach",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Analyst station 7",
      text: [
        "Dana: \"Identity theft is using someone's personal details illegally to commit fraud or impersonation. Nothing visibly breaks, so people underestimate it.\"",
        "\"Criminals take social security numbers, credit card details and driver's licences. Most of that material comes from one large breach rather than from individual victims.\"",
        "\"The example to know is Equifax, 2017. Equifax is a credit reporting company, so it held files on people who had never signed up with it. Hackers got in. Each record held a name, a birth date and a social security number.\"",
      ],
      question: "How many Americans had their data accessed in the 2017 Equifax breach?",
      options: [
        {
          label: "More than 1.4 million",
          correct: false,
          feedback:
            "Too small by a factor of a hundred. A breach that size would still be a serious incident, but Equifax was on a much larger scale.",
        },
        {
          label: "More than 14 million",
          correct: false,
          feedback:
            "Still ten times too small. Equifax held files on a large share of the adult population, whether or not those people were customers.",
        },
        {
          label: "More than 147 million",
          correct: true,
          feedback:
            "Correct. More than 147 million Americans, with each record holding a name, a birth date and a social security number. A birth date can't be reissued, so the risk from this kind of breach lasts for years.",
        },
        {
          label: "More than 470 million",
          correct: false,
          feedback:
            "Too high. That's more people than live in the United States. The figure is more than 147 million, and precision matters when you're briefing other people.",
        },
      ],
      source: SOURCES.equifax,
      xp: 25,
      next: "a3-dossier",
    },

    /* ---------------- 4. key terms ---------------- */
    "a3-dossier": {
      id: "a3-dossier",
      type: "dossier",
      title: "Key terms: the world of cybercrime",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "Ravi hands you a second reference card. \"Seven terms. Most incidents you'll work are one of these, or several of them in sequence.\"",
      ],
      terms: [
        {
          term: "Cybercrime",
          definition:
            "Any illegal activity that involves computers, networks or digital devices. It targets people, companies and governments alike.",
        },
        {
          term: "Hacking",
          definition:
            "Unauthorised access to computer systems or networks, often to steal information or cause disruption. Sometimes the motive is money. Sometimes it's political.",
        },
        {
          term: "Phishing",
          definition:
            "Social engineering: criminals pretend to be a trusted organisation or person to trick people into handing over sensitive information. It arrives by email, fake website, phone call or text message.",
        },
        {
          term: "Ransomware",
          definition:
            "Malware that locks users out of their data or systems until a ransom is paid, often in cryptocurrency.",
        },
        {
          term: "Identity theft",
          definition:
            "Using someone's personal information illegally to commit fraud or impersonation: social security numbers, card details, driver's licences.",
        },
        {
          term: "Denial-of-Service (DoS) attack",
          definition:
            "An attack that floods a system or network with traffic from a single source until it's unusable. Nothing is stolen. The target is availability.",
        },
        {
          term: "Distributed Denial-of-Service (DDoS) attack",
          definition:
            "The same attack run from many systems at once. Multiple machines flood one target with excessive traffic, which makes the source much harder to block.",
        },
      ],
      xp: 25,
      next: "a3-wannacry",
    },

    /* ---------------- 5. ransomware and the money trail ---------------- */
    "a3-wannacry": {
      id: "a3-wannacry",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana: \"Ransomware has grown faster than the other categories, and cryptocurrency is a large part of why. Ransom payments made in cryptocurrency are much harder to trace, so collecting the money became the easy step rather than the risky one.\"",
        "\"WannaCry, 2017. It hit more than 200,000 computers across 150 countries, including hospitals and other critical services. Screens were locked, appointments were cancelled, and the damages ran into the billions.\"",
        "\"Colonial Pipeline, 2021. The largest fuel pipeline in the United States was shut down, and $4.4 million was paid to restore access.\"",
        "Ravi: \"Attackers choose targets by how badly the target needs its systems back. Hospitals and pipelines are picked because they can't wait.\"",
      ],
      source: SOURCES.colonial,
      xp: 15,
      next: "a3-sort",
    },

    /* ---------------- 6. sort the catalogue ---------------- */
    "a3-sort": {
      id: "a3-sort",
      type: "sort",
      title: "Sort eight incidents by category",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "Ravi writes the five categories on the board. \"Eight real incidents. Put each one under the category that describes what the attacker actually did.\"",
        "\"If you get one wrong, read the explanation. That's usually where the category boundaries become clear.\"",
      ],
      prompt: "Drag each incident into its category, or tap an incident and then tap a category.",
      buckets: [
        {
          id: "hacking",
          label: "Hacking",
          hint: "Unauthorised access to systems",
        },
        {
          id: "phishing",
          label: "Phishing",
          hint: "Tricking a person into handing it over",
        },
        {
          id: "ransomware",
          label: "Ransomware",
          hint: "Data locked, payment demanded",
        },
        {
          id: "identity-theft",
          label: "Identity theft",
          hint: "Personal details reused for fraud",
        },
        {
          id: "dos",
          label: "DoS / DDoS",
          hint: "Flooded until it stops responding",
        },
      ],
      items: [
        {
          id: "yahoo",
          label: "Yahoo, 2013–2014: attackers break in and take data from 3 billion accounts",
          bucket: "hacking",
          explain:
            "Hacking. Unauthorised access to Yahoo's systems exposed the personal data of 3 billion user accounts, the largest breach ever recorded. Stolen data like this is often reused later for identity theft and phishing.",
        },
        {
          id: "anon",
          label: "Anonymous and Lizard Squad take down websites and online services",
          bucket: "hacking",
          explain:
            "Hacking. Both are well-known groups behind large attacks on websites and services. Anonymous is usually politically motivated. Lizard Squad became known for attacks on gaming networks.",
        },
        {
          id: "dnc",
          label: "2016: political figures type their credentials into a convincing fake login page",
          bucket: "phishing",
          explain:
            "Phishing. This is the Democratic National Committee email leak of 2016. No system was broken into directly. Attackers posed as a legitimate service, and the credentials were typed in and handed over.",
        },
        {
          id: "wannacry",
          label: "2017: 200,000+ computers in 150 countries locked, payment demanded",
          bucket: "ransomware",
          explain:
            "Ransomware. WannaCry hit more than 200,000 computers across 150 countries and disrupted critical services including healthcare. Damages ran into the billions.",
        },
        {
          id: "colonial",
          label: "2021: a fuel pipeline stops and $4.4 million is paid to restore the systems",
          bucket: "ransomware",
          explain:
            "Ransomware. Colonial Pipeline, 2021: the largest fuel pipeline in the U.S. shut down and a $4.4 million ransom was paid. Payment in cryptocurrency is what makes collecting a ransom relatively safe for the attacker, because it's hard to trace.",
        },
        {
          id: "equifax",
          label: "147 million names, birth dates and social security numbers reused for fraud",
          bucket: "identity-theft",
          explain:
            "Identity theft. The 2017 Equifax breach exposed more than 147 million Americans' records, each with a name, birth date and social security number. Those are the details needed to impersonate someone.",
        },
        {
          id: "github",
          label: "2018: a code-hosting site is buried under traffic from a huge number of machines",
          bucket: "dos",
          explain:
            "DDoS. It's distributed because the traffic came from many systems at once. This is the 2018 GitHub attack, which you'll look at in more detail shortly.",
        },
        {
          id: "single",
          label: "One machine floods a school's booking site until the site crashes",
          bucket: "dos",
          explain:
            "Denial of service. Same category, smaller scale: one source flooding a target until it slows or crashes. One machine makes it a DoS. Many machines would make it a DDoS.",
        },
      ],
      source: SOURCES.dnc,
      xp: 40,
      badge: "threat-taxonomist",
      next: "a3-logs",
    },

    /* ---------------- 7. the live attack ---------------- */
    "a3-logs": {
      id: "a3-logs",
      type: "inspect",
      title: "Edge server log: one source or many",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7, 14:02",
      text: [
        "A new alert comes in. The learner portal, the payments gateway and the staff login are all responding slowly, then not at all.",
        "Ravi: \"It's clearly an attack. What I need is which kind, and I need you to show me the log line that proves it.\"",
        "The distinction matters for the response. Traffic from one source can be blocked quickly. Traffic from many sources needs a completely different approach.",
      ],
      prompt:
        "Tap the lines that prove this flood is distributed. Find at least 4 to make the call.",
      artifact: {
        kind: "log",
        fields: [
          {
            label: "Window",
            value: "14:00:00 – 14:02:00 (edge-01 … edge-06)",
            hot: "window",
          },
          {
            label: "Requests",
            value: "288,412,900 in 120 seconds",
            hot: "volume",
          },
          {
            label: "Distinct source IPs",
            value: "61,428 addresses across 94 countries",
            hot: "sources",
          },
          {
            label: "Largest single source",
            value: "0.04% of total traffic",
            hot: "share",
          },
          {
            label: "Baseline for this hour",
            value: "≈ 900 requests/sec, currently 2.4 million/sec",
            hot: "rate",
          },
        ],
        body: [
          "edge-03 14:00:07  203.0.113.44   GET /portal/login  HTTP/1.1  timeout",
          {
            hot: "useragent",
            text: 'edge-03 14:00:07  61,428 distinct hosts sending the byte-identical User-Agent string "Mozilla/5.0 (compatible)", no browser variation at all',
          },
          {
            hot: "endpoint",
            text: "edge-01..06 14:00:00+  every request targets the same endpoint /portal/login, no session cookies, no follow-up requests, nobody ever logs in",
          },
          {
            hot: "reflect",
            text: "edge-05 14:00:31  inbound UDP flood from thousands of misconfigured public servers, tiny spoofed requests, enormous replies aimed at us",
          },
          {
            hot: "backup",
            text: "backup-02 03:00:00  nightly archive job completed, 41 GB, internal 10.4.0.0/16, scheduled",
          },
          {
            hot: "admin",
            text: "edge-02 13:58:12  10.4.9.7 (r.mehta, internal) 40 requests, all HTTP 200, normal admin session",
          },
          {
            hot: "latency",
            text: "edge-04 14:01:10  /portal/login median response time 88 ms → 41,600 ms",
          },
          {
            hot: "patch",
            text: "patch-agent 13:45:00  checked in for updates, no packages pending, routine",
          },
        ],
      },
      hotspots: {
        window: {
          suspicious: false,
          explain:
            "A two-minute window across six edge servers. That's useful context, but a time range on its own says nothing about how many sources are involved.",
        },
        volume: {
          suspicious: false,
          explain:
            "288 million requests is a very large number, but volume alone doesn't prove distribution. A single powerful machine can send a lot of traffic. What you need is how many places it's coming from.",
        },
        sources: {
          suspicious: true,
          explain:
            "This is the key evidence. 61,428 distinct source addresses across 94 countries. That's many systems flooding one target at the same time, which is what makes a denial-of-service attack distributed.",
        },
        share: {
          suspicious: true,
          explain:
            "No single source accounts for more than 0.04% of the traffic. In a plain DoS one address dominates the log and you block it. Here the load is spread across so many sources that blocking one changes almost nothing.",
        },
        rate: {
          suspicious: true,
          explain:
            "2.4 million requests per second against a baseline of about 900. Ordinary traffic doesn't vary by anything close to that, so this is deliberate load sent to exhaust the servers.",
        },
        useragent: {
          suspicious: true,
          explain:
            "61,428 hosts sending one identical User-Agent string. Real visitors use different browsers on different devices. Identical fingerprints across thousands of machines mean the same software is controlling all of them, which is a botnet.",
        },
        endpoint: {
          suspicious: true,
          explain:
            "Every request hits the same endpoint and no login is ever completed. The aim isn't to get in. It's to use up the server's capacity so real users can't get in. Availability is the target.",
        },
        reflect: {
          suspicious: true,
          explain:
            "This is amplification. The attacker sends small requests with our address forged as the sender, and thousands of misconfigured public servers send the large replies to us. It increases the traffic volume and hides who started it.",
        },
        backup: {
          suspicious: false,
          explain:
            "A scheduled internal backup at 03:00, eleven hours before the flood, from our own address range. Routine, and unrelated.",
        },
        admin: {
          suspicious: false,
          explain:
            "One internal address, 40 requests, all successful. This is what a single legitimate source looks like, and it's a useful contrast. If the whole log looked like this, you'd be dealing with one source rather than thousands.",
        },
        latency: {
          suspicious: false,
          explain:
            "Response time rising from 88 ms to 41,600 ms is a symptom, not evidence of distribution. It tells you the servers are overloaded. It doesn't tell you how many sources are causing it.",
        },
        patch: {
          suspicious: false,
          explain:
            "The patch agent checking in on schedule with nothing to install. Normal background activity. Most log lines are like this one.",
        },
      },
      requiredFinds: 4,
      xp: 45,
      badge: "traffic-reader",
      next: "a3-dosquiz",
    },

    /* ---------------- 8. DoS vs DDoS ---------------- */
    "a3-dosquiz": {
      id: "a3-dosquiz",
      type: "quiz",
      title: "DoS or DDoS",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Analyst station 7, 14:04",
      text: [
        "Ravi has the incident form open at the category field. \"Use the right term. The category decides who gets called in.\"",
      ],
      question:
        "You have 61,428 source addresses flooding one target. What separates a DDoS attack from a plain DoS attack?",
      options: [
        {
          label: "A DDoS steals data, while a DoS only slows the system down.",
          correct: false,
          feedback:
            "Neither one steals data. DoS and DDoS both attack availability: they flood a system or network with traffic until it slows or crashes. Stealing data falls under hacking.",
        },
        {
          label:
            "A DDoS uses multiple systems to flood the target; a DoS floods it from a single source.",
          correct: true,
          feedback:
            "Correct. A DoS attack overwhelms a system with traffic from one source. In a DDoS, attackers use many systems at once to flood the target's servers. That's the only difference between them, and it's why blocking one address doesn't stop today's attack.",
        },
        {
          label: "A DDoS demands a ransom payment, while a DoS doesn't.",
          correct: false,
          feedback:
            "Demanding payment to restore access is ransomware, a separate category. A denial-of-service attack doesn't need to demand anything, because the disruption itself is the goal. Attackers do sometimes combine the two, which is why the categories are named separately.",
        },
        {
          label: "A DDoS targets websites and a DoS targets email.",
          correct: false,
          feedback:
            "The type of target isn't the difference. Both can be aimed at any service. The difference is the number of attacking systems: one source, or many.",
        },
      ],
      source: SOURCES.github,
      xp: 30,
      next: "a3-github",
    },

    /* ---------------- 9. the biggest one ever ---------------- */
    "a3-github": {
      id: "a3-github",
      type: "reveal",
      title: "The 2018 GitHub DDoS attack",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Analyst station 7",
      text: [
        "While the mitigation starts up, Dana puts a second graph next to yours. \"Here's the scale for comparison.\"",
        "\"In 2018, GitHub, which hosts a large share of the world's software, was hit by the biggest DDoS attack recorded so far. Estimate the peak traffic.\"",
      ],
      question: "How much traffic hit GitHub at the peak of the 2018 DDoS attack?",
      options: [
        "13.5 megabits per second",
        "135 megabits per second",
        "1.35 gigabits per second",
        "1.35 terabits per second",
      ],
      answerIndex: 3,
      value: "1.35 Tbps",
      caption: "Peak traffic in the 2018 GitHub DDoS attack, the biggest on record.",
      explain:
        "1.35 terabits per second, aimed at one platform, from a very large number of sources at once. GitHub was offline for several minutes. Dana: \"Several minutes is what good mitigation gets you. It doesn't stop the attack. It shortens the outage.\"",
      source: SOURCES.github,
      xp: 35,
      next: "a3-response",
    },

    /* ---------------- 10. the decision ---------------- */
    "a3-response": {
      id: "a3-response",
      type: "choice",
      title: "Directing the response",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 14:09",
      text: [
        "The traffic is still increasing. Ravi mutes the bridge call. \"Upstream mitigation can absorb this. Filtering starts in four minutes.\"",
        "Dana: \"Nightjar spent two weeks staying hidden. Today they're generating the loudest traffic on the network. That change of behaviour is worth explaining.\"",
        "Every screen in the room is currently showing the same traffic graph.",
      ],
      prompt: "How do you direct the response?",
      options: [
        {
          label: "All hands on the flood. Nothing matters until the portal is back up.",
          next: "a3-fallout",
          xp: 5,
          tone: "bad",
          feedback:
            "Understandable, because the outage is the visible part. But a flood is cheap for an attacker to generate, and it's already being handled upstream. Putting every analyst on it leaves the rest of the estate unmonitored.",
        },
        {
          label:
            "Hand the flood to upstream mitigation, and put your own eyes on the quiet systems: identity, payments, admin logins.",
          next: "a3-lockdown",
          xp: 30,
          tone: "good",
          feedback:
            "That's the right call. Upstream owns the flood for the next four minutes. Your job is to check the systems nobody is currently watching. Ravi unmutes the bridge: \"Do it.\"",
        },
        {
          label: "Take everything offline until the traffic stops.",
          next: "a3-fallout",
          xp: 5,
          tone: "bad",
          feedback:
            "This produces the attacker's goal for them. A denial-of-service attack succeeds when the service is unavailable, and it makes no difference who switched it off. It also stops your own logging, so you lose the record of what happened.",
        },
      ],
    },

    /* ---------------- 11. consequence ---------------- */
    "a3-fallout": {
      id: "a3-fallout",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre, 14:13",
      text: [
        "Four minutes later the flood drops away, as upstream said it would. The portal comes back.",
        "Dana has been reading the identity database rather than the traffic graph, and she has something.",
        "\"There was one session on the identity store while we were all on the flood. It used valid admin credentials and ran a bulk export: names, dates of birth, national insurance numbers, and the finance team's bank details.\"",
        "Ravi: \"The flood was cover. Worth remembering. The most visible event isn't always the main attack.\"",
      ],
      xp: 10,
      next: "a3-lockdown",
    },

    /* ---------------- 12. the real move ---------------- */
    "a3-lockdown": {
      id: "a3-lockdown",
      type: "choice",
      title: "The admin session on the identity store",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7, 14:14",
      text: [
        "ORACLE: \"Session svc-report-admin authenticated at 14:09. Source: outside the office range. Currently running a bulk export against the identity store.\"",
        "Those records hold the same fields Equifax lost: name, date of birth, national ID number. More than 147 million people were exposed that way in 2017. Details like these can't be reissued, so the risk doesn't expire.",
        "Dana: \"That's Nightjar. The flood was there to keep us off this log line.\"",
      ],
      prompt: "Sixty seconds. What do you do with that session?",
      options: [
        {
          label:
            "Kill the session, revoke the credentials, and force a reset on every account that touched that service.",
          next: "a3-cert",
          xp: 35,
          tone: "good",
          feedback:
            "Done in forty seconds. The export stops partway through, so some records are lost and most are not. Ravi checks the count: \"Partial loss instead of the full database. That's the job.\"",
        },
        {
          label: "Leave it running and watch, so you can gather better evidence on Nightjar.",
          next: "a3-cert",
          xp: 5,
          tone: "bad",
          feedback:
            "There are cases where you watch an intruder instead of cutting them off, but this isn't one of them, because data is actively leaving. Every extra second of evidence costs thousands of records, and those records become identity theft risk for real people.",
        },
        {
          label: "Escalate to Ravi and wait for a manager to authorise the disconnect.",
          next: "a3-cert",
          xp: 10,
          tone: "neutral",
          feedback:
            "Right instinct, wrong order. Escalating and acting aren't alternatives: you disconnect first and brief while you do it. Ravi afterwards: \"You're already authorised for this. Don't wait for permission to stop an active export.\"",
        },
      ],
      badge: "nightjar-hunter",
    },

    /* ---------------- 13. certification ---------------- */
    "a3-cert": {
      id: "a3-cert",
      type: "quiz",
      title: "Final question: naming an attack chain",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 16:40",
      text: [
        "The incident is closed. Nightjar is now a case file rather than a live alert.",
        "Ravi: \"One question and you're signed off for Unit 1. Answer it from memory, not from the logs.\"",
        "\"A small charity calls us. A staff member typed their password into a fake supplier portal. Two days later the accounts system is encrypted and there's a demand for payment in cryptocurrency.\"",
      ],
      question: "Name what happened, in order.",
      options: [
        {
          label: "A DDoS attack that led to identity theft.",
          correct: false,
          feedback:
            "No flood is described here. Nothing was made unavailable by traffic, and DDoS means many systems flooding one target. The first event was a person being tricked into typing a password.",
        },
        {
          label: "A phishing attack that led to a ransomware attack.",
          correct: true,
          feedback:
            "Correct, and it's the most common chain there is. Phishing first: criminals posed as a legitimate supplier and were given a password, and around 90% of data breaches are related to phishing. Ransomware second: the data was locked and money demanded in cryptocurrency, which is what makes the payment hard to trace. IBM put the average cost of a data breach at $4.35 million in 2022.",
        },
        {
          label: "A denial-of-service attack that led to a data breach.",
          correct: false,
          feedback:
            "A denial-of-service attack floods a system until it slows or crashes. It doesn't encrypt files or demand payment. This case started with a person being deceived and ended with data locked for a ransom.",
        },
        {
          label: "Identity theft that led to a supply chain attack.",
          correct: false,
          feedback:
            "The vocabulary is close but the facts don't match. Identity theft is reusing someone's personal details to commit fraud, and a supply chain attack compromises a supplier's software to reach its customers. Here a staff member gave away a password, and the attacker then encrypted the data for money.",
        },
      ],
      source: SOURCES.ibm,
      xp: 40,
      next: "a3-end",
    },

    /* ---------------- 14. ending ---------------- */
    "a3-end": {
      id: "a3-end",
      type: "ending",
      title: "Unit 1 complete",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance SOC, 17:00",
      text: [
        "Ravi signs the form. \"Unit 1, certified.\"",
        "Here's what you covered. The scale of cybercrime: $10.5 trillion a year by 2025, up from $3 trillion in 2015. Around 90% of breaches start with phishing, and the average breach cost $4.35 million in 2022.",
        "You worked through the case studies that shaped current practice: SolarWinds, Colonial Pipeline, the 147 million records exposed at Equifax, the 3 billion Yahoo accounts, WannaCry across 150 countries, and the 1.35 Tbps that took GitHub offline.",
        "You can now take a phishing email apart clue by clue, trace an attack back through a software supply chain, and name the five categories of cybercrime: hacking, phishing, ransomware, identity theft, and denial of service, including whether a flood came from one source or many.",
        "Dana: \"All of that is diagnosis. You can describe how an organisation gets attacked. Unit 2 is about preventing it.\"",
      ],
      teaser:
        "Unit 2: Defence. Unit 1 covered how attacks work. Unit 2 covers how to stop them: strong passwords, multi-factor authentication, encryption, and using the internet without giving away access.",
      xp: 60,
      badge: "unit1-certified",
      next: null,
    },
  },
};

export default act3;
