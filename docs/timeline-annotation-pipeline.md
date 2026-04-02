# Timeline Annotation Pipeline

This demo shows how a timeline annotation tool can drive gameplay end to end.

## Recommended tooling

- `Label Studio`
  - good for flexible timeline/category annotation
  - useful when you want custom semantic labels like `setup`, `threat`, `reveal`, `resolve`

- `CVAT`
  - stronger if you also need object tracks, interpolation, and frame-level geometry
  - useful when gameplay depends on tracked entities plus temporal states

## Normalized repo pipeline

1. Annotate the source video in a timeline tool.
2. Export the result as JSON.
3. Convert the export into a normalized gameplay schema.
4. Load that schema in the browser.
5. Use segment labels to trigger prompts, scoring logic, and endings.

## Why this matters

This is closer to story design than ordinary timing games:

- the timeline labels define narrative state
- player actions are judged against that state
- endings depend on how well the player interprets the labeled story beats

## Files in this repo

- `annotation-exports/sintel-director-labelstudio-like.json`
  - export-like temporal annotations

- `scripts/convert_annotation_export.mjs`
  - normalizes the export into gameplay-friendly story beats

- `narrative/story-beats/sintel-annotated-director.json`
  - normalized story graph consumed by the playable demo

- `gameplay/issue-014-annotated-timeline-director/`
  - end-to-end browser demo driven by the normalized annotation file
