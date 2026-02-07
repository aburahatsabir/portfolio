import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

console.log('🖼️  Generating Responsive Image Variants\n');

// Configuration for responsive variants
const categories = {
    projects: {
        dir: 'public/images/projects',
        sizes: [600, 900, 1140],
        quality: 85
    },
    testimonials: {
        dir: 'public/images/testimonial',
        sizes: [64, 128],
        quality: 90
    },
    logos: {
        dir: 'public/images/logos',
        sizes: [150, 300],
        quality: 85
    }
};

async function generateVariants(category) {
    const { dir, sizes, quality } = categories[category];

    console.log(`\n📁 Processing ${category}...`);

    // Get all WebP files (excluding variants)
    const files = fs.readdirSync(dir)
        .filter(file => file.endsWith('.webp') && !file.match(/-\d+w\.webp$/));

    console.log(`   Found ${files.length} base images`);

    let totalGenerated = 0;

    for (const file of files) {
        const inputPath = path.join(dir, file);
        const basename = path.basename(file, '.webp');

        console.log(`\n   Processing: ${file}`);

        for (const size of sizes) {
            const outputPath = path.join(dir, `${basename}-${size}w.webp`);

            try {
                await sharp(inputPath)
                    .resize(size, null, {
                        fit: 'inside',
                        withoutEnlargement: true
                    })
                    .webp({ quality })
                    .toFile(outputPath);

                const stats = fs.statSync(outputPath);
                console.log(`   ✅ Generated ${basename}-${size}w.webp (${(stats.size / 1024).toFixed(2)} KB)`);
                totalGenerated++;
            } catch (error) {
                console.log(`   ❌ Failed to generate ${size}w variant: ${error.message}`);
            }
        }
    }

    console.log(`\n   📊 Generated ${totalGenerated} variants for ${category}`);
}

// Main execution
async function main() {
    const categoryArg = process.argv[2];

    if (categoryArg && categories[categoryArg]) {
        await generateVariants(categoryArg);
    } else if (categoryArg) {
        console.error(`❌ Unknown category: ${categoryArg}`);
        console.log('Available categories: projects, testimonials, logos');
    } else {
        // Process all categories
        for (const category of Object.keys(categories)) {
            await generateVariants(category);
        }
    }

    console.log('\n✅ All responsive variants generated!\n');
}

main().catch(console.error);
