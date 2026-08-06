# Story Mode

Interactive, role-play course episodes for the Techinance site. Learners sign in,
step into a role, and play through a unit instead of reading slides.

The Cybersecurity course has four units. All four are written and playable. The
learner plays an analyst in a Security Operations Centre.

| Unit | Title | Scenes | Acts | Badges | Approx |
|---|---|---|---|---|---|
| 1 | The Cost of Cybercrime | 45 | 3 | 5 | 40 min |
| 2 | Digital Footprint and Defense | 28 | 3 | 3 | 30 min |
| 3 | Careers, Skills, and Certifications | 29 | 3 | 3 | 30 min |
| 4 | Programming for Cybersecurity | 32 | 3 | 4 | 30 min |

The unit list lives in two places and both must agree: the episode cards in
`learn.html` and `CYBER_UNITS` in `profile.js`. A new episode also has to be
registered in three consumers: `story.js` (the EPISODES map), `learn.js` and
`profile.js` (both `loadEpisodeMeta`). Adding an episode without touching
`learn.html` and `profile.js` leaves it playable only by typing its URL.

Units 3 and 4 have no official quiz checked in yet. When one exists, save it as
`content/sources/unit<N>-quiz-questions.md` and bring the episode to 10/10 the
way units 1 and 2 are. Unit 3's source documents ("Overview of Cybersecurity
Careers" and "Skills and Certifications") aren't in `content/sources/` either,
so its figures can't be re-checked against the originals.

## Pages

| Page | Purpose |
|---|---|
| `learn.html` | The hub: sign in, course rail, episode list, XP and badges |
| `story.html?episode=cyber-u1` | The player. Redirects to `learn.html` when signed out |

The old **Donate** button is gone from all seven marketing pages. In its place the
header carries an auth control (`Sign in`, which becomes an avatar menu once you're
in), the mobile menu links to **My Learning**, and the footer's Get Involved column
links to **Story Mode**.

## Turning on Google Sign-In

Sign-in works today in **guest mode** with no configuration. To enable Google:

1. Follow the steps documented at the top of `auth-config.js`.
2. Paste the client ID into `GOOGLE_CLIENT_ID`.

Nothing else changes. With an empty client ID the Google button is replaced by a
short "not configured" note, and guest mode carries on working.

> **This is identity, not security.** Sign-in happens entirely in the browser: the
> Google ID token is decoded client-side and never verified by a server, and progress
> lives in `localStorage`. That's the right trade-off for gating free learning content
> and remembering where someone left off. Don't put anything behind it that actually
> needs protecting, because anyone can edit `localStorage`.

Guest progress is stored under the user id `guest`; Google users get `google-<sub>`,
so the two never collide on a shared device.

## Architecture

```
auth.js          Google Identity Services + guest fallback + header control
auth-config.js   GOOGLE_CLIENT_ID (public by design; never a client *secret*)
progress.js      localStorage XP / badges / per-scene state / checkpoints
story-engine.js  Renders the nine scene types, HUD, resume gate
icon.js          Inline lucide SVG icons for dynamically built DOM
learn.js         Drives the hub
story.js         Reads ?episode=, requires a user, mounts the engine
learn.css        All new styling (styles.css is untouched)
content/
  cyber-unit1.js   Merges unit 1's acts, registers badges, validates ids
  unit1-act1.js    Act 1, What Cybercrime Costs       (scene ids a1-*)
  unit1-act2.js    Act 2, How Recent Breaches Happened (a2-*)
  unit1-act3.js    Act 3, Types of Cybercrime          (a3-*)
  cyber-unit2.js   Merges unit 2's acts
  unit2-act1.js    Act 1, Digital Footprint and Reputation  (u2a1-*)
  unit2-act2.js    Act 2, Active and Passive Footprints     (u2a2-*)
  unit2-act3.js    Act 3, Strategies for Protection         (u2a3-*)
  cyber-unit3.js   Merges unit 3's acts
  unit3-act1.js    Act 1, The Cybersecurity Job Market      (u3a1-*)
  unit3-act2.js    Act 2, Skills and Certifications         (u3a2-*)
  unit3-act3.js    Act 3, Planning Your Own Path            (u3a3-*)
  cyber-unit4.js   Merges unit 4's acts
  unit4-act1.js    Act 1, Why Code Matters in Security      (u4a1-*)
  unit4-act2.js    Act 2, Reading Python and JavaScript     (u4a2-*)
  unit4-act3.js    Act 3, Building a Security Tool          (u4a3-*)
  sources/         Course material and the official quizzes each unit is built from
```

