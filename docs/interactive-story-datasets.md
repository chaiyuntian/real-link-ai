# Interactive Story Datasets

This repo now uses narrative dataset ideas to push the games closer to plot-aware interaction rather than only timing mechanics.

## Sources used

1. Video Localized Narratives
   - Official dataset page: https://google.github.io/video-localized-narratives/
   - Use here: treat a video as a sequence of time-grounded narrative beats, each with text and timing.

2. Connecting Vision and Language with Video Localized Narratives
   - Paper: https://arxiv.org/abs/2302.11217
   - Use here: motivates beat-level narrative grounding and video question answering around the same clip.

3. Jericho
   - Official GitHub: https://github.com/jericho
   - Use here: interactive-fiction style world state, action consequences, and endings driven by state transitions.

4. Synopses of Movie Narratives
   - Paper: https://arxiv.org/abs/2203.05711
   - Use here: long-form story understanding and summary-aligned narrative segmentation.

## How it maps into this repo

I am not copying these datasets into the repo. Instead I am adapting their structures:

- `Video Localized Narratives` becomes `time-aligned beat annotations`
- `Jericho` becomes `world state + action consequences`
- `Movie narrative datasets` become `plot inference and ending synthesis`

## Repo implementation

- `narrative/story-beats/tears-of-steel-ops.json`
  - Story-grounded operator decisions tied to video moments

- `narrative/story-beats/sintel-causality.json`
  - Reverse/forward plot inference prompts tied to narrative beats

- `narrative/story-beats/sintel-tempo-fate.json`
  - Tempo-sensitive narrative states and endings

## Design principle

Gameplay should not sit on top of the video as decoration. The mechanics should ask:

- what is happening in the plot now
- what might have caused it
- how should the player interpret it
- how does the interpretation change the ending

That is the standard for the newer narrative-heavy prototypes.
