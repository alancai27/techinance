# Startup course source material

Unlike the other three courses, this one's lessons are not Google Docs. Each
module is a **slide deck published as a public Netlify site**, linked from the
Classroom. The full Classroom export is at
`content/sources/startup-classroom-export.md`.

## The six modules

| # | Title | Time | Deck | Activity file |
|---|---|---|---|---|
| 1 | What Is a Startup, Really? | 45 min | [module 1](https://start-ups-module-1-zs9j1u749v3f.netlify.app/) | Founder_Self_Assessment.docx |
| 2 | Finding a Real Problem Worth Solving | 60 min | [module 2](http://start-ups-module-2-yx9jh65lmo6g.netlify.app) | Problem_Validation_Brief.docx |
| 3 | From Idea to MVP | 60 min | [module 3](http://start-ups-module-3-u6k898lt800z.netlify.app) | MVP_Plan_Landing_Page.docx |
| 4 | Y Combinator and Accelerators | 60 min | [module 4](http://start-ups-module-4-j75s12eckq33.netlify.app) | YC_Application_Draft.docx |
| 5 | Funding, Grants and Competitions | 60 min | [module 5](http://start-ups-module-5-5hg4czg52uz4.netlify.app) | Funding_Target_Tracker.xlsx |
| 6 | Wrap-Up and Founder Portfolio | 45 min | [module 6](http://start-ups-module-6-dfb3n0g76k3g.netlify.app) | founder_portfolio.docx |

Each module also has its own **5-question quiz** as a Google Form. Those are not
transcribed yet, so this course cannot yet meet the verbatim quiz-matching bar
that Cybersecurity and Neuroscience hold. See STORY-MODE.md.

## How to pull a deck

The decks are single-file builds: all twelve slides ship in the HTML, but inside
an inlined `<script>`, so `curl` plus tag-stripping returns almost nothing. They
have to be rendered.

Open the module URL in a browser and run:

```js
[...document.querySelectorAll("section")]
  .map((s, i) => `=== SLIDE ${i + 1} ===\n` + (s.innerText || s.textContent || "").trim())
  .filter((t) => t.length > 30)
  .join("\n\n");
```

`textContent` rather than `innerText` matters: only the current slide is
visible, and `innerText` returns an empty string for the other eleven.

## Deck structure

Every module follows the same twelve-slide shape, which makes them
straightforward to turn into three acts:

1. Title and metadata
2. Learning objectives
3. Three things people confuse (a comparison table)
4. The core principle, as one sentence
5. The stages or path
6. Common traps or failure patterns
7. Principles or advantages
8. Myths, as a "what people say / what is closer to true" table
9. The international founder angle
10. The activity
11. What to submit, including CV phrasing
12. What is coming next

## Inconsistency worth fixing

Module 3's closing slide previews Module 4 as **"Getting your first ten users"**,
but Module 4 is actually **Y Combinator and Accelerators**. Either the preview is
stale or a module was reordered. A learner following the decks in order hits it.
