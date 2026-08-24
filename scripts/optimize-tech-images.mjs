/**
 * Optimize technology section images from Figma SVG exports
 * (multi-layer base64 embeds) into portrait WebP assets.
 *
 * Output: public/home/tech{1-5}.webp
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const homeDir = path.join(__dirname, "../public/home");
const names = ["tech1", "tech2", "tech3", "tech4", "tech5"];
const WIDTH = 900;
const HEIGHT = 1350; // ~688x1036 aspect
const QUALITY = 80;
const tmpDir = path.join(homeDir, "_tmp_tech");

async function fromSvg(name) {
  const svgPath = path.join(homeDir, `${name}.svg`);
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
    const href = path.resolve(filePath).replace(/\\/g, "/");
    svg = svg.replace(embed.full, `xlink:href="file:///${href}"`);
  }

  const slimPath = path.join(tmpDir, `${name}-slim.svg`);
  fs.writeFileSync(slimPath, svg);

  return sharp(slimPath, { density: 180, limitInputPixels: false });
}

async function optimizeOne(name) {
  const svgPath = path.join(homeDir, `${name}.svg`);
  if (!fs.existsSync(svgPath)) throw new Error(`Missing ${svgPath}`);

  const pipeline = await fromSvg(name);
  const outPath = path.join(homeDir, `${name}.webp`);

  await pipeline
    .resize({
      width: WIDTH,
      height: HEIGHT,
      fit: "cover",
      position: "centre",
    })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);

  const inSize = fs.statSync(svgPath).size;
  const outSize = fs.statSync(outPath).size;
  const meta = await sharp(outPath).metadata();
  console.log(
    `${name}: ${(inSize / 1024 / 1024).toFixed(2)}MB SVG → ${meta.width}x${meta.height} ${(outSize / 1024).toFixed(0)}KB WebP`
  );
}

async function main() {
  for (const name of names) {
    await optimizeOne(name);
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
