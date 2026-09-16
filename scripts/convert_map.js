const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = 'C:/Users/Rafael/.gemini/antigravity/brain/87e52dc5-756a-4d13-9e6f-ba4912f301cc/.user_uploaded/media_1789558950687.jpg';
const outputDir = path.join(__dirname, '../public/images/location');
const outputPath = path.join(outputDir, 'dubai-cinematic-map.webp');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sharp(inputPath)
  .resize(2400, 1350, { fit: 'cover' })
  .webp({ quality: 88, effort: 6 })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully generated dubai-cinematic-map.webp:', info);
  })
  .catch(err => {
    console.error('Error converting map:', err);
    process.exit(1);
  });
