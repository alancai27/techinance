// @ts-check

/**
 * Cybersecurity, Unit 2, Act 2: "Active vs Passive Footprint & Privacy Risks"
 *
 * Source material: Digital Footprint Explained (Unit 2 Cybersecurity)
 * (Viktoriia Dmitrieva, Techinance Technology Lead Course Developer).
 *
 * Every figure quoted here comes from that section and must stay exact:
 *   Only 26% of websites secure their session cookies, leaving 74% at high risk of cyberattacks.
 *
 * Scene ids are namespaced `u2a2-*`. The last scene hands off to `u2a3-start`.
 */

/** Citations used by the statistic-bearing scenes in this act. */
const SOURCES = {
  cookieStats: {
    label: "Cookie Tracking Statistics, Trends & Facts for 2025 (PrivacyJournal)",
    url: "https://www.privacyjournal.net/cookie-tracking-statistics/",
  },
};

/**
 * Badge metadata for the awards handed out in this act.
 */
/** @type {{ id: string, name: string, description: string, icon: string }[]} */
export const act2Badges = [
];

export const act2 = {
  entry: "u2a2-start",
  scenes: {
    /* ---------------- 1. orientation ---------------- */
    "u2a2-start": {
      id: "u2a2-start",
      type: "narrative",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre, 10:00",
      text: [
        "Dana opens the network analysis console.",
        '"Now let\'s split digital footprints into their two operating forms: active and passive."',
        '"An active digital footprint is all the information you deliberately share online, like social media posts, online shopping, banking forms, and app downloads. You know this data is left behind, even though it\'s nearly impossible to fully delete."',
        '"A passive digital footprint consists of information left behind without your explicit knowledge, such as search history, IP addresses, device info, and website cookies."',
      ],
      xp: 10,
      next: "u2a2-passive-quiz",
    },

    /* ---------------- 2. passive footprint quiz ---------------- */
    "u2a2-passive-quiz": {
      id: "u2a2-passive-quiz",
      type: "quiz",
      title: "Knowledge check: Example of passive digital footprint",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        '"Let\'s verify your ability to identify passive footprint components," Dana says.',
      ],
      question: "What would be an example of passive digital footprint?",
      options: [
        {
          label: "Social media post",
          correct: false,
          feedback:
            "A social media post is deliberately created and published by the user, making it an active digital footprint.",
        },
        {
          label: "Search history",
          correct: true,
          feedback:
            "Correct. Search history is logged automatically by browsers and search engines as you navigate, making it a classic passive digital footprint.",
        },
        {
          label: "Comment in TikTok",
          correct: false,
          feedback:
            "Writing a comment on TikTok is an intentional user action, which forms an active digital footprint.",
        },
        {
          label: "Download of an app",
          correct: false,
          feedback:
            "Initiating an app download is an intentional action, contributing to an active digital footprint.",
        },
      ],
      source: SOURCES.cookieStats,
      xp: 25,
      next: "u2a2-cookies-quiz",
    },

    /* ---------------- 3. cookies definition quiz ---------------- */
    "u2a2-cookies-quiz": {
      id: "u2a2-cookies-quiz",
      type: "quiz",
      title: "Knowledge check: What are cookies?",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi points to a web session log. "Websites frequently ask users to accept cookies. What actually are browser and website cookies?"',
      ],
      question: "What are browser/website cookies?",
      options: [
        {
          label: "Cookies that you can buy online.",
          correct: false,
          feedback:
            "Web cookies are technical data files, not edible snacks.",
        },
        {
          label: "Pop-ups and adds.",
          correct: false,
          feedback:
            "Advertisements and pop-up windows are visual web elements, not cookie files.",
        },
        {
          label: "Viruses that are downloaded on your computer.",
          correct: false,
          feedback:
            "Cookies aren't viruses or malware; they're data text files, although insecure cookies can pose privacy risks.",
        },
        {
          label: "Text files with small pieces of data.",
          correct: true,
          feedback:
            "Correct. Browser or website cookies are text files with small pieces of data (such as a username, password, or session ID) used to identify your computer across the Internet.",
        },
      ],
      source: SOURCES.cookieStats,
      xp: 25,
      next: "u2a2-cookies-reveal",
    },

    /* ---------------- 4. cookie security reveal ---------------- */
    "u2a2-cookies-reveal": {
      id: "u2a2-cookies-reveal",
      badge: "cookie-inspector",
      type: "reveal",
      title: "Session cookie vulnerability statistic",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana brings up the global privacy audit. "While cookies identify your session, most websites fail to secure them properly."',
        '"What percentage of websites actually secure their session cookies?"',
      ],
      question:
        "Fill in the blank. Only ... of websites secure their session cookies, leaving the rest at a high risk of cyberattacks.",
      options: ["74%", "93%", "16%", "26%"],
      answerIndex: 3,
      value: "26%",
      caption: "Only 26% of websites secure their session cookies.",
      explain:
        "Only 26% of websites secure their session cookies. This leaves 74% of websites exposing session cookies to potential cyberattacks, tracking, and data theft.",
      source: SOURCES.cookieStats,
      xp: 35,
      next: "u2a2-terminal",
    },

    /* ---------------- 5. terminal inspection ---------------- */
    "u2a2-terminal": {
      id: "u2a2-terminal",
      type: "terminal",
      title: "ORACLE: Network and Cookie Telemetry",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        'Ravi directs you to ORACLE terminal. "Execute commands to audit passive network parameters and cookie security levels on incoming traffic."',
      ],
      prompt: "Run the required commands to analyze passive data indicators.",
      host: "analyst@techinance-soc",
      commands: [
      ],
      source: SOURCES.cookieStats,
      xp: 30,
      next: "u2a2-ip-quiz",
    },

    /* ---------------- 6. IP address quiz ---------------- */
    "u2a2-ip-quiz": {
      id: "u2a2-ip-quiz",
      type: "quiz",
      title: "Knowledge check: Unique network identifiers",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        '"Every device communicating on the Internet requires a unique address," Ravi notes.',
      ],
      question:
        "A unique number assigned to each computer that uses the Internet is called...",
      options: [
        {
          label: "MAC Address",
          correct: false,
          feedback:
            "A MAC address is a physical hardware address for local network interfaces, not the primary Internet IP address.",
        },
        {
          label: "IP Address",
          correct: true,
          feedback:
            "Correct. An IP Address (Internet Protocol Address) is a unique numerical label assigned to each computer or device using the Internet.",
        },
        {
          label: "Email Address",
          correct: false,
          feedback:
            "An email address identifies a mailbox, not a computer's network interface.",
        },
        {
          label: "Electronic Address",
          correct: false,
          feedback: "Electronic address is a generic, non-standard term.",
        },
      ],
      source: SOURCES.cookieStats,
      xp: 25,
      next: "u2a2-inspect",
    },

    /* ---------------- 7. inspect passive leaks ---------------- */
    "u2a2-inspect": {
      id: "u2a2-inspect",
      type: "inspect",
      title: "Log Analysis: Unsecured Passive Data Stream",
      speaker: "ORACLE",
      avatar: "terminal",
      location: "Analyst station 7",
      text: [
        "ORACLE displays an HTTP packet stream from an unencrypted connection.",
        "Review the request line, headers, and cookies to locate passive data leaks and security flaws.",
      ],
      prompt:
        "Tap the lines that contain suspicious passive data leaks or security risks. Find at least 4.",
      artifact: {
        kind: "log",
        fields: [
          {
            label: "Connection",
            value: "HTTP / 1.1 (Unencrypted, Port 80)",
            hot: "connection",
          },
          {
            label: "Target Host",
            value: "http://student-portal-demo.net",
            hot: "host",
          },
          {
            label: "Client Address",
            value: "198.51.100.42 (Public IPv4)",
            hot: "client_ip",
          },
          {
            label: "Cookie Status",
            value: "Unsecured cleartext session cookie",
            hot: "cookie_status",
          },
        ],
        body: [
          "09:12:01 GET /dashboard HTTP/1.1",
          {
            hot: "ip",
            text: "Host-Header: 198.51.100.42 (Exposing unique client IP address in cleartext header)",
          },
          {
            hot: "cookie",
            text: "Cookie: session_id=987654321; user=p.raman (Unsecured cookie over HTTP, part of the 74% vulnerable sites)",
          },
          {
            hot: "search",
            text: "Referer: http://search-engine.org/search?q=p.raman+home+address+phone (Exposing search history string)",
          },
          {
            hot: "device",
            text: "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) DeviceInfo/Build_9981 (Broadcast of exact hardware & OS details)",
          },
          "09:12:05 200 OK Content-Type: text/html",
          {
            hot: "personal_info",
            text: "Form-Data: phone_number=+1-555-0199; home_address=124_Main_St (Personal information left on unencrypted site)",
          },
        ],
      },
      hotspots: {
        connection: {
          suspicious: false,
          explain: "Header field indicating HTTP connection protocol.",
        },
        host: {
          suspicious: false,
          explain: "Standard web domain name.",
        },
        client_ip: {
          suspicious: false,
          explain: "Metadata label for the client IPv4 address.",
        },
        cookie_status: {
          suspicious: false,
          explain: "Metadata summary label.",
        },
        ip: {
          suspicious: true,
          explain:
            "Exposing your IP address over unencrypted connections leaves a passive digital footprint that traces your location and computer identity.",
        },
        cookie: {
          suspicious: true,
          explain:
            "Transmitting cleartext cookies exposes session tokens to hackers. Only 26% of websites secure their cookies, leaving 74% at high risk.",
        },
        search: {
          suspicious: true,
          explain:
            "Search history in URL referer headers leaks passive digital shadow details to third parties without explicit user consent.",
        },
        device: {
          suspicious: true,
          explain:
            "Broadcasting detailed device information allows web trackers and hackers to build a digital fingerprint of your hardware.",
        },
        personal_info: {
          suspicious: true,
          explain:
            "Submitting personal information (address, phone number) on suspicious or unencrypted sites exposes you to paid hackers and identity theft.",
        },
      },
      requiredFinds: 4,
      source: SOURCES.cookieStats,
      xp: 40,
      next: "u2a2-dossier",
    },

    /* ---------------- 8. dossier ---------------- */
    "u2a2-dossier": {
      id: "u2a2-dossier",
      type: "dossier",
      title: "Analyst dossier: Active vs Passive footprint & cookies",
      speaker: "Dana Okoye",
      avatar: "radar",
      location: "Security Operations Centre",
      text: [
        'Dana provides the reference card for active/passive data components and privacy terms.',
      ],
      terms: [
        {
          term: "Active Digital Footprint",
          definition:
            "Information that users deliberately share about themselves by using social media, online banking, shopping, or downloading apps.",
        },
        {
          term: "Passive Digital Footprint",
          definition:
            "Information that users leave behind on the Internet without their knowledge (such as search history, IP addresses, device info, and cookies).",
        },
        {
          term: "Browser / Website Cookies",
          definition:
            "Text files with small pieces of data (like usernames, passwords, or session IDs) used to identify your computer as you browse.",
        },
        {
          term: "IP Address",
          definition:
            "A unique number assigned to each computer or device that uses the Internet.",
        },
        {
          term: "Device Information",
          definition:
            "Technical hardware and software data about the device you're using.",
        },
        {
          term: "Personal Information",
          definition:
            "Any data directly related to an identifiable person, such as address, phone number, or passwords.",
        },
        {
          term: "Data",
          definition:
            "Facts and statistics collected together for reference or analysis.",
        },
        {
          term: "Hacker",
          definition:
            "A person who gains access to programs or information without authorization.",
        },
      ],
      xp: 25,
      next: "u2a2-sort",
    },

    /* ---------------- 9. sort active vs passive ---------------- */
    "u2a2-sort": {
      id: "u2a2-sort",
      type: "sort",
      title: "Sort footprint items: Active vs Passive",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre",
      text: [
        'Ravi sets up a classification board. "Categorize each item into either Active Digital Footprint or Passive Digital Footprint."',
      ],
      prompt: "Drag each item into the footprint category it belongs to.",
      buckets: [
      ],
      items: [
        {
          id: "sm_post",
          label: "Publishing a comment or photo on social media",
          bucket: "active",
          explain:
            "Active digital footprint: You deliberately share comments and posts online knowing they remain on platforms.",
        },
        {
          id: "app_download",
          label: "Downloading a mobile application from an app store",
          bucket: "active",
          explain:
            "Active digital footprint: Downloading applications is a deliberate user action.",
        },
        {
          id: "search_hist",
          label: "Search history recorded by web engines",
          bucket: "passive",
          explain:
            "Passive digital footprint: Search engines log visited URLs and search terms automatically without explicit prompt.",
        },
        {
          id: "ip_log",
          label: "IP address logged by web servers upon connection",
          bucket: "passive",
          explain:
            "Passive digital footprint: Your device's unique IP address is shared automatically whenever you request a webpage.",
        },
        {
          id: "cookies_log",
          label: "Browser cookies tracking session identifiers",
          bucket: "passive",
          explain:
            "Passive digital footprint: Text cookies store session data in the background. Note that only 26% of websites secure their session cookies.",
        },
      ],
      source: SOURCES.cookieStats,
      xp: 40,
      next: "u2a2-handoff",
    },

    /* ---------------- 10. handoff to act 3 ---------------- */
    "u2a2-handoff": {
      id: "u2a2-handoff",
      type: "narrative",
      speaker: "Ravi Mehta",
      avatar: "shield-check",
      location: "Security Operations Centre, 11:30",
      text: [
        'Ravi approves your sorting notes. "Excellent work. You now understand how active and passive data streams create privacy risks, and why 74% of unsecured cookies leave users exposed."',
        '"In Act 3, we put actionable protection and footprint minimization strategies into practice."',
      ],
      xp: 15,
      next: "u2a3-start",
    },
  },
};

export default act2;
