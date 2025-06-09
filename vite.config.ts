
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle size with better code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog', '@radix-ui/react-toast'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react'],
          charts: ['recharts'],
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
        },
        // Optimize asset names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
    },
    // Use terser only in production for better compression
    minify: mode === 'production' ? 'terser' : 'esbuild',
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.warn'], // Remove specific console calls
          passes: 2, // Multiple compression passes
        },
        mangle: {
          safari10: true, // Fix Safari 10+ issues
        },
        format: {
          comments: false, // Remove all comments
        },
      },
    }),
    // Optimize chunk size for better loading
    chunkSizeWarningLimit: 500,
    // Generate source maps only in development
    sourcemap: mode === 'development',
    // Enable modern browser optimizations
    target: ['es2020', 'chrome80', 'firefox80', 'safari14'],
    // Reduce CSS bundle size
    cssCodeSplit: true,
    // Optimize asset inlining
    assetsInlineLimit: 4096, // 4kb
  },
  // Enable compression and caching headers for preview
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Encoding': 'gzip',
    },
  },
  // Optimize dependencies with better treeshaking
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
    // Force ESM for better treeshaking
    esbuildOptions: {
      target: 'es2020',
    },
  },
  // Enable experimental features for better performance
  esbuild: {
    // Remove console.log in production
    ...(mode === 'production' && {
      drop: ['console', 'debugger'],
    }),
    // Use latest JavaScript features
    target: 'es2020',
  },
}));
