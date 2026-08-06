// @ts-check

/**
 * Cybersecurity, Unit 3, Act 1: "The Cybersecurity Job Market"
 *
 * Source material: "Overview of Cybersecurity Careers"
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Every figure quoted here comes from that document and must stay exact:
 *   46% of surveyed enterprises had unfilled cybersecurity jobs in 2024 (ISACA),
 *   33% predicted job growth 2023-2033 (BLS),
 *   469,930 jobs opened for cybersecurity-related skills, May 2023-April 2024 (Coursera).
 *   Salary ranges and job descriptions for the six roles are quoted verbatim.
 *
 * Scene ids are namespaced `u3a1-*`. The last scene hands off to `u3a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  careerGuide: {
    label: "Your 2024 Guide to Cybersecurity Careers (Coursera)",
    url: "https://www.coursera.org/articles/cybersecurity-career-guide",
  },
  jobsGuide: {
    label: "10 Cybersecurity Jobs to Know: Entry-Level and Beyond (Coursera)",
    url: "https://www.coursera.org/articles/cybersecurity-jobs",
  },
};

/**
 * Badge metadata for the awards handed out in this act.
 */
export const act1Badges = [
  {
    id: "market-scout",
    name: "Market Scout",
    description: "Learned how much demand there is for cybersecurity talent right now.",
    icon: "trending-up",
  },
  {
    id: "career-mapper",
    name: "Career Mapper",
    description: "Sorted cybersecurity roles by entry, mid, and advanced level.",
    icon: "map",
  },
];

