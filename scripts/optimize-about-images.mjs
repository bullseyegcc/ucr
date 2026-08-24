/**
 * Optimize about-page hero + parent-company background from Figma SVG
 * exports (base64 embeds) into high-quality WebP assets.
 *
 * Output:
 *   public/about/abouthero.webp
 *   public/about/parentcompanybg.webp
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const aboutDir = path.join(__dirname, "../public/about");
const tmpDir = path.join(aboutDir, "_tmp_about");
const QUALITY = 88;

const ASSETS = [
  {
    name: "abouthero",
    // Displayed ~full content width @ 2x retina; source viewBox is 1338×596
    width: 2400,
  },
  {
    name: "parentcompanybg",
    // Full-bleed section bg @ 2x; source viewBox is 1440×504
    width: 2880,
  },
];

async function pipelineFromSvg(name) {
  const svgPath = path.join(aboutDir, `${name}.svg`);
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

async function optimizeOne({ name, width }) {
  const svgPath = path.join(aboutDir, `${name}.svg`);
  if (!fs.existsSync(svgPath)) throw new Error(`Missing ${svgPath}`);

  console.log(`\n${name}:`);
  const pipeline = await pipelineFromSvg(name);
  const outPath = path.join(aboutDir, `${name}.webp`);

  await pipeline
    .resize({
      width,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);

  const inSize = fs.statSync(svgPath).size;
  const outSize = fs.statSync(outPath).size;
  const meta = await sharp(outPath).metadata();
  console.log(
    `  → ${meta.width}x${meta.height} WebP ${(outSize / 1024).toFixed(0)}KB (from ${(inSize / 1024 / 1024).toFixed(2)}MB SVG)`
  );
}

async function main() {
  for (const asset of ASSETS) {
    await optimizeOne(asset);
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
