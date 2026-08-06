// @ts-check

/**
 * Cybersecurity, Unit 3, Act 3: "Planning Your Own Path"
 *
 * Source material: "Overview of Cybersecurity Careers" and "Skills and
 * Certifications" (Viktoriia Dmitrieva, Techinance Technology Lead Course
 * Developer).
 *
 * This act introduces no new figures. It applies the ones taught in acts 1 and
 * 2: the six roles and their salary ranges, the three certifications and their
 * costs and durations, the three free platforms, and the hard and soft skill
 * lists. The job posting is fictional; every duty printed on it is quoted from
 * the role descriptions in act 1, which is what makes the mismatch findable.
 *
 * Scene ids are namespaced `u3a3-*`. The last scene ends the episode.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  jobsGuide: {
    label: "10 Cybersecurity Jobs to Know: Entry-Level and Beyond (Coursera)",
    url: "https://www.coursera.org/articles/cybersecurity-jobs",
  },
  certBeginner: {
    label: "11 Entry-Level Cybersecurity Certifications for Beginners (Indeed)",
    url: "https://www.indeed.com/career-advice/career-development/cyber-security-certifications-for-beginners",
  },
  cisco: {
    label: "Cisco Networking Academy",
    url: "https://www.netacad.com/",
  },
  skillsGuide: {
    label: "15 Essential Skills for Cybersecurity Analysts in 2024 (Coursera)",
    url: "https://www.coursera.org/articles/cybersecurity-analyst-skills",
  },
};

/**
 * Badges the acts award are registered centrally in cyber-unit3.js. This act
 * awards `unit3-certified`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act3Badges = [];

export const act3 = {
  entry: "u3a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u3a3-start": {
      id: "u3a3-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "briefcase",
      location: "Security Operations Centre, 09:55",
      text: [
        "\"Everything so far has been reference material,\" Ravi says. \"Now you use it.\"",
        "\"Job postings don't always describe the job accurately. A posting can say entry-level at the top and then list work that belongs to a mid or advanced role further down. If you can't spot that, you'll either talk yourself out of applying for jobs you could do, or into applying for ones you can't yet.\"",
        "\"Read the next one carefully.\"",
      ],
      xp: 10,
      next: "u3a3-posting-inspect",
    },

    /* ---------------- 2. read the posting ---------------- */
    "u3a3-posting-inspect": {
      id: "u3a3-posting-inspect",
      type: "inspect",
      title: "Review the posting: is this really entry-level?",
      speaker: "Dana Okoye",
      avatar: "file-text",
      location: "Analyst station 7",
      text: [
        "Dana puts a posting on the shared screen. \"This one is advertised as entry-level. Compare each line against what act 1 said the six roles actually do.\"",
      ],
      prompt:
        "Tap the lines that describe mid or advanced work, or that a beginner couldn't reasonably meet. Find at least 4.",
      artifact: {
        kind: "posting",
        fields: [
          { label: "Position", value: "Junior Security Analyst", hot: "position" },
          { label: "Employer", value: "Harborline Systems", hot: "employer" },
          { label: "Advertised level", value: "Entry-level, no experience required", hot: "level" },
          { label: "Team", value: "Security Operations", hot: "team" },
        ],
        body: [
          "RESPONSIBILITIES",
          "Monitor networks for vulnerabilities and breaches.",
          "Investigate and report breaches to the incident lead.",
          {
            hot: "pentest",
            text: "Perform simulated cyberattacks against production systems and write up the results.",
          },
          {
            hot: "standards",
            text: "Develop security standards, strategies, and policies for the whole organization.",
          },
          {
            hot: "automate",
            text: "Automate vulnerability detection across the company estate.",
          },
          "REQUIREMENTS",
          "Strong communication, collaboration, and attention to detail.",
          {
            hot: "cert",
            text: "Certified Ethical Hacker certification ($950-1,199) must be held before applying.",
          },
          "Willingness to learn scripting and operating system fundamentals on the job.",
        ],
      },
      requiredFinds: 4,
      hotspots: {
        position: {
          suspicious: false,
          explain: "The job title. Nothing here tells you what level the work really is.",
        },
        employer: {
          suspicious: false,
          explain: "The company name. Not evidence either way.",
        },
        level: {
          suspicious: false,
          explain:
            "This is the claim you're testing, not the evidence. Entry-level means suitable for a beginner, so check whether the duties below match that.",
        },
        team: {
          suspicious: false,
          explain: "A Security Operations team is where an Information Security Analyst would sit. That part fits.",
        },
        pentest: {
          suspicious: true,
          explain:
            "Performing simulated cyberattacks and creating reports based on the results is the Penetration Tester's job, a mid/advanced role averaging $111,000-120,000. It doesn't belong on an entry-level posting.",
        },
        standards: {
          suspicious: true,
          explain:
            "Developing security standards, strategies, and policies is Security Engineer work, the highest-paid of the six roles at $136,000-156,000 and firmly mid/advanced.",
        },
        automate: {
          suspicious: true,
          explain:
            "Automating vulnerability detection is also listed under Security Engineer, a mid/advanced role. A beginner would need scripting skills well beyond what this posting says it will teach on the job.",
        },
        cert: {
          suspicious: true,
          explain:
            "CEH costs $950-1,199 and signals proficiency with the tools a malicious hacker uses. Requiring it up front contradicts no experience required, and beginners are advised to start with basic knowledge before paying for difficult certifications.",
        },
      },
      source: SOURCES.jobsGuide,
      xp: 40,
      next: "u3a3-posting-quiz",
    },

    /* ---------------- 3. what the posting actually is ---------------- */
    "u3a3-posting-quiz": {
      id: "u3a3-posting-quiz",
      type: "quiz",
      title: "Knowledge check: what did that posting describe?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Two of the responsibilities were genuinely entry-level,\" Dana says. \"The rest came from somewhere else.\"",
      ],
      question:
        "Which two roles did the mid and advanced responsibilities on that posting actually come from?",
      options: [
        {
          label: "Penetration Tester and Security Engineer",
          correct: true,
          feedback:
            "Correct. Performing simulated cyberattacks is Penetration Tester work at $111,000-120,000. Developing security standards and automating vulnerability detection are both Security Engineer work at $136,000-156,000. Both are mid/advanced.",
        },
        {
          label: "IT Auditor and Digital Forensic Examiner",
          correct: false,
          feedback:
            "Both of those are entry-level. IT Auditor examines systems and performs audits at $89,000-100,000, and Digital Forensic Examiner collects and analyzes digital evidence at $83,000-90,000. Neither duty appeared on the posting.",
        },
        {
          label: "Information Security Analyst and IT Auditor",
          correct: false,
          feedback:
            "Information Security Analyst work did appear, and it's entry-level: monitoring networks for vulnerabilities and breaches, and investigating and reporting breaches. Those were the two lines that genuinely fit. IT Auditor didn't appear at all.",
        },
        {
          label: "Security System Administrator and Digital Forensic Examiner",
          correct: false,
          feedback:
            "Security System Administrator work is monitoring systems and troubleshooting outages, which wasn't on the posting. The mid/advanced lines came from Penetration Tester and Security Engineer.",
        },
      ],
      source: SOURCES.jobsGuide,
      xp: 25,
      next: "u3a3-plan-terminal",
    },

    /* ---------------- 4. build a first-year plan ---------------- */
    "u3a3-plan-terminal": {
      id: "u3a3-plan-terminal",
      type: "terminal",
      title: "ORACLE: draft a starting plan",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "\"Now build the other side of it,\" Ravi says. \"A plan that starts where a beginner actually starts. ORACLE has the durations and costs from act 2 loaded already.\"",
      ],
      prompt: "Run the planning commands on ORACLE.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "free",
          cmd: "plan --stage 1 --budget 0",
          output: [
            "STAGE 1 // BASIC KNOWLEDGE, NO COST",
            "  Cisco Networking Academy, recommended starting courses:",
            "    - Introduction to Cybersecurity",
            "    - Introduction to Operating Systems",
            "    - Networking Basics",
            "  Also available free: Coursera, Codecademy.",
            "  NOTE: some courses on those two platforms are not free. Check first.",
          ],
          required: true,
        },
        {
          id: "field",
          cmd: "plan --stage 2 --choose-field",
          output: [
            "STAGE 2 // CHOOSE A FIELD OF CONCENTRATION",
            "  Some certifications cover a little of every cybersecurity field.",
            "  Others concentrate on one:",
            "    - networking",
            "    - securing operating systems",
            "    - penetration tests",
            "  Choosing here decides which certification is worth paying for.",
          ],
          required: true,
        },
        {
          id: "cert",
          cmd: "plan --stage 3 --first-certification",
          output: [
            "STAGE 3 // FIRST PAID CERTIFICATION",
            "  CompTIA Security+ : $404, 2-3 months at 1-2 hours per day.",
            "    Validates the baseline skills needed to perform core security",
            "    functions and pursue an IT security career.",
            "  Compare against:",
            "    GISF : $999 for 2 attempts, 55 hours or more.",
            "    CEH  : $950-1,199, 2-3 months.",
          ],
          required: true,
        },
      ],
      source: SOURCES.certBeginner,
      xp: 30,
      next: "u3a3-hours-reveal",
    },

    /* ---------------- 5. study time reveal ---------------- */
    "u3a3-hours-reveal": {
      id: "u3a3-hours-reveal",
      type: "reveal",
      title: "What GISF asks for in study time",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "\"Cost is the number people compare,\" Ravi says. \"Time is the one that decides whether you finish. GISF publishes a figure. Guess it.\"",
      ],
      question: "How many hours of study does GISF list?",
      options: ["10 hours or more", "25 hours or more", "55 hours or more", "300 hours or more"],
      answerIndex: 2,
      value: "55 hours",
      caption: "GIAC Information Security Fundamentals lists 55 hours or more of study.",
      explain:
        "GISF lists 55 hours or more, and costs $999 for 2 attempts. CompTIA Security+ asks for 2-3 months at 1-2 hours per day for $404. Neither is a weekend, which is why the free platforms come first.",
      source: SOURCES.certBeginner,
      xp: 30,
      next: "u3a3-dossier",
    },

    /* ---------------- 6. dossier ---------------- */
    "u3a3-dossier": {
      id: "u3a3-dossier",
      type: "dossier",
      title: "Analyst dossier: skills and study",
      speaker: "Dana Okoye",
      avatar: "graduation-cap",
      location: "Security Operations Centre",
      text: [
        "\"Second reference card,\" Dana says. \"These are the words you'll need when you start reading postings on your own.\"",
      ],
      terms: [
        {
          term: "Hard skills",
          explain: "Knowledge that comes from education, plus technical skills. Programming languages, networking, operating systems, scripting, and understanding threats and vulnerabilities.",
        },
        {
          term: "Soft skills",
          explain: "Personal skills and characteristics. Communication, collaboration, critical thinking, adaptability, and attention to detail.",
        },
        {
          term: "Scripting",
          explain: "A way of programming that tells the computer what to do, when, and how.",
        },
        {
          term: "Field of concentration",
          explain: "The part of cybersecurity you choose to specialize in, such as networking, securing operating systems, or penetration tests.",
        },
        {
          term: "Certification",
          explain: "A qualification awarded after passing an exam that tests a defined set of skills. Some cover a little of every cybersecurity field; others concentrate on one.",
        },
        {
          term: "Baseline skills",
          explain: "The core skills needed to perform basic security functions, which is what CompTIA Security+ is built to validate.",
        },
      ],
      source: SOURCES.skillsGuide,
      xp: 20,
      next: "u3a3-first-move",
    },

    /* ---------------- 7. the first three months ---------------- */
    "u3a3-first-move": {
      id: "u3a3-first-move",
      type: "choice",
      title: "Your own first three months",
      speaker: "Ravi Mehta",
      avatar: "compass",
      location: "Security Operations Centre",
      text: [
        "\"Last decision of the shift, and it's yours rather than a hypothetical analyst's,\" Ravi says. \"You have no certifications, no budget, and a few hours a week.\"",
        "\"What do the first three months look like?\"",
      ],
      prompt: "Pick the plan that matches the advice in this unit.",
      options: [
        {
          label:
            "Work through Introduction to Cybersecurity, Introduction to Operating Systems, and Networking Basics on Cisco Networking Academy, then pick a field.",
          next: "u3a3-final-quiz",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. That's the order the unit lays out: basic knowledge first, from the most recognized platform in the field, then choose your field of concentration, then pay for a certification that matches it.",
        },
        {
          label: "Put $999 toward GISF now, because starting with the most expensive certification saves time later.",
          next: "u3a3-final-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Beginners shouldn't dive straight into difficult or expensive certifications. GISF also lists 55 hours or more of study, which is hard to sustain without the basics behind you. Free courses first.",
        },
        {
          label: "Apply for Security Engineer roles immediately, since they pay $136,000-156,000.",
          next: "u3a3-final-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Security Engineer is a mid/advanced role. It expects the experience the entry-level roles exist to build. Aiming there first skips the part where you become qualified for it.",
        },
      ],
      source: SOURCES.cisco,
    },

    /* ---------------- 8. synthesis ---------------- */
    "u3a3-final-quiz": {
      id: "u3a3-final-quiz",
      type: "quiz",
      title: "Knowledge check: the shape of a career plan",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"One more, and it covers the whole unit,\" Dana says.",
      ],
      question: "What order does this unit recommend for someone starting from nothing?",
      options: [
        {
          label: "Basic knowledge, then choose a field, then certifications that match that field.",
          correct: true,
          feedback:
            "Correct. Start with basic cybersecurity knowledge, choose the field you want to concentrate on, then pick certifications accordingly, because some cover every field broadly and others concentrate on networking, operating systems, or penetration tests.",
        },
        {
          label: "Certifications first, then basic knowledge, then choose a field.",
          correct: false,
          feedback:
            "That's backwards, and expensive. Without a field chosen you can't tell whether a $404, $950, or $999 certification is even the right one for you.",
        },
        {
          label: "Choose a field, then apply for advanced roles, then study if you don't get hired.",
          correct: false,
          feedback:
            "Mid and advanced roles expect prior experience. The entry-level roles are what build it, and the free platforms are what get you ready to apply for those.",
        },
        {
          label: "Only hard skills matter, so study scripting until someone hires you.",
          correct: false,
          feedback:
            "Employers check hard skills and soft skills together. Communication, collaboration, critical thinking, adaptability, and attention to detail sit next to scripting on the requirements list, as that posting showed.",
        },
      ],
      source: SOURCES.certBeginner,
      xp: 25,
      next: "u3a3-ending",
    },

    /* ---------------- 9. ending ---------------- */
    "u3a3-ending": {
      id: "u3a3-ending",
      type: "ending",
      title: "Unit 3 complete",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre, 10:30",
      text: [
        "\"You now know the job market has more openings than people to fill them, what the six most common roles pay, and how a beginner actually builds toward one of them without going broke first,\" Dana says.",
        "\"You can also read a posting and tell whether it means what it says. That's the difference between browsing job boards and using them.\"",
        "\"Next unit is the technical side. Bring the vocabulary with you.\"",
      ],
      xp: 20,
      badge: "unit3-certified",
      next: null,
    },
  },
};

export default act3;
