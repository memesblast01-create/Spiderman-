# Spider-Man — Cinematic Scroll Experience

Scroll-driven, canvas-rendered image-sequence teaser. React + Vite + GSAP
ScrollTrigger + Lenis.

## Setup

```
npm install
npm run dev      # local dev server
npm run build    # production build (outputs to dist/)
```

## Important: folder name must be lowercase `public`

Your current repo has the frames inside a folder called **`Public`**
(capital P). Vite's convention — and this is what the code assumes — is a
**lowercase** `public/` folder at the project root, with frames at
`public/frames/`.

This isn't just a style nitpick: Vercel builds on Linux, and Linux
filesystems are case-sensitive. A request for `/frames/ezgif-frame-001.jpg`
will 404 in production if the folder on disk is actually `Public/frames/`,
even though it works fine locally on Windows/Mac (which are usually
case-insensitive). Rename `Public` → `public` before deploying.

In the GitHub web editor (github.dev or the in-browser editor), you can
rename a folder from the file tree — right-click it (or use the "..." menu)
and choose Rename, then commit. If your web editor doesn't support folder
rename directly, create a new `public/frames/` folder and re-upload the 281
images into it (GitHub's "Add file → Upload files" supports dragging an
entire folder in most browsers), then delete the old `Public` folder.

## Configuring a different frame sequence

Everything frame-related is generated from one file:
`src/config/sequenceConfig.js`. Change `FRAME_FOLDER`, `FRAME_PREFIX`,
`FILE_EXTENSION`, `START_FRAME`, `END_FRAME`, and `ZERO_PADDING` there —
nothing else needs to change.

`SCROLL_PIXELS_PER_FRAME` in the same file controls how much scroll
distance one frame takes to advance — raise it for a slower, more
deliberate scroll; lower it for a faster scrub.

## Editing the story text

Story lines (the alternating left/right text) live in
`src/data/storyLines.js`. Each line has a `start`/`end` pair as a fraction
(0–1) of the total scroll distance — that's what keeps a line synced to a
specific moment in the sequence regardless of how long the scroll is.

## Project structure

```
src/
  components/   CanvasSequence, AnimatedText, LoadingScreen (+ their CSS)
  hooks/         useImageSequence, useLenis, useCanvasResize
  utils/         frameLoader (filename generation + preloading)
  config/        sequenceConfig.js  <- the one file you usually touch
  data/          storyLines.js
  styles/        global.css
```
