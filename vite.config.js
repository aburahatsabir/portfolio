import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: 'index.html',
                work: 'work.html',
                privacy: 'privacy.html',
                caseStudy: 'case-studies/weekly-finance-close-control-system.html'
            },
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
                        extType = 'images';
                    } else if (/css/i.test(extType)) {
                        extType = 'css';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            }
        },
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: false,
                drop_debugger: true
            }
        }
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'partials',
                    dest: '.'
                },
                {
                    src: 'assets/data',
                    dest: 'assets'
                },
                {
                    src: 'manifest.json',
                    dest: '.'
                },
                {
                    src: 'robots.txt',
                    dest: '.'
                },
                {
                    src: 'sitemap.xml',
                    dest: '.'
                },
                {
                    src: 'security.txt',
                    dest: '.'
                },
                {
                    src: 'sw.js',
                    dest: '.'
                },
                {
                    src: 'AbuRahatSabir-Resume.pdf',
                    dest: '.'
                },
                {
                    src: '.well-known',
                    dest: '.'
                }
            ]
        })
    ]
});
