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

## Cloudflare deployment

This repo can deploy the static gameplay site to `ideas-batch1.real-link.ai` and sync the video assets to the public R2 bucket domain `videos-batch1.real-link.ai`.

### One-time bootstrap

```bash
bash scripts/bootstrap_cloudflare.sh
```

### Manual deploy

```bash
VIDEO_BASE_URL=https://videos-batch1.real-link.ai npm run deploy:cloudflare
```

### GitHub Actions

Set the repository secret:

```bash
gh secret set CLOUDFLARE_API_TOKEN
```

After that, every push to `main` will:

- download the 3 public source videos
- rebuild the deployable site into `dist/`
- sync the video files into R2
- deploy the Worker bound to `ideas-batch1.real-link.ai`

## Current prototype wave

- Issue 1: `Rhythm Cut`
- Issue 2: `Freeze Frame Hunter`
- Issue 3: `Director Split`
- Issue 4: `Glitch Chase`
- Issue 5: `Remix Runner`
- Issue 6: `Subtitle Saboteur`
- Issue 7: `Meme Sniper`
- Issue 8: `Threat Tagger`
- Issue 9: `Boss Scrubber`
- Issue 10: `Emotion Switchboard`
- Issue 11: `Narrative Grounding Ops`
- Issue 12: `Reverse Causality Tribunal`
- Issue 13: `Tempo Fate Engine`
- Issue 14: `Annotated Timeline Director`
- Issue 16: `AI Plot Forensics`
- Issue 17: `Gameplay Point Studio`
- Issue 18: `Point-Driven Fate Cuts`

## Repo structure

- `docs/brainstorm-log.md`: full ideation trail and selection logic
- `docs/video-sources.md`: source URLs and local file mapping
- `docs/issue-map.md`: issue to prototype mapping
- `docs/interactive-story-datasets.md`: narrative dataset research and integration notes
- `docs/timeline-annotation-pipeline.md`: annotation-tool to gameplay pipeline
- `docs/video-discovery-and-understanding.md`: sourcing and offline AI-understanding workflow
- `docs/gameplay-point-tool-selection.md`: recommended tools for inserting gameplay points into video
- `gameplay/`: standalone gameplay folders
- `narrative/story-beats/`: time-aligned story state data used by narrative-heavy prototypes
- `analysis/`: offline AI-generated video understanding artifacts
- `annotation-exports/`: export-like timeline annotations before normalization
- `tools/`: browser tools for authoring gameplay points and timeline segments
- `gameplay-points/`: normalized point/segment payloads that directly drive games
- `scripts/download_videos.sh`: reproducible asset download script
