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

## Repo structure

- `docs/brainstorm-log.md`: full ideation trail and selection logic
- `docs/video-sources.md`: source URLs and local file mapping
- `docs/issue-map.md`: issue to prototype mapping
- `gameplay/`: standalone gameplay folders
- `scripts/download_videos.sh`: reproducible asset download script
