import fs from "node:fs/promises";
import path from "node:path";
import { fal } from "@fal-ai/client";

const root = process.cwd();
const outputDir = path.join(root, "generated-audio");

const slug = process.env.TRACK_SLUG;
const prompt = process.env.SONG_PROMPT;

if (!slug) {
  console.error("TRACK_SLUG is required");
  process.exit(1);
}

if (!prompt) {
  console.error("SONG_PROMPT is required");
  process.exit(1);
}

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY is required");
  process.exit(1);
}

const outputPath = path.join(outputDir, `${slug}.wav`);
const metadataPath = path.join(outputDir, `${slug}.metadata.json`);

fal.config({
  credentials: process.env.FAL_KEY
});

const result = await fal.subscribe("fal-ai/lyria2", {
  input: { prompt },
  logs: true
});

const audioUrl = result?.data?.audio?.url || result?.audio?.url;
if (!audioUrl) {
  console.error("No audio URL found in fal response");
  process.exit(1);
}

const response = await fetch(audioUrl);
if (!response.ok) {
  console.error(`Failed to download generated audio: ${response.status}`);
  process.exit(1);
}

const audioBuffer = Buffer.from(await response.arrayBuffer());

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputPath, audioBuffer);
await fs.writeFile(
  metadataPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      slug,
      model: "fal-ai/lyria2",
      prompt,
      audioUrl,
      result
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Saved generated track to ${outputPath}`);
console.log(`Saved metadata to ${metadataPath}`);
