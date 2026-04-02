# Video Sources

All videos are public Blender Open Movie assets and are downloaded locally instead of committed to git.

## Source set

1. Big Buck Bunny trailer
   - Source: https://download.blender.org/peach/trailer/trailer_480p.mov
   - Local: `assets/videos/big-buck-bunny-trailer.mov`
   - Use: comedic rhythm, reaction timing, chaos remix

2. Sintel trailer
   - Source: https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4
   - Local: `assets/videos/sintel-trailer.mp4`
   - Use: dramatic timing, freeze-frame target play, emotional pacing

3. Tears of Steel teaser
   - Source: https://download.blender.org/demo/movies/tears-of-steel_teaser.mp4.zip
   - Extracted local: `assets/videos/tears-of-steel-teaser.mp4`
   - Use: sci-fi tension, branching direction play, glitch narrative

## Asset policy

- Video binaries are ignored by git.
- Game code uses local relative references to the downloaded files.
- The same clip is intentionally reused across multiple game concepts.
