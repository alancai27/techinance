// @ts-check

/**
 * Cybersecurity, Unit 4, Act 2: "Reading Python and JavaScript"
 *
 * Source material: Basic Programming for Cybersecurity (Unit 4 Cybersecurity)
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer), plus the
 * Unit 4 slide deck.
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   2023 Stack Overflow survey: JavaScript 63.61% of programmers,
 *   Python 49.28% of programmers.
 *
 * Scene ids are namespaced `u4a2-*`. The last scene hands off to `u4a3-start`.
 */

/** Citations used by the statistic-bearing scenes in this act. */
const SOURCES = {
  languageSurvey: {
    label: "JavaScript vs Python: Which One Should You Learn First (SitePoint)",
    url: "https://www.sitepoint.com/javascript-vs-python/",
  },
};

/**
 * Badge metadata for the awards handed out in this act.
 */
export const act2Badges = [
  {
    id: "hello-console",
    name: "Hello, Console",
    description: "Read program output in Python and in JavaScript.",
    icon: "terminal",
  },
  {
    id: "variable-handler",
    name: "Variable Handler",
    description: "Stored strings, integers and booleans in variables.",
    icon: "file-search",
  },
  {
    id: "function-builder",
    name: "Function Builder",
    description: "Followed a function that does one job and returns an answer.",
    icon: "network",
  },
];

