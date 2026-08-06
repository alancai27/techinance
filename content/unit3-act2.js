// @ts-check

/**
 * Cybersecurity, Unit 3, Act 2: "Skills and Certifications"
 *
 * Source material: "Skills and Certifications"
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Figures and names quoted here come from that document and must stay exact:
 *   CompTIA Security+ ($404, 2-3 months at 1-2 hrs/day),
 *   GISF ($999 for 2 attempts, 55+ hours),
 *   CEH ($950-1,199, 2-3 months),
 *   the three free platforms (Cisco Networking Academy, Coursera, Codecademy),
 *   the five hard skills and five soft skills listed.
 *
 * Scene ids are namespaced `u3a2-*`. The last scene hands off to `u3a3-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  skillsGuide: {
    label: "15 Essential Skills for Cybersecurity Analysts in 2024 (Coursera)",
    url: "https://www.coursera.org/articles/cybersecurity-analyst-skills",
  },
  certBeginner: {
    label: "11 Entry-Level Cybersecurity Certifications for Beginners (Indeed)",
    url: "https://www.indeed.com/career-advice/career-development/cyber-security-certifications-for-beginners",
  },
  cisco: {
    label: "Cisco Networking Academy",
    url: "https://www.netacad.com/",
  },
};

/**
 * Badges the acts award are registered centrally in cyber-unit3.js. This act
 * awards `cert-strategist`.
 *
 * @type {{ id: string, name: string, description: string, icon: string }[]}
 */
export const act2Badges = [];

