const sharp = require('sharp');
const path = require('path');

async function createCircularProfile() {
  const inputPath = path.join(__dirname, '../public/profile.jpg');
  const outputPath = path.join(__dirname, '../public/profile-circle.png');
  
  // Get image metadata
  const metadata = await sharp(inputPath).metadata();
  console.log(`Original image: ${metadata.width}x${metadata.height}`);
  
  // Calculate square crop dimensions
  // The image is wider than tall, so we use height as the square size
  // Position at 65% from left (matching objectPosition: '65% 50%' in the component)
  const size = metadata.height;
  const leftOffset = Math.floor((metadata.width - size) * 0.65);
  
  console.log(`Cropping ${size}x${size} square starting at x=${leftOffset}`);
  
  // Create circular mask SVG
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white"/>
    </svg>`
  );
  
  // Process the image
  await sharp(inputPath)
    // Extract square region centered on face
    .extract({
      left: leftOffset,
      top: 0,
      width: size,
      height: size
    })
    // Resize to a reasonable size for og:image (1200x1200 is good for social)
    .resize(1200, 1200)
    // Apply circular mask
    .composite([{
      input: Buffer.from(
        `<svg width="1200" height="1200">
          <circle cx="600" cy="600" r="600" fill="white"/>
        </svg>`
      ),
      blend: 'dest-in'
    }])
    // Output as PNG with transparency
    .png()
    .toFile(outputPath);
  
  console.log(`✓ Circular profile image saved to: ${outputPath}`);
}

createCircularProfile().catch(err => {
  console.error('Error creating circular profile:', err);
  process.exit(1);
});