export const act2 = {
  entry: "u4a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u4a2-start": {
      id: "u4a2-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance HQ, 10:15",
      text: [
        'Ravi Mehta pulls two files up on the wall screen. "You know which languages security work uses. Now you need to read them."',
        '"Nobody is asking you to write a tool this hour. Reading comes first. Most of the code you meet on this job was written by somebody else, and half of it will be broken."',
        '"We\'ll go slowly. Python first, then the same idea in JavaScript, so you can see what changes and what doesn\'t."',
      ],
      xp: 10,
      next: "u4a2-hello",
    },

    /* ---------------- 2. hello world in both languages ---------------- */
    "u4a2-hello": {
      id: "u4a2-hello",
      type: "terminal",
      title: "ORACLE: first program, both languages",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        'Ravi points you at the terminal. "Two files, same job. Read each one, then run it and watch the console."',
        "The console is the text area where you see the output of a program, or type your own commands.",
      ],
      prompt: "Read each file, then run it. Watch what lands on the console.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "cat-py",
          cmd: "cat hello.py",
          output: [
            "# hello.py",
            "# print sends output to the console.",
            'print("Hello, World")',
          ],
          required: true,
        },
        {
          id: "run-py",
          cmd: "python3 hello.py",
          output: ["Hello, World"],
          required: true,
        },
        {
          id: "cat-js",
          cmd: "cat hello.js",
          output: [
            "// hello.js",
            "// console.log does the same job as print in Python.",
            'console.log("Hello, World");',
          ],
          required: true,
        },
        {
          id: "run-js",
          cmd: "node hello.js",
          output: ["Hello, World"],
          required: true,
        },
        {
          id: "diff",
          cmd: "compare hello.py hello.js",
          output: [
            "Same output. Three differences in the source:",
            "  1. Python says print, JavaScript says console.log.",
            "  2. JavaScript ends the statement with a semicolon.",
            "  3. Comments start with # in Python and with // in JavaScript.",
            "print is used in every program. It prints the output of a variable,",
            "a function, or thousands of lines of code.",
          ],
          required: false,
        },
      ],
      xp: 30,
      badge: "hello-console",
      next: "u4a2-semicolon",
    },

    /* ---------------- 3. the semicolon ---------------- */
    "u4a2-semicolon": {
      id: "u4a2-semicolon",
      type: "choice",
      title: "One missing semicolon",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Analyst station 7",
      text: [
        'Dana drops a second JavaScript file on the screen. "Watch this one. It\'s two lines."',
        '  const greeting = "Hello, World" console.log(greeting);',
        '"The semicolon after the first statement is gone, so both statements ran together on one line. This file is short. The one you\'ll review this afternoon is thousands of lines."',
      ],
      prompt: "What happens when this file runs?",
      options: [
        {
          label: "Only that line is skipped. Everything after it still runs.",
          next: "u4a2-variables",
          xp: 5,
          tone: "bad",
          feedback:
            "JavaScript doesn't quietly skip a broken statement. It stops. Forget one semicolon in a program with thousands of lines of code and the whole program will not work, and it results in an error.",
        },
        {
          label: "The whole program stops and returns an error.",
          next: "u4a2-variables",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Don't forget a semicolon after each statement in JavaScript. One missing semicolon in a program with thousands of lines of code stops the whole program and results in an error.",
        },
        {
          label: "Nothing changes. Semicolons are optional in every language.",
          next: "u4a2-variables",
          xp: 5,
          tone: "bad",
          feedback:
            "In JavaScript the semicolon after each statement matters, and leaving one out is one of the most common ways a beginner breaks a file. Python is the language that doesn't end statements with a semicolon, which is part of why beginners often start there.",
        },
      ],
      source: SOURCES.languageSurvey,
    },

    /* ---------------- 4. variables and comments ---------------- */
    "u4a2-variables": {
      id: "u4a2-variables",
      type: "narrative",
      title: "Variables in Python and JavaScript",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Analyst station 7",
      text: [
        '"A variable is a data item that can take more than one value while the program runs. It\'s a labelled box. You put something in, you use the label later."',
        "Python, three variables and three comments:",
        "  # a string: text or a letter",
        '  analyst_name = "Dana"',
        "  # an integer: a number",
        "  failed_logins = 3",
        "  # a boolean: only two possible values",
        "  account_locked = False",
        '"The lines marked with # are comments. They don\'t show on the console. They only exist in the code and they have no function. They\'re there to explain the code to whoever reads it next, which on this team is usually you at 3am."',
        "The same three variables in JavaScript:",
        "  // a string",
        '  var analystName = "Dana";',
        "  // an integer",
        "  let failedLogins = 3;",
        "  // a boolean",
        "  const accountLocked = false;",
        '"Three changes. Comments start with //, every statement ends with a semicolon, and JavaScript gives you three ways to declare a variable: var, let and const."',
        '"var and let do the exact same job. const is the different one. It\'s for variables that aren\'t supposed to be altered, and once a variable is defined that way it can\'t be changed."',
      ],
      xp: 20,
      badge: "variable-handler",
      next: "u4a2-boolean-quiz",
    },

    /* ---------------- 5. boolean quiz ---------------- */
    "u4a2-boolean-quiz": {
      id: "u4a2-boolean-quiz",
      type: "quiz",
      title: "Knowledge check: What is a boolean?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Analyst station 7",
      text: [
        'Dana points at the line that reads account_locked = False. "That one carries most of the weight in security code. Define it."',
      ],
      question: "What is a boolean?",
      options: [
        {
          label: "A data type that can only have two possible values.",
          correct: true,
          feedback:
            "Correct. A boolean is a data type that can only have two possible values. Python writes them True and False. JavaScript writes them true and false. Locked or not locked, blocked or allowed: that's the whole point of it.",
        },
        {
          label: "A number.",
          correct: false,
          feedback:
            "That's an integer. A variable can store an integer, but a boolean is the data type with only two possible values.",
        },
        {
          label: "A text or a letter.",
          correct: false,
          feedback:
            "That's a string. Strings hold text such as an analyst name. A boolean has only two possible values.",
        },
        {
          label: "Multiple lines of code written to accomplish a specific task.",
          correct: false,
          feedback:
            "That's a function. A function is a block of code that does a job. A boolean is a data type with only two possible values, and a function can return one.",
        },
      ],
      source: SOURCES.languageSurvey,
      xp: 25,
      next: "u4a2-const-quiz",
    },

    /* ---------------- 6. const vs let quiz ---------------- */
    "u4a2-const-quiz": {
      id: "u4a2-const-quiz",
      type: "quiz",
      title: "Knowledge check: const versus let",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Analyst station 7",
      text: [
        '"JavaScript gives you var, let and const," Ravi says. "Two of those three behave identically. Tell me which one is the odd one out and why."',
      ],
      question: "In JavaScript, how is const different from let?",
      options: [
        {
          label: "const is for variables that aren't supposed to be altered. Once defined that way, the variable can't be changed.",
          correct: true,
          feedback:
            "Correct. var and let have the exact same function. const is used for variables that aren't supposed to be altered, and once a variable is defined with const it cannot be changed. Use it for values like a maximum retry count that nothing later should quietly rewrite.",
        },
        {
          label: "const can only hold numbers, while let can hold text.",
          correct: false,
          feedback:
            "All three keywords can hold an integer, a string or a boolean. The difference is reassignment: a const variable can't be changed once it's defined.",
        },
        {
          label: "const is the Python keyword and let is the JavaScript one.",
          correct: false,
          feedback:
            "var, let and const are all JavaScript. Python doesn't use a keyword at all: you write the name, an equals sign, and the value.",
        },
        {
          label: "There's no difference. var, let and const all behave the same.",
          correct: false,
          feedback:
            "var and let do behave the same, so that part is half right. const is the exception: it's for variables that aren't supposed to be altered, and it can't be reassigned afterwards.",
        },
      ],
      source: SOURCES.languageSurvey,
      xp: 25,
      next: "u4a2-functions",
    },

    /* ---------------- 7. functions ---------------- */
    "u4a2-functions": {
      id: "u4a2-functions",
      type: "terminal",
      title: "ORACLE: a function that does one job",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        '"Last piece," Ravi says. "A function is multiple lines of code written to accomplish a specific task. You write it once and call it whenever you need that task done."',
        "This one answers a single question: is a password at least 15 characters long?",
      ],
      prompt: "Read each function, then run it and read the two answers it returns.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "cat-func-py",
          cmd: "cat length_check.py",
          output: [
            "# Returns True when the password is long enough.",
            "def is_long_enough(password):",
            "    return len(password) >= 15",
            "",
            'print(is_long_enough("cat"))',
            'print(is_long_enough("correct-horse-battery"))',
          ],
          required: true,
        },
        {
          id: "run-func-py",
          cmd: "python3 length_check.py",
          output: ["False", "True"],
          required: true,
        },
        {
          id: "cat-func-js",
          cmd: "cat length_check.js",
          output: [
            "// Returns true when the password is long enough.",
            "function isLongEnough(password) {",
            "  return password.length >= 15;",
            "}",
            "",
            'console.log(isLongEnough("cat"));',
            'console.log(isLongEnough("correct-horse-battery"));',
          ],
          required: true,
        },
        {
          id: "run-func-js",
          cmd: "node length_check.js",
          output: ["false", "true"],
          required: true,
        },
        {
          id: "explain",
          cmd: "explain length_check",
          output: [
            "The function was defined once and called twice.",
            '  "cat" is 3 characters, so the answer is false.',
            '  "correct-horse-battery" is 21 characters, so the answer is true.',
            "Both answers are booleans: two possible values, nothing else.",
            "Python spells them True and False. JavaScript spells them true and false.",
          ],
          required: false,
        },
      ],
      xp: 30,
      badge: "function-builder",
      next: "u4a2-popularity",
    },

    /* ---------------- 8. survey figure reveal ---------------- */
    "u4a2-popularity": {
      id: "u4a2-popularity",
      type: "reveal",
      title: "Which language do programmers actually use?",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana brings up the 2023 Stack Overflow survey. "You\'ve now read both languages. Here\'s how many people work in each one."',
        '"In that survey, what share of all programmers said they use JavaScript?"',
      ],
      question:
        "In the 2023 Stack Overflow survey, what percentage of all programmers used JavaScript?",
      options: ["21.40%", "38.75%", "49.28%", "63.61%"],
      answerIndex: 3,
      value: "63.61%",
      caption: "JavaScript was the most popular language in the 2023 Stack Overflow survey.",
      explain:
        "According to the 2023 Stack Overflow survey, JavaScript was the most popular language, with 63.61% of all programmers using it, and Python was close behind with 49.28% of all programmers using it. 49.28% is the Python figure, which is why it's in the list. Most beginners still prefer to learn Python first, and then pick up JavaScript once they can read code.",
      source: SOURCES.languageSurvey,
      xp: 30,
      next: "u4a2-review",
    },

    /* ---------------- 9. code review inspect ---------------- */
    "u4a2-review": {
      id: "u4a2-review",
      type: "inspect",
      title: "Code review: check_login.js",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Analyst station 7",
      text: [
        'Ravi hands over a file. "A new analyst wrote this last night. It doesn\'t run, and even if it did I wouldn\'t ship it."',
        '"Five real problems in here. Some lines will look unfamiliar and be completely fine, so read before you flag."',
      ],
      prompt:
        "Click each line that's genuinely wrong. There are five real problems. Not everything unfamiliar is a fault.",
      artifact: {
        kind: "log",
        fields: [
          { label: "File", value: "check_login.js" },
          { label: "Language", value: "JavaScript" },
          { label: "Status", value: "Written overnight, not reviewed yet" },
        ],
        body: [
          {
            hot: "comment_ok",
            text: "// Checks one login attempt against the account rules.",
          },
          "const MAX_TRIES = 3;",
          { hot: "naming_ok", text: "let failedAttempts = 0;" },
          {
            hot: "missing_semicolon",
            text: 'const user = "dana" console.log(user);',
          },
          {
            hot: "hardcoded_password",
            text: 'const adminPassword = "Techinance2024";',
          },
          { hot: "used_before_defined", text: "console.log(lockoutMinutes);" },
          "let lockoutMinutes = 15;",
          {
            hot: "wrong_comment_marker",
            text: "# lock the account after three failed tries",
          },
          { hot: "const_reassigned", text: "MAX_TRIES = 5;" },
          { hot: "boolean_ok", text: "let isLocked = false;" },
          'console.log("Login check finished");',
        ],
      },
      hotspots: {
        missing_semicolon: {
          suspicious: true,
          explain:
            "Two statements ended up on one line because the first one has no semicolon after it. In JavaScript, don't forget a semicolon after each statement. One missing semicolon in a program with thousands of lines of code stops the whole program and results in an error.",
        },
        hardcoded_password: {
          suspicious: true,
          explain:
            "The admin password is typed straight into the source. Anyone who reads this file, or the saved history of this file, now has the password. Credentials don't belong in code.",
        },
        used_before_defined: {
          suspicious: true,
          explain:
            "This line prints lockoutMinutes, but lockoutMinutes isn't defined until the line below it. The program reaches for a value that doesn't exist yet and fails right here.",
        },
        wrong_comment_marker: {
          suspicious: true,
          explain:
            "# is the comment marker in Python. In JavaScript, comments start with //. This file is JavaScript, so the line isn't read as a comment at all and it breaks the program.",
        },
        const_reassigned: {
          suspicious: true,
          explain:
            "MAX_TRIES was declared with const. const is for variables that aren't supposed to be altered, and once a variable is defined that way it can't be changed. This line tries to change it anyway.",
        },
        comment_ok: {
          suspicious: false,
          explain:
            "This is a comment, written correctly for JavaScript with //. Comments don't show on the console and have no function. They only explain the code to whoever reads it next, so this line is doing its job.",
        },
        naming_ok: {
          suspicious: false,
          explain:
            "failedAttempts is a clear name for a counter that starts at 0, and let is the right keyword for a value that's meant to change. A name you haven't seen before isn't a fault.",
        },
        boolean_ok: {
          suspicious: false,
          explain:
            "isLocked holds a boolean, so it can only be false or true. Storing a boolean in a let is normal, and this value is supposed to change when the account locks, so let is the right choice here.",
        },
      },
      requiredFinds: 5,
      xp: 35,
      next: "u4a2-dossier",
    },

    /* ---------------- 10. dossier ---------------- */
    "u4a2-dossier": {
      id: "u4a2-dossier",
      type: "dossier",
      title: "Analyst dossier: programming vocabulary",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana hands you the reference card for Unit 4. "Nine words. You\'ll hear all of them in every code review you sit in on."',
      ],
      terms: [
        {
          term: "Command",
          definition: "An instruction that causes the computer to perform one of its functions.",
        },
        {
          term: "Console",
          definition:
            "The text area where you can see the output of a program or input your commands.",
        },
        {
          term: "Variable",
          definition:
            "A data item that can take more than one value during the runtime of a program.",
        },
        {
          term: "Function",
          definition: "Multiple lines of code that are written to accomplish a specific task.",
        },
        { term: "Integer", definition: "A number." },
        { term: "String", definition: "A text or a letter." },
        { term: "Boolean", definition: "A data type that can only have two possible values." },
        { term: "Comments", definition: "Annotations that are used to explain code." },
        {
          term: "Programmer",
          definition:
            "A person who uses programming languages to write programs and applications.",
        },
      ],
      xp: 20,
      next: "u4a2-handoff",
    },

    /* ---------------- 11. handoff to act 3 ---------------- */
    "u4a2-handoff": {
      id: "u4a2-handoff",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 11:40",
      text: [
        'Ravi closes the file. "You can read a program now. Print statements, variables, comments, booleans, functions, and five ways a file goes wrong."',
        '"Reading is the harder half. Writing is mostly deciding what you want the program to do, then saying it in order."',
        '"In Act 3 you plan a small security tool of your own and we check it against the requirements before you build it."',
      ],
      xp: 15,
      next: "u4a3-start",
    },
  },
};

export default act2;