export const act2 = {
  entry: "u3a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u3a2-start": {
      id: "u3a2-start",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre, 09:20",
      text: [
        "\"Certifications matter, but they cost time and money you might not have yet,\" Dana says. \"So before we talk about which ones to get, let's talk about when to get them.\"",
        "\"If you're a beginner, you shouldn't dive right into obtaining difficult skills or certifications. Start with basic cybersecurity knowledge, and start choosing which field of cybersecurity you want to concentrate on.\"",
        "\"That choice matters because some certifications give a little bit of knowledge in every cybersecurity field, and some concentrate specifically on networking, securing operating systems, or penetration tests.\"",
      ],
      source: SOURCES.certBeginner,
      xp: 10,
      next: "u3a2-beginner-choice",
    },

    /* ---------------- 2. the honest sequencing advice ---------------- */
    "u3a2-beginner-choice": {
      id: "u3a2-beginner-choice",
      type: "choice",
      title: "What should a beginner do first?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Say a new analyst walks in the door tomorrow with zero certifications. What's their first move?\"",
      ],
      prompt: "Pick the answer you think is true.",
      options: [
        {
          label: "Sign up for the hardest, most respected certification available immediately.",
          next: "u3a2-cert-terminal",
          xp: 5,
          tone: "bad",
          feedback:
            "That skips a step. Beginners should not dive right into obtaining difficult skills or certifications. Start with basic cybersecurity knowledge, and start choosing which field to concentrate on first.",
        },
        {
          label: "Start with basic knowledge, then choose a field to concentrate on.",
          next: "u3a2-cert-terminal",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Choosing your field of concentration helps a lot when you begin getting certifications, because some give broad knowledge across every field, while others concentrate specifically on networking, operating systems, or penetration tests.",
        },
        {
          label: "Skip certifications entirely, since only hard skills matter.",
          next: "u3a2-cert-terminal",
          xp: 5,
          tone: "bad",
          feedback:
            "Certifications are extremely important for a cybersecurity professional, even though they cost time and money. The real first step is basic knowledge and choosing a field, not skipping certifications altogether.",
        },
      ],
      source: SOURCES.certBeginner,
    },

    /* ---------------- 3. three named certifications ---------------- */
    "u3a2-cert-terminal": {
      id: "u3a2-cert-terminal",
      type: "terminal",
      title: "ORACLE: certification briefing",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "\"Three certifications come up constantly for beginners,\" Ravi says. \"Pull the specs on all three before you spend a dollar on any of them.\"",
      ],
      prompt: "Run the briefing commands on ORACLE.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "secplus",
          cmd: "certs --info comptia-security-plus",
          output: [
            "CompTIA Security+",
            "  A global certification that validates the baseline skills you need to",
            "  perform core security functions and pursue an IT security career.",
            "  Duration : 2-3 months, at 1-2 hours of study per day.",
            "  Cost     : $404 (CompTIA's official website).",
          ],
          required: true,
        },
        {
          id: "gisf",
          cmd: "certs --info gisf",
          output: [
            "GIAC Information Security Fundamentals (GISF)",
            "  Holders can demonstrate key concepts of information security,",
            "  including threats and risks to information, and identifying best",
            "  practices to protect it.",
            "  Duration : 55 hours or more.",
            "  Cost     : $999 for 2 attempts (GIAC's official website).",
          ],
          required: true,
        },
        {
          id: "ceh",
          cmd: "certs --info ceh",
          output: [
            "Certified Ethical Hacker (CEH)",
            "  Indicates the holder understands how to look for weaknesses and",
            "  vulnerabilities in computer systems, and is proficient with the",
            "  tools used by a malicious hacker.",
            "  Duration : 2-3 months.",
            "  Cost     : $950-1,199.",
          ],
          required: true,
        },
      ],
      source: SOURCES.certBeginner,
      xp: 30,
      next: "u3a2-cert-quiz",
    },

    /* ---------------- 4. cheapest of the three ---------------- */
    "u3a2-cert-quiz": {
      id: "u3a2-cert-quiz",
      type: "quiz",
      title: "Knowledge check: cost of entry",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "\"For most beginners, all three of those certifications are too much to ask for at once,\" Ravi says. \"Which one costs the least?\"",
      ],
      question: "Of CompTIA Security+, GISF, and CEH, which has the lowest listed cost?",
      options: [
        {
          label: "CompTIA Security+, at $404",
          correct: true,
          feedback:
            "Correct. CompTIA Security+ costs $404, compared to $999 for 2 attempts at GISF and $950-1,199 for CEH. It also takes the least study time: 2-3 months at 1-2 hours per day.",
        },
        {
          label: "GISF, at $999 for 2 attempts",
          correct: false,
          feedback:
            "GISF is the most expensive of the three at $999 for 2 attempts. CompTIA Security+ costs $404, the lowest of the three.",
        },
        {
          label: "CEH, at $950-1,199",
          correct: false,
          feedback:
            "CEH costs $950-1,199, more than CompTIA Security+ at $404, which is the lowest of the three.",
        },
        {
          label: "They all cost the same.",
          correct: false,
          feedback:
            "They don't. CompTIA Security+ is $404, GISF is $999 for 2 attempts, and CEH is $950-1,199. Security+ is the cheapest by a wide margin.",
        },
      ],
      source: SOURCES.certBeginner,
      xp: 25,
      next: "u3a2-cert-match",
    },

    /* ---------------- 5. matching a cert to a goal ---------------- */
    "u3a2-cert-match": {
      id: "u3a2-cert-match",
      type: "choice",
      title: "Match the certification to the goal",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Cost isn't the only thing that decides this,\" Dana says. \"Someone tells you they want to become a Penetration Tester eventually. They already have the basics down.\"",
        "\"Which of the three fits what they're aiming at?\"",
      ],
      prompt: "Pick the certification that matches the goal.",
      options: [
        {
          label: "Certified Ethical Hacker, because it covers finding weaknesses and the tools a malicious hacker uses.",
          next: "u3a2-free-resources",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. CEH indicates the holder understands how to look for weaknesses and vulnerabilities in computer systems and is proficient with the tools used by a malicious hacker. That's the work a Penetration Tester does, so it's the closest match to the goal.",
        },
        {
          label: "GISF, because it's the most expensive, so it must be the most advanced.",
          next: "u3a2-free-resources",
          xp: 5,
          tone: "bad",
          feedback:
            "Price doesn't tell you what a certification covers. GISF is about key concepts of information security, including threats and risks and best practices to protect information. That's broad knowledge, not penetration testing.",
        },
        {
          label: "It doesn't matter which one. Any certification works for any goal.",
          next: "u3a2-free-resources",
          xp: 5,
          tone: "bad",
          feedback:
            "It does matter. Some certifications give a little bit of knowledge in every cybersecurity field, and some concentrate specifically on networking, securing operating systems, or penetration tests. Matching the certification to your field is the whole point of choosing a field first.",
        },
      ],
      source: SOURCES.certBeginner,
    },

    /* ---------------- 6. free resources ---------------- */
    "u3a2-free-resources": {
      id: "u3a2-free-resources",
      type: "dossier",
      title: "Free resources, before you pay for anything",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Certifications require time and money most beginners don't have yet,\" Dana says. \"Here's where you go first, before spending a cent.\"",
      ],
      terms: [
        {
          term: "Cisco Networking Academy",
          definition:
            "Hundreds of courses across many levels and fields. Recommended starting points: Introduction to Cybersecurity, Introduction to Operating Systems, and Networking Basics. The most recognized platform in the cybersecurity field, and it also offers certifications.",
        },
        {
          term: "Coursera",
          definition:
            "A reliable platform offering many free courses. Some courses may not be free, so check before enrolling.",
        },
        {
          term: "Codecademy",
          definition:
            "Offers cybersecurity and coding courses that build the basic skills a cybersecurity specialist needs. Some courses may not be free, so check before enrolling.",
        },
      ],
      source: SOURCES.cisco,
      xp: 20,
      badge: "cert-strategist",
      next: "u3a2-platform-quiz",
    },

    /* ---------------- 7. which platform, and what to take first ---------------- */
    "u3a2-platform-quiz": {
      id: "u3a2-platform-quiz",
      type: "quiz",
      title: "Knowledge check: where to start for free",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "\"You have three free platforms on that card,\" Ravi says. \"One of them stands out for a beginner in this field specifically.\"",
      ],
      question:
        "Which platform is described as the most recognized in the cybersecurity field, and also offers certifications?",
      options: [
        {
          label: "Cisco Networking Academy",
          correct: true,
          feedback:
            "Correct. Cisco Networking Academy is the most recognized platform in the cybersecurity field and it also offers certifications. Good starting points there are Introduction to Cybersecurity, Introduction to Operating Systems, and Networking Basics.",
        },
        {
          label: "Coursera",
          correct: false,
          feedback:
            "Coursera is a reliable platform with many free courses, and some courses that aren't free. The most recognized platform in the cybersecurity field is Cisco Networking Academy, which also offers certifications.",
        },
        {
          label: "Codecademy",
          correct: false,
          feedback:
            "Codecademy offers cybersecurity and coding courses that build basic skills, and some of its courses aren't free. Cisco Networking Academy is the most recognized in this field and also offers certifications.",
        },
        {
          label: "None of them. Free platforms don't offer certifications.",
          correct: false,
          feedback:
            "Cisco Networking Academy does offer certifications alongside its free courses, which is part of why it's the most recognized platform in the cybersecurity field.",
        },
      ],
      source: SOURCES.cisco,
      xp: 25,
      next: "u3a2-sort-skills",
    },

    /* ---------------- 8. sort hard vs soft skills ---------------- */
    "u3a2-sort-skills": {
      id: "u3a2-sort-skills",
      type: "sort",
      title: "Sort the skills employers look for",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "\"Employers don't just check hard skills,\" Ravi says. \"They check soft skills too. Sort these into the right column.\"",
      ],
      prompt: "Drag each skill into the right column.",
      buckets: [
        { id: "hard", label: "Hard skills", hint: "Knowledge from education; technical skills" },
        { id: "soft", label: "Soft skills", hint: "Personal skills and characteristics" },
      ],
      items: [
        {
          id: "prog-langs",
          label: "Knowledge of programming languages",
          bucket: "hard",
          explain: "A hard skill: technical knowledge you get from education and practice.",
        },
        {
          id: "networking",
          label: "Basic understanding of network security and networking",
          bucket: "hard",
          explain: "A hard skill: understanding how networks and their defenses actually work.",
        },
        {
          id: "os",
          label: "Knowledge about operating systems",
          bucket: "hard",
          explain: "A hard skill: technical familiarity with how operating systems behave.",
        },
        {
          id: "scripting",
          label: "Scripting",
          bucket: "hard",
          explain: "A hard skill: a way of programming that tells the computer what to do, when, and how.",
        },
        {
          id: "threats",
          label: "Understanding of cybersecurity threats and vulnerabilities",
          bucket: "hard",
          explain: "A hard skill: technical knowledge of how attacks and weaknesses work.",
        },
        {
          id: "communication",
          label: "Communication",
          bucket: "soft",
          explain: "A soft skill: a personal characteristic, not a technical certification.",
        },
        {
          id: "collaboration",
          label: "Collaboration",
          bucket: "soft",
          explain: "A soft skill: working well with others rather than a technical competency.",
        },
        {
          id: "critical-thinking",
          label: "Critical thinking",
          bucket: "soft",
          explain: "A soft skill: a way of reasoning through a problem, not a certification.",
        },
        {
          id: "adaptability",
          label: "Adaptability",
          bucket: "soft",
          explain: "A soft skill: a personal trait, not something a course certifies.",
        },
        {
          id: "attention-detail",
          label: "Attention to detail",
          bucket: "soft",
          explain: "A soft skill: a personal characteristic that shows up across every role, not a technical one.",
        },
      ],
      source: SOURCES.skillsGuide,
      xp: 35,
      next: "u3a2-soft-quiz",
    },

    /* ---------------- 9. why the soft column exists ---------------- */
    "u3a2-soft-quiz": {
      id: "u3a2-soft-quiz",
      type: "quiz",
      title: "Knowledge check: hard and soft skills",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"People training for this field tend to work on one column and ignore the other,\" Dana says. \"Usually the same one.\"",
      ],
      question: "What's the difference between a hard skill and a soft skill?",
      options: [
        {
          label: "Hard skills are technical knowledge from education; soft skills are personal skills and characteristics.",
          correct: true,
          feedback:
            "Correct. Scripting, networking, operating systems, programming languages, and understanding threats and vulnerabilities are hard skills. Communication, collaboration, critical thinking, adaptability, and attention to detail are soft skills. Employers check both.",
        },
        {
          label: "Hard skills are difficult to learn; soft skills are easy to learn.",
          correct: false,
          feedback:
            "The names aren't about difficulty. Hard skills are technical knowledge you get from education and practice. Soft skills are personal skills and characteristics, and they can take just as long to build.",
        },
        {
          label: "Hard skills are needed for advanced roles; soft skills are needed for entry-level roles.",
          correct: false,
          feedback:
            "Both matter at every level. Employers check hard skills and soft skills together, whether the role is entry-level or advanced.",
        },
        {
          label: "Hard skills appear on certifications; soft skills don't exist on job postings.",
          correct: false,
          feedback:
            "Soft skills appear on job postings constantly. Communication, collaboration, critical thinking, adaptability, and attention to detail are all things employers list and ask about.",
        },
      ],
      source: SOURCES.skillsGuide,
      xp: 25,
      next: "u3a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "u3a2-handoff": {
      id: "u3a2-handoff",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre, 09:50",
      text: [
        "\"You know the roles, the certifications, and the skills behind both,\" Dana says. \"Last part of the shift is putting them together.\"",
        "\"Act 3 is you reading a real posting and deciding what your own first year would look like.\"",
      ],
      xp: 15,
      next: "u3a3-start",
    },
  },
};

export default act2;
