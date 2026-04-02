# Gameplay Point Tool Selection

If the goal is to insert gameplay points into video timelines and then turn those points into playable web games, this is the practical ranking:

## Best overall: Label Studio

Why:

- strongest fit for semantic timeline labels such as `decision`, `danger`, `beat`, `reveal`, `tempo_shift`
- flexible JSON export
- easier to adapt to narrative gameplay than heavier CV pipelines

Use it when:

- you want to mark story beats, choice windows, puzzle windows, comedy hits, or rhythm cues
- the output is mostly temporal labels rather than tracked geometry

Official references:

- https://labelstud.io/tags/timelinelabels
- https://labelstud.io/templates/video_timeline_segmentation

## Best for tracked-object gameplay: CVAT

Why:

- better when gameplay depends on object tracks, interpolation, trajectories, or frame-accurate spatial data
- stronger for chase, stealth, aim, or collision mechanics

Use it when:

- the player is reacting to character positions, object motion, or spatial zones inside the frame

Official references:

- https://docs.cvat.ai/docs/annotation/auto-annotation/ai-tools/
- https://docs.cvat.ai/docs/dataset_management/formats/format-cvat/

## Best lightweight repo-native option: Gameplay Point Studio

Why:

- zero setup
- deployed with the repo
- fast for inserting gameplay points and exporting normalized JSON

Use it when:

- you want to prototype quickly
- you do not need enterprise annotation workflows
- the next step is directly shipping a web demo

## Recommendation

For this project, the best pipeline is:

1. Use `Label Studio` as the main authoring tool.
2. Normalize its export into repo JSON.
3. Use `Gameplay Point Studio` for fast inline edits and last-mile tuning.
4. Use `CVAT` only when a gameplay concept needs tracked motion inside the frame.
