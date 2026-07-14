import sharp from 'sharp';

export async function optimizePublicImage(buffer) {
  return sharp(buffer, { animated: true })
    .rotate()
    .resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
}
