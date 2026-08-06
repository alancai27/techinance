// @ts-check

/**
 * Cybersecurity, Unit 2, Act 1: "Digital Footprint & Reputation"
 *
 * Source material: Digital Footprint (Unit 2 Cybersecurity)
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   5.35 billion internet users worldwide (66.2% of global population, Jan 2024).
 *
 * Scene ids are namespaced `u2a1-*`. The last scene hands off to `u2a2-start`.
 */

/** Citations used by the statistic-bearing scenes in this act. */
const SOURCES = {
  footprintStats: {
    label: "37 Digital Footprint Statistics and Trends to Know for 2024 (Palowise)",
    url: "https://www.palowise.ai/blog/digital-footprint/digital-footprint-statistics/",
  },
};

/**
 * Badge metadata for the awards handed out in this act.
 */
export const act1Badges = [
  {
    id: "shadow-analyst",
    name: "Footprint Classifier",
    description: "Identified active and passive digital footprints.",
    icon: "network",
  },
];

export const act1 = {
  entry: "u2a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u2a1-start": {
      id: "u2a1-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance HQ, 08:00",
      text: [
        "Welcome to Unit 2 at the Techinance Security Operations Centre.",
        "Ravi Mehta reviews the shift schedule. \"In Unit 1, we focused on incident response and how attacks happen. Unit 2 is about defense: protecting personal information and managing your digital footprint.\"",
        "\"Every system user and organization leaves a trail of data across the Internet. Understanding that trail is the first line of cybersecurity defense.\"",
      ],
      xp: 10,
      next: "u2a1-definition",
    },

    /* ---------------- 2. definition quiz ---------------- */
    "u2a1-definition": {
      id: "u2a1-definition",
      type: "quiz",
      title: "Knowledge check: What is a digital footprint?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana Okoye joins the briefing. "Before we examine technical logs, let\'s make sure we have the core definition right."',
      ],
      question: "What is digital footprint?",
      options: [
        {
          label: "a unique set of your activities on the Internet.",
          correct: true,
          feedback:
            "Correct. A digital footprint (also called a digital shadow or electronic footprint) is a unique set of your activities on the Internet, including emails, search history, watched videos, comments, and personal information.",
        },
        {
          label: "all the messages that you send across the Internet.",
          correct: false,
          feedback:
            "Messages are only one part of your digital footprint. It also includes search history, videos watched, website cookies, IP addresses, and posted comments.",
        },
        {
          label: "the amount of electricity your devices consume.",
          correct: false,
          feedback:
            "That refers to energy consumption or a carbon footprint, not a digital footprint.",
        },
        {
          label: "all the apps that you have on your device.",
          correct: false,
          feedback:
            "Apps stored locally on your device don't define your digital footprint, although using those apps online contributes data to it.",
        },
      ],
      source: SOURCES.footprintStats,
      xp: 25,
      next: "u2a1-scale",
    },

    /* ---------------- 3. internet scale reveal ---------------- */
    "u2a1-scale": {
      id: "u2a1-scale",
      type: "reveal",
      title: "Global internet user population",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana opens the global telemetry dashboard. "To understand why a digital footprint matters, look at how many people are connected across the planet."',
        '"As of January 2024, what is the global number of internet users?"',
      ],
      question: "As of January 2024, how many internet users exist worldwide?",
      options: [
        "850 million users",
        "2.1 billion users",
        "3.8 billion users",
        "5.35 billion users",
      ],
      answerIndex: 3,
      value: "5.35 billion",
      caption: "Over 5.35 billion internet users worldwide (66.2% of the global population).",
      explain:
        "As of January 2024, there are over 5.35 billion internet users worldwide, representing 66.2% of the global population. This massive scale means that your digital footprint can be connected to millions of systems and people globally.",
      source: SOURCES.footprintStats,
      xp: 30,
      next: "u2a1-reputation",
    },

    /* ---------------- 4. reputation & career choice ---------------- */
    "u2a1-reputation": {
      id: "u2a1-reputation",
      type: "choice",
      title: "The impact of a digital shadow on your future",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana presents a career case study. "Your digital shadow follows you for years. Imagine leaving a hateful statement or comment on social media."',
        '"Ten years later, you apply for your dream job after a long search. You arrive at the interview where the hiring manager reviews your digital footprint."',
      ],
      prompt: "What happens during the hiring evaluation?",
      options: [
        {
          label: "Online comments expire automatically after 5 years, so the manager sees nothing.",
          next: "u2a1-badfootprint-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Information posted on the Internet is indexed, archived, and stored in databases. It doesn't disappear on its own over time.",
        },
        {
          label:
            "The hiring manager sees the hateful comment from 10 years ago, leading to rejection for the job position.",
          next: "u2a1-badfootprint-quiz",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Undesirable online activities build a bad digital shadow that can hurt your reputation and future job prospects, even a decade later. Keeping a clean, respectful digital footprint avoids this permanent setback.",
        },
        {
          label: "The manager only checks your resume and ignores all public internet activity.",
          next: "u2a1-badfootprint-quiz",
          xp: 5,
          tone: "bad",
          feedback:
            "Most modern employers conduct background checks that evaluate an applicant's public digital shadow before making hiring decisions.",
        },
      ],
      source: SOURCES.footprintStats,
    },

    /* ---------------- 5. bad digital footprint quiz ---------------- */
    "u2a1-badfootprint-quiz": {
      id: "u2a1-badfootprint-quiz",
      type: "quiz",
      title: "Knowledge check: Bad Digital Footprint",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi emphasizes the terminology. "Let\'s formalize the term for damaging online behavior."',
      ],
      question:
        "Undesirable online behaviors and activities that can hurt someone or someone’s reputation is called...",
      options: [
        {
          label: "Digital Footprint",
          correct: false,
          feedback:
            "Digital footprint is the neutral general term for all online activities.",
        },
        {
          label: "Good Digital Footprint",
          correct: false,
          feedback:
            "A good digital footprint consists of traceable data that builds a positive reputation.",
        },
        {
          label: "Bad Digital Footprint",
          correct: true,
          feedback:
            "Correct. A bad digital footprint refers to undesirable online behaviors and activities that hurt someone's reputation or future opportunities.",
        },
        {
          label: "Electronic Footprint",
          correct: false,
          feedback:
            "Electronic footprint is simply an alternative name for digital footprint in general.",
        },
      ],
      source: SOURCES.footprintStats,
      xp: 25,
      next: "u2a1-dossier",
    },

    /* ---------------- 6. dossier ---------------- */
    "u2a1-dossier": {
      id: "u2a1-dossier",
      type: "dossier",
      title: "Analyst dossier: Digital footprint fundamentals",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana hands you a reference card for Unit 2 definitions. "Keep these core terms clear in your notes."',
      ],
      terms: [
        {
          term: "Digital Footprint",
          definition:
            "A unique set of your activities on the Internet, which includes your emails, search history, posts, personal information, text messages, and watched videos. Also called digital shadow or electronic footprint.",
        },
        {
          term: "Search History",
          definition:
            "Lists of websites that a user has visited, as well as the exact timestamp of each visit.",
        },
        {
          term: "Bad Digital Footprint",
          definition:
            "Undesirable online behaviors and activities that can hurt someone or someone's reputation.",
        },
        {
          term: "Good Digital Footprint",
          definition:
            "Traceable data and positive online behaviors that build a trustworthy digital reputation around you.",
        },
        {
          term: "Electronic Footprint",
          definition:
            "An alternative name for a digital footprint or digital shadow.",
        },
      ],
      xp: 20,
      next: "u2a1-types-quiz",
    },

    /* ---------------- 7. footprint types quiz ---------------- */
    "u2a1-types-quiz": {
      id: "u2a1-types-quiz",
      type: "quiz",
      title: "Knowledge check: Types of digital footprint",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        '"Digital footprints are classified into two major categories depending on how the data is generated," Ravi notes.',
      ],
      question: "What are two types of digital footprint?",
      options: [
        {
          label: "Electronic and physical",
          correct: false,
          feedback:
            "Electronic refers to the digital realm, but physical isn't a category of digital footprint.",
        },
        {
          label: "Red and blue",
          correct: false,
          feedback: "Color categories have no relation to digital footprints.",
        },
        {
          label: "Active and passive",
          correct: true,
          feedback:
            "Correct. The two types of digital footprints are active (data you deliberately share) and passive (data collected without your explicit knowledge).",
        },
        {
          label: "Noticeable and not noticeable",
          correct: false,
          feedback:
            "While passive data may go unnoticed, the formal technical terms are active and passive.",
        },
      ],
      source: SOURCES.footprintStats,
      xp: 25,
      badge: "shadow-analyst",
      next: "u2a1-handoff",
    },

    /* ---------------- 8. handoff to act 2 ---------------- */
    "u2a1-handoff": {
      id: "u2a1-handoff",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 09:30",
      text: [
        'Ravi signs off on your Act 1 notes. "You\'ve established what a digital footprint is, its global scale, and how it impacts reputation."',
        '"Now let\'s inspect the technical mechanics of active versus passive data collection, browser cookies, and network tracking in Act 2."',
      ],
      xp: 15,
      next: "u2a2-start",
    },
  },
};

export default act1;
