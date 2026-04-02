# real-link-ai

Video-first gameplay experiments built from a small set of reusable public clips.

## What this repo does

- Downloads 3 public video clips locally for experimentation.
- Records the brainstorming trail instead of only keeping final picks.
- Turns each selected idea into a GitHub issue and a playable prototype.
- Keeps the implementations lightweight: raw HTML, CSS, and JavaScript.

## Local setup

Run:

```bash
bash scripts/download_videos.sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Current prototype wave

- Issue 1: `Rhythm Cut`
- Issue 2: `Freeze Frame Hunter`
- Issue 3: `Director Split`
- Issue 4: `Glitch Chase`
- Issue 5: `Remix Runner`

## Repo structure

- `docs/brainstorm-log.md`: full ideation trail and selection logic
- `docs/video-sources.md`: source URLs and local file mapping
- `docs/issue-map.md`: issue to prototype mapping
- `gameplay/`: standalone gameplay folders
- `scripts/download_videos.sh`: reproducible asset download script

