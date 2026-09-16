const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = 'C:/Users/Rafael/.gemini/antigravity/brain/87e52dc5-756a-4d13-9e6f-ba4912f301cc/.user_uploaded/media_1789560191072.png';
const outputDir = path.join(__dirname, '../public/images/location');
const outputPath = path.join(outputDir, 'oxford-cove-pin.png');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sharp(inputPath)
  .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ quality: 95 })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully saved oxford-cove-pin.png:', info);
  })
  .catch(err => {
    console.error('Error processing pin:', err);
  });
