import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    {
        input: 'images/hero.webp',
        outputs: [
            { width: 400, name: 'hero-400w.webp' },
            { width: 800, name: 'hero-800w.webp' },
            { width: 1200, name: 'hero-1200w.webp' }
        ]
    },
    {
        input: 'images/about.webp',
        outputs: [
            { width: 600, name: 'about-600w.webp' }
        ]
    },
    {
        input: 'images/hand.webp',
        outputs: [
            { width: 48, name: 'hand-48w.webp' }
        ]
    }
];

// Create images directory
const imagesDir = path.join(__dirname, '..', 'images');

// Process images
async function optimizeImages() {
    console.log('🖼️  Optimizing images...\n');

    for (const image of images) {
        const inputPath = path.join(__dirname, '..', image.input);

        if (!fs.existsSync(inputPath)) {
            console.log(`⚠️  Skipping ${image.input} (not found)`);
            continue;
        }

        for (const output of image.outputs) {
            const outputPath = path.join(imagesDir, output.name);

            try {
                await sharp(inputPath)
                    .resize(output.width)
                    .webp({ quality: 85 })
                    .toFile(outputPath);

                const stats = fs.statSync(outputPath);
                const sizeKB = (stats.size / 1024).toFixed(1);
                console.log(`✓ Generated ${output.name} (${sizeKB} KB)`);
            } catch (error) {
                console.error(`✗ Failed to generate ${output.name}:`, error.message);
            }
        }
    }

    console.log('\n✓ Image optimization complete\n');
}

optimizeImages().catch(console.error);
