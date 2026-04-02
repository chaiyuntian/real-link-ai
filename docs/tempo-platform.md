# Tempo Platform

`tempo.real-link.ai` is a second product surface in this repo.

The original site starts from short videos and turns them into many game forms.
The tempo site starts from generated music and turns one track into many playable rhythm systems.

## Production loop

1. Generate a short track with `fal-ai/lyria2`.
2. Save the output as a static audio asset.
3. Analyze the waveform offline for beats, novelty, and section boundaries.
4. Use the saved analysis JSON to drive gameplay.
5. Publish the result as static pages under `tempo.real-link.ai`.

Runtime gameplay does not call AI.

## First wave

- Issue #32 `Signal Garden`
- Issue #33 `Drop Architect`
- Issue #34 `Neon Pulse Corridor`
- Issue #35 `Lore Frequency`
- Issue #36 `Tempo Tribunal`
- Issue #37 `Bassline Raider`
- Issue #38 `Section Breaker`
- Issue #39 `Harmonic Runner`
- Issue #40 `Last Chorus Escape`
- Issue #41 `Beat Bloom`

Bonus backlog:

- Issue #42 `Sync Mirage`

## Why this form is useful

- Music generation is cheap compared with producing custom video for every prototype.
- Beat analysis lets one song support many visual and mechanical interpretations.
- The same track can drive lane rhythm games, runner timing games, bullet patterns, scene transitions, and narrative phase changes.
