import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  // Set base path for GitHub Pages deployment
  // GitHub Pages: /portfolio/ (subdirectory), Vercel: / (root)
  base: process.env.GITHUB_ACTIONS ? '/portfolio/' : '/',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  plugins: [
    react(),
    // Bundle analysis visualization
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'sunburst', // 'sunburst', 'treemap', 'network'
    }),
    // Sentry source map upload (only in production builds with auth token)
    process.env.SENTRY_AUTH_TOKEN && sentryVitePlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: process.env.SENTRY_ORG || 'abu-rahat-sabir',
      project: process.env.SENTRY_PROJECT || 'portfolio',
      telemetry: false,
    }),
  ].filter(Boolean), // Remove falsy plugins

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // Enable source maps for Sentry debugging
    minify: 'terser',

    // Explicit browser targets for broader compatibility
    // Supports Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
    // Covers ~95% of users including corporate/executive browsers
    target: [
      'es2020',           // JavaScript language features
      'chrome90',         // Chrome 90+ (April 2021)
      'firefox88',        // Firefox 88+ (April 2021)
      'safari14',         // Safari 14+ (September 2020)
      'edge90'            // Edge 90+ (April 2021)
    ],

    // Advanced Terser configuration for maximum compression
    terserOptions: {
      compress: {
        // Remove console.log in production
        drop_console: true,
        drop_debugger: true,
        // Advanced optimizations
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.trace'],
        passes: 2,              // Multiple passes for better compression
        unsafe_arrows: true,    // Convert functions to arrow functions
        unsafe_methods: true,   // Optimize method calls
        unsafe_proto: true,     // Optimize prototype access
        unsafe_regexp: true,    // Optimize regexes
        // Remove dead code
        dead_code: true,
        unused: true,
        // Evaluate constant expressions
        evaluate: true,
        // Inline functions
        inline: 2,
        // Reduce variable names
        reduce_vars: true,
        // Collapse single-use variables
        collapse_vars: true,
        // Join consecutive var statements
        join_vars: true,
        // Optimize loops
        loops: true,
        // Optimize conditionals
        conditionals: true,
        // Optimize comparisons
        comparisons: true,
        // Optimize boolean expressions
        booleans: true,
        // Optimize typeof
        typeofs: true,
        // Hoist function declarations
        hoist_funs: true,
        // Hoist variable declarations
        hoist_vars: false,
        // Optimize if-return and if-continue
        if_return: true,
        // Keep function names for better debugging
        keep_fnames: false,
        // Keep class names
        keep_classnames: false,
      },
      mangle: {
        // Mangle variable names for smaller output
        toplevel: true,
        safari10: true,
        // Keep function/class names for Sentry error tracking
        keep_fnames: false,
        keep_classnames: false,
      },
      format: {
        // Remove comments
        comments: false,
        // Preserve annotations for tools
        preserve_annotations: false,
        // ASCII-only output
        ascii_only: true,
        // Compact output
        beautify: false,
        // Remove extra semicolons
        semicolons: true,
      },
    },

    // CSS minification
    cssMinify: 'lightningcss',

    // Chunk size warnings
    chunkSizeWarningLimit: 500, // Warn if chunk > 500 KB

    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'emailjs-vendor': ['@emailjs/browser'],
        },

        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',

        // Compression hints for better gzip/brotli
        compact: true,

        // Module preload for faster loading
        experimentalMinChunkSize: 10000, // Merge chunks smaller than 10KB
      },

      // Tree-shaking optimizations
      treeshake: {
        moduleSideEffects: 'no-external',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },

    // Report compressed size
    reportCompressedSize: true,

    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },

  // Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      '@emailjs/browser',
      'web-vitals',
    ],
    exclude: [
      // Exclude large dependencies that are better lazy-loaded
      'recharts',
    ],
  },
});
