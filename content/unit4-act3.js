// @ts-check

/**
 * Cybersecurity, Unit 4, Act 3: "Building a Security Tool"
 *
 * Source material: "Basic Programming for Cybersecurity", "Coding in
 * Cybersecurity" and the Unit 4 project brief
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Every figure quoted here comes from those documents and must stay exact:
 *   2023 Stack Overflow survey, JavaScript used by 63.61% of all programmers,
 *   Python used by 49.28% of all programmers.
 *
 * The worked example is one password strength checker in Python, grown in three
 * stages so each project requirement has a reason to exist:
 *   stage 1  three variables (string, integer, boolean) and three print statements
 *   stage 2  two functions, each returning true or false
 *   stage 3  the boolean logic line that decides the verdict
 *
 * Scene ids are namespaced `u4a3-*`. This act closes the episode: `u4a3-end` is
 * the ending scene, and its `next` is null.
 */

/** Citations used by the fact-bearing scenes in this act. */
const SOURCES = {
  languageChoice: {
    label: "JavaScript vs Python: Which One Should You Learn First (SitePoint)",
    url: "https://www.sitepoint.com/javascript-vs-python/",
  },
  codingGuide: {
    label: "Learn how to code for cybersecurity (Cybersecurity Guide)",
    url: "https://cybersecurityguide.org/resources/coding-for-cybersecurity/",
  },
};

/**
 * Badge metadata for the awards handed out in this act. The merger in
 * cyber-unit4.js holds the registry these must agree with.
 */
