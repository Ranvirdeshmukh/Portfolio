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
  
  // Final output size and border settings
  const outputSize = 1200;
  const borderWidth = 12; // White border thickness
  const innerSize = outputSize - (borderWidth * 2); // Size of the photo circle
  
  // First, create the circular cropped photo
  const circularPhoto = await sharp(inputPath)
    .extract({
      left: leftOffset,
      top: 0,
      width: size,
      height: size
    })
    .resize(innerSize, innerSize)
    .composite([{
      input: Buffer.from(
        `<svg width="${innerSize}" height="${innerSize}">
          <circle cx="${innerSize/2}" cy="${innerSize/2}" r="${innerSize/2}" fill="white"/>
        </svg>`
      ),
      blend: 'dest-in'
    }])
    .png()
    .toBuffer();
  
  // Create the final image with white border
  await sharp({
    create: {
      width: outputSize,
      height: outputSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([
      // White circle border (slightly larger)
      {
        input: Buffer.from(
          `<svg width="${outputSize}" height="${outputSize}">
            <circle cx="${outputSize/2}" cy="${outputSize/2}" r="${outputSize/2}" fill="white"/>
          </svg>`
        ),
        blend: 'over'
      },
      // The circular photo on top
      {
        input: circularPhoto,
        left: borderWidth,
        top: borderWidth,
        blend: 'over'
      }
    ])
    .png()
    .toFile(outputPath);
  
  console.log(`✓ Circular profile image with white border saved to: ${outputPath}`);
}

createCircularProfile().catch(err => {
  console.error('Error creating circular profile:', err);
  process.exit(1);
});

