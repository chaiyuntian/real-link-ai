import fs from "node:fs/promises";
import path from "node:path";
import { fal } from "@fal-ai/client";

const root = process.cwd();
const outputDir = path.join(root, "tempo", "assets", "orbital-aegis");
const metadataPath = path.join(outputDir, "fal-assets.json");

if (!process.env.FAL_KEY) {
  console.error("FAL_KEY is required");
  process.exit(1);
}

fal.config({
  credentials: process.env.FAL_KEY
});

const specs = [
  {
    slug: "guardian-core",
    prompt: [
      "A luminous sci-fi guardian core for a rhythm game UI.",
      "Floating mechanical heart with teal and gold energy veins, circular silhouette, highly readable at small size.",
      "Front view, centered composition, dark studio backdrop, no text, no watermark."
    ].join(" ")
  },
  {
    slug: "tempo-shard",
    prompt: [
      "A sharp crystal tempo shard enemy for a music action game.",
      "Angular neon orange and cyan projectile, dramatic lighting, centered, isolated subject, strong silhouette.",
      "Front view, no text, no watermark."
    ].join(" ")
  },
  {
    slug: "bass-bloom",
    prompt: [
      "A floating bass bloom enemy for a rhythm defense game.",
      "Alien flower orb with glowing petals and pulse core, cyan, magenta, and amber accents, centered composition.",
      "Dark neutral background, no text, no watermark."
    ].join(" ")
  }
];

async function downloadFile(url, targetPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(targetPath, buffer);
}

const outputs = [];
await fs.mkdir(outputDir, { recursive: true });

for (const spec of specs) {
  console.log(`Generating ${spec.slug}...`);
  const generated = await fal.subscribe("fal-ai/flux/schnell", {
    input: {
      prompt: spec.prompt,
      image_size: "square_hd",
      num_images: 1,
      output_format: "png"
    },
    logs: true
  });

  const imageUrl = generated?.data?.images?.[0]?.url || generated?.images?.[0]?.url;
  if (!imageUrl) {
    throw new Error(`No generated image URL returned for ${spec.slug}`);
  }

  console.log(`Removing background for ${spec.slug}...`);
  const cutout = await fal.subscribe("fal-ai/imageutils/rembg", {
    input: {
      image_url: imageUrl
    },
    logs: true
  });

  const cutoutUrl = cutout?.data?.image?.url || cutout?.image?.url;
  if (!cutoutUrl) {
    throw new Error(`No cutout image URL returned for ${spec.slug}`);
  }

  const rawTargetPath = path.join(outputDir, `${spec.slug}-raw.png`);
  const cutoutTargetPath = path.join(outputDir, `${spec.slug}.png`);

  await downloadFile(imageUrl, rawTargetPath);
  await downloadFile(cutoutUrl, cutoutTargetPath);

  outputs.push({
    slug: spec.slug,
    prompt: spec.prompt,
    generationModel: "fal-ai/flux/schnell",
    backgroundRemovalModel: "fal-ai/imageutils/rembg",
    rawImage: path.relative(root, rawTargetPath),
    cutoutImage: path.relative(root, cutoutTargetPath),
    rawImageUrl: imageUrl,
    cutoutImageUrl: cutoutUrl,
    generated
  });
}

await fs.writeFile(
  metadataPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      outputs
    },
    null,
    2
  ),
  "utf8"
);

console.log(`Saved asset metadata to ${metadataPath}`);
