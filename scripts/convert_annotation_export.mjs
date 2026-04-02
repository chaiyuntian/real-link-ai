import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const inputPath = path.join(root, "annotation-exports", "sintel-director-labelstudio-like.json");
const outputPath = path.join(root, "narrative", "story-beats", "sintel-annotated-director.json");

const input = JSON.parse(await fs.readFile(inputPath, "utf8"));

const normalized = {
  title: "Sintel Annotated Director",
  video: input.video,
  segments: input.annotations.map((annotation) => ({
    id: annotation.id,
    start: annotation.start,
    end: annotation.end,
    label: annotation.label,
    story_function: annotation.story_function,
    prompt: annotation.prompt,
    choices: annotation.choices
  })),
  endings: {
    coherent_hunt: "You directed the trailer into a coherent hunt: legible stakes, intact escalation, and earned payoff.",
    frantic_fragment: "You chased urgency too hard. The plot still moves, but it now reads as panic and fragmentation.",
    mythic_wound: "You leaned into symbolic weight and left the story bleeding open into myth."
  }
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(normalized, null, 2), "utf8");

console.log(`Converted ${inputPath} -> ${outputPath}`);
