import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const videoBaseUrl = process.env.VIDEO_BASE_URL || "https://videos-batch1.real-link.ai";

async function collectFiles(dir, matcher) {
  const start = path.join(root, dir);
  const entries = await fs.readdir(start, { withFileTypes: true });
  const results = [];

  for (const entry of entries) {
    const absolute = path.join(start, entry.name);
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await collectFiles(relative, matcher));
      continue;
    }
    if (matcher(relative)) results.push(relative);
  }

  return results;
}

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
    files: filesToCopy,
    dataFiles: dataFilesToCopy
  };
  await fs.writeFile(
    path.join(distDir, "deploy-manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8"
  );
}

async function copyStaticFile(relativePath) {
  const sourcePath = path.join(root, relativePath);
  const targetPath = path.join(distDir, relativePath);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
}

const filesToCopy = [
  "index.html",
  ...await collectFiles("gameplay", (relativePath) => relativePath.endsWith(".html")),
  ...await collectFiles("tools", (relativePath) => relativePath.endsWith(".html")),
  ...await collectFiles("tempo", (relativePath) => relativePath.endsWith(".html"))
].sort();

const dataFilesToCopy = [
  ...await collectFiles("narrative", (relativePath) => relativePath.endsWith(".json")),
  ...await collectFiles("annotation-exports", (relativePath) => relativePath.endsWith(".json")),
  ...await collectFiles("analysis", (relativePath) => relativePath.endsWith(".json")),
  ...await collectFiles("gameplay-points", (relativePath) => relativePath.endsWith(".json")),
  ...await collectFiles("indexed-video", (relativePath) => relativePath.endsWith(".json")),
  ...await collectFiles("generated-audio", (relativePath) => relativePath.endsWith(".json")),
  ...await collectFiles("tempo", (relativePath) => relativePath.endsWith(".json"))
].sort();

await ensureCleanDist();
await Promise.all(filesToCopy.map(copyHtml));
await Promise.all(dataFilesToCopy.map(copyStaticFile));
await writeManifest();

console.log(`Built deployable site into ${distDir}`);
console.log(`Video base URL: ${videoBaseUrl}`);
