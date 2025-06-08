
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
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-accordion', '@radix-ui/react-dialog'],
          query: ['@tanstack/react-query'],
          icons: ['lucide-react'],
          charts: ['recharts'],
        },
      },
    },
    // Enable compression - only use terser in production
    minify: mode === 'production' ? 'terser' : 'esbuild',
    ...(mode === 'production' && {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }),
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for development debugging
    sourcemap: mode === 'development',
  },
  // Enable compression and caching headers
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'Content-Encoding': 'gzip',
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
}));
