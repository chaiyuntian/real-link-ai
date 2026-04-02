# real-link-ai

Video-first gameplay experiments built from a small set of reusable public clips.

The repo is evolving into a short-video gameplay platform: one clip, many game types, shared tooling, and a continuous publish loop.

It now also includes a tempo-focused product surface for AI-generated music gameplay under `tempo.real-link.ai`.

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
- Issue 19: `Cutline Courier`
- Issue 20: `Threat Weaver`
- Issue 21: `Companion Echo`
- Issue 22: `False Trailer`
- Issue 23: `Momentum Trial`
- Issue 24: `Microloop Alchemist`
- Issue 25: `Scene Verdict`
- Issue 26: `Pursuit Cartographer`
- Issue 27: `Archive Diver`
- Issue 28: `Myth Engine`
- Issue 29: `Indexed Drift`
- Issue 30: `Tempo Cartographer`
- Issue 31: `Clip Alibi`
- Issue 32: `Signal Garden`
- Issue 33: `Drop Architect`
- Issue 34: `Neon Pulse Corridor`
- Issue 35: `Lore Frequency`
- Issue 36: `Tempo Tribunal`
- Issue 37: `Bassline Raider`
- Issue 38: `Section Breaker`
- Issue 39: `Harmonic Runner`
- Issue 40: `Last Chorus Escape`
- Issue 41: `Beat Bloom`
- Issue 42: `Sync Mirage`

## Repo structure

- `docs/brainstorm-log.md`: full ideation trail and selection logic
- `docs/video-sources.md`: source URLs and local file mapping
- `docs/issue-map.md`: issue to prototype mapping
- `docs/interactive-story-datasets.md`: narrative dataset research and integration notes
- `docs/timeline-annotation-pipeline.md`: annotation-tool to gameplay pipeline
- `docs/video-discovery-and-understanding.md`: sourcing and offline AI-understanding workflow
- `docs/gameplay-point-tool-selection.md`: recommended tools for inserting gameplay points into video
- `docs/indexed-video-gameplay.md`: how indexed or parametric video can become a gameplay axis
- `docs/short-video-platform.md`: platform direction and next-wave concept backlog
- `docs/tempo-platform.md`: generated-music gameplay platform direction and first-wave issue queue
- `gameplay/`: standalone gameplay folders
- `tempo/`: static pages and analysis artifacts for the tempo domain
  includes browser-side upload-and-template tooling for local songs
- `indexed-video/`: authored indexed-video payloads that turn one clip into a queryable game space
- `narrative/story-beats/`: time-aligned story state data used by narrative-heavy prototypes
- `analysis/`: offline AI-generated video understanding artifacts
- `annotation-exports/`: export-like timeline annotations before normalization
- `tools/`: browser tools for authoring gameplay points and timeline segments
- `gameplay-points/`: normalized point/segment payloads that directly drive games
- `scripts/download_videos.sh`: reproducible asset download script
