/**
 * Optimize sustainability page images from Figma SVG exports
 * (base64 embeds) and PNG sources into WebP assets.
 *
 * Output: public/sustainability/*.webp (+ certifications/)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sustainDir = path.join(__dirname, "../public/sustainability");
const certDir = path.join(sustainDir, "certifications");
const tmpDir = path.join(sustainDir, "_tmp_sustain");

const SVG_ASSETS = [
  { name: "sustainbg", dir: sustainDir, width: 2880 },
  { name: "knowmore1", dir: sustainDir, width: 2400 },
  { name: "knowmore2", dir: sustainDir, width: 2400 },
  { name: "knowmore3", dir: sustainDir, width: 2400 },
  { name: "card1", dir: sustainDir, width: 306 },
  { name: "card2", dir: sustainDir, width: 306 },
  { name: "card3", dir: sustainDir, width: 306 },
  { name: "card4", dir: sustainDir, width: 306 },
  { name: "card5", dir: sustainDir, width: 306 },
  { name: "cardbg", dir: sustainDir, width: 1000 },
  { name: "cert1", dir: certDir, width: 440 },
  { name: "cert2", dir: certDir, width: 440 },
  { name: "cert3", dir: certDir, width: 440 },
  { name: "cert4", dir: certDir, width: 440 },
  { name: "cert5", dir: certDir, width: 440 },
];

const PNG_ASSETS = [
  { name: "eco1", width: 836, quality: 82 },
  { name: "eco2", width: 836, quality: 82 },
  { name: "eco3", width: 836, quality: 82 },
  { name: "energyefficient", quality: 82 },
  { name: "water", quality: 82 },
  { name: "modal-responsible", width: 1440, quality: 85 },
  { name: "modal-energy", width: 1440, quality: 85 },
  { name: "modal-community", width: 1440, quality: 85 },
  { name: "modal-governance", width: 1440, quality: 85 },
  { name: "ecofeature1", width: 128, quality: 90 },
  { name: "ecofeature2", width: 128, quality: 90 },
  { name: "ecofeature3", width: 128, quality: 90 },
  { name: "ecofeature4", width: 128, quality: 90 },
];

async function pipelineFromSvg(name, dir) {
  const svgPath = path.join(dir, `${name}.svg`);
  let svg = fs.readFileSync(svgPath, "utf8");

  const re = /xlink:href="(data:image\/(png|jpeg|jpg|webp);base64,[^"]+)"/g;
  const embeds = [];
  let match;
  while ((match = re.exec(svg)) !== null) {
    embeds.push({
      full: match[0],
      dataUri: match[1],
      mime: match[2],
      index: embeds.length,
    });
  }
  if (!embeds.length) throw new Error(`No embedded images in ${name}.svg`);

  fs.mkdirSync(tmpDir, { recursive: true });

  for (const embed of embeds) {
    const ext =
      embed.mime === "jpeg" || embed.mime === "jpg" ? "jpg" : embed.mime;
    const filePath = path.join(tmpDir, `${name}-embed-${embed.index}.${ext}`);
    fs.writeFileSync(
      filePath,
      Buffer.from(embed.dataUri.split(",")[1], "base64")
    );
    const meta = await sharp(filePath).metadata();
    console.log(
      `  embed ${embed.index}: ${meta.width}x${meta.height} ${ext} (${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)}MB)`
    );
    const href = path.resolve(filePath).replace(/\\/g, "/");
    svg = svg.replace(embed.full, `xlink:href="file:///${href}"`);
  }

  const slimPath = path.join(tmpDir, `${name}-slim.svg`);
  fs.writeFileSync(slimPath, svg);

  return sharp(slimPath, { density: 300, limitInputPixels: false });
}

async function optimizeSvg({ name, dir, width }) {
  const svgPath = path.join(dir, `${name}.svg`);
  const pngPath = path.join(dir, `${name}.png`);
  const outPath = path.join(dir, `${name}.webp`);

  console.log(`\n${name}:`);

  let pipeline;
  let inSize;

  if (name === "sustainbg" && fs.existsSync(pngPath)) {
    console.log("  using PNG source (faster than 31MB SVG)");
    pipeline = sharp(pngPath);
    inSize = fs.statSync(pngPath).size;
  } else if (fs.existsSync(svgPath)) {
    pipeline = await pipelineFromSvg(name, dir);
    inSize = fs.statSync(svgPath).size;
  } else {
    throw new Error(`Missing ${svgPath}`);
  }

  await pipeline
    .resize({ width, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 85, effort: 6 })
    .toFile(outPath);

  const outSize = fs.statSync(outPath).size;
  const meta = await sharp(outPath).metadata();
  console.log(
    `  → ${meta.width}x${meta.height} WebP ${(outSize / 1024).toFixed(0)}KB (from ${(inSize / 1024 / 1024).toFixed(2)}MB)`
  );
}

async function optimizePng({ name, width, quality = 82 }) {
  const inPath = path.join(sustainDir, `${name}.png`);
  const outPath = path.join(sustainDir, `${name}.webp`);
  if (!fs.existsSync(inPath)) {
    console.log(`\n${name}: skipped (no PNG)`);
    return;
  }

  console.log(`\n${name}:`);
  let pipeline = sharp(inPath);
  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true, fit: "inside" });
  }

  await pipeline.webp({ quality, effort: 6 }).toFile(outPath);

  const inSize = fs.statSync(inPath).size;
  const outSize = fs.statSync(outPath).size;
  const meta = await sharp(outPath).metadata();
  console.log(
    `  → ${meta.width}x${meta.height} WebP ${(outSize / 1024).toFixed(0)}KB (from ${(inSize / 1024).toFixed(0)}KB PNG)`
  );
}

async function main() {
  for (const asset of SVG_ASSETS) {
    await optimizeSvg(asset);
  }
  for (const asset of PNG_ASSETS) {
    await optimizePng(asset);
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
