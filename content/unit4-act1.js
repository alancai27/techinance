// @ts-check

/**
 * Cybersecurity, Unit 4, Act 1: "Why Code Matters in Security"
 *
 * Source material: "Coding in Cybersecurity" and the Unit 4 slide deck
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   approximately 250 popular programming languages, more than 700 in total,
 *   over 95% of enterprise desktops run Java, 88% of all computers in the U.S.
 *   run Java, Java runs on over 5.5 billion devices.
 *
 * Scene ids are namespaced `u4a1-*`. The last scene hands off to `u4a2-start`.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  codingGuide: {
    label: "Learn how to code for cybersecurity (Cybersecurity Guide)",
    url: "https://cybersecurityguide.org/resources/coding-for-cybersecurity/",
  },
  javaLanguage: {
    label: "The Java Programming Language (Capicua)",
    url: "https://www.wearecapicua.com/blog/the-java-programming-language",
  },
};

/**
 * Badge metadata for the awards handed out in this act.
 */
/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act1Badges = [
];

export const act1 = {
  entry: "u4a1-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u4a1-start": {
      id: "u4a1-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance HQ, 08:00",
      text: [
        "Welcome back to the Techinance Security Operations Centre. Unit 2 covered your digital footprint and how to defend it. Unit 4 covers the tool you'll use to defend everything else: code.",
        "Ravi Mehta drops a stack of tickets on the desk. \"Coding, and being able to use programming languages to automate different tasks and processes, are two skills you need to work in this industry. An understanding of basic programming is crucial for success.\"",
        "\"You don't need to know any code yet. That's what this unit is for. By the end of it you'll read a short program and say what it does.\"",
      ],
      source: SOURCES.codingGuide,
      xp: 10,
      next: "u4a1-who-codes",
    },

    /* ---------------- 2. the honest nuance ---------------- */
    "u4a1-who-codes": {
      id: "u4a1-who-codes",
      type: "choice",
      title: "Does everyone in security write code?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana Okoye pulls up a chair. \"New analysts always ask this on day one, so let's settle it now.\"",
        "\"Across the whole cybersecurity industry, how much code does the average professional write?\"",
      ],
      prompt: "Pick the answer you think is true.",
      options: [
        {
          label: "Everyone in cybersecurity writes code every day. It's the whole job.",
          next: "u4a1-how-many",
          xp: 5,
          tone: "bad",
          feedback:
            "That overstates it. Some cybersecurity professionals never write a single line of code in their careers. It depends on the field they work in. Coding is still worth learning, because it decides which fields are open to you.",
        },
        {
          label: "It depends on the field. Some professionals never write a single line of code.",
          next: "u4a1-how-many",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Some cybersecurity professionals never write a single line of code in their careers, because it depends on the field. Penetration testers are expected to know Perl, Java and Python. Security engineers are expected to know Java, JavaScript, Python, SQL, PHP and others.",
        },
        {
          label: "Nobody in cybersecurity codes. That's a job for software developers.",
          next: "u4a1-how-many",
          xp: 5,
          tone: "bad",
          feedback:
            "That understates it. Penetration testers need Perl, Java and Python, and security engineers need Java, JavaScript, Python, SQL, PHP and others. Automating tasks and processes with code is one of the two core skills for the industry.",
        },
      ],
      source: SOURCES.codingGuide,
    },

    /* ---------------- 3. how many languages ---------------- */
    "u4a1-how-many": {
      id: "u4a1-how-many",
      type: "quiz",
      title: "Knowledge check: How many languages are there?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "\"Second question new analysts ask,\" Dana says. \"How many languages am I supposed to learn?\"",
      ],
      question: "Approximately how many popular computer programming languages are there?",
      options: [
        {
          label: "About 12",
          correct: false,
          feedback:
            "That's far too few. Roughly that many get talked about often, but there are approximately 250 popular programming languages, and more than 700 in total.",
        },
        {
          label: "About 250",
          correct: true,
          feedback:
            "Correct. There are approximately 250 popular computer programming languages. In total there are more than 700, though most of those are very specific and you'll never meet them. Eight matter most in cybersecurity.",
        },
        {
          label: "About 5,000",
          correct: false,
          feedback:
            "That's too many. There are more than 700 programming languages in total, and approximately 250 of those count as popular.",
        },
        {
          label: "Exactly one, called code",
          correct: false,
          feedback:
            "Code isn't a language. A programming language is a system of notation used to create applications, and there are approximately 250 popular ones.",
        },
      ],
      source: SOURCES.codingGuide,
      xp: 25,
      next: "u4a1-langs-brief",
    },

    /* ---------------- 4. the eight languages ---------------- */
    "u4a1-langs-brief": {
      id: "u4a1-langs-brief",
      type: "terminal",
      title: "ORACLE: language briefing",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "Ravi points at the SOC assistant terminal. \"ORACLE holds the reference sheet. Pull the eight languages that matter here, then read what each one is actually for.\"",
      ],
      prompt: "Run the briefing commands on ORACLE.",
      host: "analyst@techinance-soc",
      commands: [
      ],
      source: SOURCES.codingGuide,
      xp: 30,
      next: "u4a1-java-scale",
    },

    /* ---------------- 5. the Java reach figure ---------------- */
    "u4a1-java-scale": {
      id: "u4a1-java-scale",
      type: "reveal",
      title: "How far does Java reach?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana opens the reach report ORACLE flagged. \"Java isn't on the list because it's fashionable. It's on the list because it's underneath almost everything a company runs.\"",
        "\"A variety of industry sources estimate a share of enterprise desktops running Java. Make a call.\"",
      ],
      question: "What share of enterprise desktops do industry sources estimate run Java?",
      options: ["Over 25%", "Over 50%", "Over 75%", "Over 95%"],
      answerIndex: 3,
      value: "over 95%",
      caption: "Industry sources estimate that over 95% of enterprise desktops run Java.",
      explain:
        "A variety of industry sources estimate that over 95% of enterprise desktops run Java. Keep the three Java numbers separate, because they measure three different things. Over 95% is enterprise desktops, the work computers inside companies. 88% is all computers in the U.S., home machines included, which is a wider and therefore lower figure. Over 5.5 billion is devices, not computers, so it counts phones, cards and appliances as well. Different denominators, different numbers.",
      source: SOURCES.javaLanguage,
      xp: 30,
      next: "u4a1-java-vs-js",
    },

    /* ---------------- 6. Java is not JavaScript ---------------- */
    "u4a1-java-vs-js": {
      id: "u4a1-java-vs-js",
      type: "quiz",
      title: "Knowledge check: Java and JavaScript",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "Ravi writes two words on the board: Java, JavaScript. \"This is the most common mistake a beginner makes, so we'll deal with it directly. The names mislead people.\"",
      ],
      question: "What is the relationship between Java and JavaScript?",
      options: [
        {
          label: "They're two different programming languages.",
          correct: true,
          feedback:
            "Correct. Java and JavaScript are two different programming languages. The similar names are a historical accident. Java is extremely popular across enterprise IT, while JavaScript is the most popular and used language in the world and lives mostly in web development.",
        },
        {
          label: "JavaScript is the browser version of Java.",
          correct: false,
          feedback:
            "There's no such relationship. They're two separate languages with separate rules and separate uses. JavaScript supports interaction between a user and a web application, and Java runs across enterprise desktops and billions of devices.",
        },
        {
          label: "Java is a shortened name for JavaScript.",
          correct: false,
          feedback:
            "The names overlap, the languages don't. Java and JavaScript are two different programming languages, so code written for one won't run as the other.",
        },
        {
          label: "JavaScript replaced Java, so Java is no longer used.",
          correct: false,
          feedback:
            "Java is still in heavy use. Industry sources estimate that over 95% of enterprise desktops run Java, and Java runs on over 5.5 billion devices. Both languages are current, and they're separate languages.",
        },
      ],
      source: SOURCES.codingGuide,
      xp: 25,
      next: "u4a1-sort-langs",
    },

    /* ---------------- 7. sort languages by job ---------------- */
    "u4a1-sort-langs": {
      id: "u4a1-sort-langs",
      type: "sort",
      title: "Sort the languages by the job that requires them",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana pins two job descriptions to the board. \"Penetration testers are required to know Perl, Java and Python. Security engineers are required to know Java, JavaScript, Python, SQL, PHP and others.\"",
        "\"Two of those languages appear on both lists. Put each language where it belongs.\"",
      ],
      prompt: "Drag each language into the right column.",
      buckets: [
      ],
      items: [
      ],
      source: SOURCES.codingGuide,
      xp: 35,
      next: "u4a1-malware-read",
    },

    /* ---------------- 8. reading malware ---------------- */
    "u4a1-malware-read": {
      id: "u4a1-malware-read",
      type: "choice",
      title: "A sample lands in the queue",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Malware analysis bench",
      text: [
        "A ticket comes in. A staff laptop downloaded a file that the antivirus flagged, and the source code for that file is now sitting in the analysis queue.",
        "\"Somebody has to read it and say what it does,\" Ravi says. \"Which language should the analyst on that bench be able to read?\"",
      ],
      prompt: "Choose the language the malware bench needs most.",
      options: [
        {
          label: "C/C++, because most malware is written in it.",
          next: "u4a1-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Most malware is written in C/C++, which creates a need for proficiency in these languages for people working in cybersecurity. You aren't writing malware, you're reading it to find out what it does.",
        },
        {
          label: "SQL, because malware is stored in a database.",
          next: "u4a1-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "SQL manages databases, and it's worth knowing because databases are crucially important in cybersecurity. It isn't what malware is written in, though. Most malware is written in C/C++.",
        },
        {
          label: "Ruby, because it's used for web development.",
          next: "u4a1-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Ruby is similar to Python and Perl and is often used for web development, so it isn't the language on the malware bench. Most malware is written in C/C++.",
        },
        {
          label: "None. Analysts only run scanners, they don't read code.",
          next: "u4a1-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "A scanner tells you a file is bad, not what it does. Someone has to read the code, and since most malware is written in C/C++, that's the language the bench needs.",
        },
      ],
      source: SOURCES.codingGuide,
    },

    /* ---------------- 9. dossier ---------------- */
    "u4a1-dossier": {
      id: "u4a1-dossier",
      type: "dossier",
      title: "Analyst dossier: coding vocabulary",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana hands you the Unit 4 reference card. \"Every one of these words shows up in the rest of the unit. Learn them now and Act 2 gets easier.\"",
      ],
      terms: [
        {
          term: "Coding",
          definition: "A part of programming that deals with writing codes that a computer can understand.",
        },
        {
          term: "Programming",
          definition: "The process of writing computer programs.",
        },
        {
          term: "Programming language",
          definition: "A system of notation used to create applications.",
        },
        {
          term: "Scripting",
          definition:
            "A way of programming that tells the computer what to do, when to do, and how to do specific tasks.",
        },
        {
          term: "Penetration test",
          definition:
            "An authorized, simulated cyberattack made by a specialist in order to discover system vulnerabilities.",
        },
        {
          term: "Web development",
          definition: "The process of developing a website.",
        },
        {
          term: "Web application",
          definition: "A program that can be accessed through web browsers.",
        },
        {
          term: "Database",
          definition: "Data stored in a structure within a computer.",
        },
        {
          term: "Hacker",
          definition: "A person who gains access to programs or information without authorization.",
        },
        {
          term: "Malicious code",
          definition: "Harmful for a computer or a program code that creates vulnerabilities.",
        },
        {
          term: "Malware",
          definition:
            "A software program that is designed to damage or/and gain unauthorized access to a computer.",
        },
      ],
      source: SOURCES.codingGuide,
      xp: 20,
      next: "u4a1-handoff",
    },

    /* ---------------- 10. handoff to act 2 ---------------- */
    "u4a1-handoff": {
      id: "u4a1-handoff",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 09:30",
      text: [
        "Ravi signs off your Act 1 notes. \"You know why security work needs code, which eight languages come up most, and which job asks for which. That's the map.\"",
        "\"Act 2 is the ground. We'll write and read actual lines in Python and JavaScript, starting with printing one sentence to a console.\"",
      ],
      xp: 15,
      next: "u4a2-start",
    },
  },
};

export default act1;
