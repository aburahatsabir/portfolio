import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('📄 Post-processing HTML files...\n');

// Read all HTML files from dist
const distDir = path.join(__dirname, '..', 'dist');

function processHTMLFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Skipping ${path.basename(filePath)} (not found)`);
        return;
    }

    let html = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Update image references to use responsive variants
    const imageReplacements = [
        {
            old: 'images/hero.webp',
            new: 'images/hero-1200w.webp'
        },
        {
            old: 'images/about.webp',
            new: 'images/about-600w.webp'
        },
        {
            old: 'images/hand.webp',
            new: 'images/hand-48w.webp'
        }
    ];

    imageReplacements.forEach(({ old, new: newPath }) => {
        if (html.includes(old)) {
            html = html.replace(new RegExp(old, 'g'), newPath);
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, html, 'utf-8');
        console.log(`✓ Updated ${path.basename(filePath)}`);
    } else {
        console.log(`  ${path.basename(filePath)} (no changes needed)`);
    }
}

// Process all HTML files
const htmlFiles = [
    path.join(distDir, 'index.html'),
    path.join(distDir, 'work.html'),
    path.join(distDir, 'case-studies', 'weekly-finance-close-control-system.html')
];

htmlFiles.forEach(processHTMLFile);

console.log('\n✓ HTML post-processing complete\n');
