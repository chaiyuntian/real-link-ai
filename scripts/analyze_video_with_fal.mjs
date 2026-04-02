import fs from "node:fs/promises";
import path from "node:path";
import { fal } from "@fal-ai/client";

const root = process.cwd();
const outputPath = path.join(root, "analysis", "fal", "sintel-trailer-understanding.json");
const videoUrl =
  process.env.VIDEO_URL || "https://videos-batch1.real-link.ai/sintel-trailer.mp4";
const prompt =
  process.env.ANALYSIS_PROMPT ||
  [
    "Analyze this trailer as material for narrative gameplay design.",
    "Describe major story beats with timestamps, character intent changes, threat escalation, emotional shifts, and gameplay hooks.",
    "Prefer structured output that can be saved for offline gameplay design."
  ].join(" ");

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY is required");
  process.exit(1);
}

fal.config({
  credentials: process.env.FAL_KEY
});

const result = await fal.subscribe("fal-ai/video-understanding", {
  input: {
    video_url: videoUrl,
    prompt
  },
  logs: true
});

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(
  outputPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      model: "fal-ai/video-understanding",
      videoUrl,
      prompt,
      result
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Saved analysis to ${outputPath}`);
