# Brainstorm Log

This document records the full first-wave ideation process, not just the final choices.

## Goal

Start from only three public videos and squeeze as many distinct gameplay loops as possible out of them.

## Constraint framing

- Use a tiny media set, not a giant content library.
- Reuse the same footage in radically different ways.
- Prefer direct browser play over heavyweight engine setup.
- Each selected idea must be concrete enough to ship as a playable prototype.

## Clip reading

### Big Buck Bunny trailer

- Strong visual punctuation.
- Sudden motion changes.
- Cartoon exaggeration works well for timing games and meme edits.

### Sintel trailer

- Clear dramatic beats.
- Strong silhouettes and pose moments.
- Good candidate for pause, aim, lock, and precision timing mechanics.

### Tears of Steel teaser

- Live-action sci-fi tension.
- Feels editable into fake systems, surveillance, command, and branching control interfaces.
- Strong fit for “you are directing the footage” mechanics.

## Idea expansion pass

### Timing-based

- Turn trailer cuts into a rhythm lane.
- Reward input on visual impact instead of audio waveform.
- Make playback speed itself part of the puzzle.

### Freeze / scan / hunt

- Ask the player to freeze on an emotion, silhouette, or highlighted frame window.
- Turn the video into a hidden-object hunt without changing the underlying asset.
- Let the player scrub but score them on precision.

### Directing / editing

- Present the player as the editor choosing when to cut, rewind, or punch in.
- Offer “correct chaos” windows where bad editing becomes the intended style.
- Score on narrative continuity or intentional absurdity.

### Meme / glitch /鬼畜

- Let the player create stutter loops live with a single key.
- Convert accidental overuse into combo-based humor.
- Make micro-rewinds and repeats the core mechanic, not a side effect.

### Narrative control

- Treat one clip as incoming intel and ask the player to decide what system action to take.
- Decisions do not change the source video, but they change score, overlays, and ending state.
- The pleasure comes from reinterpretation rather than asset branching.

## Selection logic

I selected the first five ideas using three filters:

1. Must be playable today with local static files.
2. Must feel distinct even when two ideas share one clip.
3. Must not require preprocessing tools that are missing locally.

## Selected first-wave ideas

1. Rhythm Cut
   - Video: Big Buck Bunny
   - Core: hit beats based on trailer impact windows

2. Freeze Frame Hunter
   - Video: Sintel
   - Core: stop the video close to target moments

3. Director Split
   - Video: Tears of Steel
   - Core: make command decisions at cue points

4. Glitch Chase
   - Video: Big Buck Bunny
   - Core: use micro-pauses and bursts to ride chaos zones

5. Remix Runner
   - Video: Sintel
   - Core: manage speed-state targets section by section

## Expansion backlog

More ideas already worth converting into future issues:

- Subtitle liar: choose the most wrong caption at the funniest moment.
- Boss-fight scrubber: drag through a danger zone while avoiding forbidden frames.
- Meme sniper: build loops by repeatedly locking the same 0.4-second pocket.
- Emotion matching: classify trailer mood changes under time pressure.
- Surveillance operator: tag threat frames in live-action footage before the timer expires.

## Second-wave selection

With the first wave deployed, I continued filtering for ideas that:

1. Still reuse the same source clips.
2. Feel structurally different from the first five.
3. Are fast to test in a browser without extra preprocessing.

## Selected second-wave ideas

6. Subtitle Saboteur
   - Video: Big Buck Bunny
   - Core: pick the funniest wrong caption under tight timing pressure

7. Meme Sniper
   - Video: Big Buck Bunny
   - Core: lock tiny repeat pockets before the beat window closes

8. Threat Tagger
   - Video: Tears of Steel
   - Core: act like a surveillance operator tagging danger windows live

9. Boss Scrubber
   - Video: Sintel
   - Core: manually scrub through a danger corridor and avoid forbidden slices

10. Emotion Switchboard
   - Video: Sintel
   - Core: rapidly classify mood-state shifts as the trailer advances

## Why these five

- `Subtitle Saboteur` uses interpretive humor instead of timing precision.
- `Meme Sniper` makes micro-loop capture the entire objective.
- `Threat Tagger` reframes footage as operator telemetry.
- `Boss Scrubber` turns the video timeline itself into the obstacle course.
- `Emotion Switchboard` makes trailer reading into a reactive categorization game.

## Third-wave imagination prompts

To keep the process open-ended, I added a deliberate expansion pass around operations that can be applied to the same exact footage:

- Time stretch: one scene becomes stealth at 0.5x and panic at 1.6x.
- Reverse causality: the player must understand a clip played backward and act before the meaning reappears.
- Slice theft: gameplay is about stealing, repeating, or suppressing 0.2-second fragments.
- Tempo duel: the player is not matching beats, but forcing the story to obey a target pulse.
- Narrative forgery: the player makes the clip “mean” something different through overlays and intervention timing.
- Surveillance paranoia: normal frames become threat evidence only because the system says so.
- Emotional drift: the same shot can be labeled grief, awe, fear, or triumph depending on when it is sampled.
- Compression combat: intentionally degrade, stutter, or freeze footage to gain control.
- Director sabotage: the player wins by making the edit intentionally worse in the most effective way.
- Memory test: replay one micro-moment across multiple timings and ask the player what actually changed.

## Narrative integration shift

This phase changes the design rule:

- before: gameplay mostly reads the video as timing material
- now: gameplay reads the video as plot evidence

That means each mechanic should connect to at least one of:

- beat-aligned story annotation
- plot-cause inference
- stateful consequence tracking
- ending generation tied to interpretation

This is the point where the repo starts borrowing structure from interactive-fiction datasets and narrative video grounding work, instead of only remixing footage mechanically.