Content files are flat in `content/`, named `<course>-unit<N>.js` and
`unit<N>-act<n>.js`. Don't nest a unit in its own directory: the merger and the
three consumers (`learn.js`, `story.js`, `profile.js`) all resolve
`./content/<course>-unit<N>.js`, so a nested layout needs a re-export shim that
earns nothing.

## Scene types

`narrative` · `choice` · `quiz` · `reveal` · `inspect` · `sort` · `terminal` ·
`dossier` · `ending`

Every scene can carry `xp`, `badge`, and `source` (a citation chip). XP and badges are
granted once each, tracked through `progress.js`.

## Writing a new episode

1. Add `content/<course>-unit<N>-act<n>.js` files exporting
   `{ entry, scenes }`. Scene ids must be prefixed per act so they cannot collide.
2. Merge them in a `content/<course>-unit<N>.js` modelled on `cyber-unit1.js`.
3. Register the episode in `learn.js` and add the page to `vite.config.js` if it needs
   its own HTML entry.

Rules that keep episodes teachable:

- Every statistic must be exact and carry a `source`. Never invent a figure.
- Wrong answers must explain *why* they're wrong. The feedback is the lesson.
- Decoys matter. In the phishing scene three hotspots are deliberately innocent, and
  clicking them teaches that weak evidence isn't evidence.
- No dead ends: every `choice` option leads somewhere.
- Icons are kebab-case names resolved through `icon.js`, never emoji.
- A course gets at most 15 badges across all its units, split roughly by unit
  size. Badges mark real milestones, not participation, so most scenes award none.
  Cybersecurity is at the cap (5 / 3 / 3 / 4), so a new badge means retiring one.
- Retiring a badge means deleting its `BADGE_REGISTRY` entry **and** the `badge:`
  field on the scene that awarded it. Drop only the registry entry and
  `fallbackBadge()` silently regenerates the badge from the scene. Change nothing
  else: an automated pass over these files once emptied the `commands` and
  `buckets` arrays of 17 terminal and sort scenes while trimming badges, which
  type-checks, lints and renders, but leaves those scenes unplayable. `validate`
  below catches it; a diff review catches it sooner.
- Outside the episodes themselves, keep copy short. Page ledes, card blurbs and
  panel text are one or two lines. The long-form writing belongs in the scenes.
- Every question on the unit's official quiz (`content/sources/unit<N>-quiz-questions.md`)
  must appear in the episode with the same wording, the same options in the same
  order, and the same correct answer. Distractors are usually real figures from the
  course, so their feedback should name what each one actually is.
- Quiz `question` text and option `label`s are quoted from the official form, so they
  are exempt from house style. Leave `NOT` capitalised and `it is` uncontracted if
  that is how the form writes it. Contractions and plain phrasing apply to narration
  and feedback, which we author. A style pass that rewrites a quoted question silently
  breaks the match with the form.
- Plain, factual prose. No scene-setting, metaphors, or dramatic beats. State the
  fact, then why it matters. Titles say what a scene covers rather than teasing it.
- Right answers open with `Correct.` Wrong answers go straight into the
  explanation: the engine already marks them with a cross, so an `Incorrect.`
  prefix just delays the teaching. No exclamation marks, no shouty capitals.
- Write `and`, not `&`, in any title that reaches the page.
- Watch apostrophes in single-quoted string literals. Contractions need
  escaping (`let\'s`) or the literal terminates early.

## Validating content

The scene graph is easy to break by hand-editing, and a broken episode still
type-checks, lints and renders. `test/episodes.test.js` covers every unit:

```bash
pnpm test
```

It fails on unreachable scenes, dangling `next` ids, dead ends, empty
`commands` / `buckets` / `hotspots` / `terms` / `options` arrays, a
`requiredFinds` higher than the number of suspicious hotspots, `sort` items
pointing at unknown buckets, hotspots that are defined but never rendered,
quizzes without exactly one correct answer, a `reveal` whose `answerIndex` is out
of range, badges awarded without a registry entry (or registered without a scene
awarding them), icon names that would silently fall back to `sparkles`, and a
course going over the badge cap.

Run it before shipping content. `tsc` and `eslint` will not catch any of it.
