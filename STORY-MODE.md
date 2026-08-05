# Story Mode

Interactive, role-play course episodes for the Techinance site. Learners sign in,
step into a role, and play through a unit instead of reading slides.

Two Cybersecurity units are live. The learner plays a junior analyst in a Security
Operations Centre.

The Cybersecurity course has four units. Three are written.

| Unit | Title | Scenes | Badges | Approx |
|---|---|---|---|---|
| 1 | The Cost of Cybercrime | 45 | 10 | 40 min |
| 2 | Digital Footprint and Defense | 28 | 9 | 30 min |
| 3 | Threats and Network Defense | not written | | |
| 4 | Programming for Cybersecurity | 32 | 9 | 30 min |

The unit list lives in two places and both must agree: the episode cards in
`learn.html` and `CYBER_UNITS` in `profile.js`. A new episode also has to be
registered in three consumers: `story.js` (the EPISODES map), `learn.js` and
`profile.js` (both `loadEpisodeMeta`).

Unit 4 has no official quiz checked in yet. When one exists, save it as
`content/sources/unit4-quiz-questions.md` and bring the episode to 10/10 the way
units 1 and 2 are.

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

The scene graph is easy to break by hand-editing. Check it with:

```bash
node -e 'import("./content/cyber-unit1.js").then(({episode:e})=>{const s=e.scenes,seen=new Set(),st=[e.startScene];while(st.length){const c=st.pop();if(seen.has(c)||!s[c])continue;seen.add(c);const x=s[c];(x.type==="choice"?x.options.map(o=>o.next):[x.next]).filter(Boolean).forEach(n=>st.push(n))}console.log(`${seen.size}/${Object.keys(s).length} scenes reachable`)})'
```

Unreachable scenes, dangling `next` ids, a `requiredFinds` higher than the number of
suspicious hotspots, and `sort` items pointing at unknown buckets all make an episode
unwinnable, so they're worth checking before you ship.
