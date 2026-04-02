import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const videoBaseUrl = process.env.VIDEO_BASE_URL || "https://videos-batch1.real-link.ai";

const filesToCopy = [
  "index.html",
  "gameplay/issue-001-rhythm-cut/index.html",
  "gameplay/issue-002-freeze-frame-hunter/index.html",
  "gameplay/issue-003-director-split/index.html",
  "gameplay/issue-004-glitch-chase/index.html",
  "gameplay/issue-005-remix-runner/index.html",
  "gameplay/issue-006-subtitle-saboteur/index.html",
  "gameplay/issue-007-meme-sniper/index.html",
  "gameplay/issue-008-threat-tagger/index.html",
  "gameplay/issue-009-boss-scrubber/index.html",
  "gameplay/issue-010-emotion-switchboard/index.html"
];

async function ensureCleanDist() {
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });
}

function rewriteVideoPaths(content) {
  return content.replaceAll("../../assets/videos/", `${videoBaseUrl}/`);
}

async function copyHtml(relativePath) {
  const sourcePath = path.join(root, relativePath);
  const targetPath = path.join(distDir, relativePath);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  const source = await fs.readFile(sourcePath, "utf8");
  const rewritten = rewriteVideoPaths(source);
  await fs.writeFile(targetPath, rewritten, "utf8");
}

async function writeManifest() {
  const manifest = {
    generatedAt: new Date().toISOString(),
    videoBaseUrl,
    files: filesToCopy
  };
  await fs.writeFile(
    path.join(distDir, "deploy-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );
}

await ensureCleanDist();
await Promise.all(filesToCopy.map(copyHtml));
await writeManifest();

console.log(`Built deployable site into ${distDir}`);
console.log(`Video base URL: ${videoBaseUrl}`);
