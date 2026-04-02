import fs from "node:fs/promises";
import path from "node:path";
import { fal } from "@fal-ai/client";

const root = process.cwd();
const outputDir = path.join(root, "generated-audio");
const outputPath = path.join(outputDir, "tempo-batch1.wav");
const metadataPath = path.join(outputDir, "tempo-batch1.metadata.json");

const prompt =
  process.env.SONG_PROMPT ||
  [
    "Create a 30 second cinematic electronic rhythm track for a browser rhythm game.",
    "Start tense and minimal, build toward a bright synth drop, and leave room for clear percussion accents.",
    "Style: neon sci-fi chase with emotional lift."
  ].join(" ");

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY is required");
  process.exit(1);
}

fal.config({
  credentials: process.env.FAL_KEY
});

const result = await fal.subscribe("fal-ai/lyria2", {
  input: {
    prompt
  },
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
      model: "fal-ai/lyria2",
      prompt,
      audioUrl,
      result
    },
    null,
    2
  )
);

console.log(`Saved generated track to ${outputPath}`);
console.log(`Saved metadata to ${metadataPath}`);
