/**
 * Optimize core-product listing images.
 *
 * Prefers Figma SVG exports when present (huge base64 embeds),
 * otherwise recompresses existing WebP sources into card-sized assets.
 *
 * Output: public/products/product{1-5}-card.webp
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsDir = path.join(__dirname, "../public/products");
const names = ["product1", "product2", "product3", "product4", "product5"];
const CARD_WIDTH = 800;
const QUALITY = 72;

const tmpDir = path.join(productsDir, "_tmp");

async function fromSvg(name) {
  const svgPath = path.join(productsDir, `${name}.svg`);
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
  if (!embeds.length) throw new Error("No embedded images in SVG");

  fs.mkdirSync(tmpDir, { recursive: true });

  for (const embed of embeds) {
    const ext =
      embed.mime === "jpeg" || embed.mime === "jpg" ? "jpg" : embed.mime;
    const filePath = path.join(tmpDir, `${name}-embed-${embed.index}.${ext}`);
    fs.writeFileSync(filePath, Buffer.from(embed.dataUri.split(",")[1], "base64"));
    const href = path.resolve(filePath).replace(/\\/g, "/");
    svg = svg.replace(embed.full, `xlink:href="file:///${href}"`);
  }

  const slimPath = path.join(tmpDir, `${name}-slim.svg`);
  fs.writeFileSync(slimPath, svg);

  return sharp(slimPath, { density: 300, limitInputPixels: false });
}

async function cropWhiteCanvas(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a > 8 && (r < 245 || g < 245 || b < 245)) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX <= minX || maxY <= minY) {
    return sharp(inputPath);
  }

  const pad = 36;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const cropW = Math.min(width - left, maxX - minX + 1 + pad * 2);
  const cropH = Math.min(height - top, maxY - minY + 1 + pad * 2);

  return sharp(inputPath).extract({ left, top, width: cropW, height: cropH });
}

async function optimize(name) {
  const svgPath = path.join(productsDir, `${name}.svg`);
  const webpPath = path.join(productsDir, `${name}.webp`);
  const outPath = path.join(productsDir, `${name}-card.webp`);

  let pipeline;
  let source;

  if (fs.existsSync(svgPath)) {
    source = "svg";
    pipeline = await fromSvg(name);
  } else if (fs.existsSync(webpPath)) {
    source = "webp";
    pipeline =
      name === "product4"
        ? await cropWhiteCanvas(webpPath)
        : sharp(webpPath);
  } else {
    throw new Error(`Missing ${name}.svg and ${name}.webp`);
  }

  const info = await pipeline
    .resize({ width: CARD_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6, alphaQuality: 80 })
    .toFile(outPath);

  console.log(
    `${name} (${source}) -> ${info.width}x${info.height} ${Math.round(info.size / 1024)}KB`
  );
}

for (const name of names) {
  try {
    await optimize(name);
  } catch (err) {
    console.error(name, "FAILED", err.message);
  }
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log("Done");
