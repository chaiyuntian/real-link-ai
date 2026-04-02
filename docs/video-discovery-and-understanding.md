# Video Discovery And Understanding

This repo treats video discovery and understanding as a production pipeline, not a gameplay runtime dependency.

## Creative discovery directions

- Blender Open Movies for open-license narrative beats.
- Internet Archive for public-domain dramatic and documentary footage.
- Pexels or Pixabay for modern footage that can be reframed into surveillance, chase, or mystery play.
- Creative-Commons or explicitly reusable trailers when rights are clear.

## Understanding stack

- `Google Gemini`
  - strongest first choice when you want direct video understanding with timestamps and broad multimodal reasoning

- `fal-ai/video-understanding`
  - useful as a production step that turns a public video URL into a reusable understanding artifact

- `Label Studio / CVAT`
  - best when you need human-controlled timeline truth instead of pure model interpretation

## Repo rule

AI can be used during production:

- discover beats
- summarize plot changes
- infer emotional shifts
- propose gameplay directions

AI is not used during gameplay runtime.

Gameplay consumes saved JSON only.
