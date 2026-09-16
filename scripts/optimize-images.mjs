import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const targets = [
  { src: 'public/images/hero/hero-lifestyle.png', dest: 'public/images/hero/hero-lifestyle.webp', quality: 92 },
  { src: 'public/images/experience/experience-bg.png', dest: 'public/images/experience/experience-bg.webp', quality: 92 },
  { src: 'public/images/product/oxford-cove-facade.png', dest: 'public/images/product/oxford-cove-facade.webp', quality: 92 },
  { src: 'public/images/architecture/a_high_resolution_architectural_rendered_close_up.png', dest: 'public/images/architecture/architectural-close-up.webp', quality: 92 },
  { src: 'public/images/location/location-map.png', dest: 'public/images/location/location-map.webp', quality: 92 },
];

async function convertBackgrounds() {
  console.log('--- Converting Background Images to WebP ---');
  for (const t of targets) {
    if (fs.existsSync(t.src)) {
      const srcSize = fs.statSync(t.src).size / (1024 * 1024);
      await sharp(t.src)
        .webp({ quality: t.quality, effort: 6 })
        .toFile(t.dest);
      const destSize = fs.statSync(t.dest).size / (1024 * 1024);
      console.log(`Converted ${t.src} (${srcSize.toFixed(2)} MB) -> ${t.dest} (${destSize.toFixed(2)} MB) [${Math.round((1 - destSize/srcSize)*100)}% reduction]`);
    }
  }
}

// Convert building floor plans
async function convertBuildingFloorplans() {
  console.log('\n--- Converting Building Floor Plans to WebP ---');
  const dir = 'public/images/gf to 5tg floor plans';
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
    for (const f of files) {
      const srcPath = path.join(dir, f);
      const destName = f.replace('.png', '.webp');
      const destPath = path.join(dir, destName);
      const srcSize = fs.statSync(srcPath).size / (1024 * 1024);
      await sharp(srcPath)
        .webp({ quality: 90, effort: 6, lossless: false })
        .toFile(destPath);
      const destSize = fs.statSync(destPath).size / (1024 * 1024);
      console.log(`Converted ${f} (${srcSize.toFixed(2)} MB) -> ${destName} (${destSize.toFixed(2)} MB) [${Math.round((1 - destSize/srcSize)*100)}% reduction]`);
    }
  }
}

async function run() {
  await convertBackgrounds();
  await convertBuildingFloorplans();
  console.log('\nImage conversion completed!');
}

run().catch(console.error);
