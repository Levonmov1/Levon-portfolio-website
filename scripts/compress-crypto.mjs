import sharp from "sharp";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const DIR = "public/images/crypto";
const SIZE = 224;
const QUALITY = 85;

const files = (await readdir(DIR)).filter((f) => f.endsWith(".png"));

console.log(`Found ${files.length} PNGs to convert\n`);

for (const file of files) {
  const input = join(DIR, file);
  const output = join(DIR, file.replace(/\.png$/i, ".webp"));
  const before = (await stat(input)).size;

  await sharp(input).resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).webp({ quality: QUALITY }).toFile(output);

  const after = (await stat(output)).size;
  console.log(
    `${file} → ${(before / 1024 / 1024).toFixed(1)}MB → ${(after / 1024).toFixed(1)}KB`
  );
}

console.log("\nDone! You can now delete the original .png files.");
