import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Image optimization configuration
const config = {
    projects: {
        inputDir: 'public/images/projects',
        outputDir: 'public/images/projects',
        width: 1140,
        height: 714,
        quality: 85,
        format: 'webp'
    },
    testimonials: {
        inputDir: 'public/images/testimonial',
        outputDir: 'public/images/testimonial',
        width: 128,
        height: 128,
        quality: 90,
        format: 'webp'
    },
    logos: {
        inputDir: 'public/images/logos',
        outputDir: 'public/images/logos',
        width: 300,
        height: null,
        quality: 85,
        format: 'webp'
    }
};

// Responsive sizes for srcset generation
const responsiveSizes = {
    projects: [600, 900, 1140],
    testimonials: [64, 128],
    logos: [150, 300]
};

async function optimizeImage(inputPath, outputPath, options) {
    try {
        const { width, height, quality, format } = options;

        // Create a temporary output path to avoid input/output conflict
        const tempPath = outputPath + '.tmp';

        let pipeline = sharp(inputPath);

        // Resize if dimensions specified
        if (width || height) {
            pipeline = pipeline.resize(width, height, {
                fit: 'cover',
                position: 'center'
            });
        }

        // Convert to specified format
        if (format === 'webp') {
            pipeline = pipeline.webp({ quality });
        } else if (format === 'jpeg') {
            pipeline = pipeline.jpeg({ quality });
        }

        await pipeline.toFile(tempPath);

        // If successful, replace the original (or create new file)
        if (fs.existsSync(tempPath)) {
            // If input and output are different, just rename
            if (inputPath !== outputPath) {
                fs.renameSync(tempPath, outputPath);
            } else {
                // If same file, backup original first
                const backupPath = inputPath + '.backup';
                if (fs.existsSync(inputPath)) {
                    fs.renameSync(inputPath, backupPath);
                }
                fs.renameSync(tempPath, outputPath);
                // Remove backup after successful replacement
                if (fs.existsSync(backupPath)) {
                    fs.unlinkSync(backupPath);
                }
            }
        }

        const stats = await fs.promises.stat(outputPath);
        return {
            success: true,
            size: stats.size,
            path: outputPath
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            path: inputPath
        };
    }
}

async function generateResponsiveSet(inputPath, outputDir, sizes, quality = 85) {
    const results = [];
    const ext = path.extname(inputPath);
    const basename = path.basename(inputPath, ext);

    for (const size of sizes) {
        const outputPath = path.join(outputDir, `${basename}-${size}w.webp`);

        try {
            await sharp(inputPath)
                .resize(size, null, { fit: 'inside' })
                .webp({ quality })
                .toFile(outputPath);

            const stats = await fs.promises.stat(outputPath);
            results.push({
                size,
                path: outputPath,
                fileSize: stats.size,
                success: true
            });
        } catch (error) {
            results.push({
                size,
                path: outputPath,
                error: error.message,
                success: false
            });
        }
    }

    return results;
}

async function optimizeCategory(category) {
    console.log(`\n🔄 Optimizing ${category} images...`);

    const categoryConfig = config[category];
    if (!categoryConfig) {
        console.error(`❌ Unknown category: ${category}`);
        return;
    }

    const { inputDir, outputDir, width, height, quality, format } = categoryConfig;

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Get all images in input directory
    const files = fs.readdirSync(inputDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    console.log(`📁 Found ${files.length} images in ${inputDir}`);

    const results = [];

    for (const file of files) {
        const inputPath = path.join(inputDir, file);
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const outputPath = path.join(outputDir, `${basename}.${format}`);

        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        console.log(`\n  Processing: ${file}`);
        console.log(`  Original size: ${(originalSize / 1024).toFixed(2)} KB`);

        // Optimize main image
        const result = await optimizeImage(inputPath, outputPath, {
            width,
            height,
            quality,
            format
        });

        if (result.success) {
            const savings = ((originalSize - result.size) / originalSize * 100).toFixed(1);
            console.log(`  ✅ Optimized: ${(result.size / 1024).toFixed(2)} KB (${savings}% reduction)`);

            // Generate responsive variants if configured
            if (responsiveSizes[category]) {
                console.log(`  🔄 Generating responsive variants...`);
                const responsiveResults = await generateResponsiveSet(
                    inputPath,
                    outputDir,
                    responsiveSizes[category],
                    quality
                );

                responsiveResults.forEach(r => {
                    if (r.success) {
                        console.log(`    ✅ ${r.size}w: ${(r.fileSize / 1024).toFixed(2)} KB`);
                    }
                });
            }

            results.push({
                file,
                originalSize,
                optimizedSize: result.size,
                savings: originalSize - result.size,
                success: true
            });
        } else {
            console.log(`  ❌ Failed: ${result.error}`);
            results.push({
                file,
                error: result.error,
                success: false
            });
        }
    }

    // Summary
    const successful = results.filter(r => r.success);
    const totalOriginal = successful.reduce((sum, r) => sum + r.originalSize, 0);
    const totalOptimized = successful.reduce((sum, r) => sum + r.optimizedSize, 0);
    const totalSavings = totalOriginal - totalOptimized;
    const percentSavings = ((totalSavings / totalOriginal) * 100).toFixed(1);

    console.log(`\n📊 ${category.toUpperCase()} Summary:`);
    console.log(`  Processed: ${successful.length}/${files.length} images`);
    console.log(`  Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Optimized: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Savings: ${(totalSavings / 1024 / 1024).toFixed(2)} MB (${percentSavings}%)`);

    return results;
}

async function main() {
    const args = process.argv.slice(2);
    const category = args[0] || 'all';

    console.log('🖼️  Image Optimization Tool');
    console.log('==========================\n');

    if (category === 'all') {
        console.log('Processing all categories...\n');
        await optimizeCategory('projects');
        await optimizeCategory('testimonials');
        await optimizeCategory('logos');
    } else if (config[category]) {
        await optimizeCategory(category);
    } else {
        console.error(`❌ Unknown category: ${category}`);
        console.log('\nAvailable categories:');
        console.log('  - projects');
        console.log('  - testimonials');
        console.log('  - logos');
        console.log('  - all (default)');
        process.exit(1);
    }

    console.log('\n✅ Optimization complete!');
}

main().catch(error => {
    console.error('❌ Error:', error);
    process.exit(1);
});
