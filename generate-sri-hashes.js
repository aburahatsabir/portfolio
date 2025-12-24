// SRI Hash Generator Script
// Run this in browser console to generate actual SRI hashes for external resources

const resources = [
    {
        name: 'Font Awesome CSS',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
        file: 'index.html',
        line: 63
    },
    {
        name: 'Lucide Icons',
        url: 'https://unpkg.com/lucide@0.294.0/dist/umd/lucide.min.js',
        file: 'index.html',
        line: 68
    },
    {
        name: 'EmailJS',
        url: 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
        file: 'index.html',
        line: 1068
    },
    {
        name: 'Font Awesome Kit',
        url: 'https://kit.fontawesome.com/6d23f536e4.js',
        files: ['work.html (line 56)', 'weekly-finance-close-control-system.html (line 1695)']
    }
];

async function generateSRIHash(url) {
    try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const hash = await crypto.subtle.digest('SHA-384', buffer);
        const base64Hash = btoa(String.fromCharCode(...new Uint8Array(hash)));
        return `sha384-${base64Hash}`;
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function generateAllHashes() {
    console.log('🔐 Generating SRI Hashes for Portfolio Resources\n');
    console.log('='.repeat(80));

    for (const resource of resources) {
        console.log(`\n📦 ${resource.name}`);
        console.log(`   URL: ${resource.url}`);
        console.log(`   File: ${resource.file || resource.files.join(', ')}`);
        console.log(`   Generating hash...`);

        const hash = await generateSRIHash(resource.url);

        if (hash.startsWith('Error')) {
            console.log(`   ❌ ${hash}`);
        } else {
            console.log(`   ✅ Hash: ${hash}`);
            console.log(`\n   Replace in HTML:`);
            console.log(`   integrity="${hash}"`);
        }

        console.log('-'.repeat(80));
    }

    console.log('\n✨ Hash generation complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Copy each hash from above');
    console.log('2. Replace the PLACEHOLDER_HASH_TO_BE_GENERATED in your HTML files');
    console.log('3. Save and test in browser');
    console.log('4. Check console for any SRI errors');
}

// Run the generator
generateAllHashes();
