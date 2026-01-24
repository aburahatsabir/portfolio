import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY = 100; // Lossless quality
const KEEP_ORIGINALS = true; // Keep PNG files as backup

// Statistics
let stats = {
    total: 0,
    converted: 0,
    failed: 0,
    totalOriginalSize: 0,
    totalWebPSize: 0,
    files: []
};

/**
 * Recursively find all PNG, JPG, and JPEG files in a directory
 */
function findImageFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findImageFiles(filePath, fileList);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

/**
 * Convert a single image file to WebP
 */
async function convertToWebP(imagePath) {
    try {
        const webpPath = imagePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        const originalSize = fs.statSync(imagePath).size;

        console.log(`Converting: ${path.relative(PUBLIC_DIR, imagePath)}`);

        // Convert with lossless quality
        await sharp(imagePath)
            .webp({
                quality: QUALITY,
                lossless: false, // Use lossy with quality 100 for better compression
                nearLossless: true, // Near-lossless for best quality/size balance
                effort: 6 // Maximum compression effort (0-6)
            })
            .toFile(webpPath);

        const webpSize = fs.statSync(webpPath).size;
        const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);

        stats.files.push({
            original: path.relative(PUBLIC_DIR, imagePath),
            webp: path.relative(PUBLIC_DIR, webpPath),
            originalSize: (originalSize / 1024).toFixed(2) + ' KB',
            webpSize: (webpSize / 1024).toFixed(2) + ' KB',
            savings: savings + '%'
        });

        stats.totalOriginalSize += originalSize;
        stats.totalWebPSize += webpSize;
        stats.converted++;

        console.log(`  ✓ Saved ${savings}% (${(originalSize / 1024).toFixed(2)} KB → ${(webpSize / 1024).toFixed(2)} KB)`);

    } catch (error) {
        console.error(`  ✗ Failed: ${error.message}`);
        stats.failed++;
    }
}

/**
 * Main conversion function
 */
async function convertAllPNGs() {
    console.log('🔍 Searching for PNG, JPG, and JPEG files in public directory...\n');

    const imageFiles = findImageFiles(PUBLIC_DIR);
    stats.total = imageFiles.length;

    if (imageFiles.length === 0) {
        console.log('No image files found.');
        return;
    }

    console.log(`Found ${imageFiles.length} image file(s)\n`);
    console.log('🔄 Converting to WebP with 100% quality...\n');

    // Convert all files
    for (const imageFile of imageFiles) {
        await convertToWebP(imageFile);
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 CONVERSION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total files found:    ${stats.total}`);
    console.log(`Successfully converted: ${stats.converted}`);
    console.log(`Failed:               ${stats.failed}`);
    console.log(`Original total size:  ${(stats.totalOriginalSize / 1024).toFixed(2)} KB`);
    console.log(`WebP total size:      ${(stats.totalWebPSize / 1024).toFixed(2)} KB`);
    console.log(`Total savings:        ${((stats.totalOriginalSize - stats.totalWebPSize) / stats.totalOriginalSize * 100).toFixed(2)}%`);
    console.log('='.repeat(60));

    // Print detailed file list
    console.log('\n📋 DETAILED FILE LIST:\n');
    stats.files.forEach((file, index) => {
        console.log(`${index + 1}. ${file.original}`);
        console.log(`   → ${file.webp}`);
        console.log(`   Size: ${file.originalSize} → ${file.webpSize} (${file.savings} savings)\n`);
    });

    if (KEEP_ORIGINALS) {
        console.log('ℹ️  Original PNG files have been kept as backup.');
    }

    console.log('\n✅ Conversion complete!');
}

// Run the conversion
convertAllPNGs().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
