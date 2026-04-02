# Indexed Video Gameplay

This repo can treat a video as more than a linear file.

Instead of:

- `play(t)`

we can design around:

- `query(time, lens)`
- `query(time, interpretation)`
- `query(time, cut-state)`

That means the same underlying footage can be explored as an indexed space rather than only watched front to back.

## Why this matters for gameplay

- One clip can support search gameplay instead of only reaction gameplay.
- The player can answer questions about the footage using an extra axis such as mood, threat, memory, or myth.
- We can ship this in the browser without live AI by pre-authoring or precomputing the index.

## Practical shape in this repo

The current lightweight indexed-video pattern is:

1. Pick a short clip.
2. Define a set of named lenses.
3. Author moments with `time`, `lens`, `score`, and `reading`.
4. Build gameplay around finding or comparing those indexed moments.

Example:

```json
{
  "video": "sintel-trailer.mp4",
  "lenses": ["threat", "bond", "legend"],
  "moments": [
    {
      "time": 2.4,
      "lens": "bond",
      "score": 5,
      "reading": "connection peaks here"
    }
  ]
}
```

## Best use cases

- Perspective switching: the player decides which reading of the same shot is dominant.
- Evidence search: the player hunts for the strongest support for a claim.
- Causality puzzles: the player uses one index to understand another.
- Trailer forgery: the player assembles a genre by picking moments from a lens.

## Design rule

Indexed video should change the objective, not just the UI.

If the index exists, the game should require the player to:

- search the video differently
- compare readings of the same time window
- or commit to one interpretation under pressure

That is why `Archive Diver` uses indexed queries as the core loop instead of plain playback controls.
