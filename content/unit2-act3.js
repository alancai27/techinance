// @ts-check

/**
 * Cybersecurity, Unit 2, Act 3: "Strategies for Protection & Minimizing Footprint"
 *
 * Source material: Strategies for Protection (Unit 2 Cybersecurity)
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   1 in 4 people (25%) have experienced a security issue from browsing on unsecured networks.
 *
 * Scene ids are namespaced `u2a3-*`. This act closes the episode: `u2a3-end` is the
 * ending scene in Unit 2, and its `next` is null.
 */

/** Citations used by the statistic-bearing scenes in this act. */
const SOURCES = {
  wifiStats: {
    label: "Public Wi-Fi Safety: 1 in 4 People Have Experienced a Security Issue (AllAboutCookies)",
    url: "https://allaboutcookies.org/public-wifi-safety",
  },
};

/**
 * Badge metadata for the awards handed out in this act.
 */
/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act3Badges = [];

export const act3 = {
  entry: "u2a3-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u2a3-start": {
      id: "u2a3-start",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 13:00",
      text: [
        "Ravi brings up the defensive policy framework.",
        '"Knowing how your digital footprint forms is only step one. Now we turn to defensive controls: protecting your personal information and actively minimizing your digital footprint."',
        '"Let\'s review technical controls across passwords, multi-factor authentication, software updates, and network security."',
      ],
      xp: 10,
      next: "u2a3-wifi-reveal",
    },

    /* ---------------- 2. public wifi reveal ---------------- */
    "u2a3-wifi-reveal": {
      id: "u2a3-wifi-reveal",
      type: "reveal",
      title: "Public Wi-Fi network vulnerability statistic",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana opens the wireless network security audit. "Unsecured public Wi-Fi networks without password protection pose major risks."',
        '"What share of people have experienced a security issue while browsing on unsecured networks?"',
      ],
      question:
        "Fill in the blank. Statistics state that 1 in ... people have experienced a security issue from browsing on unsecured networks.",
      options: ["100", "47", "10", "4"],
      answerIndex: 3,
      value: "1 in 4",
      caption: "1 in 4 people have experienced a security issue on unsecured networks.",
      explain:
        "Statistics state that 1 in 4 people (25%) have experienced a security issue from browsing on unsecured networks. Connecting to passwordless public Wi-Fi exposes your network traffic and session cookies to attackers.",
      source: SOURCES.wifiStats,
      xp: 35,
      next: "u2a3-protect-quiz",
    },

    /* ---------------- 3. protection strategy quiz (NOT) ---------------- */
    "u2a3-protect-quiz": {
      id: "u2a3-protect-quiz",
      type: "quiz",
      title: "Knowledge check: Personal information protection",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        '"Let\'s test your understanding of strategies for protecting personal information online," Ravi says.',
      ],
      question:
        "Which of the following is NOT a strategy to protect your personal information?",
      options: [
        {
          label: "Using strong passwords",
          correct: false,
          feedback:
            "Using strong passwords (15+ characters with uppercase, numbers, and symbols) IS an essential protection strategy.",
        },
        {
          label: "Using the same password for all the accounts",
          correct: true,
          feedback:
            "Correct. Using the same password across multiple accounts isn't a protection strategy. It's a critical security vulnerability. If one account is breached, all other accounts become compromised.",
        },
        {
          label: "Using different passwords",
          correct: false,
          feedback:
            "Using unique, different passwords for each account IS a key protection strategy.",
        },
        {
          label: "Using two-factor authentication",
          correct: false,
          feedback:
            "Enabling two-factor authentication (2FA) IS a recommended defense strategy requiring two forms of identification.",
        },
      ],
      source: SOURCES.wifiStats,
      xp: 25,
      badge: "shield-master",
      next: "u2a3-minimize-quiz",
    },

    /* ---------------- 4. footprint minimization quiz (IS) ---------------- */
    "u2a3-minimize-quiz": {
      id: "u2a3-minimize-quiz",
      type: "quiz",
      title: "Knowledge check: Minimizing your digital footprint",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana moves to footprint reduction tactics. "Now, which action effectively minimizes your digital footprint?"',
      ],
      question:
        "Which of the following IS a strategy to minimize your digital footprint?",
      options: [
        {
          label: "Turning off private/incognito browsing mode",
          correct: false,
          feedback:
            "Disabling private browsing increases tracked data rather than minimizing it.",
        },
        {
          label: "Connecting to public Wi-Fi networks whenever it is possible",
          correct: false,
          feedback:
            "Connecting to unsecured public Wi-Fi increases security risk (1 in 4 users experience issues on public networks).",
        },
        {
          label: "Sharing your location in every app",
          correct: false,
          feedback:
            "Broadcasting location data expands your passive digital footprint and privacy exposure.",
        },
        {
          label: "Deleting old accounts",
          correct: true,
          feedback:
            "Correct. Deleting old, unused accounts removes stored photos, messages, and personal information, directly minimizing your digital footprint.",
        },
      ],
      source: SOURCES.wifiStats,
      xp: 25,
      next: "u2a3-passwords-choice",
    },

    /* ---------------- 5. password & 2FA choice ---------------- */
    "u2a3-passwords-choice": {
      id: "u2a3-passwords-choice",
      type: "choice",
      title: "Constructing strong authentication policies",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana presents a credential setup ticket. "A department user needs guidance on establishing new login credentials."',
        '"What combination of password construction and authentication controls do you recommend?"',
      ],
      prompt: "Select the recommended authentication strategy:",
      options: [
        {
          label:
            "Use a short 8-character password containing your birthday so you never forget it.",
          next: "u2a3-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Passwords must never contain personal details like birthdays, addresses, or names, and 8 characters is far too short to resist automated cracking.",
        },
        {
          label:
            "Use strong, unique passwords (minimum 15 characters, combining uppercase letters, numbers, and symbols, excluding personal data) and enable Two-Factor Authentication (2FA).",
          next: "u2a3-dossier",
          xp: 25,
          tone: "good",
          feedback:
            "Correct. Strong passwords must be at least 15 characters long, avoid personal details, be unique across accounts, and be paired with Two-Factor Authentication (2FA) for multi-layered defense.",
        },
        {
          label:
            "Reuse one complex 15-character password for all corporate and personal accounts.",
          next: "u2a3-dossier",
          xp: 5,
          tone: "bad",
          feedback:
            "Never reuse the same password across accounts. If one service suffers a data breach, attackers attempt credential stuffing against all your other accounts.",
        },
      ],
      source: SOURCES.wifiStats,
    },

    /* ---------------- 6. dossier ---------------- */
    "u2a3-dossier": {
      id: "u2a3-dossier",
      type: "dossier",
      title: "Analyst dossier: Protection & Minimization rules",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana hands you the complete defensive rule set from Viktoriia Dmitrieva\'s course documentation.',
      ],
      terms: [
        {
          term: "Strong Passwords",
          definition:
            "Passwords containing a minimum of 15 characters, combining uppercase letters, numbers, and symbols. Must NOT contain birthdays, addresses, or names.",
        },
        {
          term: "Software Updates",
          definition:
            "Installing the latest updates for applications and operating systems to apply security patches that fix vulnerabilities.",
        },
        {
          term: "Two-Factor Authentication (2FA)",
          definition:
            "A security method requiring at least two forms of identification before granting access to an account.",
        },
        {
          term: "Unsecured Public Wi-Fi",
          definition:
            "Passwordless public networks where 1 in 4 users experience security issues. Avoid sending sensitive data over unsecured networks.",
        },
        {
          term: "Third-Party Cookies",
          definition:
            "Cookies placed on websites by third-party tracking or advertising entities rather than the site owner.",
        },
        {
          term: "Malware",
          definition:
            "Software designed to damage or gain unauthorized access to a computer system.",
        },
        {
          term: "Footprint Minimization",
          definition:
            "Reducing online exposure by limiting social media accounts, deleting old accounts, blocking third-party cookies, and asking friends/family to avoid posting unfavorable photos/videos.",
        },
      ],
      xp: 25,
      next: "u2a3-sort-strategies",
    },

    /* ---------------- 7. sort protection vs minimization ---------------- */
    "u2a3-sort-strategies": {
      id: "u2a3-sort-strategies",
      type: "sort",
      title: "Sort actions: Protection vs Minimization",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi sets up the action matrix. "Group each action into either Protecting Personal Information or Minimizing Digital Footprint."',
      ],
      prompt: "Categorize each defensive action into its primary strategy objective.",
      buckets: [
        {
          id: "protect",
          label: "Protect Personal Information",
          hint: "Defensive controls safeguarding data & account access",
        },
        {
          id: "minimize",
          label: "Minimize Digital Footprint",
          hint: "Actions reducing overall online data trails & exposure",
        },
      ],
      items: [
        {
          id: "pwd_15",
          label: "Use strong passwords (15+ chars with symbols, caps & numbers)",
          bucket: "protect",
          explain:
            "Protect Personal Information: 15+ character strong passwords prevent unauthorized account access.",
        },
        {
          id: "os_update",
          label: "Install the latest updates for apps and operating systems",
          bucket: "protect",
          explain:
            "Protect Personal Information: OS updates fix software security vulnerabilities.",
        },
        {
          id: "enable_2fa",
          label: "Use two-factor authentication (2FA) for accounts",
          bucket: "protect",
          explain:
            "Protect Personal Information: 2FA requires two forms of verification, blocking unauthorized logins.",
        },
        {
          id: "avoid_public_wifi",
          label: "Avoid unencrypted public Wi-Fi without password protection",
          bucket: "protect",
          explain:
            "Protect Personal Information: Avoiding unsecured Wi-Fi protects network traffic (1 in 4 people experience public Wi-Fi security issues).",
        },
        {
          id: "delete_old",
          label: "Delete old, unused accounts from past websites",
          bucket: "minimize",
          explain:
            "Minimize Digital Footprint: Deleting old accounts permanently removes your past data, photos, and records.",
        },
        {
          id: "limit_social",
          label: "Limit the number of active social media accounts",
          bucket: "minimize",
          explain:
            "Minimize Digital Footprint: Fewer social media accounts result in a smaller digital shadow.",
        },
        {
          id: "block_cookies",
          label: "Update privacy settings to block third-party cookies",
          bucket: "minimize",
          explain:
            "Minimize Digital Footprint: Blocking third-party cookies prevents external entities from tracking your browsing history.",
        },
        {
          id: "ask_family",
          label: "Ask friends and family to avoid sharing unfavorable photos/videos",
          bucket: "minimize",
          explain:
            "Minimize Digital Footprint: Preventing unfavorable media posts protects your online reputation and shadow.",
        },
      ],
      source: SOURCES.wifiStats,
      xp: 40,
      next: "u2a3-terminal",
    },

    /* ---------------- 8. terminal audit ---------------- */
    "u2a3-terminal": {
      id: "u2a3-terminal",
      type: "terminal",
      title: "ORACLE: Security Controls Audit",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        'Ravi asks you to execute the final security controls check on ORACLE.',
      ],
      prompt: "Execute commands to confirm protection and footprint minimization status.",
      host: "analyst@techinance-soc",
      commands: [
        {
          id: "passwords",
          cmd: "audit --passwords --policy",
          output: [
            "CREDENTIAL POLICY CHECK // system compliance",
            "  min_length       : 15 characters (PASSED)",
            "  complexity       : uppercase + symbols + numbers (PASSED)",
            "  personal_data    : no birthdays/names (PASSED)",
            "  reuse_check      : unique per account (PASSED)",
          ],
          required: true,
        },
        {
          id: "2fa",
          cmd: "auth --status 2fa",
          output: [
            "2FA SYSTEM STATUS // multi-factor enabled",
            "  two-factor authentication active across all user portals.",
          ],
          required: false,
        },
        {
          id: "cleanup",
          cmd: "footprint --cleanup --accounts",
          output: [
            "FOOTPRINT MINIMIZATION // account cleanup",
            "  old accounts purged : 14 obsolete profiles deleted",
            "  third-party cookies : blocked in enhanced browser settings",
            "  digital shadow      : minimized successfully",
          ],
          required: true,
        },
      ],
      source: SOURCES.wifiStats,
      xp: 30,
      next: "u2a3-cert-quiz",
    },

    /* ---------------- 9. final certification quiz ---------------- */
    "u2a3-cert-quiz": {
      id: "u2a3-cert-quiz",
      type: "quiz",
      title: "Final Assessment: Unit 2 Certification",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 16:30",
      text: [
        'Ravi prepares your final sign-off for Unit 2.',
        '"A user asks how to protect their personal information while actively shrinking their digital footprint."',
      ],
      question:
        "Which complete set of actions best protects personal information and minimizes a digital footprint?",
      options: [
        {
          label: "Reuse one 8-character password and log into public Wi-Fi everywhere.",
          correct: false,
          feedback:
            "Reusing passwords and connecting to unsecured public Wi-Fi creates severe security risks.",
        },
        {
          label:
            "Use strong 15+ char unique passwords, enable 2FA, avoid unsecured public Wi-Fi, delete old accounts, and block third-party cookies.",
          correct: true,
          feedback:
            "Correct. This implements all 7 strategies for protecting personal information and 5 strategies for minimizing digital footprints.",
        },
        {
          label: "Disable two-factor authentication and share location on all apps.",
          correct: false,
          feedback:
            "Disabling 2FA and sharing location weakens security and expands passive tracking.",
        },
        {
          label: "Never update operating system software or apps.",
          correct: false,
          feedback:
            "Skipping updates leaves known software vulnerabilities unpatched.",
        },
      ],
      source: SOURCES.wifiStats,
      xp: 40,
      next: "u2a3-end",
    },

    /* ---------------- 10. ending scene ---------------- */
    "u2a3-end": {
      id: "u2a3-end",
      type: "ending",
      title: "Unit 2 complete: Defense & Digital Footprints",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Techinance SOC, 17:00",
      text: [
        "Ravi signs your completion record. \"Unit 2, certified.\"",
        "Here is what you mastered in Unit 2:",
        "1. Digital Footprint Fundamentals: You defined digital footprints (digital shadows / electronic footprints) across 5.35 billion global internet users (66.2% of the population). You analyzed how bad digital footprints (like a 10-year-old social media comment) destroy job opportunities, while good digital footprints build trust.",
        "2. Active vs Passive Footprints: You separated active footprints (deliberately shared via social media, banking, downloads) from passive footprints (search history, IP addresses, device info, browser cookies). You learned that only 26% of websites secure their session cookies, leaving 74% vulnerable to cyberattacks.",
        "3. Defensive Protection & Minimization: You implemented 7 strategies to protect personal information (15+ char strong passwords, unique credentials, 2FA, OS updates, avoiding malware sites, withholding personal info, avoiding unsecured public Wi-Fi where 1 in 4 users suffer security issues) and 5 strategies to minimize digital footprints (deleting old accounts, limiting social media, blocking third-party cookies, protecting identity, and coordinating with family/friends).",
        "Dana: \"You can now defend yourself and your organization against digital tracking and credential compromise.\"",
      ],
      teaser:
        "Unit 3: Threats and Network Defense. In Unit 1 you diagnosed cybercrime. In Unit 2 you mastered personal defense and digital footprints. In Unit 3, you will deploy enterprise network security controls, firewalls, and encryption to defend entire infrastructures against advanced adversaries.",
      xp: 60,
      badge: "unit2-certified",
      next: null,
    },
  },
};

export default act3;