/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "u4a3-start",
  scenes: {
    /* ---------------- 1. the task ---------------- */
    "u4a3-start": {
      id: "u4a3-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 13:00",
      text: [
        "Ravi puts a ticket on your desk. \"Reading code was Act 2. Now you write some.\"",
        "\"The help desk keeps approving passwords that are too short and have no numbers in them. They want a small tool that takes a password and says whether it's strong enough. Nothing clever. It has to be right, and someone else has to be able to read it.\"",
        "\"We'll build it in Python, in three stages. Every stage exists because a rule of the job needs it: store the facts, check each rule in its own function, then decide. At the end you'll build a tool of your own and hand it in.\"",
      ],
      source: SOURCES.codingGuide,
      xp: 10,
      next: "u4a3-stage-vars",
    },

    /* ---------------- 2. stage 1: variables and prints ---------------- */
    "u4a3-stage-vars": {
      id: "u4a3-stage-vars",
      type: "terminal",
      title: "Stage 1: variables and print statements",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "Dana opens a new file on ORACLE. \"Stage one holds the facts and says them out loud. Three variables and three print statements, nothing else.\"",
        "\"A variable is a data item that can take more than one value while the program runs. password holds a string, which is text. min_length holds an integer, which is a number. is_strong holds a boolean, which can only be true or false. Those are the three types the project asks for.\"",
        "\"Lines starting with # are comments. They explain the code to whoever reads it next, and they never appear on the console.\"",
      ],
      prompt: "Read the file, then run it.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "listing",
          cmd: "cat password_check.py",
          output: [
            "# password_check.py // stage 1: hold the facts and report them",
            'password = "sunshine"',
            "min_length = 12",
            "is_strong = False",
            "",
            'print("Checking password:", password)',
            'print("Minimum length required:", min_length)',
            'print("Strong so far:", is_strong)',
          ],
          required: true,
        },
        {
          id: "run",
          cmd: "python3 password_check.py",
          output: [
            "Checking password: sunshine",
            "Minimum length required: 12",
            "Strong so far: False",
          ],
          required: true,
        },
      ],
      source: SOURCES.codingGuide,
      xp: 30,
      next: "u4a3-stage-funcs",
    },

    /* ---------------- 3. stage 2: two functions ---------------- */
    "u4a3-stage-funcs": {
      id: "u4a3-stage-funcs",
      type: "terminal",
      title: "Stage 2: one function per rule",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "Ravi adds the two rules the help desk keeps getting wrong: the password has to be long enough, and it has to contain a number.",
        "\"A function is multiple lines of code written to accomplish a specific task. One rule, one function. is_long_enough compares the length against min_length. has_a_number walks through the password one character at a time and stops the moment it finds a digit.\"",
        "\"Both hand back True or False. That matters for stage three. Watch what happens when you run the file, though: defining a function doesn't run it. The output is identical to stage one, because nothing has called these yet.\"",
      ],
      prompt: "Read the two functions, then run the file again.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "listing",
          cmd: "cat password_check.py",
          output: [
            "# password_check.py // stage 2: one function per rule",
            'password = "sunshine"',
            "min_length = 12",
            "is_strong = False",
            "",
            "def is_long_enough(password, min_length):",
            "    return len(password) >= min_length",
            "",
            "def has_a_number(password):",
            "    for character in password:",
            "        if character.isdigit():",
            "            return True",
            "    return False",
            "",
            'print("Checking password:", password)',
            'print("Minimum length required:", min_length)',
            'print("Strong so far:", is_strong)',
          ],
          required: true,
        },
        {
          id: "run",
          cmd: "python3 password_check.py",
          output: [
            "Checking password: sunshine",
            "Minimum length required: 12",
            "Strong so far: False",
          ],
          required: true,
        },
      ],
      source: SOURCES.codingGuide,
      xp: 30,
      next: "u4a3-stage-decision",
    },

    /* ---------------- 4. stage 3: the decision ---------------- */
    "u4a3-stage-decision": {
      id: "u4a3-stage-decision",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana writes the last three lines on the board. \"Stage three calls both functions, keeps their answers, then makes one decision.\"",
        "long_enough = is_long_enough(password, min_length)",
        "has_number = has_a_number(password)",
        "is_strong = long_enough and has_number",
        "\"The first two lines store a boolean each. The third line is the boolean logic the project asks for. In Python, and is True only when both sides are True, so a password passes only if it clears both rules. If either one fails, is_strong stays False.\"",
        "\"That single word decides what the tool says. Get it wrong and the tool is worse than useless, because it approves passwords the help desk should have rejected.\"",
      ],
      source: SOURCES.codingGuide,
      xp: 15,
      next: "u4a3-boolean-quiz",
    },

    /* ---------------- 5. boolean logic quiz ---------------- */
    "u4a3-boolean-quiz": {
      id: "u4a3-boolean-quiz",
      type: "quiz",
      title: "Knowledge check: the decision line",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "Ravi covers the board. \"An earlier draft of this tool shipped with the wrong word in that line, and it approved a twenty character password with no number in it. Before this one goes out, tell me which version is right.\"",
        "\"long_enough is True when the password is at least 12 characters. has_number is True when the password contains a digit. A strong password has to satisfy both rules.\"",
      ],
      question:
        "Which line correctly decides that a password is strong?",
      options: [
        {
          label: "is_strong = long_enough and has_number",
          correct: true,
          feedback:
            "Correct. and is True only when both sides are True, so the password has to clear both rules. Fail either one and is_strong is False.",
        },
        {
          label: "is_strong = long_enough or has_number",
          correct: false,
          feedback:
            "or is True when either side is True, so passing one rule would be enough. That's the draft that shipped: a twenty character password with no number passes, and so does a four character password like a1b2.",
        },
        {
          label: "is_strong = not long_enough and has_number",
          correct: false,
          feedback:
            "not flips the length answer over. This line calls a password strong when it's too short and contains a number, and rejects every long password. It reverses the rule you meant to enforce.",
        },
        {
          label: "is_strong = long_enough",
          correct: false,
          feedback:
            "This only applies one of the two rules. has_number is worked out and then thrown away, so any long password passes even with no digit anywhere in it.",
        },
      ],
      source: SOURCES.codingGuide,
      xp: 30,
      next: "u4a3-run",
    },

    /* ---------------- 6. run the finished tool ---------------- */
    "u4a3-run": {
      id: "u4a3-run",
      type: "terminal",
      title: "Running the finished checker",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "The finished file has one more change. Instead of a password fixed inside the code, it reads the password you type after the file name, so you can test more than one without editing anything. That's what sys.argv[1] holds.",
        "\"Test with made up passwords only,\" Ravi says. \"Anything you type on a command line gets written to your shell history.\"",
        "Read the finished file, then run it twice: once against a weak password, once against a strong one. The only thing that changes is the input, and the boolean decision changes the verdict.",
      ],
      prompt: "Read the file, then run both tests.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "listing",
          cmd: "cat password_check.py",
          output: [
            "# password_check.py // finished: checks length and digits, then decides",
            "import sys",
            "",
            "password = sys.argv[1]",
            "min_length = 12",
            "is_strong = False",
            "",
            "def is_long_enough(password, min_length):",
            "    return len(password) >= min_length",
            "",
            "def has_a_number(password):",
            "    for character in password:",
            "        if character.isdigit():",
            "            return True",
            "    return False",
            "",
            'print("Checking password:", password)',
            "",
            "long_enough = is_long_enough(password, min_length)",
            "has_number = has_a_number(password)",
            "is_strong = long_enough and has_number",
            "",
            'print("Long enough:", long_enough)',
            'print("Contains a number:", has_number)',
            'print("Strong password:", is_strong)',
          ],
          required: true,
        },
        {
          id: "weak",
          cmd: "python3 password_check.py sunshine",
          output: [
            "Checking password: sunshine",
            "Long enough: False",
            "Contains a number: False",
            "Strong password: False",
          ],
          required: true,
        },
        {
          id: "strong",
          cmd: "python3 password_check.py Th3-Quiet-River-88",
          output: [
            "Checking password: Th3-Quiet-River-88",
            "Long enough: True",
            "Contains a number: True",
            "Strong password: True",
          ],
          required: true,
        },
      ],
      source: SOURCES.codingGuide,
      xp: 35,
      next: "u4a3-sort",
    },

    /* ---------------- 7. line by line review ---------------- */
    "u4a3-sort": {
      id: "u4a3-sort",
      type: "sort",
      title: "Sign off the code line by line",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana splits the finished file into single lines. \"Before anything ships here, someone reads it line by line and says what each line is doing. Do that now.\"",
        "\"Four kinds of line, and every line in this tool is one of them.\"",
      ],
      prompt: "Put each line of the checker into the group it belongs to.",
      buckets: [
        {
          id: "variable",
          label: "Variable",
          hint: "Stores a value you chose: a string, an integer or a boolean",
        },
        {
          id: "function",
          label: "Function definition",
          hint: "Starts a block of lines that do one specific task",
        },
        {
          id: "print",
          label: "Print statement",
          hint: "Sends output to the console for a person to read",
        },
        {
          id: "boolean",
          label: "Boolean check",
          hint: "Works out whether something is true or false right now",
        },
      ],
      items: [
        {
          id: "var_password",
          label: 'password = "sunshine"',
          bucket: "variable",
          explain:
            "Variable. It stores a string, which is text. The quotation marks are what make it a string.",
        },
        {
          id: "var_minlen",
          label: "min_length = 12",
          bucket: "variable",
          explain:
            "Variable. It stores an integer, which is a number. Keeping the 12 in a named variable means you change the rule in one place, not in every line that uses it.",
        },
        {
          id: "var_isstrong",
          label: "is_strong = False",
          bucket: "variable",
          explain:
            "Variable. It stores a boolean, a data type that can only have two possible values. It starts as False and only becomes True if the password clears both rules.",
        },
        {
          id: "def_length",
          label: "def is_long_enough(password, min_length):",
          bucket: "function",
          explain:
            "Function definition. def names the function and lists what it needs to do its job. Nothing inside it runs until something calls it.",
        },
        {
          id: "def_number",
          label: "def has_a_number(password):",
          bucket: "function",
          explain:
            "Function definition. One rule per function keeps each one short enough to check by eye, which is why the review is quick.",
        },
        {
          id: "print_start",
          label: 'print("Checking password:", password)',
          bucket: "print",
          explain:
            "Print statement. It puts the value of a variable on the console so a person can see what the program is working on.",
        },
        {
          id: "print_verdict",
          label: 'print("Strong password:", is_strong)',
          bucket: "print",
          explain:
            "Print statement. This is the one the help desk actually reads, so it reports the final verdict in words.",
        },
        {
          id: "check_length",
          label: "return len(password) >= min_length",
          bucket: "boolean",
          explain:
            "Boolean check. The >= comparison works out to True or False, and return hands that answer back to whoever called the function.",
        },
        {
          id: "check_digit",
          label: "if character.isdigit():",
          bucket: "boolean",
          explain:
            "Boolean check. isdigit() answers True or False for a single character, and if uses that answer to decide whether to run the lines underneath it.",
        },
      ],
      source: SOURCES.codingGuide,
      xp: 40,
      badge: "code-reviewer",
      next: "u4a3-requirements",
    },

    /* ---------------- 8. the project requirements ---------------- */
    "u4a3-requirements": {
      id: "u4a3-requirements",
      type: "dossier",
      title: "Analyst dossier: project requirements",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        "Ravi hands you the brief for the end of unit project. \"Your tool has to meet four requirements. The checker we just built meets all four, so use it as the measuring stick for your own.\"",
      ],
      terms: [
        {
          term: "Requirement 1: at least 3 different variables",
          definition:
            "Storing strings, integers, and/or booleans. The checker uses password (a string), min_length (an integer) and is_strong (a boolean).",
        },
        {
          term: "Requirement 2: at least 2 functions",
          definition:
            "Each performing a specific task. The checker uses is_long_enough and has_a_number, one rule per function.",
        },
        {
          term: "Requirement 3: at least 3 print statements",
          definition:
            "Showing program output that explains what each section of code does. In JavaScript these are console.log statements instead. The checker prints the password being tested, the result of each rule, and the final verdict.",
        },
        {
          term: "Requirement 4: one example of boolean logic",
          definition:
            "True or false decision making. In the checker it's the line is_strong = long_enough and has_number, which is True only when both rules pass.",
        },
        {
          term: "Variable",
          definition: "A data item that can take more than one value during the runtime of a program.",
        },
        {
          term: "Function",
          definition: "Multiple lines of code that are written to accomplish a specific task.",
        },
        {
          term: "String",
          definition: "A text or a letter.",
        },
        {
          term: "Integer",
          definition: "A number.",
        },
        {
          term: "Boolean",
          definition: "A data type that can only have two possible values.",
        },
        {
          term: "Console",
          definition: "The text area where you can see the output of a program or input your commands.",
        },
      ],
      source: SOURCES.codingGuide,
      xp: 25,
      next: "u4a3-pick",
    },

    /* ---------------- 9. pick your own tool ---------------- */
    "u4a3-pick": {
      id: "u4a3-pick",
      type: "choice",
      title: "Choose the tool you'll build",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        "Dana pulls up the list of jobs nobody in the SOC has got round to automating. \"Pick one. They all meet the four requirements, and none of them is harder than the checker you just read.\"",
        "\"Build it in Python or JavaScript. According to the 2023 Stack Overflow survey, JavaScript was the most popular language, with 63.61% of all programmers using it, and Python was close behind with 49.28%. Most beginners prefer to learn Python first, and either language is accepted here.\"",
      ],
      prompt: "Which tool will you build?",
      options: [
        {
          label: "A password generator that creates random secure passwords.",
          next: "u4a3-checklist",
          xp: 25,
          tone: "neutral",
          feedback:
            "Good pick. It needs a string of allowed characters, an integer for how long the password should be, and a function that picks characters one at a time. A second function that checks the result against your own rules gives you requirement 2 and a natural place for boolean logic: keep generating until the password passes.",
        },
        {
          label: "A phishing email detector that identifies suspicious email characteristics.",
          next: "u4a3-checklist",
          xp: 25,
          tone: "neutral",
          feedback:
            "Good pick. Store the email text in a string variable and a list of warning signs to look for, such as urgent wording or a mismatched sender address. One function counts the warning signs and returns an integer, a second decides the verdict. Boolean logic comes free: suspicious is True when the count is above your threshold.",
        },
        {
          label: "A login system that does simple username and password authentication.",
          next: "u4a3-checklist",
          xp: 25,
          tone: "neutral",
          feedback:
            "Good pick. It's the clearest use of boolean logic in the whole list: access is granted only when the username matches and the password matches. One function checks the username, another checks the password, and print statements report which one failed. Use made up accounts, never a real password.",
        },
        {
          label: "A port scanner simulator that pretends to scan for open ports.",
          next: "u4a3-checklist",
          xp: 25,
          tone: "neutral",
          feedback:
            "Good pick, and note the word simulator. It pretends to scan, so you're not touching a real network. Store a list of port numbers as integers, write one function that decides whether a port is open and another that reports it, and print a line per port. Boolean logic is the open or closed decision itself.",
        },
      ],
      source: SOURCES.languageChoice,
      badge: "tool-builder",
    },

    /* ---------------- 10. self check before recording ---------------- */
    "u4a3-checklist": {
      id: "u4a3-checklist",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 16:30",
      text: [
        "Ravi runs through how the work gets checked. \"Before you record anything, run your tool and read your own code against the four requirements. Count the variables. Count the functions. Count the print statements. Point at the line that makes a true or false decision.\"",
        "\"Then test it twice, the way we tested the checker. Once with input that should pass, once with input that should fail. If both runs give the same answer, something's wrong, and you'd rather find that now than on camera.\"",
        "\"Comments help here too. A line starting with # in Python, or // in JavaScript, explains the code to whoever reads it next. That's usually you, a week later.\"",
        "\"One last thing: in JavaScript, don't forget a semicolon after each statement. In a program of a thousand lines, one missing semicolon can stop the whole thing running.\"",
      ],
      source: SOURCES.codingGuide,
      xp: 15,
      next: "u4a3-end",
    },

    /* ---------------- 11. ending and handover ---------------- */
    "u4a3-end": {
      id: "u4a3-end",
      type: "ending",
      title: "Unit 4 complete: your project brief",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance SOC, 17:00",
      text: [
        "Ravi signs your completion record. \"Unit 4, certified. Here's the assignment.\"",
        "Build a simple cybersecurity tool or application in Python or JavaScript. It should show your understanding of basic programming concepts and how they apply to a real security problem.",
        "Your program must include: at least 3 different variables storing strings, integers, and/or booleans; at least 2 functions that perform specific tasks; at least 3 print or console.log statements showing output that explains what each section of code does; and one example of boolean logic, meaning true or false decision making.",
        "Where to build it: Replit is recommended for beginners. Scratch if you'd rather work in visual programming. VS Code or any IDE you prefer. An online editor such as CodePen or JSFiddle. Or Python, in any Python environment.",
        "Then record a video, 1 to 2 minutes long, showing four things: your code in the IDE or platform you used, the program running and being tested, every feature demonstrated, and a brief explanation of what your tool does and how it relates to cybersecurity.",
        "To submit: share your project link, and submit your code file or files alongside the video.",
        "Dana: \"Pick the idea you actually want to use. A tool you'd open again is worth more than a tidy one you never run.\"",
        "What you covered in Unit 4: why security work depends on code and which languages the field uses, how to read Python and JavaScript, and how to build a working tool from variables, functions, print statements and one boolean decision.",
      ],
      teaser:
        "The Techinance Cybersecurity course runs to four units, and this was the last of them. Unit 3, Threats and Network Defense, is still being written and will appear on your course rail when it's ready. Until then, build the tool, record the video, and send it in.",
      source: SOURCES.codingGuide,
      xp: 60,
      badge: "unit4-certified",
      next: null,
    },
  },
};

export default act3;
