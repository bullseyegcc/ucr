/**
 * One-time / re-run helper: convert Figma-exported product SVGs
 * (huge base64 photo embeds) into listing-sized WebP.
 *
 * Expects source files at public/products/product{1-5}.svg
 * Outputs public/products/product{1-5}.webp
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productsDir = path.join(__dirname, "../public/products");
const names = ["product1", "product2", "product3", "product4", "product5"];

const missing = names.filter(
  (name) => !fs.existsSync(path.join(productsDir, `${name}.svg`))
);
if (missing.length) {
  console.error(
    "Missing source SVGs:",
    missing.map((n) => `${n}.svg`).join(", "),
    "\nPlace Figma exports in public/products/ then re-run."
  );
  process.exit(1);
}

const tmpDir = path.join(productsDir, "_tmp");
fs.mkdirSync(tmpDir, { recursive: true });

async function convertWithLayout(name, { width = 1200, quality = 78 } = {}) {
  const svgPath = path.join(productsDir, `${name}.svg`);
  console.log("Processing", name, "...");
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

  if (!embeds.length) throw new Error("No embeds");

  for (const embed of embeds) {
    const ext =
      embed.mime === "jpeg" || embed.mime === "jpg" ? "jpg" : embed.mime;
    const fileName = `${name}-embed-${embed.index}.${ext}`;
    const filePath = path.join(tmpDir, fileName);
    const buf = Buffer.from(embed.dataUri.split(",")[1], "base64");
    fs.writeFileSync(filePath, buf);
    const href = path.resolve(filePath).replace(/\\/g, "/");
    svg = svg.replace(embed.full, `xlink:href="file:///${href}"`);
  }

  const slimPath = path.join(tmpDir, `${name}-slim.svg`);
  fs.writeFileSync(slimPath, svg);

  const out = path.join(productsDir, `${name}.webp`);
  const info = await sharp(slimPath, { density: 300, limitInputPixels: false })
    .resize({ width })
    .webp({ quality })
    .toFile(out);

  console.log(name, "->", info.size, "bytes", `${info.width}x${info.height}`);
}

for (const name of names) {
  try {
    await convertWithLayout(name);
  } catch (err) {
    console.error(name, "FAILED", err.message);
  }
}

fs.rmSync(tmpDir, { recursive: true, force: true });
console.log("Done");