export const act1 = {
  entry: "u3a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u3a1-start": {
      id: "u3a1-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance HQ, 08:00",
      text: [
        "Welcome to Unit 3. Before you write a line of code or run a single command, it helps to know what you're actually training for. Today's shift is about the job market itself: who's hiring, what the roles are called, and what they pay.",
        "Ravi slides a hiring report across the desk. \"According to research from the Information Systems Audit and Control Association, 46% of surveyed enterprises had unfilled cybersecurity jobs in 2024. Almost half.\"",
        "\"That's not a fluke year either. The US Bureau of Labor Statistics predicts 33% job growth in this field between 2023 and 2033, which is much faster than the average across all occupations.\"",
      ],
      source: SOURCES.careerGuide,
      xp: 10,
      next: "u3a1-openings-quiz",
    },

    /* ---------------- 2. how many openings ---------------- */
    "u3a1-openings-quiz": {
      id: "u3a1-openings-quiz",
      type: "quiz",
      title: "Knowledge check: how big is the gap?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana pulls up a jobs dashboard. \"People assume this industry is competitive to break into. The numbers tell a different story. Between May 2023 and April 2024, how many jobs opened up for workers with cybersecurity-related skills?\"",
      ],
      question: "How many jobs opened for cybersecurity-related skills between May 2023 and April 2024?",
      options: [
        {
          label: "About 4,600",
          correct: false,
          feedback:
            "Too low by a wide margin. The real figure, reported by Coursera, is 469,930 jobs opened for workers with cybersecurity-related skills in that period.",
        },
        {
          label: "469,930",
          correct: true,
          feedback:
            "Correct. Between May 2023 and April 2024, 469,930 jobs opened for workers with cybersecurity-related skills. Combined with 46% of enterprises reporting unfilled roles, that's a field actively short on people.",
        },
        {
          label: "About 46,000",
          correct: false,
          feedback:
            "That's closer to the 46% figure than the jobs figure. The real number is 469,930 jobs opened for cybersecurity-related skills between May 2023 and April 2024.",
        },
        {
          label: "Under 1,000",
          correct: false,
          feedback:
            "Far too low. 469,930 jobs opened for workers with cybersecurity-related skills between May 2023 and April 2024, and 46% of surveyed enterprises still had unfilled cybersecurity jobs in 2024.",
        },
      ],
      source: SOURCES.careerGuide,
      xp: 25,
      badge: "market-scout",
      next: "u3a1-roles-intro",
    },

    /* ---------------- 3. six roles, briefly ---------------- */
    "u3a1-roles-intro": {
      id: "u3a1-roles-intro",
      type: "terminal",
      title: "ORACLE: role briefing",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "\"Six roles show up constantly on cybersecurity job boards,\" Ravi says. \"Pull the briefing so you know what each one actually does before we sort them.\"",
      ],
      prompt: "Run the briefing commands on ORACLE.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "entry",
          cmd: "roles --list --level entry",
          output: [
            "ENTRY-LEVEL ROLES // 3 entries",
            "  Digital Forensic Examiner  : $83,000-90,000",
            "    Extracting and retrieving data, collecting and analyzing digital",
            "    evidence, assisting law enforcement in investigations.",
            "  IT Auditor                 : $89,000-100,000",
            "    Examining computer systems, programs, and security measures;",
            "    planning and performing audits, presenting results.",
            "  Information Security Analyst : $70,000-120,000",
            "    Monitoring networks for vulnerabilities and breaches, developing",
            "    new security measures, investigating and reporting breaches.",
          ],
          required: true,
        },
        {
          id: "advanced",
          cmd: "roles --list --level mid-advanced",
          output: [
            "MID/ADVANCED ROLES // 3 entries",
            "  Security System Administrator : $78,000-88,000",
            "    Monitoring systems, troubleshooting issues and outages,",
            "    developing and documenting security procedures.",
            "  Penetration Tester             : $111,000-120,000",
            "    Performing simulated cyberattacks, creating reports based on",
            "    the results of penetration tests.",
            "  Security Engineer               : $136,000-156,000",
            "    Developing security standards, strategies, and policies; testing",
            "    security solutions; automating vulnerability detection.",
          ],
          required: true,
        },
      ],
      source: SOURCES.jobsGuide,
      xp: 25,
      next: "u3a1-sort-roles",
    },

    /* ---------------- 4. sort roles by level ---------------- */
    "u3a1-sort-roles": {
      id: "u3a1-sort-roles",
      type: "sort",
      title: "Sort the roles by career stage",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Put each role in the column it actually belongs to,\" Dana says. \"Entry-level roles are suitable for a beginner. Mid and advanced roles usually expect prior experience first.\"",
      ],
      prompt: "Drag each role into the right column.",
      buckets: [
        { id: "entry", label: "Entry-level", hint: "Suitable for a beginner" },
        { id: "advanced", label: "Mid or advanced level", hint: "Expects prior experience" },
      ],
      items: [
        {
          id: "forensic",
          label: "Digital Forensic Examiner",
          bucket: "entry",
          explain:
            "Digital Forensic Examiner is entry-level, averaging $83,000-90,000. It focuses on extracting and retrieving data and assisting law enforcement in investigations.",
        },
        {
          id: "itauditor",
          label: "IT Auditor",
          bucket: "entry",
          explain:
            "IT Auditor is entry-level, averaging $89,000-100,000. It involves examining computer systems and security measures, then planning and performing audits.",
        },
        {
          id: "isa",
          label: "Information Security Analyst",
          bucket: "entry",
          explain:
            "Information Security Analyst is entry-level, averaging $70,000-120,000. It covers monitoring networks for vulnerabilities and breaches and developing new security measures.",
        },
        {
          id: "sysadmin",
          label: "Security System Administrator",
          bucket: "advanced",
          explain:
            "Security System Administrator is a mid/advanced role, averaging $78,000-88,000. It covers monitoring systems, troubleshooting outages, and documenting security procedures.",
        },
        {
          id: "pentester",
          label: "Penetration Tester",
          bucket: "advanced",
          explain:
            "Penetration Tester is a mid/advanced role, averaging $111,000-120,000. It involves performing simulated cyberattacks and reporting the results.",
        },
        {
          id: "secengineer",
          label: "Security Engineer",
          bucket: "advanced",
          explain:
            "Security Engineer is a mid/advanced role, averaging $136,000-156,000, the highest of the six. It covers developing security standards and automating vulnerability detection.",
        },
      ],
      source: SOURCES.jobsGuide,
      xp: 35,
      badge: "career-mapper",
      next: "u3a1-salary-reveal",
    },

    /* ---------------- 5. top salary reveal ---------------- */
    "u3a1-salary-reveal": {
      id: "u3a1-salary-reveal",
      type: "reveal",
      title: "The highest-paid role on the list",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "\"One of those six roles pays more than the rest,\" Ravi says. \"Take a guess at the top of its range before I show you.\"",
      ],
      question: "What's the top of the average salary range for a Security Engineer?",
      options: ["Up to $100,000", "Up to $120,000", "Up to $156,000", "Up to $200,000"],
      answerIndex: 2,
      value: "$136,000-156,000",
      caption: "Security Engineer averages $136,000-156,000, the highest of the six roles covered.",
      explain:
        "Security Engineer is the highest-paid of the six roles, averaging $136,000-156,000. It's also a mid/advanced role, so it typically expects the experience the entry-level roles are there to build toward. Remember that average salaries and job descriptions depend on your professional level, skills, experience, and certifications.",
      source: SOURCES.jobsGuide,
      xp: 30,
      next: "u3a1-dossier",
    },

    /* ---------------- 6. dossier ---------------- */
    "u3a1-dossier": {
      id: "u3a1-dossier",
      type: "dossier",
      title: "Analyst dossier: careers vocabulary",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Learn these now,\" Dana says. \"They come up in every job posting you'll read from here on.\"",
      ],
      terms: [
        { term: "IT specialist", definition: "A person working in the field of information technology." },
        {
          term: "Penetration test",
          definition: "An authorized, simulated cyberattack made by a specialist in order to discover system vulnerabilities.",
        },
        { term: "Data", definition: "Facts and statistics collected together for further reference or analysis." },
        { term: "Cybersecurity", definition: "The practice of protecting systems, networks, and programs from digital attacks." },
        {
          term: "Cyberattack",
          definition: "Any attempt to exploit or damage a computer system, network, or data through unauthorized access.",
        },
        { term: "Job market", definition: "The market in which employers search for employees and employees search for jobs." },
        { term: "Entry-level", definition: "Suitable for a beginner." },
        { term: "Audit", definition: "Official inspection of an individual's or organization's accounts, typically by an independent body." },
        {
          term: "Security vulnerabilities",
          definition: "Flaws in a computer system that weaken the overall security of the system.",
        },
        {
          term: "Security breaches",
          definition: "Any incident that results in unauthorized access to computer data, applications, networks, or devices.",
        },
        { term: "Mid-level", definition: "Occurring at or having a middle or intermediate position or status." },
        { term: "Advanced level", definition: "Also called senior level or management; suitable for a professional." },
        { term: "Troubleshooting", definition: "Trace and correct faults in a mechanical or electronic system." },
        { term: "Outage", definition: "Period when a power supply or other service is not available or when equipment is closed down." },
      ],
      source: SOURCES.careerGuide,
      xp: 20,
      next: "u3a1-handoff",
    },

    /* ---------------- 7. handoff to act 2 ---------------- */
    "u3a1-handoff": {
      id: "u3a1-handoff",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 09:15",
      text: [
        "\"You know the demand is real and you know what the roles look like on paper,\" Ravi says. \"Next question: how does someone actually become qualified for one of them?\"",
        "\"Act 2 covers that. Skills, certifications, and which of them are worth your money.\"",
      ],
      xp: 15,
      next: "u3a2-start",
    },
  },
};

export default act1;