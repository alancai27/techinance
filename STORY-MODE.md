# Story Mode

Interactive, role-play course episodes for the Techinance site. Learners sign in,
step into a role, and play through a unit instead of reading slides.

Unit 1 of the Cybersecurity course is live: **"The Cost of Cybercrime"**. It's 39
scenes across three acts, roughly 35 minutes, worth 728 XP and 10 badges. The learner
plays a junior analyst in a Security Operations Centre.

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
  cyber-unit1.js   Merges the three acts, registers badges, validates ids
  unit1-act1.js    Act 1, What Cybercrime Costs       (scene ids a1-*)
  unit1-act2.js    Act 2, How Recent Breaches Happened (a2-*)
  unit1-act3.js    Act 3, Types of Cybercrime          (a3-*)
```

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
- Plain, factual prose. No scene-setting, metaphors, or dramatic beats. State the
  fact, then why it matters. Titles say what a scene covers rather than teasing it.

## Validating content

The scene graph is easy to break by hand-editing. Check it with:

```bash
node -e 'import("./content/cyber-unit1.js").then(({episode:e})=>{const s=e.scenes,seen=new Set(),st=[e.startScene];while(st.length){const c=st.pop();if(seen.has(c)||!s[c])continue;seen.add(c);const x=s[c];(x.type==="choice"?x.options.map(o=>o.next):[x.next]).filter(Boolean).forEach(n=>st.push(n))}console.log(`${seen.size}/${Object.keys(s).length} scenes reachable`)})'
```

Unreachable scenes, dangling `next` ids, a `requiredFinds` higher than the number of
suspicious hotspots, and `sort` items pointing at unknown buckets all make an episode
unwinnable, so they're worth checking before you ship.
